const { describe } = require('mocha');

const { postpaidPricelistTest } = require('./pricelist.test');
const { inquiryTest } = require('./inquiry.test');
const { paymentTest } = require('./payment.test');
const { checkStatusTest } = require('./check-status.test');
const { downloadReceiptTest } = require('./download-receipt.test');

const postpaidTest = () => {
  describe('Postpaid Pricelist Service', postpaidPricelistTest.bind(this));
  describe('Postpaid Inquiry Service', inquiryTest.bind(this));
  describe('Postpaid Payment Service', paymentTest.bind(this));
  describe('Postpaid Check Status Service', checkStatusTest.bind(this));
  describe('Postpaid Download Receipt Service', downloadReceiptTest.bind(this));
};

module.exports = {
  postpaidTest,
};
