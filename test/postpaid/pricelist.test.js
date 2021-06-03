const { IAKPostpaid } = require('../../src');
const { pricelistTest } = require('../helpers/test/pricelist.test');

const { mockPricelistData } = require('./mock/pricelist');

const postpaidPricelistTest = () => {
  pricelistTest('postpaid', new IAKPostpaid(), mockPricelistData);
};

module.exports = {
  postpaidPricelistTest,
};
