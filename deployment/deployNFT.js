/**
 * @file This script deploys the NFT42 contract to the configured network.
 * It also saves the deployment information to a file for later use by the
 * verification script.
 */
import pkg from "hardhat";
const { ethers } = pkg;
import fs from "fs";
import path from "path";

async function main() {
  // 1. Get the deployer account
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("Deploying NFT contract with the account:", deployer.address);

  // 2. Define contract arguments and deploy
  const nftFactory = await ethers.getContractFactory("NFT42");
  const baseURI = "https://gateway.pinata.cloud/ipfs/bafkreibn7tml7cewx4xsqxe4d42jmpga5zzy5ioylh77qm4xwt2enrrbrm";
  const nft = await nftFactory.deploy(deployer.address, baseURI);

  await nft.waitForDeployment();

  const contractAddress = nft.target;
  console.log(`NFT contract deployed to: ${contractAddress}`);

  // 3. Display BscScan URL for easy access
  if (network.name === "bscTestnet" || network.chainId === 97) {
    console.log(
      `Verify on BscScan: https://testnet.bscscan.com/address/${contractAddress}`
    );
  }

  // 4. Save deployment info for the verification script
  const deploymentInfo = {
    contractAddress: contractAddress,
    deployerAddress: deployer.address,
    baseURI: baseURI,
  };
  fs.writeFileSync(
    path.join(process.cwd(), ".deployment-info-nft.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
