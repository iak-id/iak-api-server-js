const mockPricelistData = {
  status: 'success',
  code: 200,
  data: {
    pricelist: [
      {
        code: 'PDAMKAB.BOGOR',
        name: 'PDAM KAB. BOGOR (JABAR)',
        status: 1,
        fee: 2500,
        komisi: 400,
        type: 'pdam',
        province: 'Jawa Barat',
      },
      {
        code: 'PDAMKAB.CIAMIS',
        name: 'PDAM KABUPATEN CIAMIS',
        status: 1,
        fee: 2500,
        komisi: 950,
        type: 'pdam',
        province: 'Jawa Barat',
      },
      {
        code: 'PDAMKAB.CIANJUR',
        name: 'PDAM KABUPATEN CIANJUR',
        status: 1,
        fee: 2500,
        komisi: 650,
        type: 'pdam',
        province: 'Jawa Barat',
      },
    ],
    rc: '00',
    message: 'SUCCESS',
  },
};

module.exports = {
  mockPricelistData,
};
