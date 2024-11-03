pragma solidity ^0.8.0;

contract DocumentStore {
    struct Document {
        bytes32 hash;
        uint timestamp;
    }

    mapping(bytes32 => Document) public documents;

    function addDocument(bytes32 documentHash) public {
        documents[documentHash] = Document(documentHash, block.timestamp);
    }

    function verifyDocument(bytes32 documentHash) public view returns (bool, uint) {
        Document memory doc = documents[documentHash];
        if (doc.hash != documentHash) {
            return (false, 0);
        }
        return (true, doc.timestamp);
    }
}
