# Full Tutorial: From Zero to Deployed NFT

This document is a step-by-step technical guide for setting up the project environment, preparing metadata, deploying the NFT smart contract, and minting a token on the BNB Smart Chain Testnet.

## 1. Foundational Concepts

-   **Wallet (MetaMask)**: Your digital identity on the blockchain. It holds your keys, which are used to authorize transactions like deploying a contract or minting an NFT.
-   **Smart Contract**: The code defining our NFT collection, written in Solidity. It lives on the blockchain and enforces the rules of the NFT (e.g., who can mint, where to find the artwork).
-   **BEP-721 (NFT)**: The standard for Non-Fungible Tokens on BSC. "Non-Fungible" means each token is unique and has its own specific ID and metadata, like a numbered art print.
-   **IPFS (InterPlanetary File System)**: A decentralized network for storing files. We use it to store our artwork and metadata, ensuring they can't be taken down by a single entity.

## 2. Project Setup (Docker Workflow)

This project is fully containerized, meaning you do not need to install Node.js or any other dependencies on your local machine. The only prerequisites are Git and Docker.

1.  **Prerequisites**:
    -   **Git**: To clone the repository.
    -   **Docker Desktop**: Must be installed and running. Download from [docker.com](https://www.docker.com/).

2.  **Clone Repository**:
    ```shell
    git clone <your-repo-url> && cd TokenizeArt
    ```

3.  **Build and Start the Environment**:
    This single command builds the Docker image, starts the container, and installs all necessary dependencies *inside* the container. It's the only setup command you'll ever need.
    ```shell
    make build
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
    -   Use the official **BNB Chain Faucet** to receive testnet funds, as recommended in the project subjects. Link: [testnet.bnbchain.org/faucet-smart](https://testnet.bnbchain.org/faucet-smart).
    -   You may need to solve a captcha and paste your wallet's `0x...` address to receive tBNB.

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

## 6. Project Workflow via Makefile

The `Makefile` serves as the control panel for the entire project. All commands are run from the project root.

1.  **Compile the Smart Contract**:
    This command runs the Solidity compiler inside the Docker container.
    ```shell
    make compile
    ```

2.  **Run the Test Suite**:
    This executes the automated tests in `test/nft.test.js` to ensure the contract logic is secure and correct.
    ```shell
    make test
    ```

3.  **Deploy to BNB Testnet**:
    This is the command to publish your contract on the public test network.
    ```shell
    make deploy
    ```
    The output will be your deployed contract's address, which you will need for the next step.

## 7. Automated Verification, Minting, and Viewing

This section details the final steps using our professional, script-based workflow.

### Step 7.1: Verify the Contract on BscScan

Verification links your deployed bytecode to its source code, making the contract transparent and easy to interact with. Our project automates this process.

1.  **Deploy the Contract**: If you haven't already, run the deployment command.
    ```shell
    make deploy
    ```
    This will output the contract address and a link to BscScan.

2.  **Run Automated Verification**: Once the deployment transaction is confirmed on the blockchain (usually within a few seconds), run the verification command:
    ```shell
    make verify
    ```
    This command automatically retrieves the deployed contract's address and constructor arguments from the `.deployment-info-nft.json` file and submits them for verification.

### Step 7.2: Mint Your First NFT

Now that the contract is live and verified, you can mint your first token. There are two ways to do this: via the automated script (recommended for simplicity) or manually via BscScan (good for demonstration).

#### Method A: Using the Automated Script (Recommended)

This is the simplest and quickest method.

1.  **Run the Mint Command**: In your terminal, at the project root, simply run:
    ```shell
    make mint
    ```
2.  **Process**: The script will automatically read the deployed contract address, connect using your wallet, and call the `safeMint` function to send a new NFT to your own address.
3.  **Confirmation**: Wait for the script to display the confirmation message. Your NFT is now minted.

#### Method B: Manually on BscScan

This method is useful for demonstrating a deep understanding of contract interaction.

1.  **Navigate to BscScan**: Open the BscScan URL for your contract address.
2.  **Go to the "Contract" Tab**: You should see a green checkmark indicating the source code is verified.
3.  **Select "Write Contract"**: Click on the "Write Contract" sub-tab.
4.  **Connect Your Wallet**: Click the "Connect to Web3" button and connect the MetaMask wallet you used for deployment (the contract owner).
5.  **Execute `safeMint`**:
    -   Find the `safeMint` function in the list.
    -   In the `to (address)` input field, paste your own wallet address.
    -   Click the "Write" button and confirm the transaction in your MetaMask wallet.

### Step 7.3: Confirm Ownership and View Metadata

1.  **Confirm Ownership**:
    -   Navigate to the **"Read Contract"** sub-tab on BscScan.
    -   Find the `ownerOf` function.
    -   Enter `0` for the `tokenId` (since it's the first one you minted) and click "Query".
    -   The result should be the address you minted the NFT to.

2.  **View Metadata**:
    -   In the same "Read Contract" tab, find the `tokenURI` function.
    -   Enter `0` for the `tokenId` and click "Query".
    -   This will return your IPFS metadata URL (e.g., `https://gateway.pinata.cloud/ipfs/...`).
    -   Open this URL in a new browser tab. You will see the raw JSON metadata. The `image` field in this JSON contains the final IPFS link to your artwork.
