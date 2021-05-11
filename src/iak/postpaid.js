const { IAK } = require('./iak');

const { sendPostRequest } = require('../helpers');

class IAKPostpaid extends IAK {
  getMainUrl() {
    return `${this.getBaseUrl('postpaid')}api/v1/bill/check/`;
  }

  getReceiptUrl(env, trId) {
    return `${this.getBaseUrl('postpaid')}api/v1/download/${trId}/1`;
  }

  async pricelist() {
    const url = this.getMainUrl();

    const data = {
      commands: 'pricelist-pasca',
      username: this.userHp,
      sign: this.generateSign('pl'),
    };

    return sendPostRequest(url, data);
  }
}

module.exports = {
  IAKPostpaid,
};
