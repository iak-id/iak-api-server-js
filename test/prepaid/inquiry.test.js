const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPrepaid } = require('../../src');
const { expectSuccessPrepaid, expectFailedDueToMissingParameter } = require('../helpers/helpers');

const { mockInquiryGameIdData, mockInquiryGameServerData, mockInquiryPlnData } = require('./mock/inquiry');

const inquiryTest = () => {
  describe('Call inquiry services', () => {
    let stubs;
    const iakPrepaid = new IAKPrepaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPrepaid, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    describe('Prepaid Inquiry Game Id Service', () => {
      it('Successfully get user game id data', async () => {
        stubs.returns(Promise.resolve(mockInquiryGameIdData));

        const params = {
          gameCode: '142',
          customerId: '156378300|8483',
        };

        const testCase = iakPrepaid.inquiryGameId(params);

        return expectSuccessPrepaid(testCase, mockInquiryGameIdData);
      });

      it('Failed because of missing params', async () => {
        const expectedErrorMessage = 'Content field is required.';

        const testCase = iakPrepaid.inquiryGameId();

        return expectFailedDueToMissingParameter(testCase, expectedErrorMessage);
      });
    });

    describe('Prepaid Inquiry Game Server Service', () => {
      it('Successfully get user game server data', async () => {
        stubs.returns(Promise.resolve(mockInquiryGameServerData));

        const params = {
          gameCode: '142',
        };

        const testCase = iakPrepaid.inquiryGameServer(params);

        return expectSuccessPrepaid(testCase, mockInquiryGameServerData);
      });

      it('Failed because of missing params', async () => {
        const expectedErrorMessage = 'Content field is required.';

        const testCase = iakPrepaid.inquiryGameServer();

        return expectFailedDueToMissingParameter(testCase, expectedErrorMessage);
      });
    });

    describe('Prepaid Inquiry PLN Service', () => {
      it('Successfully get user pln data', async () => {
        stubs.returns(Promise.resolve(mockInquiryPlnData));

        const params = {
          customerId: '12345678901',
        };

        const testCase = iakPrepaid.inquiryPln(params);

        return expectSuccessPrepaid(testCase, mockInquiryPlnData);
      });

      it('Failed because of missing params', async () => {
        const expectedErrorMessage = 'Content field is required.';

        const testCase = iakPrepaid.inquiryPln();

        return expectFailedDueToMissingParameter(testCase, expectedErrorMessage);
      });
    });
  });
};

module.exports = {
  inquiryTest,
};
