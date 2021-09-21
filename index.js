import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const GeminiAPI = require('gemini-api').default
require('dotenv').config()

import indicators from './indicators.js'

// const indicators = require('./indicators.js')

const secret = process.env.GEMINI_API_SECRET
const key = process.env.GEMINI_API_KEY
const gemini = new GeminiAPI({ key, secret, sandbox: true })

indicators.movingAverage('ETH', 'USD', 50, function (result) {
  console.log('MA: ', result)
})
