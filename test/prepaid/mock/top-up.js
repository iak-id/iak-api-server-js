const success = {
  status: 'success',
  code: 200,
  data: {
    ref_id: '6atelfNWPz',
    status: 0,
    product_code: 'xld25000',
    customer_id: '0817777215',
    price: 25000,
    message: 'PROCESS',
    balance: 99824500,
    tr_id: 65298,
    rc: '39',
  },
};

const failed = {
  codeNotFound: {
    status: 'failed',
    code: 400,
    data: {
      rc: '20',
      message: 'CODE NOT FOUND',
      details: '',
    },
  },
  numberNotMatchWithOperator: {
    status: 'failed',
    code: 400,
    data: {
      rc: '16',
      message: 'NUMBER NOT MATCH WITH OPERATOR',
      details: '',
    },
  },
};

module.exports = {
  success, failed,
};
