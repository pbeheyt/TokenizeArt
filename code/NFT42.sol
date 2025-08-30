// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFT42
 * @dev A simple BEP-721 NFT contract for the TokenizeArt project.
 * Minting is restricted to the contract owner.
 */
contract NFT42 is ERC721, Ownable {
    uint256 private _nextTokenId;

    /**
     * @dev Sets the collection name, symbol, and owner.
     */
    constructor(address initialOwner)
        ERC721("pbeheyt Art 42", "PBA42")
        Ownable(initialOwner)
    {}

    /**
     * @dev Mints a new NFT to the specified address.
     * Can only be called by the contract owner.
     * @param to The address to mint the NFT to.
     */
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
