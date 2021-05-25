const axios = require('axios');

const { ApiError } = require('../errors/apiError');

const { SUCCESS, PROCESS, UNDEFINED_RESPONSE_CODE } = require('./responseFormatterHelpers');

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
  let param;

  if (method.toUpperCase() === 'POST') {
    param = {
      method,
      url,
      headers: reqHeaders,
      data,
    };
  } else {
    param = {
      method,
      url,
    };
  }

  return axios(param);
}

function isResponseSuccess(responseCode) {
  return responseCode === SUCCESS.RESPONSE_CODE || responseCode === PROCESS.RESPONSE_CODE;
}

async function sendApiRequest(apiType, url, data = null) {
  return sendRequest('POST', url, data).then((response) => {
    if (apiType === 'postpaid' && 'pasca' in response.data.data) {
      return successResponse({
        pricelist: response.data.data.pasca,
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
      throw new ApiError(error.code, error.data.rc, error.message);
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

module.exports = {
  isResponseSuccess, sendApiRequest,
};
