var fs = require('fs');
var _ = require('underscore');
var path = require('path');

// objects collection
var objects = {};

// save (sync) all objects
// don't forget to register SIGINT and SIGTERM handlers in main app so that process.on('exit') works
process.on('exit', function(){
    _.each(objects, function(object, filename){
        object.saveSync();
    })
});

// save objects to disk (async) each minute
setInterval(function(){
    _.each(objects, function(object, filename){
        object.save(function(){});
    })
}, 60*1000);

var PersistentObject = function(filename, object){
    this._pfilename = filename;

    _.extend(this, object);

    objects[filename] = this;

    var data = '';

    try {
        data = fs.readFileSync(this._pfilename, { encoding: 'utf8'});
        _.extend(this, JSON.parse(data));

    } catch (e){
        if(e.code != 'ENOENT'){
            console.error(e, data);
        }
    }
}

PersistentObject.prototype.save = function(cb){
    var clone = _.omit(this, '_pfilename');

    fs.writeFile(this._pfilename, JSON.stringify(clone), { encoding: 'utf8'}, cb);
}

PersistentObject.prototype.saveSync = function(){
    var clone = _.omit(this, '_pfilename');

    fs.writeFileSync(this._pfilename, JSON.stringify(clone), { encoding: 'utf8'});
}

module.exports.load = function(filename, defaults){
    filename = path.resolve(filename);

    var o = objects[filename];

    if(o) return o;

    return new PersistentObject(filename, defaults);
}