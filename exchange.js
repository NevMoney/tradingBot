import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const GeminiAPI = require('gemini-api').default
require('dotenv').config()
const secret = process.env.GEMINI_API_SECRET
const key = process.env.GEMINI_API_KEY
const gemini = new GeminiAPI({ key, secret, sandbox: true })

function marketBuy(symbol) {
  return gemini.newOrder({
    symbol: symbol,
    amount: 1,
    price: 10000,
    side: 'buy',
    type: 'exchange limit',
    options: ['immediate-or-cancel'],
  })
}

function marketSell(symbol) {
  return gemini.newOrder({
    symbol: symbol,
    amount: 1,
    price: 10,
    side: 'sell',
    type: 'exchange limit',
    options: ['immediate-or-cancel'],
  })
}

export default {
  marketBuy,
  marketSell,
}
