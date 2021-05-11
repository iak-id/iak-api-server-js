require('dotenv').config();

const { expect } = require('chai');
const { describe, it } = require('mocha');

const { IAKPrepaid } = require('../../src');
const { expectSuccessResults, isArrayOfObjects } = require('../helpers');

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
        const pricelistResult = await new IAKPrepaid().pricelist('game');
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
        const pricelistResult = await new IAKPrepaid().pricelist('game', 'mobile_legend');
        console.log(pricelistResult);

        expectSuccessResults(pricelistResult);
        expect(pricelistResult.data.pricelist).to.satisfy(isArrayOfObjects);
      } catch (error) {
        console.log(error);
        throw new Error(`Test should be success: ${error.message}`);
      }
    });
  });
});
