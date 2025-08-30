// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFT42
 * @dev A simple BEP-721 NFT contract for the TokenizeArt project.
 * Minting is restricted to the contract owner. All tokens share the same metadata URI.
 */
contract NFT42 is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    string private _baseTokenURI;

    /**
     * @dev Sets the collection name, symbol, owner, and the constant base URI for metadata.
     */
    constructor(address initialOwner, string memory baseTokenURI_)
        ERC721("pbeheyt Art 42", "PBA42")
        Ownable(initialOwner)
    {
        _baseTokenURI = baseTokenURI_;
    }

    /**
     * @dev Returns the base URI for all tokens. Since all tokens share the same
     * metadata in this project, this function ignores the tokenId.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);
        return _baseTokenURI;
    }

    /**
     * @dev Mints a new NFT to the specified address.
     * Can only be called by the contract owner.
     * @param to The address to mint the NFT to.
     */
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
    }
}
