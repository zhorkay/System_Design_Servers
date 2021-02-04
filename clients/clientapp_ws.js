const WebSocket = require('ws');
// Create a new WebSocket.
var socket = new WebSocket('ws://localhost:8090');

socket.onopen = function(connection) {
    console.log("Connection established");
    connection.on (
        "message", function message(message) {
            console.log("message : " + message);
        }
    );
}
//socket.send("test ws sending message");