 "use strict";
 //Still working on it

var Api = require("./lib/ApiServer");
var usedmodules = require("./modules.json");

var server = new Api({"port":8080, modules: usedmodules.active});

server.start();