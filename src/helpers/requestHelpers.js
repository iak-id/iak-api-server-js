const axios = require('axios');
const { parseString } = require('xml2js');

const { ApiError } = require('../errors/apiError');
const { TimeoutError } = require('../errors/timeoutError');

const {
  SUCCESS, PROCESS, PAYMENT_REQUEST_NOT_RECEIVED_YET, UNDEFINED_RESPONSE_CODE,
} = require('./responseFormatterHelpers');

const reqHeaders = {
  'Content-Type': 'application/json',
};

const responseCodeProperty = {
  prepaid: 'rc',
  postpaid: 'response_code',
};

function successResponse(data) {
  return {
    status: 'success',
    code: 200,
    data,
  };
}

async function sendRequest(method, url, data = null) {
  const param = {
    url,
    method,
    timeout: 1000 * 30,
    cancelToken: axios.CancelToken.source().token,
  };

  if (method.toUpperCase() === 'POST') {
    param.headers = reqHeaders;
    param.data = data;
  }

  return axios(param);
}

function isResponseSuccess(responseCode) {
  return responseCode === SUCCESS.RESPONSE_CODE
      || responseCode === PROCESS.RESPONSE_CODE
      || responseCode === PAYMENT_REQUEST_NOT_RECEIVED_YET.RESPONSE_CODE;
}

async function sendApiRequest(apiType, url, data = null) {
  return sendRequest('POST', url, data).then((response) => {
    if (apiType === 'postpaid' && 'pasca' in response.data.data) {
      return successResponse({
        pasca: response.data.data.pasca,
        message: SUCCESS.MESSAGE,
        rc: SUCCESS.RESPONSE_CODE,
      });
    }

    const responseMessage = response.data.data.message;
    const responseCode = response.data.data[responseCodeProperty[apiType]];

    if (isResponseSuccess(responseCode)) {
      return successResponse(response.data.data);
    }

    throw new ApiError(400, responseCode, responseMessage);
  }).catch((error) => {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.response === undefined || axios.isCancel(error)) {
      throw new TimeoutError();
    }

    let message;
    let responseCode;
    let statusCode;
    let details = '';

    if (error.response.data.data !== undefined) {
      statusCode = error.response.status;
      responseCode = error.response.data.data[responseCodeProperty[apiType]];
      message = error.response.data.data.message;
    } else {
      statusCode = 500;
      responseCode = UNDEFINED_RESPONSE_CODE.RESPONSE_CODE;
      message = UNDEFINED_RESPONSE_CODE.MESSAGE;
      details = error.message;
    }

    throw new ApiError(statusCode, responseCode, message, details);
  });
}

async function sendDownloadReceiptRequest(url) {
  return sendRequest('GET', url)
    .then((response) => {
      let data;

      if (typeof response.data === 'string' && response.data.search('<mp>') !== false) {
        parseString(response.data, (error, result) => {
          let statusCode = 500;
          let responseCode = UNDEFINED_RESPONSE_CODE.RESPONSE_CODE;
          let message = UNDEFINED_RESPONSE_CODE.MESSAGE;
          let details = '';

          if (!error) {
            statusCode = 400;
            responseCode = result.mp.response_code;
            message = result.mp.message;
          } else {
            details = error.message;
          }

          throw new ApiError(statusCode, responseCode, message, details);
        });
      }

      if ('pasca' in response.data.data) {
        data = response.data.data.pasca;
      } else {
        data = response.data.data;
      }

      return successResponse(data);
    })
    .catch((error) => {
      if (error instanceof ApiError) {
        throw error;
      }

      if (axios.isCancel(error) || error.message.toLowerCase().search('timeout') !== false) {
        throw new TimeoutError();
      }

      throw new ApiError(
        500,
        UNDEFINED_RESPONSE_CODE.RESPONSE_CODE,
        UNDEFINED_RESPONSE_CODE.MESSAGE,
        error.message,
      );
    });
}

module.exports = {
  isResponseSuccess, sendApiRequest, sendDownloadReceiptRequest,
};
