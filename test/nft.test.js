import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("NFT42", function () {
  let nft, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const NFT42Factory = await ethers.getContractFactory("NFT42");
    nft = await NFT42Factory.deploy(owner.address);
  });

  describe("Deployment", function () {
    it("Should have the correct name and symbol", async function () {
      expect(await nft.name()).to.equal("pbeheyt Art 42");
      expect(await nft.symbol()).to.equal("PBA42");
    });

    it("Should set the deployer as the owner", async function () {
      expect(await nft.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Should allow the owner to mint a new NFT", async function () {
      await expect(nft.safeMint(addr1.address)).to.not.be.reverted;
      expect(await nft.ownerOf(0)).to.equal(addr1.address);
    });

    it("Should increment the token ID after minting", async function () {
      await nft.safeMint(addr1.address);
      await nft.safeMint(owner.address);
      expect(await nft.ownerOf(1)).to.equal(owner.address);
    });

    it("Should NOT allow a non-owner to mint a new NFT", async function () {
      await expect(
        nft.connect(addr1).safeMint(addr1.address)
      ).to.be.revertedWithCustomError(nft, "OwnableUnauthorizedAccount")
       .withArgs(addr1.address);
    });
  });
});
