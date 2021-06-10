class InvalidParameterValueError extends Error {
  constructor(message = 'Argument value is not fit with the respective value.') {
    super(message);

    this.status = 'failed';
    this.code = 400;
  }
}

module.exports = {
  InvalidParameterValueError,
};
