"use strict";

var nmap = require('node-nmap');

nmap.nodenmap.nmapLocation = "nmap"; //just in case user is on windows this should be changed


function Scan(options){
    this.init(options || {});
}

Scan.prototype.init = function(options){
    /*TODO
    receive an type of scan from the ones listed here  https://www.npmjs.com/package/node-nmap
    receive the hosts (options.hosts) */


};

