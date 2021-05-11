const { IAK } = require('./iak');

const { isEmptyString, sendPostRequest } = require('../helpers');

class IAKPrepaid extends IAK {
  async pricelist(type = null, operator = null) {
    let url = `${this.getBaseUrl()}pricelist`;

    url += !isEmptyString(type) ? `/${type}` : '';
    url += (!isEmptyString(type) && !isEmptyString(operator)) ? `/${operator}` : '';

    const data = {
      username: this.userHp,
      sign: this.generateSign('pl'),
      status: 'all',
    };

    return sendPostRequest(url, data);
  }
}

module.exports = {
  IAKPrepaid,
};
