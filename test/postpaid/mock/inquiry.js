const inquiryResponseData = {
  status: 'success',
  code: 200,
  data: {
    tr_id: 9922430,
    code: 'BPJS',
    hp: '8801234560001',
    tr_name: 'VERGIE',
    period: '02',
    nominal: 50000,
    admin: 2500,
    ref_id: '0E8X7OuA8A',
    response_code: '00',
    message: 'INQUIRY SUCCESS',
    price: 52500,
    selling_price: 51350,
    desc: {
      kode_cabang: '0901',
      nama_cabang: 'JAKARTA PUSAT',
      sisa_pembayaran: '0',
      jumlah_peserta: '2',
    },
  },
};

const inquiryTestCase = {
  success: '8801234560001',
  timeout: '8801234560003',
  invoiceHasBeenPaid: '8801234560004',
  incorrectDestinationNumber: '8801234560005',
};

module.exports = {
  inquiryResponseData, inquiryTestCase,
};
