const async = require('async');
const exec = require('child_process').exec;

function Any(ws, cmd){
    this.ws = ws;
    this.cmd = cmd;
    ws.send('<span style="color:blue">Info:</span> Any Plugin');
}

function replace(data, cmd){
    for(let key in data){
        cmd = cmd.replace(new RegExp("#{"+key+"}",'gi'), data[key]);
    }
    return cmd;
}

Any.prototype.init = function(data) {
    const ws = this.ws;
    const cmd = this.cmd;
    
    ws.send(`<span style="color:blue">Info:</span> # Hosts ${data.length}`);
    async.each(data, (data, cb) => {
         
        exec(replace(data, cmd), function(error, stdout, stderr) {
            let formatedError;
            if (error) {
                formatedError = JSON.stringify(error);
                ws.send(`<span style="color:red">Error:</span> ${formatedError}`);
            } else if (stderr) {
                formatedError = JSON.stringify(stderr);
                ws.send(`<span style="color:red">Error:</span> ${formatedError}`);
            } else {
                ws.send('>><br/>' + stdout.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
            }
            cb();
        });
    }, function() {
        if(data && data.length && data.length > 0 )
            ws.send('<span style="color:blue">Info:</span> All hosts were scanned');
    });
};

module.exports = Any;