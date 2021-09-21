import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const GeminiAPI = require('gemini-api').default
require('dotenv').config()
import indicators from './indicators.js'

const secret = process.env.GEMINI_API_SECRET
const key = process.env.GEMINI_API_KEY
const gemini = new GeminiAPI({ key, secret, sandbox: true })

indicators.hourlyMovingAverage('ETH', 'USD', 30, function (result) {
  console.log('Hourly MA: ', result)
})

indicators.dailyMovingAverage('ETH', 'USD', 30, function (result) {
  console.log('Daily MA: ', result)
})

indicators.minuteMovingAverage('ETH', 'USD', 30, function (result) {
  console.log('Minute MA: ', result)
})

function marketBuy(symbol) {
  return gemini.newOrder({
    symbol: symbol,
    amount: 1,
    price: 65000,
    side: 'buy',
    type: 'exchange limit',
    options: ['immediate-or-cancel'],
  })
}

marketBuy('btcusd')
  .then((res) => console.log(res))
  .catch(console.error)
