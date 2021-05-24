const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const { IAKPrepaid } = require('../../src');
const { MissingArgumentError } = require('../../src/errors/missingArgumentError');
const { isTestResultSuccess } = require('../helpers/helpers');

const { mockInquiryGameIdData, mockInquiryGameServerData, mockInquiryPlnData } = require('./mock/inquiry');

const inquiryTest = () => {
  describe('Call Prepaid Inquiry Services', () => {
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

        return expect(testCase)
          .to.eventually.be.fulfilled
          .and.to.eventually.satisfy((testResult) => isTestResultSuccess(testResult.data.rc))
          .and.to.eventually.equals(mockInquiryGameIdData);
      });

      it('Failed because of missing params', async () => {
        const testCase = iakPrepaid.inquiryGameId();

        return expect(testCase)
          .to.eventually.be.rejectedWith(MissingArgumentError)
          .and.to.eventually.have.own.property('message')
          .that.equals('Content field is required.');
      });
    });

    describe('Prepaid Inquiry Game Server Service', () => {
      it('Successfully get user game server data', async () => {
        stubs.returns(Promise.resolve(mockInquiryGameServerData));
        const params = {
          gameCode: '142',
        };

        const testCase = iakPrepaid.inquiryGameServer(params);

        return expect(testCase)
          .to.eventually.be.fulfilled
          .and.to.eventually.satisfy((testResult) => isTestResultSuccess(testResult.data.rc))
          .and.to.eventually.equals(mockInquiryGameServerData);
      });

      it('Failed because of missing params', async () => {
        const testCase = iakPrepaid.inquiryGameServer();

        return expect(testCase)
          .to.eventually.be.rejectedWith(MissingArgumentError)
          .and.to.eventually.have.own.property('message')
          .that.equals('Content field is required.');
      });
    });

    describe('Prepaid Inquiry PLN Service', () => {
      it('Successfully get user pln data', async () => {
        stubs.returns(Promise.resolve(mockInquiryPlnData));
        const params = {
          customerId: '12345678901',
        };

        const testCase = iakPrepaid.inquiryPln(params);

        return expect(testCase)
          .to.eventually.be.fulfilled
          .and.to.eventually.satisfy((testResult) => isTestResultSuccess(testResult.data.rc))
          .and.to.eventually.equals(mockInquiryPlnData);
      });

      it('Failed because of missing params', async () => {
        const testCase = iakPrepaid.inquiryPln();

        return expect(testCase)
          .to.eventually.be.rejectedWith(MissingArgumentError)
          .and.to.eventually.have.own.property('message')
          .that.equals('Content field is required.');
      });
    });
  });
};

module.exports = {
  inquiryTest,
};
