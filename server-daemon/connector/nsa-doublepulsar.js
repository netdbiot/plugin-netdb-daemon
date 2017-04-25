const async = require('async');
const exec = require('child_process').exec;

function DoublePulsar(ws, cmd){
    this.ws = ws;
    this.cmd = cmd;
    ws.send('== Welcome to Nmap wrapper == ');
}

DoublePulsar.prototype.init = function(data) {
    const ws = this.ws;
    const cmd = this.cmd;
    
    ws.send('hosts: ' + data.length);
    async.each(data, (data, cb) => {
        
        const ip = data.ip;
        exec('boudlplepulsar.py '+cmd.replace('#{ip}',ip), function(error, stdout, stderr) {
            if (error) {
                ws.send("error scaning " + ip);
            } else if (stderr) {
                ws.send("error scaning " + ip);
            } else {
                ws.send(stdout);
            }
            cb();
        });
    }, function() {
        ws.send('All hosts were scanned');
    });
    
};

module.exports  = DoublePulsar;