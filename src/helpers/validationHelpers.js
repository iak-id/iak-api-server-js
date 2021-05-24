const { ContentTypeError } = require('../errors/contentTypeError');
const { MissingArgumentError } = require('../errors/missingArgumentError');

function isParamsExist(params) {
  return params !== null;
}

function validateRequired(params) {
  if (params === undefined || params === null) {
    throw new MissingArgumentError();
  }
}

function validateContentType(params) {
  if (typeof params !== 'object') {
    throw new ContentTypeError();
  }
}

function validateParamsExist(params, requiredParams) {
  requiredParams.forEach((item) => {
    if (!(item in params)) {
      throw new MissingArgumentError(`Field ${item} is missing from your argument. This field is required.`);
    }
  });
}

function validateParams(params, requiredParams) {
  validateRequired(params);
  validateContentType(params);
  validateParamsExist(params, requiredParams);
}

module.exports = {
  isParamsExist,
  validateParams,
};
