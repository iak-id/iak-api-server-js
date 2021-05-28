const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPrepaid } = require('../../src');
const { expectSuccessPrepaid } = require('../helpers/helpers');

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

      return expectSuccessPrepaid(testCase, mockBalanceSuccessData);
    });
  });
};

module.exports = {
  checkBalanceTest,
};
