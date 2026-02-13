const logEvents = require('./logEvents')

const EventEmiter = require('events');

class MyEmitter extends EventEmiter {};

//initialize object
const myEmiter = new MyEmitter();

//add listen for the log event
myEmiter.on('log',(message) => logEvents(message));
setTimeout( () => {
    //Emit event
    myEmiter.emit('log', 'log event emmited!')
})