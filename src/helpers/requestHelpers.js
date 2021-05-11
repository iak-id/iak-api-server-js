const axios = require('axios');

const { ApiException } = require('../errors');

const { UNDEFINED_RESPONSE_CODE } = require('./responseFormatterHelpers');

const reqHeaders = {
  'Content-Type': 'application/json',
};

function sendRequest(method, url, headers = null, data = null) {
  let param;

  if (method.toUpperCase() === 'POST') {
    param = {
      method,
      url,
      headers,
      data,
    };
  } else {
    param = {
      method,
      url,
    };
  }

  return axios(param).then((response) => ({
    status: 'success',
    code: 200,
    data: response.data.data,
  })).catch((error) => {
    let message;
    let responseCode;
    let statusCode;
    let details = '';

    if (error.response.data.data !== undefined) {
      statusCode = error.response.status;
      responseCode = error.response.data.data.rc;
      message = error.response.data.data.message;
    } else {
      statusCode = 500;
      responseCode = UNDEFINED_RESPONSE_CODE.RESPONSE_CODE;
      message = UNDEFINED_RESPONSE_CODE.MESSAGE;
      details = error.message;
    }

    throw new ApiException(statusCode, responseCode, message, details);
  });
}

function sendPostRequest(url, data) {
  return sendRequest('POST', url, reqHeaders, data).then((response) => response)
    .catch((error) => {
      if (error instanceof ApiException) {
        throw new ApiException(error.code, error.data.rc, error.message, error.details);
      }

      throw new ApiException(
        500,
        UNDEFINED_RESPONSE_CODE.RESPONSE_CODE,
        UNDEFINED_RESPONSE_CODE.MESSAGE,
        error.message,
      );
    });
}

module.exports = {
  sendRequest, sendPostRequest,
};
