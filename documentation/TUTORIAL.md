# Full Tutorial: From Zero to Deployed NFT

This document is a step-by-step technical guide for setting up the project environment, preparing metadata, deploying the NFT smart contract, and minting a token on the BNB Smart Chain Testnet.

## 1. Foundational Concepts

-   **Wallet (MetaMask)**: Your digital identity on the blockchain. It holds your keys, which are used to authorize transactions like deploying a contract or minting an NFT.
-   **Smart Contract**: The code defining our NFT collection, written in Solidity. It lives on the blockchain and enforces the rules of the NFT (e.g., who can mint, where to find the artwork).
-   **BEP-721 (NFT)**: The standard for Non-Fungible Tokens on BSC. "Non-Fungible" means each token is unique and has its own specific ID and metadata, like a numbered art print.
-   **IPFS (InterPlanetary File System)**: A decentralized network for storing files. We use it to store our artwork and metadata, ensuring they can't be taken down by a single entity.

## 2. Local Environment Setup

1.  **Install Node.js**: Requires Node.js (v18+). Download from [nodejs.org](https://nodejs.org/).
2.  **Clone Repository**: `git clone <your-repo-url> && cd TokenizeArt`
3.  **Install Dependencies**: Downloads all project tools (Hardhat, ethers.js, etc.).
    ```shell
    npm install
    ```

## 3. Wallet Setup & Funding

A dedicated wallet for development is a security best practice.

1.  **Install MetaMask**: Add the extension from [metamask.io](https://metamask.io/).
2.  **Create a New Wallet**:
    -   Choose "Create a new wallet".
    -   **Secure the Secret Recovery Phrase**: Write down the 12-word phrase on paper. This is the master key to the wallet and is required for recovery on any device.
3.  **Add BNB Testnet**:
    -   In MetaMask, go to "Add network" -> "Add a network manually".
    -   Enter this configuration:
        -   **Network Name**: `BNB Smart Chain Testnet`
        -   **New RPC URL**: `https://data-seed-prebsc-1-s1.bnbchain.org:8545/`
        -   **Chain ID**: `97`
        -   **Currency Symbol**: `tBNB`
        -   **Block explorer URL**: `https://testnet.bscscan.com`
4.  **Acquire Testnet Funds (tBNB)**:
    -   Use a developer-friendly faucet like the **Triangle Platform Faucet**: [faucet.triangleplatform.com/bnb/testnet](https://faucet.triangleplatform.com/bnb/testnet).
    -   Paste your wallet's `0x...` address to receive funds.

## 4. Preparing Artwork and Metadata

This is the "Art" in `TokenizeArt`.

1.  **Create the Image**: Design an image that includes the number "42". Save it as a `.png` or `.jpg`.
2.  **Create the Metadata File**: Create a text file named `metadata.json` with the following structure. The `name` must contain "42" and the `Artist` must be your login.
    ```json
    {
      "name": "Your NFT Name 42",
      "description": "Your NFT Description.",
      "image": "ipfs://YOUR_IMAGE_CID_WILL_GO_HERE",
      "attributes": [
        {
          "trait_type": "Artist",
          "value": "your_login"
        }
      ]
    }
    ```
3.  **Upload to IPFS (via Pinata)**:
    -   Create a free account at [pinata.cloud](https://www.pinata.cloud/).
    -   **First, upload your image file.** After it uploads, Pinata will give you a **CID** (Content Identifier). Copy this CID.
    -   **Update your `metadata.json` file**: Paste the image CID into the `image` field.
    -   **Second, upload the updated `metadata.json` file.** Pinata will give you a new CID for this file. **This final CID is your `baseURI`**.

## 5. Project Configuration (`.env`)

Secret keys are managed via a `.env` file, which is excluded from version control.

1.  **Create the file**: In the project root, create a file named `.env`.
2.  **Add content**:
    ```env
    BSC_TESTNET_RPC_URL="https://data-seed-prebsc-1-s1.bnbchain.org:8545/"
    PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
    ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
    ```
3.  **Set `PRIVATE_KEY`**: In MetaMask: `(⋮) Menu` -> `Account details` -> `Show private key`. Copy/paste the value.
4.  **Set `ETHERSCAN_API_KEY`**: Create an account at [etherscan.io](https://etherscan.io/) -> `API Keys` -> create a new key. Copy/paste the value.

## 6. Development & Deployment

1.  **Compile**: `npx hardhat compile`
2.  **Test**: `npx hardhat test`
3.  **Deploy**: This command publishes your contract to the BNB Testnet. It uses the IPFS URI you prepared.
    ```shell
    npx hardhat run deployment/deployNFT.js --network bscTestnet
    ```
    The output will be your deployed contract's address.

## 7. Verification, Minting, and Viewing

1.  **Run Verification**: This makes your contract readable on BscScan. You need the contract address from the deploy step, your wallet address, and your IPFS metadata URL.
    ```shell
    # Replace placeholders with your actual data
    npx hardhat verify --network bscTestnet <YOUR_CONTRACT_ADDRESS> <YOUR_WALLET_ADDRESS> "https://gateway.pinata.cloud/ipfs/<YOUR_METADATA_CID>"
    ```
2.  **Mint Your First NFT**:
    -   Go to your verified contract on BscScan and open the **"Write Contract"** tab.
    -   Connect your MetaMask wallet.
    -   Find the `safeMint` function.
    -   In the `to (address)` field, paste your own wallet address.
    -   Click "Write" and confirm the transaction in MetaMask.
3.  **View Your NFT (The Foolproof Way)**:
    -   On BscScan, go to the **"Read Contract"** tab.
    -   Use the `tokenURI` function with `tokenId` 0. It will return your IPFS metadata URL.
    -   Open this URL in a new tab. You will see the raw JSON.
    -   This JSON contains another IPFS link for the `image`. Open *that* link to see your artwork, served directly from the decentralized web.