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

const indicators = require('./indicators.js')

indicators.movingAverage('ETH', 'USD', 50, function (result) {
  console.log('MA: ', result)
})
