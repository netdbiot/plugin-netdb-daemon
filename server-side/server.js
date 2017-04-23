const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const ngrok = require('ngrok');
const fs = require('fs');
const async = require('async');
const app = express();

app.use(function(req, res) {
    res.send({
        msg: "hello"
    });
});
const server = http.createServer(app);
const wss = new WebSocket.Server({
    
});
wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    ws.on('message', function incoming(msg) {
        //console.log('received: %s', msg);
        let ips = JSON.parse(msg);
        ws.send('hosts: ' + ips.length);
        async.each(ips, (data, cb) => {
            //console.log(data);
            const ip = data.ip;
            var exec = require('child_process').exec;
            var cmd = 'doublepulsar-detection-script/detect_doublepulsar.py --ip ' + ip;
            exec(cmd, function(error, stdout, stderr) {
                //console.log(error, stdout, stderr);
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
            ws.send('All hosts scanned');
        });
    });
    ws.send('== Doublepulsar detection==');
    ws.send('Hi, you are now connected.');
    ws.send('..scaning started..');
    ws.send('');
    ws.send('.....wait');
    ws.send('');
});
server.listen(8080, function listening() {
    //console.log('Listening on %d', server.address().port);
});
//this has to be moved elsewhere and create a instance
ngrok.connect(8080, function(err, url) {
    if (err) return console.log(err);
    console.log("Use this address in the NetdbD plugin: %s", url.replace('https', 'ws'));
    //we write a file with the url, some people might want to get the url in case this is a headless setup
    var homeDirectory = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
    fs.writeFile(("ngrokUrl.txt"), (url + "\n"), 'utf8', function(err) {
        if (err) return console.log(err);
    });
    console.log("Url written to file ngrokUrl.txt in  ngrokUrl.txt\n");
});