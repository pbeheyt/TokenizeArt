import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying NFT contract with the account:", deployer.address);

  const nftFactory = await ethers.getContractFactory("NFT42");
  const nft = await nftFactory.deploy(deployer.address);

  await nft.waitForDeployment();

  console.log(`NFT contract deployed to: ${nft.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
