const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;
chai.use(chaiAsPromised);

const sinon = require('sinon');
const {
  afterEach, beforeEach, describe, it,
} = require('mocha');

const {
  expectFailedDueToMissingParameter, isArrayOfObjects, isTestResultSuccess,
} = require('../helpers');

function expectSuccessResult(testCase, mockPricelistData) {
  return expect(testCase)
    .to.eventually.be.fulfilled
    .and.to.eventually.satisfy((testResult) => isTestResultSuccess(testResult.data.rc))
    .and.to.eventually.satisfy((testResult) => isArrayOfObjects(testResult.data.pricelist))
    .and.to.eventually.equals(mockPricelistData);
}

const pricelistTest = (apiType, iakServices, mockPricelistData) => {
  describe('Get user\'s pricelist data', () => {
    let stubs;

    beforeEach(() => {
      stubs = sinon.stub(iakServices, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Successfully get games pricelist data without any type and operator parameter', async () => {
      stubs.returns(Promise.resolve(mockPricelistData));

      const testCase = iakServices.pricelist();

      return expectSuccessResult(testCase, mockPricelistData);
    });

    it('Successfully get games pricelist data with only type parameter', async () => {
      stubs.returns(Promise.resolve(mockPricelistData));
      let params;

      if (apiType === 'prepaid') {
        params = { type: 'game' };
      } else if (apiType === 'postpaid') {
        params = { type: 'pdam' };
      }

      const testCase = iakServices.pricelist(params);

      return expectSuccessResult(testCase, mockPricelistData);
    });

    it('Successfully get games pricelist data with type and operator parameter', async () => {
      stubs.returns(Promise.resolve(mockPricelistData));
      let params;

      if (apiType === 'prepaid') {
        params = {
          type: 'game',
          operator: 'mobile_legend',
        };
      } else if (apiType === 'postpaid') {
        params = {
          type: 'pdam',
          province: 'jawa barat',
        };
      }

      const testCase = iakServices.pricelist(params);

      return expectSuccessResult(testCase, mockPricelistData);
    });

    it('Missing Argument when putting wrong parameters on pricelist function', async () => {
      const expectedErrorMessage = 'Field type is missing from your argument. This field is required.';
      let params;

      if (apiType === 'prepaid') {
        params = {
          operator: 'mobile_legend',
        };
      } else if (apiType === 'postpaid') {
        params = {
          province: 'jawa barat',
        };
      }

      const testCase = iakServices.pricelist(params);

      return expectFailedDueToMissingParameter(testCase, expectedErrorMessage);
    });
  });
};

module.exports = {
  pricelistTest,
};
