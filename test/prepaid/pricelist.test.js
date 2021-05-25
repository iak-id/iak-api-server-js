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
const { isArrayOfObjects, isTestResultSuccess } = require('../helpers/helpers');

const { mockPricelistData } = require('./mock/pricelist');

function expectSuccessResult(testCase) {
  return expect(testCase)
    .to.eventually.be.fulfilled
    .and.to.eventually.satisfy((testResult) => isTestResultSuccess(testResult.data.rc))
    .and.to.eventually.satisfy((testResult) => {
      const { pricelist } = testResult.data;
      return isArrayOfObjects(pricelist);
    })
    .and.to.eventually.equals(mockPricelistData);
}

const pricelistTest = () => {
  describe('Get user\'s pricelist data', () => {
    let stubs;
    const iakPrepaid = new IAKPrepaid();

    beforeEach(() => {
      stubs = sinon.stub(iakPrepaid, 'sendRequest');
    });

    afterEach(() => {
      stubs.restore();
    });

    it('Successfully get games pricelist data without any type and operator parameter', async () => {
      stubs.returns(Promise.resolve(mockPricelistData));

      const testCase = iakPrepaid.pricelist();

      return expectSuccessResult(testCase);
    });

    it('Successfully get games pricelist data with only type parameter', async () => {
      stubs.returns(Promise.resolve(mockPricelistData));
      const params = { type: 'game' };

      const testCase = iakPrepaid.pricelist(params);

      return expectSuccessResult(testCase);
    });

    it('Successfully get games pricelist data with type and operator parameter', async () => {
      stubs.returns(Promise.resolve(mockPricelistData));
      const params = {
        type: 'game',
        operator: 'mobile_legend',
      };

      const testCase = iakPrepaid.pricelist(params);

      return expectSuccessResult(testCase);
    });

    it('Missing Argument when putting wrong parameters on pricelist function', async () => {
      const params = {
        operator: 'mobile_legend',
      };

      return expect(iakPrepaid.pricelist(params))
        .to.eventually.be.rejectedWith(MissingArgumentError)
        .and.to.eventually.have.own.property('message')
        .that.equals('Field type is missing from your argument. This field is required.');
    });
  });
};

module.exports = {
  pricelistTest,
};
