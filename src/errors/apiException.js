class ApiException extends Error {
  constructor(statusCode = 500, responseCode = '201', message = 'UNDEFINED RESPONSE CODE', details = '') {
    super(message);

    this.name = 'Api Exception';
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
  ApiException,
};
