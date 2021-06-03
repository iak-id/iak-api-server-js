const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPostpaid } = require('../../src');

const { checkStatusResponseData } = require('./mock/check-status');
const { expectFailedDueToMissingParameter, expectSuccessPostpaid } = require('../helpers/helpers');

const checkStatusTest = () => {
  describe('Get user\'s transaction status', () => {
    let stubs;
    const iakPostpaid = new IAKPostpaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPostpaid, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Successfully check transaction\'s status', async () => {
      stubs.returns(Promise.resolve(checkStatusResponseData));

      const params = {
        refId: '0E8X7OuA8A',
      };

      const testCase = iakPostpaid.checkStatus(params);

      return expectSuccessPostpaid(testCase, checkStatusResponseData);
    });

    it('Failed check status due missing argument', async () => {
      const expectedErrorMessage = 'Content field is required.';

      const testCase = iakPostpaid.checkStatus();

      return expectFailedDueToMissingParameter(testCase, expectedErrorMessage);
    });
  });
};

module.exports = {
  checkStatusTest,
};
