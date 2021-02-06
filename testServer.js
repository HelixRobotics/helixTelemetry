const net = require('net');
const readline = require('readline');
const { Console } = require('console');

const server = net.createServer((conn) => {
    const interface = readline.createInterface({input: conn});
    interface.on("line", (message) => {
        conn.write("HEllo\n");
        console.log(message);
    }); 
});
server.listen(3002);