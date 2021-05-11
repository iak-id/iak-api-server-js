require('dotenv').config();

const { expect, AssertionError } = require('chai');
const { describe, it } = require('mocha');

const { IAKPrepaid } = require('../../src');
const { INVALID_DATA } = require('../../src/helpers').responseFormatterHelpers;
const {
  expectSuccessResults, expectFailedResults, isArrayOfObjects, isTestResultSuccess,
} = require('../helpers');

describe('Prepaid Pricelist Service', () => {
  describe('Get user\'s pricelist data', () => {
    it('Successfully get data without any type and operator parameter', async () => {
      try {
        const pricelistResult = await new IAKPrepaid().pricelist();
        console.log(pricelistResult);

        expectSuccessResults(pricelistResult);
        expect(pricelistResult.data.pricelist).to.satisfy(isArrayOfObjects);
      } catch (error) {
        console.log(error);
        throw new Error(`Test should be success: ${error.message}`);
      }
    });

    it('Successfully get games data type pricelist with no operator parameter', async () => {
      try {
        const pricelistResult = await new IAKPrepaid().pricelist({
          type: 'game',
        });
        console.log(pricelistResult);

        expectSuccessResults(pricelistResult);
        expect(pricelistResult.data.pricelist).to.satisfy(isArrayOfObjects);
      } catch (error) {
        console.log(error);
        throw new Error(`Test should be success: ${error.message}`);
      }
    });

    it('Successfully get games data type pricelist with operator parameter', async () => {
      try {
        const pricelistResult = await new IAKPrepaid().pricelist({
          type: 'game',
          operator: 'mobile_legend',
        });
        console.log(pricelistResult);

        expectSuccessResults(pricelistResult);
        expect(pricelistResult.data.pricelist).to.satisfy(isArrayOfObjects);
      } catch (error) {
        console.log(error);
        throw new Error(`Test should be success: ${error.message}`);
      }
    });

    it('Invalid Data with http status code equal to 400 when putting wrong parameters on pricelist function', async () => {
      try {
        const pricelistResult = await new IAKPrepaid().pricelist('params');
        console.log(pricelistResult);

        if (isTestResultSuccess(pricelistResult.data.message, pricelistResult.data.rc)) {
          expect.fail('Test is success when it should be failed');
        } else {
          expectFailedResults(pricelistResult, INVALID_DATA.MESSAGE, INVALID_DATA.RESPONSE_CODE);
        }

        expectSuccessResults(pricelistResult);
        expect(pricelistResult.data.pricelist).to.satisfy(isArrayOfObjects);
      } catch (error) {
        console.log(error);
        if (!(error instanceof AssertionError)) {
          expectFailedResults(error, INVALID_DATA.MESSAGE, INVALID_DATA.RESPONSE_CODE);
        } else {
          throw new Error('Test is success when it should be failed');
        }
      }
    });
  });
});
