const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EvenEmitter = require('events');
class Emitter extends EvenEmitter { };

//initialize object
const myEmmitter = new Emitter();

const PORT = process.env.PORT || 3500;
myEmmitter.on('log', (msg, fileName) => logEvents(msg, fileName))
const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fs.promises.readFile(filePath, !contentType.includes('image') ? 'utf8' : '');
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType });
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        myEmmitter.emit('log', `${err.name}: ${err.message}`, 'errlog.txt');
        response.statusCode = 500;
        response.end()
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    myEmmitter.emit('log', `${req.url} \t ${req.method}`,'reqLog.txt')

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

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript'
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
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url)

    //makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

    const fileExist = fs.existsSync(filePath);

    if (fileExist) {
        //serve the file
        serveFile(filePath, contentType, res);
    } else {
        //404
        //301 redirect
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                //404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)

        }
    }
})


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))