const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPostpaid } = require('../../src');

const { paymentResponseData } = require('./mock/payment');
const { expectFailedDueToMissingParameter, expectSuccessPostpaid } = require('../helpers/helpers');

const paymentTest = () => {
  describe('Call payment service status', () => {
    let stubs;
    const iakPostpaid = new IAKPostpaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPostpaid, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Successfully payment (BPJS) transaction', async () => {
      stubs.returns(Promise.resolve(paymentResponseData));

      const params = {
        trId: 9922430,
      };

      const testCase = iakPostpaid.payment(params);

      return expectSuccessPostpaid(testCase, paymentResponseData);
    });

    it('Failed payment due missing argument', async () => {
      const expectedErrorMessage = 'Content field is required.';

      const testCase = iakPostpaid.payment();

      return expectFailedDueToMissingParameter(testCase, expectedErrorMessage);
    });
  });
};

module.exports = {
  paymentTest,
};
