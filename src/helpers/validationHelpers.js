function validateParams(params, requiredParams) {
  let validParams = true;

  requiredParams.forEach((item) => {
    if (!(item in params)) {
      validParams = false;
    }
  });

  return validParams;
}

module.exports = {
  validateParams,
};
