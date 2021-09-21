import fetch from 'node-fetch'
if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const CC = require('cryptocompare')
CC.setApiKey(process.env.CRYPTO_COMPARE_API_KEY)

const movingAverage = (crypto, fiat, hours, callback) => {
  if (hours > 169) {
    console.error('Only up to 169 hours allowed')
    return
  }
  CC.histoHour(crypto, fiat) //histoDay(BTC,USD,limit('none'))
    .then((data) => {
      // need to reverse the data
      const reversedData = data.reverse()
      var sum = 0
      for (var i = 0; i < hours; i++) {
        sum += reversedData[i].close
      }
      // #2 calculate MA for past 100 hours
      const avg = sum / hours
      callback(avg)
    })
    .catch(console.error)
}

export default {
  movingAverage,
}
