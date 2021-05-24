const { describe } = require('mocha');

const { prepaidTest } = require('./prepaid/prepaid.test');

describe('IAK SDK Test', () => {
  describe('Prepaid Service Test', prepaidTest.bind(this));
});
