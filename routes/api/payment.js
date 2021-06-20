const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const path = require('path');
const shortid = require('shortid');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

router.use(cors());
router.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_lRDu07bVMpEFH6',
  key_secret: 'idqUMwaF2gvV0UoqJst1UhuG',
});

router.get('/logo.png', (req, res) => {
  const logoPath = path.join(
    __dirname + '\\..' + '\\..',
    'config',
    'EgLogo.png'
  );

  res.sendFile(logoPath);
});

router.post('/razorpay', async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.price;
  const currency = 'INR';

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
