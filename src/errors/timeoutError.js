class TimeoutError extends Error {
  constructor() {
    super('Connection timeout. Please check your internet connection or wait for a seconds.');

    this.status = 'failed';
    this.code = 408;
  }
}

module.exports = {
  TimeoutError,
};
