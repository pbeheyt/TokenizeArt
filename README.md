# TokenizeArt: pbeheyt Art 42 (PBA42)

This repository contains the full implementation for the `TokenizeArt` project from École 42, featuring a BEP-721 compliant Non-Fungible Token (NFT). The smart contract is deployed and verified on the BNB Smart Chain Testnet, with all metadata and artwork stored on IPFS.

This project builds upon the same professional Hardhat and Docker environment established in the `Tokenizer` (BEP-20) project, ensuring a robust and reproducible workflow.

**Key Documentation**:
-   [**FULL TUTORIAL**](documentation/TUTORIAL.md): A complete, step-by-step guide on project setup, configuration, and minting.
-   [**SOLIDITY GUIDE**](documentation/SOLIDITY_GUIDE.md): A detailed breakdown of the `NFT42.sol` smart contract.
-   [**JS SCRIPTS GUIDE**](documentation/JS_SCRIPTS_GUIDE.md): An explanation of the automated deployment and verification scripts.

---

## Deployment Details

-   **Network**: BNB Smart Chain Testnet
-   **NFT Contract Address**: `0x5E4b723c5f6053dC9B62601FB97D20d5B6257aCE`
-   **BscScan Link**: [**View Verified Contract**](https://testnet.bscscan.com/address/0x5E4b723c5f6053dC9B62601FB97D20d5B6257aCE)
-   **Metadata**: The metadata for all tokens is permanently stored on IPFS and can be viewed here: [View Metadata](https://gateway.pinata.cloud/ipfs/bafkreibn7tml7cewx4xsqxe4d42jmpga5zzy5ioylh77qm4xwt2enrrbrm)

---

## Technical Architecture & Justifications

The technology stack was selected to align with industry best practices for security, reliability, and decentralization.

### Blockchain & Framework: BNB Smart Chain & Hardhat
The project is built on the BNB Smart Chain for its EVM compatibility and performance. The Hardhat framework was used to manage the entire development lifecycle, from local testing with a comprehensive test suite to repeatable deployments and automated contract verification.

### Contract Standard & Security: OpenZeppelin
Security is paramount. The contract inherits from OpenZeppelin's professionally audited base contracts to ensure robustness and prevent common vulnerabilities.
-   **`ERC721.sol`**: Provides a standard-compliant BEP-721 implementation, ensuring the NFT is compatible with all ecosystem tools (wallets, marketplaces, etc.).
-   **`Ownable.sol`**: Establishes a secure ownership model where only the contract deployer (the "owner") has the privilege to mint new NFTs, fulfilling a key security requirement of the project.

### Decentralized Storage: IPFS
As required by the subject, all off-chain data (the artwork and the JSON metadata) is stored on the **InterPlanetary File System (IPFS)** via the Pinata pinning service. This choice is critical for ensuring the NFT's longevity and censorship resistance. Unlike a traditional server that can be shut down, IPFS is a distributed network, meaning the NFT's data will remain accessible as long as at least one node in the network is hosting it. The smart contract stores an immutable `ipfs://` link to this data, creating a permanent and trustless bond between the on-chain token and its off-chain assets.

---

## Docker-Based Workflow

This project is fully containerized using Docker, ensuring a consistent and reproducible development environment. A `Makefile` provides simple commands to manage the entire workflow.

**Prerequisites**:
-   Docker must be installed and running.

**Usage**:

1.  **Build and Start the Service**: Builds the Docker image and starts the container. Run this once initially.
    ```shell
    make build
    ```

2.  **Core Commands**:
    -   `make compile`: Compiles smart contracts.
    -   `make test`: Runs the automated test suite.
    -   `make deploy`: Deploys the contract to BNB Testnet and saves deployment info.
    -   `make verify`: Verifies the deployed contract on BscScan using the saved info.
    -   `make mint`: Mints a new NFT from the deployed contract to the owner's address.
    -   `make shell`: Opens an interactive shell inside the container.

3.  **Stop the Service**: Stops and removes the container.
    ```shell
    make clean
