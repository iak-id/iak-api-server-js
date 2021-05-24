function generateTopUpRequest(requestParams) {
  let refId = '6atelfNWPz';
  let customerId = '0817777215';
  let productCode = 'xld25000';

  if (requestParams !== undefined) {
    if (requestParams.refId !== undefined) {
      refId = requestParams.refId;
    }

    if (requestParams.customerId !== undefined) {
      customerId = requestParams.customerId;
    }

    if (requestParams.productCode !== undefined) {
      productCode = requestParams.productCode;
    }
  }

  return {
    refId, customerId, productCode,
  };
}

module.exports = {
  generateTopUpRequest,
};
