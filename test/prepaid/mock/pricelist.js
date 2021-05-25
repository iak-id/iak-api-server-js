const mockPricelistData = {
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
};

module.exports = {
  mockPricelistData,
};
