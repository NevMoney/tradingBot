import indicators from './indicators.js'
import exchange from './exchange.js'

indicators.hourlyMovingAverage('BTC', 'USD', 30, function (result) {
  console.log('Hourly MA: ', result)
})

indicators.dailyMovingAverage('BTC', 'USD', 30, function (result) {
  console.log('Daily MA: ', result)
})

indicators.minuteMovingAverage('BTC', 'USD', 30, function (result) {
  console.log('Minute MA: ', result)
})

// exchange
//   .marketBuy('ethusd')
//   .then((res) => console.log(res))
//   .catch(console.error)

exchange
  .marketSell('btcusd')
  .then((res) => console.log(res))
  .catch(console.error)
