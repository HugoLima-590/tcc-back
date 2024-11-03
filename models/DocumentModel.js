const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
