module.exports = {
  movingAverage: function (crypto, fiat, hours, callback) {
    if (hours > 169) {
      console.error('Only up to 169 hours allowed')
      return
    }
    CC.histoHour(crypto, fiat)
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
  },
}
