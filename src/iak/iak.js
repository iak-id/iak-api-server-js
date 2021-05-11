const { PREPAID, POSTPAID, USER_CREDENTIAL } = require('../../config');
const { ApiException } = require('../errors');

const { hashSign, sendPostRequest } = require('../helpers');
const { INVALID_DATA } = require('../helpers').responseFormatterHelpers;
const {
  incorrectParametersMessage, isParamsExist, isParamsObject, validateRequiredParams,
} = require('../helpers').validationHelpers;

class IAK {
  constructor(params = null) {
    if (isParamsExist(params)) {
      const requiredParams = ['stage', 'userHp', 'apiKey'];

      if (isParamsObject(params) && validateRequiredParams(params, requiredParams)) {
        this.stage = (params.stage === 'sandbox' || params.stage === 'production') ? params.stage : 'sandbox';
        this.userHp = params.userHp;
        this.apiKey = params.apiKey;

        return;
      }

      throw new ApiException(
        400,
        INVALID_DATA.RESPONSE_CODE,
        INVALID_DATA.MESSAGE,
        incorrectParametersMessage(),
      );
    }

    if (USER_CREDENTIAL.USER_HP !== undefined && USER_CREDENTIAL.STAGE !== undefined) {
      this.apiKey = USER_CREDENTIAL.STAGE.toLowerCase() === 'production'
        ? USER_CREDENTIAL.API_KEY.PRODUCTION : USER_CREDENTIAL.API_KEY.SANDBOX;
      this.userHp = USER_CREDENTIAL.USER_HP;
      this.stage = USER_CREDENTIAL.STAGE;

      return;
    }

    throw new ApiException(
      400,
      INVALID_DATA.RESPONSE_CODE,
      INVALID_DATA.MESSAGE,
      'The parameters you given are incorrect. Please send the valid parameters or fill your environment variable to create this object',
    );
  }

  generateSign(salt) {
    return hashSign(this.userHp, this.apiKey, salt);
  }

  getBaseUrl(type = 'prepaid') {
    if (type === 'prepaid') {
      return this.stage === 'production' ? PREPAID.PRODUCTION_ENDPOINT : PREPAID.SANDBOX_ENDPOINT;
    }

    if (type === 'postpaid') {
      return this.stage === 'production' ? POSTPAID.PRODUCTION_ENDPOINT : POSTPAID.SANDBOX_ENDPOINT;
    }

    throw new ApiException(400, INVALID_DATA.RESPONSE_CODE, INVALID_DATA.MESSAGE, 'Send the valid service type');
  }

  async checkBalance() {
    const url = `${this.getBaseUrl()}check-balance`;
    const data = {
      username: this.userHp,
      sign: this.generateSign('bl'),
    };

    return sendPostRequest(url, data);
  }
}

module.exports = {
  IAK,
};
