const { IAK } = require('./iak');
const { ApiError } = require('../errors/apiError');

const { sendApiRequest } = require('../helpers/requestHelpers');

class IAKPostpaid extends IAK {
  constructor() {
    super();
    this.baseEndpoint = 'api/v1/bill/check/';
    this.baseReceiptEndpoint = 'api/v1/download/';
  }

  generateReceiptEndpoint(trId) {
    return `${this.baseReceiptEndpoint}${trId}/1`;
  }

  async sendRequest(endpoint, data) {
    return sendApiRequest('postpaid', `${this.getBaseUrl('postpaid')}${endpoint}`, data).catch((error) => {
      throw new ApiError(error.code, error.data.rc, error.message);
    });
  }

  async pricelist() {
    const data = {
      commands: 'pricelist-pasca',
      username: this.userHp,
      sign: this.generateSign('pl'),
    };

    return this.sendRequest(this.baseEndpoint, data);
  }
}

module.exports = {
  IAKPostpaid,
};
