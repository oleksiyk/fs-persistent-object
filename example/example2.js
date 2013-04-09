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
var pObject1 = persistentObject.load(path.resolve(path.dirname(__filename), './runtime', 'example2.pObject'), {
    filename: __filename,
    datetime: new Date(),
    iterator: 0
});

console.log('pObject1', pObject1);

// load another persistent object with the same filename
var pObject2 = persistentObject.load(path.resolve(path.dirname(__filename), './runtime', 'example2.pObject'), {
    filename: __filename,
    datetime: new Date(),
    iterator: 1000
});

// pObject2 should point at the same object as pObject1
console.log('pObject2', pObject2);

pObject1.iterator += 1;

console.log('Now start me again and see that pObject.iterator is changing while pObject.datetime isn\'t.');

process.exit(0);



