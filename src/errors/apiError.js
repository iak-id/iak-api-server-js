class ApiError extends Error {
  constructor(statusCode = 500, responseCode = '201', message = 'UNDEFINED RESPONSE CODE', details = '') {
    super(message);

    this.status = 'failed';
    this.code = statusCode;
    this.data = {
      rc: responseCode,
      message,
      details,
    };
  }
}

module.exports = {
  ApiError,
};
