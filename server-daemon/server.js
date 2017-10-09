const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const ngrok = require('ngrok');
const fs = require('fs');
const app = express();
const port = 8080;

const server = http.createServer(app);
const wss = new WebSocket.Server({
    server
});

// Register modules
const Nmap = require('./connector/nmap');
const DoublePulsar = require('./connector/nsa-doublepulsar');
const Ping = require('./connector/ping');
const Any = require('./connector/any');

// Start WS server
wss.on('connection', function connection(ws){
    
    ws.send('>  Hi, you are now connected to netdb.io remote CLI service.');
    
    ws.on('message', function incoming(msg) {
    
        msg = JSON.parse(msg);
        
        console.log("new cmd" , msg);
        
        const module = msg['module'];
        const data = msg['data'];
        const cmd = msg['cmd'];
        
        switch(module){
            case "any":
                new Any(ws, cmd).init(data);
                break;
            case "nmap":
                new Nmap(ws, cmd).init(data);
                break;
            case "ping":
                new Ping(ws, cmd).init(data);
                break;
            case "nsa-doublepulsar":
                new DoublePulsar(ws, cmd).init(data);
                break;
            default:
                ws.send("Please register the module before");
        }
    });
});

server.listen(port);

ngrok.connect(port, function(err, url) {
    if (err) return console.log(err);
    console.log("Use this address in the NetdbD plugin: %s", url.replace('https', 'ws'));
    //we write a file with the url, some people might want to get the url in case this is a headless setup
    var homeDirectory = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
    fs.writeFile(("ngrokUrl.txt"), (url + "\n"), 'utf8', function(err) {
        if (err) return console.log(err);
    });
    console.log("Url written to file ngrokUrl.txt in  ngrokUrl.txt\n");
});