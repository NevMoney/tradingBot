const GeminiAPI = require('gemini-api').default
require('dotenv').config()

const secret = process.env.GEMINI_API_SECRET
const key = process.env.GEMINI_API_KEY
const restClient = new GeminiAPI({ key, secret, sandbox: true })

// check balances
// restClient
//   .getMyAvailableBalances()
//   .then((response) => console.log('balances', response))
//   .catch((error) => console.log('balance err', error))

// put orders in
// restClient
//   .newOrder({
//     amount: 5,
//     price: 250,
//     side: 'buy',
//     symbol: 'ethusd',
//   })
//   .then((resolve) => {
//     console.log('eth buy', resolve)
//     orderIds = []
//     orderIds.push(resolve.order_id)
//     console.log(orderIds)
//   })
//   .catch((error) => console.log('eth buy err', error))

// restClient
//   .newOrder({
//     amount: 1,
//     price: 75500,
//     side: 'sell',
//     symbol: 'btcusd',
//   })
//   .then((resolve) => {
//     console.log('btc sell', resolve)
//     orderIds = []
//     orderIds.push(resolve.order_id)
//     console.log(orderIds)
//   })
//   .catch((error) => console.log('btc sell err', error))

// cancel orders
// function cancelMyOrders(orderIds) {
//   // access orderIds array and the itterate through it and cancel each order
//   orderIds.forEach((orderId) => {
//     restClient
//       .cancelOrder(orderId)
//       .then((resolve) => console.log('cancel', resolve))
//       .catch((error) => console.log('cancel err', error))
//   })
// }

// cancelMyOrders(orderIds)

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
