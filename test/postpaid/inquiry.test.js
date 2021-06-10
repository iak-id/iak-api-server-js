const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPostpaid } = require('../../src');
const { ApiError } = require('../../src/errors/apiError');

const { inquiryResponseData, inquiryTestCase } = require('./mock/inquiry');
const { expectSuccessPostpaid, expectFailedDueToMissingParameter, expectFailedDueToThrowingError } = require('../helpers/helpers');

const {
  INCORRECT_DESTINATION_NUMBER, INVOICE_HAS_BEEN_PAID, TIMEOUT,
} = require('../../src/helpers/responseFormatterHelpers');

const inquiryTest = () => {
  describe('Call inquiry service', () => {
    let stubs;
    const iakPostpaid = new IAKPostpaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPostpaid, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Successfully inquiry (BPJS) transaction', async () => {
      stubs.returns(Promise.resolve(inquiryResponseData));

      const params = {
        refId: '8Qsthbivuw',
        hp: inquiryTestCase.success,
        code: 'BPJS',
        month: '2',
      };

      const testCase = iakPostpaid.inquiry(params);

      return expectSuccessPostpaid(testCase, inquiryResponseData);
    });

    it('Failed inquiry due timeout', async () => {
      const timeoutError = new ApiError(400, TIMEOUT.RESPONSE_CODE, TIMEOUT.MESSAGE);
      stubs.throws(timeoutError);

      const params = {
        refId: '8Qsthbivuw',
        hp: inquiryTestCase.timeout,
        code: 'BPJS',
        month: '2',
      };

      const testCase = iakPostpaid.inquiry(params);

      return expectFailedDueToThrowingError(testCase, timeoutError);
    });

    it('Failed inquiry due invoice has been paid', async () => {
      const invoiceHasBeenPaidError = new ApiError(
        400, INVOICE_HAS_BEEN_PAID.RESPONSE_CODE, INVOICE_HAS_BEEN_PAID.MESSAGE,
      );
      stubs.throws(invoiceHasBeenPaidError);

      const params = {
        refId: '8Qsthbivuw',
        hp: inquiryTestCase.invoiceHasBeenPaid,
        code: 'BPJS',
        month: '2',
      };

      const testCase = iakPostpaid.inquiry(params);

      return expectFailedDueToThrowingError(testCase, invoiceHasBeenPaidError);
    });

    it('Failed inquiry due incorrect destination number', async () => {
      const incorrectDestinationNumberError = new ApiError(
        400, INCORRECT_DESTINATION_NUMBER.RESPONSE_CODE, INCORRECT_DESTINATION_NUMBER.MESSAGE,
      );
      stubs.throws(incorrectDestinationNumberError);

      const params = {
        refId: '8Qsthbivuw',
        hp: inquiryTestCase.incorrectDestinationNumber,
        code: 'BPJS',
        month: '2',
      };

      const testCase = iakPostpaid.inquiry(params);

      return expectFailedDueToThrowingError(testCase, incorrectDestinationNumberError);
    });

    it('(For BPJS) Missing month argument on parameter', async () => {
      const expectedErrorMessage = 'Field month is missing from your argument. This field is required.';
      const params = {
        refId: '8Qsthbivuw',
        hp: inquiryTestCase.success,
        code: 'BPJS',
      };

      const testCase = iakPostpaid.inquiry(params);

      return expectFailedDueToMissingParameter(testCase, expectedErrorMessage);
    });
  });
};

module.exports = {
  inquiryTest,
};
