import indicators from './indicators.js'
import exchange from './exchange.js'

/**STRATEGY:
 *
 * if BTC < MA ==> buy (if we have no position)
 * if BTC > MA ==> sell (if we have a position)
 *
 * every second we check if we have a position - need timer
 */
var hasPosition = false

var btcStrategy = async function () {
  let btcPriceData = await exchange.bitcoinPrice()
  let price = btcPriceData.last
  let volume = btcPriceData.volume.USD
  let buyPrice = Math.floor(price * 1.5)
  let sellPrice = Math.floor(price * 0.05) // basically the price can drop 95% from current before this can't be executed
  console.log(sellPrice)

  let balance = await exchange.getCurrencyBalance('USD')
  // we'll only purchase 1% of our portfolio balance and then calculate the amount of BTC we need to purchase
  let amountToBuy = (balance * 0.01) / buyPrice
  amountToBuy = amountToBuy.toFixed(8)
  console.log('        ')
  console.log('=================')
  console.log('Executing Strategy')

  indicators.hourlyMovingAverage('BTC', 'USD', 100, function (ma) {
    try {
      console.log('100 hr MA: ', ma)
      console.log('BTC Price: ', price)
      console.log('Has Position: ', hasPosition)

      if (price < ma && !hasPosition) {
        console.log('Buying...')
        exchange
          .marketBuyBitcoin(amountToBuy, buyPrice)
          .then((res) => {
            console.log('Purchased BTC', res)
            hasPosition = true

            setTimeout(btcStrategy, 5000)
          })
          .catch((err) => console.error(err))
      } else if (price > ma && hasPosition) {
        console.log('Selling...')
        exchange
          .marketSellBitcoin(amountToSell, sellPrice)
          .then((res) => {
            console.log('Sold BTC', res)
            hasPosition = false

            setTimeout(btcStrategy, 5000)
          })
          .catch((err) => console.error(err))
      } else {
        console.log('No Action')

        setTimeout(btcStrategy, 5000)
      }
    } catch (error) {
      console.log(error)
    }
  })
}

btcStrategy()
