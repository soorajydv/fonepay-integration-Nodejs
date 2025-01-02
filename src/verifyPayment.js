const crypto = require('crypto');

function verifyResponse(params, secretKey) {
    const { PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV } = params;

    // Concatenate response fields as per the documentation
    const responseString = `${PRN},${PID},${PS},${RC},${UID},${BC},${INI},${P_AMT},${R_AMT}`;
    console.log('Concatenated String:', responseString);

    // Generate HMAC-SHA512 hash
    const hash = crypto
        .createHmac('sha512', secretKey)
        .update(responseString, 'utf8')
        .digest('hex')
        .toUpperCase();
    console.log('Generated Hash:', hash);
    console.log('Received DV:', DV);

    // Compare calculated hash with the received DV
    return hash === DV;
}

module.exports = { verifyResponse };
