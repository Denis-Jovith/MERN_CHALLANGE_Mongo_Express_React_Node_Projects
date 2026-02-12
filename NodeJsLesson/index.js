const fs = require('fs');

fs.readFile('./starter.txt','utf8',(err,data) => {
    if (err) throw err;
    console.log(data);
})

console.log('Hello..........')

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})