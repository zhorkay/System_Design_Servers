const WebSocket = require('ws');

const N = 20;
for (let i = 0; i < N; i++) {
    // Create a new WebSocket.
    const ws = new WebSocket('ws://lbserver:8010/messengerws/');

    ws.onopen = function (connection) {
        console.log('WebSocket Client connected: ' + JSON.stringify(connection, Object.getOwnPropertyNames(connection)));
        ws.send('Hi this is a web client via websocket');
    };

    ws.onmessage = function (event) {
        console.log("CLIENT: received: '" + event.data + "'");
    };

    ws.onclose = function (event) {
        console.log("Websocket Server Closed: " + JSON.stringify(event, Object.getOwnPropertyNames(event)));
    };
}

