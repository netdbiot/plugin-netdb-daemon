'use strict';

// here we put all the logic for the modules

var nmapscan = require('./nmap-connector');

function Modules(options) {
    this.init(options || {});
}

Modules.prototype.init = function(options){
    this.name = options[0];
    this.data = options[1];
    this.result = {};
    this.status = "Pending.";
    this.operation = {};
};

Modules.prototype.start = function(){
    if(this.name == nmap){
        var hosts = data.hosts;
        var flags = data.flags || ""; //in case flags are undefined
        var type = data.type;
        this.operation = new nmapscan({"hosts":hosts,"flags": flags, "type": type});
        this.operation.startScan();
    }
    //if(this.name == metasploit){}....
};

Modules.prototype.Finished = function() {
    return( this.operation.status == "Finished");
};

Modules.prototype.GetResult = function(){
    return this.operation.result;
};

