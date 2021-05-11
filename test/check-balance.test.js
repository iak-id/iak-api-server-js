require('dotenv').config();

const { expect, AssertionError } = require('chai');
const { describe, it } = require('mocha');

const { IAKPrepaid } = require('../src');

const { INVALID_DATA, WRONG_AUTHENTICATION } = require('../src/helpers').responseFormatterHelpers;
const {
  expectSuccessResults, expectFailedResults, getParams, isTestResultSuccess,
} = require('./helpers');

describe('Check Balance Service', () => {
  describe('Get user\'s balance data', () => {
    it('Successfully get data', async () => {
      try {
        const checkBalanceResult = await new IAKPrepaid().checkBalance();
        console.log(checkBalanceResult);

        expectSuccessResults(checkBalanceResult);
      } catch (error) {
        console.log(error);
        throw new Error(`Test should be success: ${error.message}`);
      }
    });

    it('Wrong Authentication with http status code equal to 200 when sign is incorrect', async () => {
      try {
        const params = getParams({
          apiKey: 'abcdefghijkl',
        });

        const checkBalanceResult = await new IAKPrepaid(params).checkBalance();
        console.log(checkBalanceResult);

        if (isTestResultSuccess(checkBalanceResult.data.message, checkBalanceResult.data.rc)) {
          expect.fail('Test is success when it should be failed');
        } else {
          expectFailedResults(
            checkBalanceResult,
            WRONG_AUTHENTICATION.MESSAGE,
            WRONG_AUTHENTICATION.RESPONSE_CODE,
          );
        }
      } catch (error) {
        console.log(error);
        throw new Error('Test is success when it should be failed');
      }
    });

    it('Invalid Data with http status code equal to 400 when userHp is incorrect', async () => {
      try {
        const params = getParams({
          userHp: 'abcdefghijkl',
        });

        const checkBalanceResult = await new IAKPrepaid(params).checkBalance();
        console.log(checkBalanceResult);

        if (isTestResultSuccess(checkBalanceResult.data.message, checkBalanceResult.data.rc)) {
          expect.fail('Test is success when it should be failed');
        } else {
          expectFailedResults(checkBalanceResult, INVALID_DATA.MESSAGE, INVALID_DATA.RESPONSE_CODE);
        }
      } catch (error) {
        console.log(error);
        if (!(error instanceof AssertionError)) {
          expectFailedResults(error, INVALID_DATA.MESSAGE, INVALID_DATA.RESPONSE_CODE);
        } else {
          throw new Error('Test is success when it should be failed');
        }
      }
    });

    it('Invalid Data with http status code equal to 400 when putting wrong parameters on IAKPrepaid', async () => {
      try {
        const checkBalanceResult = await new IAKPrepaid('params').checkBalance();
        console.log(checkBalanceResult);

        if (checkBalanceResult.data.message === 'SUCCESS' && checkBalanceResult.data.rc === '00') {
          expect.fail('Test is success when it should be failed');
        } else {
          expectFailedResults(checkBalanceResult, 'INVALID DATA', '208');
        }
      } catch (error) {
        console.log(error);
        if (!(error instanceof AssertionError)) {
          expectFailedResults(error, 'INVALID DATA', '208');
        } else {
          throw new Error('Test is success when it should be failed');
        }
      }
    });
  });
});
