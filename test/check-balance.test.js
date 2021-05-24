const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPrepaid } = require('../src');
const { isTestResultSuccess } = require('./helpers/helpers');

const mockBalanceSuccessData = {
  status: 'success',
  code: 200,
  data: {
    balance: 10000000,
    message: 'SUCCESS',
    rc: '00',
  },
};

const checkBalanceTest = () => {
  describe('Get user\'s balance data', () => {
    let stubs;
    const iakPrepaid = new IAKPrepaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPrepaid, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Successfully get data', () => {
      stubs.returns(Promise.resolve(mockBalanceSuccessData));

      const testCase = iakPrepaid.checkBalance();

      return expect(testCase)
        .to.eventually.be.fulfilled
        .and.to.eventually.satisfy((testResult) => isTestResultSuccess(testResult.data.rc))
        .and.to.eventually.equals(mockBalanceSuccessData);
    });
  });
};

module.exports = {
  checkBalanceTest,
};
