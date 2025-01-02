const { generatePaymentUrl } = require('./src/requestPayment');
const { verifyResponse } = require('./src/verifyPayment');

module.exports = {
    generatePaymentUrl,
    verifyResponse,
};
