const { isResponseSuccess } = require('../../src/helpers/requestHelpers');

function isArrayOfObjects(array) {
  return array.every((item) => typeof item === 'object');
}

function isTestResultSuccess(testResponseCode) {
  return isResponseSuccess(testResponseCode);
}

module.exports = {
  isArrayOfObjects,
  isTestResultSuccess,
};
