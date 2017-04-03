 "use strict";
 //Still working on it

var Api = require("./lib/ApiServer");

var server = new Api({"port":8080});

server.start();