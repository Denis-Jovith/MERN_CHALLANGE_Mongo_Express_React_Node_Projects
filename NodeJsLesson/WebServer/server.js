const http = require('http');
const path = require ('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EvenEmitter = require('events');
class Emitter extends EvenEmitter{};

//initialize object
const myEmmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req,res) => {
    try{
        console.log(req.url,req.method);

        let filePath;

        if(req.url === '/' || req.url === '/index.html'){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            filePath = path.join(__dirname,'views','index.html')

            fs.readFile(filePath,'utf8',(err,data) => {
                if (err) throw err;
                res.end(data);
            })
        }
    } catch (error) {

    }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))