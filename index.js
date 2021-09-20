// global.fetch = require('node-fetch')
import fetch from 'node-fetch'

if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const GeminiAPI = require('gemini-api').default
require('dotenv').config()
const CC = require('cryptocompare')
CC.setApiKey(process.env.CRYPTO_COMPARE_API_KEY)

const secret = process.env.GEMINI_API_SECRET
const key = process.env.GEMINI_API_KEY
const gemini = new GeminiAPI({ key, secret, sandbox: true })

// 100 hour Moving Average - hardcoded
// #1 get data from cc --> default is 169 hours
CC.histoHour('BTC', 'USD')
  .then((data) => {
    // need to reverse the data
    const reversedData = data.reverse()
    var sum = 0
    for (var i = 0; i < 100; i++) {
      sum += reversedData[i].close
    }
    // #2 calculate MA for past 100 hours
    const avg = sum / 100
    console.log(avg)
  })
  .catch(console.error)

// #3 check continuously if price is crosing 100 MA -> buy/sell/hold
