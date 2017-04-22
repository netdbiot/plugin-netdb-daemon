'use strict';

// here we put all the logic for the modules

var nmapscan = require('./nmap-connector');

function Modules(options) {
    this.init(options || {});
}

Modules.prototype.init = function(mname,mdata){
    this.name = mname;
    this.data = mdata;
    this.operation = {};
};

Modules.prototype.start = function(){
    if(this.name == "nmap"){
        var hosts = this.data.hosts;
        var flags = this.data.flags || ""; //in case flags are undefined
        var type = this.data.type;
        console.log(hosts + " " + flags + " " + type);
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

module.exports = Modules;