const WebSocket = require('ws');

var myArgs = process.argv.slice(2);
const IDX = myArgs[0];
const PORT = myArgs[1];

const wss = new WebSocket.Server({
    port: PORT,
}, function (response) {
    console.log(`${IDX}. SERVER created with Port: ${PORT}: ${response}`);
});

let clientAddress = "";

wss.on('connection', function connection(ws, req) {
    clientAddress = req.connection.remoteAddress;
    console.log(`SERVER info: connection established with ${clientAddress}`);

    ws.on('message', function incoming(message) {
       console.log('SERVER received: %s', message);
    });

    ws.send(`Welcome to the ${IDX}. Websocket Server with Port: ${PORT}`);

    ws.on('close', function (reasonCode, description) {
        console.log(`Client ${clientAddress} has disconnected due to: ${reasonCode} and left a message: ${description}`);
    });
});
