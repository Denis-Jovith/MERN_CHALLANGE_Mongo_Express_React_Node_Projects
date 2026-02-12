const { format } = require('date-fns');

const { v4: uuid} = require('uuid')

console.log(format(new Date, 'yyyy-MM-dd HH:mm:ssXXX zzz'))

console.log(uuid())

console.log()