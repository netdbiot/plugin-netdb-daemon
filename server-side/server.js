 "use strict";
 //Still working on it

var Api = require("./lib/ApiServer");
var usedmodules = require("./modules.json");

var port = process.argv[2] || 8080;
if(process.argv[2] == undefined){
    console.log("No port specified, using 8080");
    console.log("If you want to use a port (example 6532) run: sudo node server 6532")
}

//now we receive this plugin list and we work with it
var server = new Api({"port":port, modules: usedmodules.active});

server.start();