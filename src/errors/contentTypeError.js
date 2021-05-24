class ContentTypeError extends Error {
  constructor() {
    super('Content or fields must be an object.');

    this.status = 'failed';
    this.code = 400;
  }
}

module.exports = {
  ContentTypeError,
};
