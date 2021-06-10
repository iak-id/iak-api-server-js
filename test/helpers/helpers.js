const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const { MissingArgumentError } = require('../../src/errors/missingArgumentError');
const { isResponseSuccess } = require('../../src/helpers/requestHelpers');

function isArrayOfObjects(array) {
  return array.every((item) => typeof item === 'object');
}

function isTestResultSuccess(testResponseCode) {
  return isResponseSuccess(testResponseCode);
}

function expectSuccess(apiType, testCase, expectedResponseData) {
  return expect(testCase)
    .to.eventually.be.fulfilled
    .and.to.eventually.satisfy((testResult) => {
      let responseCode;

      if (apiType === 'postpaid') {
        responseCode = testResult.data.response_code;
      } else if (apiType === 'prepaid') {
        responseCode = testResult.data.rc;
      }

      return isTestResultSuccess(responseCode);
    })
    .and.to.eventually.equals(expectedResponseData);
}

function expectSuccessPrepaid(testCase, expectedResponseData) {
  return expectSuccess('prepaid', testCase, expectedResponseData);
}

function expectSuccessPostpaid(testCase, expectedResponseData) {
  return expectSuccess('postpaid', testCase, expectedResponseData);
}

function expectFailed(testCase, error, errorMessage) {
  return expect(testCase)
    .to.eventually.be.rejectedWith(error)
    .and.to.eventually.have.own.property('message')
    .that.equals(errorMessage);
}

function expectFailedDueToMissingParameter(testCase, message) {
  return expectFailed(testCase, MissingArgumentError, message);
}

function expectFailedDueToThrowingError(testCase, error) {
  return expect(testCase).to.eventually.be.rejectedWith(error);
}

module.exports = {
  isArrayOfObjects,
  isTestResultSuccess,
  expectSuccessPrepaid,
  expectSuccessPostpaid,
  expectFailedDueToMissingParameter,
  expectFailedDueToThrowingError,
};
