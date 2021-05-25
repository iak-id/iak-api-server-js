const crypto = require('crypto');

function hashSign(userHp, apikey, salt) {
  return crypto
    .createHash('md5')
    .update(`${userHp}${apikey}${salt}`)
    .digest('hex');
}

function isEmptyString(string) {
  return (string === null || typeof string === 'undefined' || string.length === 0);
}

module.exports = {
  hashSign,
  isEmptyString,
};
