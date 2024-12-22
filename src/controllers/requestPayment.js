require('dotenv').config();
const crypto = require('crypto');

function generatePaymentUrl(PRN, AMT, R1, R2) {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month
    const day = String(today.getDate()).padStart(2, '0'); // Get day
    const year = today.getFullYear(); // Get year
    const date = `${month}/${day}/${year}`; // Format as MM/DD/YYYY

    const PID = process.env.FONEPAY_PID; // Example Merchant Code
    const MD = 'P'; // Payment Mode
    const CRN = 'NPR'; // Default currency
    const DT = date;
    const RU = `http://localhost:${process.env.PORT || 3000}/payment/verify`; // Callback URL

    // Concatenate fields as per Fonepay documentation
    const concatenatedString = `${PID},${MD},${PRN},${AMT},${CRN},${DT},${R1},${R2},${RU}`;

    // Generate DV (Data Validation Hash)
    const DV = crypto
        .createHmac('sha512', process.env.FONEPAY_SHARED_SECRET)
        .update(concatenatedString, 'utf-8')
        .digest('hex');

    // Construct payment URL
    const paymentUrl = `https://dev-clientapi.fonepay.com/api/merchantRequest?PID=${PID}&MD=${MD}&PRN=${PRN}&AMT=${AMT}&CRN=${CRN}&DT=${encodeURIComponent(
        DT
    )}&R1=${encodeURIComponent(R1)}&R2=${encodeURIComponent(
        R2
    )}&DV=${DV}&RU=${encodeURIComponent(RU)}`;
    return paymentUrl;
}

module.exports = { generatePaymentUrl };
