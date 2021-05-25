const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPrepaid } = require('../../src');
const { ApiError } = require('../../src/errors/apiError');
const { TRANSACTION_NOT_FOUND } = require('../../src/helpers/responseFormatterHelpers');
const { isTestResultSuccess } = require('../helpers/helpers');

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

      return expect(testCase)
        .to.eventually.be.fulfilled
        .and.to.eventually.satisfy((testResult) => isTestResultSuccess(testResult.data.rc))
        .and.to.eventually.equals(mockCheckStatusData);
    });

    it('Failed to find not existing transaction', async () => {
      const apiError = new ApiError(
        400, TRANSACTION_NOT_FOUND.RESPONSE_CODE, TRANSACTION_NOT_FOUND.MESSAGE,
      );
      stubs.throws(apiError);
      const params = { refId: '3YYDY3nXDT' };

      const testCase = iakPrepaid.checkStatus(params);

      return expect(testCase).to.eventually.be.rejectedWith(apiError);
    });
  });
};

module.exports = {
  checkStatusTest,
};
