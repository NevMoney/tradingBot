import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const GeminiAPI = require('gemini-api').default
require('dotenv').config()
const secret = process.env.GEMINI_API_SECRET
const key = process.env.GEMINI_API_KEY
const gemini = new GeminiAPI({ key, secret, sandbox: true })

function marketBuyBitcoin(amount, price) {
  return gemini.newOrder({
    symbol: 'btcusd',
    amount: amount,
    price: price,
    side: 'buy',
    type: 'exchange limit',
    options: ['immediate-or-cancel'],
  })
}

function marketSellBitcoin(amount, price) {
  return gemini.newOrder({
    symbol: 'btcusd',
    amount: amount,
    price: price,
    side: 'sell',
    type: 'exchange limit',
    options: ['immediate-or-cancel'],
  })
}

function bitcoinPrice() {
  return gemini.getTicker('btcusd')
}

function marketBuyEthereum(amount, price) {
  return gemini.newOrder({
    symbol: 'ethusd',
    amount: amount,
    price: price,
    side: 'buy',
    type: 'exchange limit',
    options: ['immediate-or-cancel'],
  })
}

function marketsellEthereum(amount, price) {
  return gemini.newOrder({
    symbol: 'ethusd',
    amount: amount,
    price: price,
    side: 'sell',
    type: 'exchange limit',
    options: ['immediate-or-cancel'],
  })
}

function ethPrice() {
  return gemini.getTicker('ethusd')
}

function marketTransaction(symbol, amount, price, position) {
  return gemini.newOrder({
    symbol: symbol,
    amount: amount,
    price: price,
    side: position,
    type: 'exchange limit',
    options: ['immediate-or-cancel'],
  })
}

function coinPrice(symbol) {
  return gemini.getTicker(symbol)
}

async function getBalances() {
  let objArray = await gemini.getMyAvailableBalances()
  let results = objArray.map(({ currency, available }) => ({
    currency,
    available,
  }))
  return results
}

async function getCurrencyBalance(symbol) {
  let balance = await getBalances()
  let currencyBalance = balance.filter(({ currency }) => currency === symbol)
  let amount = currencyBalance.map(({ available }) => available)
  return amount
}

export default {
  marketBuyBitcoin,
  marketSellBitcoin,
  bitcoinPrice,
  marketBuyEthereum,
  marketsellEthereum,
  ethPrice,
  marketTransaction,
  coinPrice,
  getBalances,
  getCurrencyBalance,
}
