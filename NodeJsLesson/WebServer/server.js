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

        const extension = path.extname(req.url);

        let contentType;

        // let filePath;

        //THE FIRST OPTION OF IT USING THE IF STATEMENT
        // if(req.url === '/' || req.url === '/index.html'){
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type', 'text/html');

        //     filePath = path.join(__dirname,'views','index.html')

        //     fs.readFile(filePath,'utf8',(err,data) => {
        //         if (err) throw err;
        //         res.end(data);
        //     })
        // }


        ///THE SECOND OPTION USING THE SWITCH
        // switch(req.url){
        //     case '/':
        //         res.statusCode = 200;
        //         filePath = path.join(__dirname,'views','index.html');
        //         fs.readFile(path,'utf8',(err,data) => {
        //             res.end(data);
        //         });
        //         break;
        // }

        switch(extension){
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType ='text/javascript'
                break;
            case '.json':
                contentType = 'application/json'
                break;
            case '.jpg':
                contentType = 'image/jpeg'
                break;
            case '.png':
                contentType = 'image/png'
                break;
            case '.txt':
                contentType = 'text/plain';
                break;
            default:
                contentType = 'text/html'
        }

         let filePath =
          contentType === 'text/html' && req.url === '/'
          ? path.join(__dirname,'vies','index.html')
          :contentType === 'text/html' && req.url.slice(-1) === '/'
          ?path.join(__dirname,'views',req.url,'index.html')
          :contentType === 'text/html'
          ?path.join(__dirname,'views',req.url)
          :path.join(__dirname,req.url)


    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end('Server Error')
    }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))