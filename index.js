const GeminiAPI = require('gemini-api').default
require('dotenv').config()

const secret = process.env.GEMINI_API_SECRET
const key = process.env.GEMINI_API_KEY
const restClient = new GeminiAPI({ key, secret, sandbox: true })

// create order
restClient
  .newOrder({
    amount: 1,
    price: 15750,
    side: 'buy',
    symbol: 'btcusd',
  })
  .then((resolve) => {
    console.log(resolve)
  })
  .catch((error) => {
    console.log(error)
  })
