const tries = require('./trie.js')

const readline = require('readline');
const fs = require('fs');

const filename = "D:/Workspaces/Projects/System_Design/src/main/resources/words.txt";
const maxId = 1_000_000_000;
const readInterface = readline.createInterface({
    input: fs.createReadStream(filename),
    output: process.stdout,
    console: false
});

let trie = new tries.Trie();

readInterface.on('line', function(line) {
    let rank = Math.floor(Math.random() * maxId);
    //console.log(line, rank);
    trie.put(line, rank);
});



