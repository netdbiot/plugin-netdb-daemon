"use strict";

var restify = require('restify');
var ngrok = require('ngrok');
var fs = require('fs');


function ApiServer(options) {
    this.init(options || {});
}

ApiServer.prototype.init = function(options){
    this.port = options.port || 1243;
};

ApiServer.prototype.start = function(){
    var server = restify.createServer();
    server.name = "netdbD";
    server.use(restify.bodyParser());
    server.use(restify.CORS());
    server.get('/:method', handleGet);
    server.post('/:method',handlePost);
    server.listen(this.port, function(err) {
        if (err)
            console.log(err);
        console.log('%s listening at %s', server.name, server.url);
    });
    //this has to be moved elsewhere and create a instance
    ngrok.connect(this.port, function (err, url) {
        if(err)
            return console.log(err);
        console.log("Use this address in the NetdbD plugin: %s", url);

        //we write a file with the url, some people might want to get the url in case this is a headless setup
        var homeDirectory = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
        fs.writeFile((homeDirectory+"/ngrokUrl.txt"), (url+"\n"),'utf8', function (err) {
            if (err)
                return console.log(err);
        });
        console.log("Url written to file ngrokUrl.txt in %s/ngrokUrl.txt\n",homeDirectory);

    });

};


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
