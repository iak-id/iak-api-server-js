const { IAK } = require('./iak');
const { ApiException } = require('../errors');

const { isEmptyString, sendPostRequest } = require('../helpers');
const { INVALID_DATA } = require('../helpers').responseFormatterHelpers;
const { incorrectParametersMessage, isParamsExist, isParamsObject } = require('../helpers').validationHelpers;

class IAKPrepaid extends IAK {
  async pricelist(params = null) {
    let url = `${this.getBaseUrl()}pricelist`;

    if (isParamsExist(params)) {
      if (isParamsObject(params) && params.type !== undefined) {
        url += !isEmptyString(params.type) ? `/${params.type}` : '';

        if (params.operator !== undefined) {
          url += (!isEmptyString(params.type) && !isEmptyString(params.operator)) ? `/${params.operator}` : '';
        }
      } else {
        throw new ApiException(
          400,
          INVALID_DATA.RESPONSE_CODE,
          INVALID_DATA.MESSAGE,
          incorrectParametersMessage(),
        );
      }
    }

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
