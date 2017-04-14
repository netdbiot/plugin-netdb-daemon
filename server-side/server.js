 "use strict";
 //Still working on it

var Api = require("./lib/ApiServer");
var usedmodules = require("./modules.json");

//now we receive this plugin list and we work with it
var server = new Api({"port":8080, modules: usedmodules.active});

server.start();