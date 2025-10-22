/**
 * @file This script mints a new NFT from the deployed NFT42 contract.
 * It reads the deployed contract's address from the .deployment-info-nft.json file
 * and calls the safeMint function, sending the new NFT to the deployer's address.
 */
import pkg from "hardhat";
const { ethers } = pkg;
import fs from "fs";
import path from "path";

async function main() {
  // 1. Get the account that will execute the minting transaction
  const [deployer] = await ethers.getSigners();
  console.log(`Using account: ${deployer.address}`);

  // 2. Read the deployed contract's address from the JSON artifact
  let contractAddress;
  try {
    const filePath = path.join(process.cwd(), ".deployment-info-nft.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const deploymentInfo = JSON.parse(fileContent);
    contractAddress = deploymentInfo.contractAddress;
  } catch (error) {
    console.error(
      "Error: Could not read deployment info. Please run the 'deploy' script first."
    );
    process.exit(1);
  }

  if (!contractAddress) {
    console.error("Error: Invalid contract address found in .deployment-info-nft.json");
    process.exit(1);
  }

  console.log(`Targeting contract at address: ${contractAddress}`);

  // 3. Get an instance of the deployed contract
  // getContractAt allows us to interact with a contract that is already deployed
  const nftContract = await ethers.getContractAt("NFT42", contractAddress);

  // 4. Call the safeMint function and wait for the transaction to be mined
  const recipientAddress = deployer.address; // Minting the NFT to our own address
  console.log(`Attempting to mint a new NFT to: ${recipientAddress}...`);

  try {
    const tx = await nftContract.safeMint(recipientAddress);
    console.log(`Transaction sent with hash: ${tx.hash}`);
    console.log("Waiting for transaction confirmation...");

    const receipt = await tx.wait();
    
    // Check if the transaction was successful
    if (receipt.status === 1) {
      console.log("Transaction confirmed successfully!");
      console.log(`NFT minted to address: ${recipientAddress}`);
    } else {
      console.error("Transaction failed. Please check the transaction on BscScan.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error during minting process:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
