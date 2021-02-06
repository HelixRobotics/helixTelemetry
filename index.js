const express = require('express');

const ws = require('ws');
const net = require('net');
const { query } = require('express');


const app = express();


let streamProc = {
    buffer: [],
    input: function(data) {
        this.buffer.push[data];
    }
}

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    let tcpconn = null;
    socket.on('message', message => {
        try {
            const obj = JSON.parse(message);
            console.log(obj);
            switch(obj.command) {
                case 'connect':
                    socket.send("Connecting to " + obj.host);
                    try {
                        tcpconn = net.createConnection(3002, obj.host, () => {
                            tcpconn.write("Connected, bag pula\n");
                        });
                        tcpconn.on('error', (err) => {
                            console.log('Connection error:', err.message);
                        });
                        tcpconn.on('data', (data)=>{
                            console.log(data.toString('utf-8'));
                        });
                    }
                    catch(e) {
                        socket.send("Err conn to " + obj.host);
                    }
                    break;
                case 'query':
                    if(tcpconn !== null) {
                        tcpconn.write(obj.param + '\n');
                    }
                    break;
                case undefined:
                    socket.send("Cplm e asta?");
            }
        }
        catch(e) {
            console.error("Futu-s gatii matii!");
        }
    });
});



app.get("/api", (req, res) => {
    res.send("Dummy endpoint!");
});
app.get("/", (req, res) => {
    res.send("Dummy endpoint!");
});
//app.use(express.static('static3/build'));
const server = app.listen(3001);
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});

