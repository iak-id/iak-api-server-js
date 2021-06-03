const { describe } = require('mocha');

const { prepaidTest } = require('./prepaid/prepaid.test');
const { postpaidTest } = require('./postpaid/postpaid.test');

describe('IAK SDK Test', () => {
  describe('Prepaid Service Test', prepaidTest.bind(this));
  describe('Postpaid Service Test', postpaidTest.bind(this));
});
