// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract TextHashStorage {

    struct TextHash {
    address owner;
    string hash; 
    }

    mapping(uint256 => TextHash) public textHashes;
    uint256 public currentId;

    function storeHash(string memory _hash) public {
        textHashes[currentId] = TextHash(msg.sender, _hash);
        currentId++;
    }

    function getHash(uint256 _id) public view returns (string memory) {
        return textHashes[_id].hash;
    }
}