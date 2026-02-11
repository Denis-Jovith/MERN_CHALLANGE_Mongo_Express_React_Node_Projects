// console.log("Hello World")

// console.log(global);

const os = require('os')
const path = require('path')
const math=require('./math')
const {add,substract,multiply,divide} = require('./math')


console.log(math.add(2,3))
console.log(math.substract(4,7))
console.log(add(2.9,43))
console.log(substract(6,8))
console.log(multiply(33,900))
console.log(divide(-994,988))

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))