"use strict";

var nmap = require('node-nmap');

nmap.nodenmap.nmapLocation = "nmap"; //just in case user is on windows this should be changed


function Scan(options){
    this.init(options || {});
}

var scanList = {
    "quickScan": "-T4 -F",
    "quickScanPlus": "-sV -T4 -O -F",
    "pingScan": "-pn",
    "intenseScan": "-T4 -A -v",
    "intenseScanTCP": "-p 1-65535 -T4 -A -v '",
    "intenseScanUDP": "-sS -sU -T4 -A -v",
    "intenseScanNoPing": "-T4 -A -v -Pn",
    "SlowScan": "-sS -sU -T4 -A -v -PE -PP -PS80,443 -PA3389 -PU40125 -PY -g 53 --script \"default or (discovery and safe)\" "
};

Scan.prototype.init = function(options) {
    //Docs:  https://www.npmjs.com/package/node-nmap
    this.hosts  = options.hosts || '127.0.0.1';
    this.type = options.type || "quickScan"; //we are using zenmap examples listed above
    this.flags = options.flags || ""; //like -Pn, -Sn...
    this.status = "Pending";
    this.result = {};


};

Scan.prototype.startScan = function(){
    var useflags;
    var hosts = this.hosts;
    (this.flags != 0)? useflags = this.flags: useflags = scanList[this.type]; //if the user gave any flags,

    var scanned = new Promise(function(resolve,reject){
        var nmapscan = new nmap.nodenmap.NmapScan(hosts, useflags);
        nmapscan.on('complete',function(data){
            resolve(data);
        });
        nmapscan.on('error',function(data){
            reject(data);
        });
    });
    var self = this; //to actually talk about this object in the next step
    scanned.then(function(result){
        self.result = result;
        self.status = "Finished";
    });

};


module.exports = Scan;