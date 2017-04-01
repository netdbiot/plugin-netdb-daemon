"use strict"

var restify = require('restify');

function ApiServer(options) {
    var options = options || {};
    this.init(options);
}

ApiServer.prototype.init = function(options){
    this.port = options.port || 1243;
}

ApiServer.prototype.start = function(){
    var server = restify.createServer();
    server.use(restify.bodyParser());
    server.use(restify.CORS());
    server.get('/:method', handleGet);
    server.post('/:method',handlePost);
    server.listen(this.port, function(err) {
        if (err)
            console.log(err);
        console.log('%s listening at %s', server.name, server.url);
    });
}


function handleGet(req, res, next) {
    res.send('hello ' + req.params.method);
    next();
}
function handlePost(req, res, next) {
    console.log(req.params.method);
    res.send("wew,lad");
    next();
}

module.exports = ApiServer;