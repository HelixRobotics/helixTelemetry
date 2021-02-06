let ws = null;
try {
    ws = new WebSocket("ws://localhost:3000/api");
}
catch(e) {
    console.error("Could not connect to websocket");
}

export const handler = {
    connect: (host) => {
        ws.send(JSON.stringify({
            command: "connect",
            host: host
        }));
    },
    query: (param) => {
        ws.send(JSON.stringify({
            command: "query",
            param: param
        }));
    }
};

ws.onmessage = (message) => {
    console.log("Got message: " + message.data);
}