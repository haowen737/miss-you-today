const Timeter = require('node-timeter')
const timeter = new Timeter()

timeter.start()

setTimeout(() => {
  console.time('consoleTime')
  console.log(timeter.lap())
}, 1000)

setTimeout(() => {
  console.timeEnd('consoleTime')
  console.log(timeter.lap())
}, 3000)
