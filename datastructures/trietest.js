const tries = require('./trie.js')

const readline = require('readline');
const fs = require('fs');

const filename = "D:/Workspaces/Projects/System_Design/src/main/resources/words.txt";
const maxId = 1000000000;
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

setTimeout(function () {
    console.log("wait 5 seconds");
    let tn = trie.getRoot();
    tn = trie.get(tn, 'v');
    console.log(trie.getTrieNodes(tn));
    tn = trie.get(tn, 'e');
    console.log(trie.getTrieNodes(tn));
    tn = trie.get(tn, 'g');
    console.log(trie.getTrieNodes(tn));
    tn = trie.get(tn, 'i');
    console.log(trie.getTrieNodes(tn));
    tn = trie.get(tn, 'e');
    console.log(trie.getTrieNodes(tn));
    tn = trie.get(tn, 's');
    console.log(trie.getTrieNodes(tn));
}, 5000);



/*


 */