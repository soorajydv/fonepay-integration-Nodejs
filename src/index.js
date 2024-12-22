const express = require('express');
const app = express();
require('dotenv').config();

const fonepayRouter = require('./routes/payment');

app.use(express.json());

// Fonepay Payment route
app.use('/', fonepayRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
