const { expect } = require('chai');

const { USER_CREDENTIAL } = require('../../config');

function expectSuccessResults(testResult) {
  expect(testResult.data.message).to.equal('SUCCESS');
  expect(testResult.data.rc).to.equal('00');
}

function expectFailedResults(testResult, expectedMessage, expectedRc) {
  expect(testResult.data.message).to.equal(expectedMessage);
  expect(testResult.data.rc).to.equal(expectedRc);
}

function getParams(params) {
  const stage = params.stage !== undefined ? params.stage : USER_CREDENTIAL.STAGE;
  const userHp = params.userHp !== undefined ? params.userHp : USER_CREDENTIAL.USER_HP;
  const apiKey = params.apiKey !== undefined ? params.apiKey : USER_CREDENTIAL.API_KEY.SANDBOX;

  return {
    stage, userHp, apiKey,
  };
}

function isArrayOfObjects(array) {
  return array.every((item) => typeof item === 'object');
}

module.exports = {
  expectSuccessResults,
  expectFailedResults,
  getParams,
  isArrayOfObjects,
};
