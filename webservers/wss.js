const WebSocket = require('ws');

var myArgs = process.argv.slice(2);
const IDX = myArgs[0];
const PORT = myArgs[1];

const wss = new WebSocket.Server({
    port: PORT,
});

wss.on('connection', (ws) => {
    ws.send(`Welcome to the chat, enjoy with the ${IDX}. websocket server`);

    ws.on('message', (data) => {
        let message;

        try {
            message = JSON.parse(data);
        } catch (e) {
            sendError(ws, 'Wrong format');

            return;
        }

        if (message.type === 'NEW_MESSAGE') {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        }

    });
});

const sendError = (ws, message) => {
    const messageObject = {
        type: 'ERROR',
        payload: message,
    };

    ws.send(JSON.stringify(messageObject));
};