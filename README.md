# Payment Gateway Integration

This package provides functionality to generate a payment URL for Fonepay's payment gateway and verify the payment response. The module consists of two primary functions: `generatePaymentUrl` and `verifyResponse`.

## Installation

You can install the package via npm:

```bash
npm install fonepay
```
```bash
import generatePaymentUrl,verifyResponse from 'fonepay'
```
### function generatePaymentUrl(PID, PRN, AMT, R1, R2, secretKey);
- This function will generate payment URL, Open this url in browser to initiate payment.
- Enter random credentials ( for global Ime ) or you can use another payment options ( i only tried global ime bank ).
- It will be redirected to success/failure url appended to http://fonepay/payment/verify.................

params = { PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV }
use verifyResponse(params,secretkey) to verify if the payment.
