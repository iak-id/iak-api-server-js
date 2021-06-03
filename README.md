# IAK API Node.js SDK
This is Node.js-based SDK (server-side-only) to easily help you connect your application with our API services.

**Note**: 
* This library is only meant for usage from server-side.
* You also have to register yourself first on this [link](https://iak.id/) to get the access key for our API service.

<!-- toc -->

## Table of Contents

- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Usage](#usage)
    + [Getting started](#getting-started)
    + [Set your credential](#set-your-credential)
    + [Instantiate IAK class](#instantiate-iak-class)
    + [Async call](#async-call)
- [Prepaid Services](#prepaid-services)
    + [Prepaid response code](#prepaid-response-code)
    + [Check your balance](#prepaid-check-balance)
    + [Get your prepaid price list](#prepaid-price-list)
    + [Send top up request](#prepaid-top-up-request)
    + [Check your top up status](#prepaid-check-status)
    + [Inquiry game id](#prepaid-inquiry-game-id)
    + [Inquiry game service](#prepaid-inquiry-game-server)
    + [Inquiry pln customer id](#prepaid-inquiry-pln)
- [Postpaid Services](#postpaid-services)
    + [Postpaid response code](#postpaid-response-code)
    + [Get your postpaid price list](#postpaid-price-list)
    + [Send inquiry transaction request](#postpaid-inquiry)
    + [Send payment transaction request](#postpaid-payment)
    + [Check your transaction status](#postpaid-check-status)
    + [Download your transaction receipt](#postpaid-download-receipt)
- [Error Handling](#error-handling)
    + [Failed response code](#failed-response-code)
    + [Timeout](#timeout)
    + [Missing arguments](#missing-arguments)
    + [Invalid parameter content type](#invalid-parameter-content-type)
- [Contributing](#contributing)

<!-- tocstop -->

---

## API Documentation

Please check our [IAK API Documentation](https://api.iak.id/) to see more details about the usage of our API.

For Prepaid Services, you can use our **Version 2** Prepaid on Core API section on Prepaid services as the reference.
To see the difference with the Version 1, you can see this [link](https://api.iak.id/docs/reference/docs/prepaid/core/v1-vs-v2.md).

## Installation

```bash
npm install iak-api-server-js
```

## Usage

### Getting Started

```js
const { IAKPrepaid } = require('iak-api-server-js');

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

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Set your credential

Before using this SDK, you must set your credential first, so you can access the functionality of the SDK.
There are two ways to set your credential.

1. Use your environment variable (highly recommended for security issues)
```
IAK_STAGE=sandbox-or-production
IAK_USER_HP=your-username
IAK_SANDBOX_API_KEY=your-api-development-key
IAK_PRODUCTION_API_KEY=your-api-production-key
```

2. Put it manually when constructing the class directly at your source code
```js
{
  userHp: 'your-username',
  stage: 'sandbox-or-production',
  apiKey: 'your-api-key-depending-on-stage'
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Instantiate IAK class

After setting your credential, you can construct your class depending on service you want to use.
```js
const { IAKPrepaid, IAKPostpaid } = require('iak-api-server-js');

/*if you set your credential first on environment variable*/
const iakPrepaid = new IAKPrepaid();
const iakPostpaid = new IAKPostpaid();

/*if you want to put it manually*/
const credential = {
  userHp: 'your-username',
  stage: 'sandbox-or-production',
  apiKey: 'your-api-key-depending-on-stage'
};

const iakPrepaid = new IAKPrepaid(credential);
const iakPostpaid = new IAKPostpaid(credential);
```

Then, you can call the functions in the IAKPrepaid or IAKPostpaid in these ways depending on your code style.

```js
const { IAKPrepaid } = require('iak-api-server-js');

const iakPrepaid = new IAKPrepaid();
const checkBalanceResult = iakPrepaid.checkBalance();
const checkStatusResult = iakPrepaid.checkStatus(params);

/*or*/

const { IAKPrepaid } = require('iak-api-server-js');

const checkBalanceResult = new IAKPrepaid().checkBalance();
const checkStatusResult = new IAKPrepaid().checkStatus(params);
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Async call

You have to use async call to use this SDK properly, these are some ways to do it.

1. Promise
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().checkBalance().then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```  

2. Async/Await

```js
const { IAKPrepaid } = require('iak-api-server-js');

(async () => {
  try {
    const checkBalanceResult = await new IAKPrepaid().checkBalance();
    console.log(checkBalanceResult);
  } catch (error) {
    console.log(error);
  }
})();
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

---

## Prepaid Services
These are functions you can use to access our API Prepaid services for products
such as, pulsa / phone credit, e-money credit, voucher, voucher game, etc.

### Prepaid response code
You can see this [link](https://api.iak.id/docs/reference/docs/prepaid/response-code.md) 
to see the complete list of the response code.

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid check balance
Functions you can use to check or see your IAK balance.

```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().checkBalance().then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid price list
Prepaid services to see your prepaid products' price list. 
You see list of product type and operator on this [link](https://api.iak.id/docs/reference/docs/prepaid/product-type.md).

```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist(params?: {
  type?: string ('required if operator has values'),
  operator?: string,
  status?: string ('can be empty, but if it contain values, accept only one of these values "all", "active", "non active"')
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example (all products no matter what the status is)
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

#### Example (only game type products)
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist({ type: 'game' }).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

#### Example (only mobile legends game products)
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist({ type: 'game', operator: 'mobile_legend'}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

#### Example (only active game products)
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist({ type: 'game', status: 'active'}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid top up request
Prepaid services to send a top up request. 
You can see [our price list](#prepaid-price-list) to see the list of product code you can use.

```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().topUp(params: {
  refId: string,
  customerId: string,
  productCode: string
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().topUp({
  refId: 'unique-random-id',
  customerId: 'destination-customer-id',
  productCode: 'product-code',
}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid check status
Prepaid services to check your transaction status. 
You must use the same refId you used to top up to see the transaction status.

```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().checkStatus(params: {
  refId: string
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().checkStatus({
  refId: 'unique-random-id',
}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid inquiry game id
Prepaid services to check whether your customer game id is existed or not.
You can see the list of the game code and customer game id format in this 
[link](https://api.iak.id/docs/reference/docs/prepaid/game-format.md#inquiry-game-id).

```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryGameId(params: {
  gameCode: string,
  customerId: string
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryGameId({
  gameCode: 'respected-game-code',
  customerId: 'destination-customer-id',
}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid inquiry game server
Prepaid services to check whether the requested game server is existed or not.
You can see the list of the game code in this 
[link](https://api.iak.id/docs/reference/docs/prepaid/game-format.md#inquiry-game-id).

```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryGameServer(params: {
  gameCode: string
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryGameServer({
  gameCode: 'respected-game-code',
}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid inquiry pln
Prepaid services to check whether the requested PLN subscriber is existed or not.
You can use both customer subscriber id or customer electric meter number in the customerId property.

```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryPln(params: {
  customerId: string
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryPln({ customerId: 'pln-subscriber-id' }).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

---

## Postpaid Services
These are functions you can use to access our API Postpaid services for products
such as, water bill, electricity bill, finance bill, insurance bill, etc.

### Postpaid response code
You can see this [link](https://api.iak.id/docs/reference/docs/postpaid/response-code.md)
to see the complete list of the response code.

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid price list
Postpaid services to see your postpaid products' price list.
You see list of product type on this [link](https://api.iak.id/docs/reference/docs/postpaid/core/price-list.md).

```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist(params?: {
  type?: string,
  status?: string ('can be empty, but if it contain values, accept only one of these values "all", "active", "non active"'),
  province?: string ('required if type has value as PDAM')
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example (all products no matter what the status is)
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

#### Example (only bpjs type products)
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist({ type: 'bpjs' }).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

#### Example (only pdam jakarta products)
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist({ type: 'pdam', province: 'jakarta'}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

#### Example (only active pdam products)
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist({ type: 'pdam', status: 'active'}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid inquiry
Postpaid services to inquire your postpaid transaction. 
To see the complete details of inquiring your postpaid transaction, 
see our [API Documentation](https://api.iak.id/docs/reference/docs/postpaid/flow.md) 
on the Core API section on the Postpaid Section.

```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().inquiry(params?: {
  refid: string,
  customerId: string,
  productCode: string,
  month?: string ('required if the productCode is bpjs'),
  nomorIdentitas?: string ('required if the productCode is esamsat.jabar')
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example (all products no matter what the status is)
```js
const { IAKPostpaid } = require('iak-api-server-js');

/*PDAM Jakarta products*/
const inquiryRequest = {
  refId: 'unique-random-id',
  customerId: 'pdam-customer-id',
  productCode: 'AETRA',
};

/*BPJS products*/
const inquiryRequest = {
  refId: 'unique-random-id',
  customerId: 'bpjs-customer-id',
  productCode: 'BPJS',
  month: '2',
};

/*E-Samsat Jawa Barat products*/
const inquiryRequest = {
  refId: 'unique-random-id',
  customerId: 'esamsat-payment-code',
  productCode: 'ESAMSAT.JABAR',
  nomorIdentitas: 'registered-identity-number',
};

new IAKPostpaid().inquiry(inquiryRequest).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid payment
Postpaid services to pay your customer's postpaid transaction.
Unlike postpaid inquiry services, there are no difference between postpaid products on how to do payment transaction.

```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().inquiry(params?: {
  trId: string ('you can get the trId from the inquiry response on tr_id field'),
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().payment({ trId: 'transaction-tr-id' }).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid check status
Postpaid services to check your customer's postpaid transaction status.

```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().checkStatus(params?: {
  refId: string ('refId that you generated from inquiry request'),
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().checkStatus({ refId: 'transaction-ref-id' }).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid download receipt
Postpaid services to get your customer's postpaid transaction receipt.

```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().downloadReceipt(params?: {
  trId: string ('you can get the trId from the inquiry response on tr_id field'),
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Example
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().downloadReceipt({ trId: 'transaction-tr-id' }).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error);
});
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

---

## Error Handling
These are guides about how we handle errors in this SDK.

### Failed response code

All response that is not in this following list will be seen as error or exception, to be exact as ApiError. 
Here is the list of the success response code.
1. SUCCESS / INQUIRY SUCCESS / PAYMENT SUCCESS (rc: 00)
2. PROCESS (rc: 39)
3. PAYMENT_REQUEST_NOT_RECEIVED_YET (rc: 42)

Here is the dummy snippet of one of the failed response.
```js
ApiError: DUPLICATE REF ID
{
  status: 'failed',
  code: 400,
  data: { rc: '11', message: 'DUPLICATE REF ID', details: '' }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Timeout
Timeout happens when your application can not connect to our API or our API process your request too long.
Here is the dummy snippet when timeout occurred.
```js
TimeoutError: Connection timeout. Please check your internet connection or wait for a seconds.
{
  status: 'failed',
  code: 408
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Missing arguments
Missing arguments happens when you failed to fulfill the request property requirement. 
Please check again your parameter given to the SDK functions.

Here is the dummy snippet on price list request when we put the operator property without type property.
```js
MissingArgumentError: Field type is missing from your argument. This field is required.
  {
    status: 'failed',
    code: 400
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Invalid parameter content type
This error happens when you failed to fulfill the request type requirement. 
All the parameters on this SDK functions only accept **OBJECT** type. 
So if you put parameter with type other than that, this error will be thrown.
Please check again your parameter given to the SDK functions.

Here is the dummy snippet on this error.
```js
ContentTypeError: Content or fields must be an object.
  {
    status: 'failed',
    code: 400
  }

```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

---

## Contributing
You can contribute on the development of this project by 
[opening an issue](https://github.com/iak-id/iak-api-server-js/issues) or 
[submit a pull request](https://github.com/iak-id/iak-api-server-js/pulls)
when you see any bugs or issues, or you have any comments or requests.

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>
