const { IAKPrepaid } = require('../../src');
const { pricelistTest } = require('../helpers/test/pricelist.test');

const { mockPricelistData } = require('./mock/pricelist');

const prepaidPricelistData = () => {
  pricelistTest('prepaid', new IAKPrepaid(), mockPricelistData);
};

module.exports = {
  prepaidPricelistData,
};
