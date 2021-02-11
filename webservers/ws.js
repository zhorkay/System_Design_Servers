var http = require('http');

//create a server object:
var myArgs = process.argv.slice(2);
const IDX = myArgs[0];
const PORT = myArgs[1];

http.createServer(function (req, res) {
    console.log(req);
    res.write(`Hello from webserver ${IDX}\n`); //write a response to the client
    res.end(); //end the response
}).listen(PORT);