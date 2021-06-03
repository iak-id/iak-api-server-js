const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPostpaid } = require('../../src');

const { expectFailedDueToMissingParameter } = require('../helpers/helpers');
const { downloadReceiptResponseData } = require('./mock/download-receipt');

const downloadReceiptTest = () => {
  describe('Call download receipt service', () => {
    let stubs;
    const iakPostpaid = new IAKPostpaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPostpaid, 'sendDownloadReceiptRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Successfully download transaction receipt', async () => {
      stubs.returns(Promise.resolve(downloadReceiptResponseData));

      const params = {
        trId: '9920491',
      };

      const testCase = iakPostpaid.downloadReceipt(params);

      return expect(testCase)
        .to.eventually.be.fulfilled
        .and.to.eventually.equals(downloadReceiptResponseData);
    });

    it('Failed because of empty params', async () => {
      const expectedErrorMessage = 'Content field is required.';

      const testCase = iakPostpaid.downloadReceipt();

      return expectFailedDueToMissingParameter(testCase, expectedErrorMessage);
    });
  });
};

module.exports = {
  downloadReceiptTest,
};
