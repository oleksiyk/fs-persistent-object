var persistentObject = require('../lib/fs-persistent-object');
var path = require('path');


// register exit handlers so that process.on('exit') works
var exitFunc = function(){
    console.log('\nShutting down');
    process.exit(0);
}

process.on('SIGINT', exitFunc);
process.on('SIGTERM', exitFunc);

// load persistent object or initialize it with some defaults
var pObject = persistentObject.load(path.resolve(path.dirname(__filename), './runtime', 'example1.pObject'), {
    filename: __filename,
    datetime: new Date(),
    iterator: 0
});

console.log(pObject);

pObject.iterator += 1;

console.log('Now start me again and see that pObject.iterator is changing while pObject.datetime isn\'t.');

process.exit(0);



