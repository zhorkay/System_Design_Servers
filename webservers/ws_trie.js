const Trie = require('../datastructures/trie.js').Trie;
const express = require('express');
const cors = require('cors');

const readline = require('readline');
const fs = require('fs');

const filename = "D:/Workspaces/Projects/System_Design/src/main/resources/words.txt";
const maxId = 1_000_000_000;
const readInterface = readline.createInterface({
    input: fs.createReadStream(filename),
    output: '',
    console: false
});

let trie = new Trie();

readInterface.on('line', function(line) {
    let rank = Math.floor(Math.random() * maxId);
    //console.log(line, rank);
    trie.put(line, rank);

});


//create a server object:
const myArgs = process.argv.slice(2);
const IDX = myArgs[0];
const PORT = myArgs[1];


const app = express();
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests

app.get('/terms', (req, res) => {
    console.log(req.query.term);
    const word = req.query.term;
    let result = trie.getTops(word);
    console.log(result);
    res.json({
        topten: result
    });
    //res.write(`Hello from webserver ${IDX}\n`); //write a response to the client
    res.end(); //end the response
})

app.listen(PORT,() => {
    console.log(`${IDX}. WEB SOCKET SERVER listen on ${PORT}`);
});