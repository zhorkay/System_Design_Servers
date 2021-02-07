function compareTrieNodes(tn1, tn2) {
    if (tn1.rank < tn2.rank) {
        return 1;
    }
    if (tn1.rank > tn2.rank) {
        return -1;
    }
    return 0;
}

class TrieNode {
    constructor() {
        this.word = "";
        this.rank = -1;
        this.children = {};
        this.topten = [];
        this.isWord = false;
    }

    put(word_, idx_, rank_) {
        if (idx_ === word_.length) {
            this.word = word_;
            this.rank = rank_;
            this.isWord = true;
            return this;
        }

        if (!this.children[word_[idx_]]) {
            this.children[word_[idx_]] = new TrieNode();
        }
        let leaf = this.children[word_[idx_]].put(word_, idx_ + 1, rank_);
        this.topten.push(leaf);
        this.topten.sort(compareTrieNodes);
        if (this.topten.length > 10) {
            this.topten.pop();
        }

        return leaf;
    }

    getTopTen() {
        let res = [];
        for (const w of this.topten) {
            res.push(w.word);
        }
        return res;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    put (word, rank) {
        this.root.put(word, 0, rank);
    }

    contains(word) {
        let x = this.root;
        for (let i = 0; i < word.length; i++) {
            if (x.children[word[i]] == null) {
                return false;
            }
            x = x.children[word[i]];
        }
        return x.isWord;
    }

    get(tn, ch) {
        if (tn == null) {
            return this.root.children[ch];
        }
        return tn.children[ch];
    }

    getTrieNodes(tn) {
        return tn.getTopTen();
    }

    getRoot() {
        return this.root;
    }

}

module.exports = {
    TrieNode: TrieNode,
    Trie: Trie
}