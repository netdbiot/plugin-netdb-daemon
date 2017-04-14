"use strict";

var nmap = require('node-nmap');

nmap.nodenmap.nmapLocation = "nmap"; //just in case user is on windows this should be changed


function Scan(options){
    this.init(options || {});
}

Scan.prototype.init = function(options) {
    //Docs:  https://www.npmjs.com/package/node-nmap
    this.hosts  = options.hosts || '127.0.0.1';
    this.type = options.type || "QuickScan"; //we are using zenmap examples
    this.flags = options.flags || {}; //like -Pn, -Sn...

};

//Todo: we should make a scan for the same scan methods zenmap uses, QuickScan,
//quickScanPlus ..... and then a general one where we allow the user to send
//its own flags to the nmap command

Scan.prototype.QuickScan = function(){


};
