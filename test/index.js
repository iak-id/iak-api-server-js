const { describe } = require('mocha');

const { checkBalanceTest } = require('./check-balance.test');
const { prepaidTest } = require('./prepaid/prepaid.test');

describe('IAK SDK Test', () => {
  describe('Check Balance Service Test', checkBalanceTest.bind(this));
  describe('Prepaid Service Test', prepaidTest.bind(this));
});
