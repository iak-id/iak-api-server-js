function isParamsExist(params) {
  return params !== null;
}

function isParamsObject(params) {
  return typeof params === 'object';
}

function validateRequiredParams(params, requiredParams) {
  let validParams = true;

  requiredParams.forEach((item) => {
    if (!(item in params)) {
      validParams = false;
    }
  });

  return validParams;
}

function incorrectParametersMessage() {
  return 'The parameters you given are incorrect. Please send the valid parameters to create this object.';
}

module.exports = {
  incorrectParametersMessage,
  isParamsExist,
  isParamsObject,
  validateRequiredParams,
};
