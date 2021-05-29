// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract NFT is ERC721, Ownable {
    
    using SafeMath for uint256;

    // Last NFT id created
    uint256 public lastId;

    constructor(string memory _name, string memory _alias) ERC721(_name, _alias) public {

    }

    function createNFT(address _user, string memory _urlPath) external onlyOwner {
        _mint(_user, lastId);
        _setTokenURI(lastId, _urlPath);
        lastId++;
    }

    function burn(uint256 _tokenID) external {
        _burn(_tokenID);
    }

}