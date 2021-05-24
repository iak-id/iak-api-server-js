const { describe } = require('mocha');

const { pricelistTest } = require('./pricelist.test');
const { topUpTest } = require('./top-up.test');
const { checkStatusTest } = require('./check-status.test');
const { inquiryTest } = require('./inquiry.test');

const prepaidTest = () => {
  describe('Prepaid Pricelist Service', pricelistTest.bind(this));
  describe('Prepaid Top Up Service', topUpTest.bind(this));
  describe('Prepaid Check Status Service', checkStatusTest.bind(this));
  describe('Prepaid Inquiry Service', inquiryTest.bind(this));
};

module.exports = {
  prepaidTest,
};