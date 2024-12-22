const express = require('express');
const { generatePaymentUrl } = require('../controllers/requestPayment');
const { verifyResponse } = require('../controllers/verifyPayment');

const router = express.Router();

// Payment request route
router.post('/payment/request', (req, res) => {
    const { PRN, AMT, R1, R2 } = req.body;

    if (!PRN || !AMT || !R1 || !R2) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const paymentUrl = generatePaymentUrl(PRN, AMT, R1, R2);
    if (!paymentUrl) return res.status(500).json({ error: 'Failed to generate payment URL' });

    res.json({ url: paymentUrl });
});

router.get('/payment/verify', (req, res) => {
    const {
        PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV
    } = req.query;

    const responseParams = { PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV };

    // Verify the response
    if (verifyResponse(responseParams, process.env.FONEPAY_SHARED_SECRET)) {
        res.status(200).json({ success: true, message: 'Payment verified successfully!' });
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed.' });
    }
});

module.exports = router;