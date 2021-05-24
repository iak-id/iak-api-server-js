const { PREPAID, POSTPAID, USER_CREDENTIAL } = require('../../config');
const { MissingArgumentError } = require('../errors/missingArgumentError');
const { InvalidParameterValueError } = require('../errors/invalidParameterValueError');

const { hashSign } = require('../helpers/helpers');
const { isParamsExist, validateParams } = require('../helpers/validationHelpers');

class IAK {
  constructor(params = null) {
    if (isParamsExist(params)) {
      const requiredParams = ['stage', 'userHp', 'apiKey'];
      validateParams(params, requiredParams);

      this.stage = (params.stage === 'sandbox' || params.stage === 'production') ? params.stage : 'sandbox';
      this.userHp = params.userHp;
      this.apiKey = params.apiKey;

      return;
    }

    if (USER_CREDENTIAL.USER_HP !== undefined && USER_CREDENTIAL.STAGE !== undefined) {
      this.apiKey = USER_CREDENTIAL.STAGE.toLowerCase() === 'production'
        ? USER_CREDENTIAL.API_KEY.PRODUCTION : USER_CREDENTIAL.API_KEY.SANDBOX;
      this.userHp = USER_CREDENTIAL.USER_HP;
      this.stage = USER_CREDENTIAL.STAGE;

      return;
    }

    throw new MissingArgumentError(
      'Missing argument occurred. Please send the valid parameters or fill your environment variable to create this object',
    );
  }

  generateSign(salt) {
    return hashSign(this.userHp, this.apiKey, salt);
  }

  getBaseUrl(type = 'prepaid') {
    if (type.toLowerCase() === 'prepaid') {
      return this.stage === 'production' ? PREPAID.PRODUCTION_ENDPOINT : PREPAID.SANDBOX_ENDPOINT;
    }

    if (type.toLowerCase() === 'postpaid') {
      return this.stage === 'production' ? POSTPAID.PRODUCTION_ENDPOINT : POSTPAID.SANDBOX_ENDPOINT;
    }

    throw new InvalidParameterValueError();
  }
}

module.exports = {
  IAK,
};
