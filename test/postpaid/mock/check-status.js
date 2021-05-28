const checkStatusResponseData = {
  status: 'success',
  code: 200,
  data: {
    tr_id: 9922430,
    code: 'BPJS',
    datetime: '20210527120911',
    hp: '8801234560001',
    tr_name: 'VERGIE',
    period: '02',
    nominal: 50000,
    admin: 2500,
    status: 1,
    response_code: '00',
    message: 'PAYMENT SUCCESS',
    price: 52500,
    selling_price: 51350,
    balance: 98861360,
    noref: '148732328035714773',
    ref_id: '0E8X7OuA8A',
    desc: {
      kode_cabang: '0901',
      nama_cabang: 'JAKARTA PUSAT',
      sisa_pembayaran: '0',
      jumlah_peserta: '2',
    },
  },
};

module.exports = {
  checkStatusResponseData,
};
