# IAK API Node.js SDK
This is Node.js-based SDK (server-side-only) to easily help you connect your application with our API services.

**Note**:
* This library is only meant for usage from server-side.
* You also have to register yourself first on this [link](https://iak.id/) to get the access key for our API service.
* For Prepaid Services, you can use our **Version 2** Prepaid on Core API section on Prepaid services as the reference. To see the difference with the Version 1, you can see this [link](https://api.iak.id/docs/reference/docs/prepaid/core/v1-vs-v2.md).

## Installation

```bash
npm install @iak-id/iak-api-server-js
```

## Getting Started

You can use this snippet code to use our check balance service on prepaid API to get started use our SDK.

```js
const { IAKPrepaid } = require('@iak-id/iak-api-server-js');

const credential = {
  userHp: 'your-username',
  stage: 'sandbox-or-production',
  apiKey: 'your-api-key-depending-on-stage'
};

new IAKPrepaid(credential).checkBalance().then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

---

## Documentation

To see more information about how to connect with us, you can visit and see the documentation on this link:
* [IAK API Node.js SDK documentation]() to see more details about how to connect with us through this SDK or library
* [IAK API Documentation](https://api.iak.id/) to see more details about to connect with us through our API services

---

## Supported Version

This library is supported by the following Node.js versions
* Node.js 16.3.0 (latest version (09/06/2021))
* Node.js 16
* Node.js 15
* Node.js 14.15.0 (LTS: Fermium)
* Node.js 14
* Node.js 13
* Node.js 12.13.0 (LTS: Erbium)
* Node.js 12
* Node.js 11
* Node.js 10.24.1 (LTS: Dubnium)
* Node.js 10

---

## Contributing
You can contribute on the development of this project by [opening an issue](https://github.com/iak-id/iak-api-server-js/issues) or [submitting a pull request](https://github.com/iak-id/iak-api-server-js/pulls) when you see any bugs or issues, or you have any comments or requests.

