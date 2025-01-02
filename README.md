# FonePay Integration with Node.js

This project demonstrates how to integrate FonePay payment gateway using Node.js.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)

### Installation

1. Clone the project repository:
   ```
   git clone https://github.com/soorajydv/fonepay-integration-Nodejs.git
   ```

2. Navigate to the project directory:
   ```
   cd fonepay-integration-Nodejs
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory with the following content:
   ```
   FONEPAY_TEST_URL="https://dev-clientapi.fonepay.com/api/merchantRequest"
   FONEPAY_LIVE_URL="https://clientapi.fonepay.com"
   FONEPAY_SHARED_SECRET="a7e3512f5032480a83137793cb2021dc"
   FONEPAY_PID="NBQM"
   FONEPAY_RETURN_URL="http://localhost:3000"
   ```

   Note: `FONEPAY_PID` is a merchant code.

5. Start the application:
   ```
   npm start
   ```

## Usage

1. Send a POST request to your server with the following body:
- ### POST ```/payment/request```
   ```json
   {
     "PRN": "h2er78",
     "AMT": 200,
     "R1": "a3ac6cv9msd",
     "R2": "Pay for Netflix"
   }
   ```

   Where:
   - `PRN`: Product Reference Number (provided by merchant)
   - `AMT`: Payable amount
   - `R1`: Payment details (e.g., Receipt ID or payment description)
   - `R2`: Remark (Additional info, use "N/A" if not applicable)

3. You will receive a response with a URL:
   ```json
   {
     "url": "https://dev-clientapi.fonepay.com/api/merchantRequest?PID=NBQM&MD=P&PRN=h2er78&AMT=200&CRN=NPR&DT=01%2F01%2F2025&R1=gg&R2=dd&DV=6bdcfc4d1fe668cf3ce6ad510dc28c331ca5980e15a54b6cce6ff472365656e53555db04b7bb7b39167ae815498c46a612d2c43f29d5f2f1f4156205f9b0c65c&RU=http%3A%2F%2Flocalhost%3A3000%2Fpayment%2Fverify"
   }
   ```

4. Open this URL in a browser to access the FonePay payment portal.

5. Complete the transaction using the desired wallet or banking option.
   - For testing, you can use random credentials in Global IME or Nabil Bank.

6. After successful payment, you will be redirected to the `FONEPAY_RETURN_URL` with query parameters:
   ```
   http://localhost:3000/payment/verify?PRN=h2esr7dqws8&PID=NBQM&PS=true&RC=successful&DV=BD9E60EB10668D11E174308F7A33A233AD1B34C1E031BADFAD7CFD70AED19F0DA0ADE6D2973F01D8AED194057C1C11CAF7E510414CE5C56A2FE244F72183C0F0&UID=82146&BC=GLBBNPKA&INI=9819865988&P_AMT=200.0&R_AMT=200 
   ```

   The response body will contain:
   ```json
   {
     "success": true,
     "message": "Payment verified successfully!"
   }
   ```

## Query Parameters

- `PRN`: Product Reference Number (same as provided by merchant)
- `PID`: Merchant Code
- `PS`: Payment Status (true if successful, false if failed)
- `RC`: Transaction Response Code (defines payment state)
- `DV`: Data Validation (to be verified by merchant)
- `UID`: FonePay Trace ID (for transaction reconciliation)
- `BC`: Bank Swift Code or "esewa" (may be "N/A" for failed transactions)
- `INI`: Initiator user (may be "N/A" if not available)

## Note

- For testing, the `FONEPAY_TEST_URL` is used.
- For real payments, use the `FONEPAY_LIVE_URL`.
