const { format } = require('date-fns');
const { v4:uuid } = require ('uuid');

const fs = require ('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ssXXX zzz')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    try{
        await fsPromises.appendFile(path.join(__dirname,'eventLoog.txt'),logItem)
    } catch (err) {
        console.error(err);
    }
}

module.exports = logEvents