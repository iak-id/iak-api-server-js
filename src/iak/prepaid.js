const { IAK } = require('./iak');
const { ApiError } = require('../errors/apiError');
const { MissingArgumentError } = require('../errors/missingArgumentError');

const { isEmptyString } = require('../helpers/helpers');
const { sendApiRequest } = require('../helpers/requestHelpers');
const { isParamsExist, validateParams } = require('../helpers/validationHelpers');

class IAKPrepaid extends IAK {
  async sendRequest(endpoint, data) {
    return sendApiRequest('prepaid', `${this.getBaseUrl('prepaid')}${endpoint}`, data).catch((error) => {
      throw new ApiError(error.code, error.data.rc, error.message);
    });
  }

  async checkBalance() {
    const endpoint = 'check-balance';
    const data = {
      username: this.userHp,
      sign: this.generateSign('bl'),
    };

    return this.sendRequest(endpoint, data);
  }

  async pricelist(params = null) {
    let endpoint = 'pricelist';
    let status = 'all';

    if (isParamsExist(params)) {
      if (params.type === undefined && params.operator !== undefined) {
        throw new MissingArgumentError('Field type is missing from your argument. This field is required.');
      }
      if (params.type !== undefined) {
        endpoint += !isEmptyString(params.type) ? `/${params.type}` : '';

        if (params.operator !== undefined) {
          endpoint += (!isEmptyString(params.type) && !isEmptyString(params.operator)) ? `/${params.operator}` : '';
        }
      }

      if (params.status !== undefined) {
        status = params.status;
      }
    }

    const data = {
      username: this.userHp,
      sign: this.generateSign('pl'),
      status,
    };

    return this.sendRequest(endpoint, data);
  }

  async topUp(params) {
    const requiredParams = ['refId', 'customerId', 'productCode'];
    validateParams(params, requiredParams);

    const endpoint = 'top-up';
    const data = {
      username: this.userHp,
      ref_id: params.refId,
      customer_id: params.customerId,
      product_code: params.productCode,
      sign: this.generateSign(params.refId),
    };

    return this.sendRequest(endpoint, data);
  }

  async checkStatus(params) {
    const requiredParams = ['refId'];
    validateParams(params, requiredParams);

    const endpoint = 'check-status';
    const data = {
      username: this.userHp,
      ref_id: params.refId,
      sign: this.generateSign(params.refId),
    };

    return this.sendRequest(endpoint, data);
  }

  async inquiryGameId(params) {
    const requiredParams = ['gameCode', 'customerId'];
    validateParams(params, requiredParams);

    const endpoint = 'inquiry-game';
    const data = {
      username: this.userHp,
      game_code: params.gameCode,
      customer_id: params.customerId,
      sign: this.generateSign(params.gameCode),
    };

    return this.sendRequest(endpoint, data);
  }

  async inquiryGameServer(params) {
    const requiredParams = ['gameCode'];
    validateParams(params, requiredParams);

    const endpoint = 'inquiry-game-server';
    const data = {
      username: this.userHp,
      game_code: params.gameCode,
      sign: this.generateSign(params.gameCode),
    };

    return this.sendRequest(endpoint, data);
  }

  async inquiryPln(params) {
    const requiredParams = ['customerId'];
    validateParams(params, requiredParams);

    const endpoint = 'inquiry-pln';
    const data = {
      username: this.userHp,
      customer_id: params.customerId,
      sign: this.generateSign(params.customerId),
    };

    return this.sendRequest(endpoint, data);
  }
}

module.exports = {
  IAKPrepaid,
};
