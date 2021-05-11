const crypto = require('crypto');

const { sendRequest, sendPostRequest } = require('./requestHelpers');
const { validateParams } = require('./validationHelpers');
const responseFormatterHelpers = require('./responseFormatterHelpers');

function hashSign(userHp, apikey, salt) {
  return crypto
    .createHash('md5')
    .update(`${userHp}${apikey}${salt}`)
    .digest('hex');
}

function isEmptyString(string) {
  return (string === null || typeof string === 'undefined' || string.length === 0);
}

module.exports = {
  responseFormatterHelpers,
  hashSign,
  isEmptyString,
  sendRequest,
  sendPostRequest,
  validateParams,
};