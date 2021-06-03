const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPrepaid } = require('../../src');
const { ApiError } = require('../../src/errors/apiError');
const { CODE_NOT_FOUND, NUMBER_NOT_MATCH_WITH_OPERATOR } = require('../../src/helpers/responseFormatterHelpers');

const { expectSuccessPrepaid, expectFailedDueToThrowingError } = require('../helpers/helpers');
const { generateTopUpRequest } = require('../helpers/transactionHelpers');

const mockTopUpData = require('./mock/top-up');

const topUpTest = () => {
  describe('Sending top up request', () => {
    let stubs;
    const iakPrepaid = new IAKPrepaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPrepaid, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Successfully sending top up request', async () => {
      stubs.returns(Promise.resolve(mockTopUpData.success));

      const testCase = iakPrepaid.topUp(generateTopUpRequest());

      return expectSuccessPrepaid(testCase, mockTopUpData.success);
    });

    it('Number Not Match with Operator with http status code equal to 400', async () => {
      const numberNotMatchWithOperatorError = new ApiError(
        400, NUMBER_NOT_MATCH_WITH_OPERATOR.RESPONSE_CODE, NUMBER_NOT_MATCH_WITH_OPERATOR.MESSAGE,
      );
      stubs.throws(numberNotMatchWithOperatorError);

      const params = generateTopUpRequest({ customerId: '08123456789' });

      const testCase = iakPrepaid.topUp(params);

      return expectFailedDueToThrowingError(testCase, numberNotMatchWithOperatorError);
    });

    it('Code Not Found with http status code equal to 400', async () => {
      const codeNotFoundError = new ApiError(
        400, CODE_NOT_FOUND.RESPONSE_CODE, CODE_NOT_FOUND.MESSAGE,
      );
      stubs.throws(codeNotFoundError);

      const params = generateTopUpRequest({ productCode: 'xld25001' });

      const testCase = iakPrepaid.topUp(params);

      return expectFailedDueToThrowingError(testCase, codeNotFoundError);
    });
  });
};

module.exports = {
  topUpTest,
};
