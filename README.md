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
    + [Prepaid sandbox report](#prepaid-sandbox-report)
    + [Prepaid callback](#prepaid-callback)
- [Postpaid Services](#postpaid-services)
    + [Postpaid response code](#postpaid-response-code)
    + [Get your postpaid price list](#postpaid-price-list)
    + [Send inquiry transaction request](#postpaid-inquiry)
    + [Send payment transaction request](#postpaid-payment)
    + [Check your transaction status](#postpaid-check-status)
    + [Download your transaction receipt](#postpaid-download-receipt)
    + [Postpaid sandbox report](#postpaid-sandbox-report)
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

You can use this snippet code to use our check balance service on prepaid API to get started use our SDK.

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

#### Code request example

```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().checkBalance().then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example
```js
{
  status: 'success',
  code: 200,
  data: { 
    balance: 100000000, 
    message: 'SUCCESS', 
    rc: '00' 
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid price list
Prepaid services to see your prepaid products' price list. 
You see list of product type and operator on this [link](https://api.iak.id/docs/reference/docs/prepaid/product-type.md).

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| type | Product type. See [here](https://api.iak.id/docs/reference/docs/prepaid/product-type.md) for product type list | No | - |
| operator | Operator type. See [here](https://api.iak.id/docs/reference/docs/prepaid/product-type.md) for operator type list | No | - |
| status | Product status. 'all', 'active', 'non active' | No | all |

#### Code request example (all products no matter what the status is)
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist().then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Code request example (only game type products)
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist({ 
  type: 'game' 
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Code request example (only mobile legends game products)
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist({ 
  type: 'game', 
  operator: 'mobile_legend'
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Code request example (only active game products)
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().pricelist({ 
  type: 'game', 
  status: 'active'
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example of active mobile legend game product
```js
{
  status: 'success',
  code: 200,
  data: {
    pricelist: [
      {
        product_code: 'hmobilelegend110',
        product_description: 'Mobile Legend',
        product_nominal: '110 Diamonds',
        product_details: '-',
        product_price: 30000,
        product_type: 'game',
        active_period: '0',
        status: 'active',
        icon_url: 'https://cdn.mobilepulsa.net/img/product/operator_list/140119035948-Moba-01.png',
      },
      {
        product_code: 'hmobilelegend1159',
        product_description: 'Mobile Legend',
        product_nominal: '1159 Diamonds',
        product_details: '-',
        product_price: 300000,
        product_type: 'game',
        active_period: '0',
        status: 'active',
        icon_url: 'https://cdn.mobilepulsa.net/img/product/operator_list/140119035948-Moba-01.png',
      },
      {
        product_code: 'hmobilelegend12',
        product_description: 'Mobile Legend',
        product_nominal: '12 Diamonds',
        product_details: '-',
        product_price: 3500,
        product_type: 'game',
        active_period: '0',
        status: 'active',
        icon_url: 'https://cdn.mobilepulsa.net/img/product/operator_list/140119035948-Moba-01.png',
      },
    ],
    rc: '00',
    message: 'SUCCESS',
  },
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid top up request
Prepaid services to send a top up request. 
You can see [our price list](#prepaid-price-list) to see the list of product code you can use.

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| customerId | Customer ID / phone number | Yes | - |
| refId | Your order number / reference ID **(Must Unique)** | Yes | - |
| productCode | Product Code. See full list [here](https://iak.id/webapp/pricelist) or in Pricelist API | Yes | - |

#### Code request example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().topUp({
  customerId: '081357922222',
  refId: '1IEUV4FCGi',
  productCode: 'htelkomsel10000',
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example
```js
{
  status: 'success',
  code: 200,
  data: {
    ref_id: '1IEUV4FCGi',
    status: 0,
    product_code: 'htelkomsel10000',
    customer_id: '081357922222',
    price: 10900,
    message: 'PROCESS',
    balance: 98850460,
    tr_id: 66057,
    rc: '39'
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid check status
Prepaid services to check your transaction status. 
You must use the same refId you used to top up to see the transaction status.

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| refId | Your order number / reference ID **(Must Unique)** | Yes | - |

#### Code request example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().checkStatus({
  refId: '1IEUV4FCGi',
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example
```js
{
  status: 'success',
  code: 200,
  data: {
    ref_id: '1IEUV4FCGi',
    status: 0,
    product_code: 'htelkomsel10000',
    customer_id: '081357922222',
    price: 10900,
    message: 'PROCESS',
    balance: 98850460,
    tr_id: 66057,
    rc: '39'
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid inquiry game id
Prepaid services to check whether your customer game id is existed or not.
You can see the list of the game code and customer game id format in this 
[link](https://api.iak.id/docs/reference/docs/prepaid/game-format.md#inquiry-game-id).

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| customerId | Customer ID. See [here](https://api.iak.id/docs/reference/docs/prepaid/game-format.md) for customer ID format | Yes | - |
| gameCode | Game Code. See [here](https://api.iak.id/docs/reference/docs/prepaid/game-format.md) for game code list | Yes | - |

#### Code request example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryGameId({
  customerId: '156378300|8483',
  gameCode: '103',  
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example
```js
{
  status: 'success',
  code: 200,
  data: { 
    username: 'budi', 
    status: 1, 
    message: 'SUCCESS', 
    rc: '00' 
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid inquiry game server
Prepaid services to check whether the requested game server is existed or not.
You can see the list of the game code in this 
[link](https://api.iak.id/docs/reference/docs/prepaid/game-format.md#inquiry-game-id).

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| gameCode | Game Code. See [here](https://api.iak.id/docs/reference/docs/prepaid/game-format.md) for game code list | Yes | - |

#### Code request example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryGameServer({
  gameCode: '103',
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example
```js
{
  status: 'success',
  code: 200,
  data: {
    servers: [
      { name: 'Test 1', value: '90001' },
      { name: 'Test 2', value: '90002' }
    ],
    status: 1,
    message: 'SUCCESS',
    rc: '00'
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid inquiry pln
Prepaid services to check whether the requested PLN subscriber is existed or not.
You can use both customer subscriber id or customer electric meter number in the customerId property.


#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| customerId | Customer ID | Yes | - |

#### Code request example
```js
const { IAKPrepaid } = require('iak-api-server-js');

new IAKPrepaid().inquiryPln({ 
  customerId: '12345678901' 
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example
```js
{
  status: 'success',
  code: 200,
  data: {
    status: '1',
    customer_id: '12345678901',
    meter_no: '548933889287',
    subscriber_id: '12345678901',
    name: 'Test PLN',
    segment_power: 'R1M /000000900',
    message: 'SUCCESS',
    rc: '00'
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid sandbox report

For prepaid services in development, because the transaction status will not change automatically, 
you must change it manually using our Sandbox Report on [our developer website](https://developer.iak.id/sandbox-report).

You can see how to use this service by seeing [here](https://api.iak.id/docs/platform/docs/integration/sandbox-report.md#prepaid).

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Prepaid callback

For prepaid services in development, besides check the transaction status regularly, you can use our callback service.
So, when the transaction status changes automatically in the production state or manually on the development state, 
you can receive the response that filled with the changed status and don't have to check the transaction status regularly.

You can see how to use this service by seeing [here](https://api.iak.id/docs/reference/docs/prepaid/callback.md).

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

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| type | Product type. See [here](https://api.iak.id/docs/reference/docs/postpaid/core/price-list.md) for product type list | No | - |
| province | 34 Provinces in Indonesia (Only for PDAM type) | No | - |
| status | Product Status. 'all', 'active', 'non active' | No | all |

#### Code request example (all products no matter what the status is)
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist().then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Code request example (only bpjs type products)
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist({ 
  type: 'bpjs' 
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Code request example (only pdam jakarta products)
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist({ 
  type: 'pdam', 
  province: 'jakarta'
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Code request example (only active pdam products)
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().pricelist({ 
  type: 'pdam', 
  status: 'active'
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example of pdam jakarta products
```js
{
  status: 'success',
  code: 200,
  data: { 
    pasca: [
      {
        code: 'AETRA',
        name: 'AETRA',
        status: 1,
        fee: 2500,
        komisi: 700,
        type: 'pdam',
        province: 'Jakarta'
      },
      {
        code: 'PALYJA',
        name: 'PALYJA JAKARTA',
        status: 1,
        fee: 2500,
        komisi: 700,
        type: 'pdam',
        province: 'Jakarta'
      },
    ], 
    message: 'SUCCESS', 
    rc: '00' 
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid inquiry
Postpaid services to inquire your postpaid transaction. 
To see the complete details of inquiring your postpaid transaction, 
see our [API Documentation](https://api.iak.id/docs/reference/docs/postpaid/flow.md) 
on the Core API section on the Postpaid Section.

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| code | Product code. See [here](https://iak.id/webapp/pricelist) or Pricelist API for product code list | Yes | - |
| hp | Customer number | Yes | - |
| refId | Your order number / reference ID **(Must Unique)** | Yes | - |
| month | Number of month you're willing to pay **(Required for BPJS type)** | No | - |

#### Code request example
```js
const { IAKPostpaid } = require('iak-api-server-js');

/*PDAM Jakarta products*/
const inquiryRequest = {
  code: 'AETRA',
  hp: '10202001',
  refId: '8yaZvUafub',
};

/*BPJS products*/
const inquiryRequest = {
  code: 'BPJS',
  hp: '8801234560001',
  refId: 'TPhgBfgIU4',
  month: '2',
};

/*E-Samsat Jawa Barat products*/
const inquiryRequest = {
  code: 'ESAMSAT.JABAR',
  hp: '9658548523568701',
  refId: 'TPhgBfgIU4',
  nomorIdentitas: '0212502110170100',
};

new IAKPostpaid().inquiry(inquiryRequest).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response example of BPJS product
```js
{
  status: 'success',
  code: 200,
  data: {
    tr_id: 9922721,
    code: 'BPJS',
    hp: '8801234560001',
    tr_name: 'VERGIE',
    period: '02',
    nominal: 50000,
    admin: 2500,
    ref_id: 'TPhgBfgIU4',
    response_code: '00',
    message: 'INQUIRY SUCCESS',
    price: 52500,
    selling_price: 51350,
    desc: {
      kode_cabang: '0901',
      nama_cabang: 'JAKARTA PUSAT',
      sisa_pembayaran: '0',
      jumlah_peserta: '2'
    }
  }
}

```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid payment
Postpaid services to pay your customer's postpaid transaction.
Unlike postpaid inquiry services, there are no difference between postpaid products on how to do payment transaction.

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| trId | Transaction ID you get form inquiry success response | Yes | - |

#### Code request example
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().payment({ 
  trId: 9922721
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response of BPJS product (from previous BPJS inquiry)
```js
{
  status: 'success',
  code: 200,
  data: {
    tr_id: 9922721,
    code: 'BPJS',
    datetime: '20210604123833',
    hp: '8801234560001',
    tr_name: 'VERGIE',
    period: '02',
    nominal: 50000,
    admin: 2500,
    response_code: '00',
    message: 'PAYMENT SUCCESS',
    price: 52500,
    selling_price: 51350,
    balance: 98799110,
    noref: '148732328035714773',
    ref_id: 'TPhgBfgIU4',
    desc: {
      kode_cabang: '0901',
      nama_cabang: 'JAKARTA PUSAT',
      sisa_pembayaran: '0',
      jumlah_peserta: '2'
    }
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid check status
Postpaid services to check your customer's postpaid transaction status.

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| refId | Your order number / reference ID (Must Unique) | Yes | - |

#### Code request example
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().checkStatus({ 
  refId: 'TPhgBfgIU4' 
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response of BPJS product (from previous BPJS inquiry) after payment success
```js
{
  status: 'success',
  code: 200,
  data: {
    tr_id: 9922721,
    code: 'BPJS',
    datetime: '20210604123833',
    hp: '8801234560001',
    tr_name: 'VERGIE',
    period: '02',
    nominal: 50000,
    admin: 2500,
    response_code: '00',
    message: 'PAYMENT SUCCESS',
    price: 52500,
    selling_price: 51350,
    balance: 98799110,
    noref: '148732328035714773',
    ref_id: 'TPhgBfgIU4',
    desc: {
      kode_cabang: '0901',
      nama_cabang: 'JAKARTA PUSAT',
      sisa_pembayaran: '0',
      jumlah_peserta: '2'
    }
  }
}
```

#### Success response of BPJS product after inquiry and before payment
```js
{
  status: 'success',
  code: 200,
  data: {
    tr_id: 9922722,
    code: 'BPJS',
    hp: '8801234560001',
    tr_name: 'VERGIE',
    period: '02',
    nominal: 50000,
    admin: 2500,
    ref_id: 'qrHvi3o9NT',
    status: 0,
    response_code: '42',
    message: 'REQUEST PEMBAYARAN BELUM DITERIMA',
    price: 52500,
    selling_price: 51350,
    balance: 98799110,
    desc: {
      kode_cabang: '0901',
      nama_cabang: 'JAKARTA PUSAT',
      sisa_pembayaran: '0',
      jumlah_peserta: '2'
    }
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid download receipt
Postpaid services to get your customer's postpaid transaction receipt.

#### Available fields
| Field Name | Description | Mandatory | Default Value |
|---|---|---|---|
| trId | Transaction ID | Yes | - |

#### Code request example
```js
const { IAKPostpaid } = require('iak-api-server-js');

new IAKPostpaid().downloadReceipt({ 
  trId: '9922721' 
}).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```

#### Success response of BPJS product (from previous BPJS inquiry)
```js
{
  status: 'success',
  code: 200,
  data: {
    'HEADER': 'STRUK PEMBAYARAN BPJS Kesehatan',
    'NO REFERENSI': '148732328035714773',
    'TANGGAL': '2021-06-04 12:38:33',
    'NO. RESI': '148732328035714773',
    'NAMA PRODUK': 'BPJS Kesehatan',
    'JUMLAH PESERTA': '2 ORANG',
    'SISA SBLMNYA': 'Rp 0',
    'PERIODE': '2 BULAN',
    'ID PELANGGAN': '8801234560001',
    'NAMA': 'VERGIE',
    'JUMLAH TAGIHAN': 'Rp 50.000',
    'ADMIN': 'Rp 2.500'
  }
}
```

<p align="right"><a href="#table-of-contents">⬆ Return to top</a></p>

### Postpaid sandbox report

Just like prepaid, we also have sandbox report service for postpaid services, but you can not change the status in there,
because you must do payment after inquiry to see the changed status. You can use postpaid sandbox report on 
[our developer website](https://developer.iak.id/sandbox-report) to see if your request has been successfully sent or not.

You can see how to use this service by seeing [here](https://api.iak.id/docs/platform/docs/integration/sandbox-report.md#postpaid).

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
