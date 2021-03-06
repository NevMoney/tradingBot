import fetch from 'node-fetch'
if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const CC = require('cryptocompare')
CC.setApiKey(process.env.CRYPTO_COMPARE_API_KEY)

const hourlyMovingAverage = (crypto, fiat, hours, callback) => {
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
      // to get round number without decimals
      const avg = Math.floor(sum / hours)
      // to get decimals
      //   const avg = sum / hours
      callback(avg)
    })
    .catch(console.error)
}

const dailyMovingAverage = (crypto, fiat, days, callback) => {
  if (days > 169) {
    console.error('Only up to 169 days allowed')
    return
  }
  CC.histoDay(crypto, fiat) //histoDay(BTC,USD,limit('none'))
    .then((data) => {
      // need to reverse the data
      const reversedData = data.reverse()
      var sum = 0
      for (var i = 0; i < days; i++) {
        sum += reversedData[i].close
      }
      // #2 calculate MA for past 100 days
      const avg = sum / days
      callback(avg)
    })
    .catch(console.error)
}

const minuteMovingAverage = (crypto, fiat, minutes, callback) => {
  if (minutes > 169) {
    console.error('Only up to 169 minutes allowed')
    return
  }
  CC.histoDay(crypto, fiat) //histoDay(BTC,USD,limit('none'))
    .then((data) => {
      // need to reverse the data
      const reversedData = data.reverse()
      var sum = 0
      for (var i = 0; i < minutes; i++) {
        sum += reversedData[i].close
      }
      // #2 calculate MA for past 100 minutes
      const avg = sum / minutes
      callback(avg)
    })
    .catch(console.error)
}

export default {
  hourlyMovingAverage,
  dailyMovingAverage,
  minuteMovingAverage,
}
