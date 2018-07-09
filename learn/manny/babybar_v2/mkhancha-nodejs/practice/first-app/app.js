const EventEmitter = require('events');
const emitter = new EventEmitter();

const Logger = require('./logger');
const logger = new Logger();
logger.on('messageLogged', (data) => {
	console.log('listener called', data);							 
});

logger.log('message');
