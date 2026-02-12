const fs = require('fs');
const path= require('path');

// fs.readFile('./starter.txt','utf8',(err,data) => {
//     if (err) throw err;
//     console.log(data);
// })

fs.readFile(path.join(__dirname,'starter.txt'),'utf8',(err,data) => {
    if (err) throw err;
    console.log(data);
}
)
console.log('Hello..........')

fs.writeFile(path.join(__dirname,'reply.txt'),'Nice to meet you',(err) => {
    if(err) throw err;
    console.log('Write Complete')
})

fs.readFile(path.join(__dirname,'reply.txt'),'utf8',(err,data) => {
    if (err) throw err;
    console.log(`The reply.txt is:   ${data}`)
})

fs.appendFile(path.join(__dirname,'testing.txt'),'Testing text',(err) => {
    if (err) throw err;
    console.log('Append complete')
})

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})