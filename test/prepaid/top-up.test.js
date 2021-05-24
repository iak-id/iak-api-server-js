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
const { CODE_NOT_FOUND, NUMBER_NOT_MATCH_WITH_OPERATOR } = require('../../src/helpers/responseFormatterHelpers');

const { isTestResultSuccess } = require('../helpers/helpers');
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

      return expect(testCase)
        .to.eventually.be.fulfilled
        .and.to.eventually.satisfy((testResult) => isTestResultSuccess(testResult.data.rc))
        .and.to.eventually.equals(mockTopUpData.success);
    });

    it('Number Not Match with Operator with http status code equal to 400', async () => {
      const apiError = new ApiError(
        400, NUMBER_NOT_MATCH_WITH_OPERATOR.RESPONSE_CODE, NUMBER_NOT_MATCH_WITH_OPERATOR.MESSAGE,
      );
      stubs.throws(apiError);
      const params = { customerId: '08123456789' };

      const testCase = iakPrepaid.topUp(generateTopUpRequest(params));

      return expect(testCase).to.eventually.be.rejectedWith(apiError);
    });

    it('Code Not Found with http status code equal to 400', async () => {
      const apiError = new ApiError(
        400, CODE_NOT_FOUND.RESPONSE_CODE, CODE_NOT_FOUND.MESSAGE,
      );
      stubs.throws(apiError);
      const params = { productCode: 'xld25001' };

      const testCase = iakPrepaid.topUp(generateTopUpRequest(params));

      return expect(testCase).to.eventually.be.rejectedWith(apiError);
    });
  });
};

module.exports = {
  topUpTest,
};
