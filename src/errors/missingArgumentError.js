class MissingArgumentError extends Error {
  constructor(message = 'Content field is required.') {
    super(message);

    this.status = 'failed';
    this.code = 400;
  }
}

module.exports = {
  MissingArgumentError,
};
