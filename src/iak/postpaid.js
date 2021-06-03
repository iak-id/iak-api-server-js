const { IAK } = require('./iak');
const { MissingArgumentError } = require('../errors/missingArgumentError');

const { isEmptyString } = require('../helpers/helpers');
const { sendDownloadReceiptRequest } = require('../helpers/requestHelpers');
const { isParamsExist, validateContentType, validateParams } = require('../helpers/validationHelpers');

class IAKPostpaid extends IAK {
  constructor(params = null) {
    super(params);
    this.apiType = 'postpaid';
    this.baseEndpoint = 'api/v1/bill/check/';
    this.baseReceiptEndpoint = 'api/v1/download/';
  }

  generateReceiptEndpoint(trId) {
    return `${this.baseReceiptEndpoint}${trId}/1`;
  }

  async sendDownloadReceiptRequest(trId) {
    return sendDownloadReceiptRequest(`${this.getBaseUrl(this.apiType)}${this.generateReceiptEndpoint(trId)}`);
  }

  async pricelist(params = null) {
    let endpoint = this.baseEndpoint;
    let status = 'all';
    let province;

    if (isParamsExist(params)) {
      validateContentType(params);

      if (params.type !== undefined) {
        endpoint += !isEmptyString(params.type) ? `${params.type}` : '';

        if (params.type.toLowerCase() === 'pdam' && params.province !== undefined) {
          province = params.province;
        }
      } else if (params.province !== undefined) {
        throw new MissingArgumentError('Field type is missing from your argument. This field is required.');
      }

      if (params.status !== undefined) {
        status = params.status;
      }
    }

    const data = {
      commands: 'pricelist-pasca',
      username: this.userHp,
      sign: this.generateSign('pl'),
      status,
    };

    if (!isEmptyString(province)) {
      data.province = province;
    }

    return this.sendRequest(endpoint, data);
  }

  async inquiry(params = null) {
    const requiredParams = ['refId', 'customerId', 'productCode'];
    validateParams(params, requiredParams);

    if (params.productCode.toLowerCase() === 'bpjs') {
      validateParams(params, ['month']);
    } else if (params.productCode.toLowerCase() === 'esamsat.jabar') {
      validateParams(params, ['nomorIdentitas']);
    }

    const data = {
      commands: 'inq-pasca',
      username: this.userHp,
      ref_id: params.refId,
      hp: params.customerId,
      code: params.productCode,
      sign: this.generateSign(params.refId),
    };

    if (params.productCode.toLowerCase() === 'bpjs') {
      data.month = params.month;
    } else if (params.productCode.toLowerCase() === 'esamsat.jabar') {
      data.nomor_identitas = params.nomorIdentitas;
    }

    return this.sendRequest(this.baseEndpoint, data);
  }

  async payment(params = null) {
    const requiredParams = ['trId'];
    validateParams(params, requiredParams);

    const data = {
      commands: 'pay-pasca',
      username: this.userHp,
      tr_id: params.trId,
      sign: this.generateSign(params.trId),
    };

    return this.sendRequest(this.baseEndpoint, data);
  }

  async checkStatus(params = null) {
    const requiredParams = ['refId'];
    validateParams(params, requiredParams);

    const data = {
      commands: 'checkstatus',
      username: this.userHp,
      ref_id: params.refId,
      sign: this.generateSign('cs'),
    };

    return this.sendRequest(this.baseEndpoint, data);
  }

  async downloadReceipt(params = null) {
    const requiredParams = ['trId'];
    validateParams(params, requiredParams);

    return this.sendDownloadReceiptRequest(params.trId);
  }
}

module.exports = {
  IAKPostpaid,
};
