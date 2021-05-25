require('dotenv').config();

module.exports = {
  PREPAID: {
    SANDBOX_ENDPOINT: 'https://prepaid.iak.dev/api/',
    PRODUCTION_ENDPOINT: 'https://prepaid.iak.id/api/',
  },
  POSTPAID: {
    SANDBOX_ENDPOINT: 'https://testpostpaid.mobilepulsa.net/',
    PRODUCTION_ENDPOINT: 'https://mobilepulsa.net/',
  },
  USER_CREDENTIAL: {
    USER_HP: process.env.USER_HP,
    STAGE: process.env.STAGE,
    API_KEY: {
      SANDBOX: process.env.SANDBOX_API_KEY,
      PRODUCTION: process.env.PRODUCTION_API_KEY,
    },
  },
};
