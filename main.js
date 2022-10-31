const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(from, to, amount, data = ''){
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.data = data;
    }
}

class Block{
    constructor(timeStamp, transactions, previousHash = '', blockNumber = 0){
        this.timeStamp = timeStamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
        this.blockNumber = blockNumber;
    }
    calculateHash(){
        return SHA256(this.timeStamp + this.transactions + this.previousHash + this.nonce).toString();
    }
    mineTHeBLock(difficulty){
        console.log('minig started ...... from line 24');

        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")){
            this.nonce ++;
            this.hash = this.calculateHash();
        }
        console.log('block successfully minded, from line 29.......');
    }
}

class BlockChain{
    constructor(){
        this.difficulty = 3;
        this.chain = [this.creatGenesisBLock()];
        this.miningReward = 100;
        this.mempool = [];
    }
    getLastBlock(){
        return this.chain [this.chain.length -1];
    }
    creatGenesisBLock(){
        return new  Block(Date.now(), 0, 0);
    }
    getBalanceOf(address){
        const balance  = 0;
        for(let block of this.chain){
            for(let tx of block){
                if(tx.from === address){
                    balance -= tx.amount;
                }
                if(tx.to === address){
                    balance += tx.amount;
                }
            }
        }
    }
    minePendingTransaction(minerAddress){
        let block = new Block(Date.now(), this.mempool, this.getLastBlock().hash, this.chain.length);
        block.mineTHeBLock(this.difficulty);
        this.chain.push(block);

        // to prevent double adding the transaction to the mempool
        this.mempool = [];
        this.addTX(new Transaction(null, minerAddress, this.miningReward));
        console.log('the block mined successfully ... ...from line 63');
    }
    addTX(trx){
        this.mempool.push(trx);
    }
    isValid(){
        //complete this function
    }
}

const bitcoin = new BlockChain();
const tx1 = new Transaction('mehran', 'ali', 100, 'dd');

bitcoin.addTX(tx1);
bitcoin.minePendingTransaction('farid');

const tx2 = new Transaction('mehran', 'farid', 100, 'dd');
const tx3 = new Transaction('mehran', 'hamid', 100, 'dd');
bitcoin.addTX(tx2);
bitcoin.addTX(tx3);
bitcoin.minePendingTransaction('farid');


console.log(bitcoin.chain)