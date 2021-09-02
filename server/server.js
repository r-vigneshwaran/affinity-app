require('dotenv').config();

const https = require('https');
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: 'Learn React Today' }],
  [2, { priceInCents: 20000, name: 'Learn CSS Today' }]
]);

var priceMap = new Map();
const products = axios.get('https://fakestoreapi.com/products').then((res) => {
  res.data.map((item) => priceMap.set(item.id, item.price));
});
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { product, token } = req.body;
    let total = 0;
    const session = await stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then((customer) => {
        stripe.charges.create({
          amount: 100 * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: customer.email,
          description: `Purchase of`,
          shipping: {
            name: 'token.card.name',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US'
            }
          }
        });
      });
    console.log(session);
    res.json({ session });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const server = app.listen(8080, function () {
  console.log("Calling app.listen's callback function.");
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at ', host, port);
});
