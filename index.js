const GeminiAPI = require('gemini-api').default
require('dotenv').config()

const secret = process.env.GEMINI_API_SECRET
const key = process.env.GEMINI_API_KEY
const restClient = new GeminiAPI({ key, secret, sandbox: true })
const cryptoCompare = process.env.CRYPTOCOMPARE_API_KEY

// check balances
// restClient
//   .getMyAvailableBalances()
//   .then((response) => console.log('balances', response))
//   .catch((error) => console.log('balance err', error))

// put orders in
restClient
  .newOrder({
    amount: 5,
    price: 250,
    side: 'buy',
    symbol: 'ethusd',
  })
  .then((resolve) => console.log('eth buy', resolve))
  .catch((error) => console.log('eth buy err', error))

restClient
  .cancelAllActiveOrders()
  .then((resolve) => {
    console.log('cancel all', resolve)
  })
  .catch((error) => console.log('cancel all err', error))

restClient
  .getMyActiveOrders()
  .then((orders) => {
    console.log('my activer orders', orders)
  })
  .catch((error) => console.log('active order err', error))
