"use strict";

var restify = require('restify');
var ngrok = require('ngrok');
var fs = require('fs');
var shortid = require('shortid');
var currentModule = require('./modules');

var activemodules;
var activeOperations = {};
function ApiServer(options) {
    this.init(options || {});
}


ApiServer.prototype.init = function(options){
    this.port = options.port || 1243;
    activemodules = options.modules;

};

ApiServer.prototype.start = function(){
    var server = restify.createServer();
    server.name = "netdbD";
    server.use(restify.bodyParser());
    server.use(restify.CORS());
    server.get('/:method', handleGet);
    server.post('/:method',handlePost);
    server.get('/:method/:id', handleGet);
    server.get('/:method/:id/:action', handleGet); // for example, if we want to delete the element from the activeOperations
    server.post('/:method/:id',handlePost);
    server.listen(this.port, function(err) {
        if (err)
            console.log(err);
        console.log('%s listening at %s', server.name, server.url);
    });
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
    var method = req.params.method;
    if (method == ""){
        res.send("Please use a method");
    }
    if(activemodules.indexOf(method) >= 0){
        if(req.params.id != undefined && activeOperations[req.params.id] != undefined ){

            if(req.params.action == "delete"){
               delete activeOperations[req.params.id];
               res.send(req.params.id + " deleted");
            }

            if(activeOperations[req.params.id].Finished()){
                res.send(JSON.stringify(activeOperations[req.params.id].GetResult()));
            }
            res.send(activeOperations[req.params.id].status);

        }

        res.send("Active Operations: " + JSON.stringify(activeOperations));
    }else{
        res.send("No method found for your call");
    }
    next();
}


function handlePost(req, res, next) {
    var method = req.params.method;
    if(activemodules.indexOf(method) >= 0){
        //handle for the active methods on modules.json
        var body = JSON.parse(req.body);
        var operation = {"name":method,"data": body};
        var methodId = shortid.generate();
        //we send 2 parameters, name and the information that should look like
        // {"hosts":["127.0.0.1", "google.com"],"type":"quickScanPlus"} in case that is nmap
        activeOperations[methodId] = new currentModule(method,body);
        activeOperations[methodId].start();
        console.log(body);
        res.send("New operation id: " +methodId );

    }else{
        res.send("No method found for your call");
    }
    next();
}




module.exports = ApiServer;
