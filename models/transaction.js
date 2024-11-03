const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    txHash: String,
    senderAddress: String,
    contractAddress: String,
    gasUsed: Number,
    gasPrice: Number,
    gasLimit: Number,
    blockNumber: Number,
    txData: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
