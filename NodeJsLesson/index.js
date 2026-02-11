const fs = require('fs')

fs.readFile('./NODE.JS/starter.txt',(err,data) => {
    if (err) throw err;
    console.log(data);
})