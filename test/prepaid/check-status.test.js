const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPrepaid } = require('../../src');
const { ApiError } = require('../../src/errors/apiError');
const { TRANSACTION_NOT_FOUND } = require('../../src/helpers/responseFormatterHelpers');
const { expectSuccessPrepaid, expectFailedDueToThrowingError } = require('../helpers/helpers');

const { mockCheckStatusData } = require('./mock/check-status');

const checkStatusTest = () => {
  describe('Get user\'s top up request status', () => {
    let stubs;
    const iakPrepaid = new IAKPrepaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPrepaid, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Find existing transaction successfully', async () => {
      stubs.returns(Promise.resolve(mockCheckStatusData));

      const params = { refId: 'mzCHrMKjcq' };

      const testCase = iakPrepaid.checkStatus(params);

      return expectSuccessPrepaid(testCase, mockCheckStatusData);
    });

    it('Failed to find not existing transaction', async () => {
      const transactionNotFoundError = new ApiError(
        400, TRANSACTION_NOT_FOUND.RESPONSE_CODE, TRANSACTION_NOT_FOUND.MESSAGE,
      );
      stubs.throws(transactionNotFoundError);

      const params = { refId: '3YYDY3nXDT' };

      const testCase = iakPrepaid.checkStatus(params);

      return expectFailedDueToThrowingError(testCase, transactionNotFoundError);
    });
  });
};

module.exports = {
  checkStatusTest,
};
