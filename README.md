# TokenizeArt: pbeheyt Art 42 (PBA42)

This repository contains the full implementation for the `TokenizeArt` project from École 42, featuring a BEP-721 compliant Non-Fungible Token (NFT). The smart contract is deployed and verified on the BNB Smart Chain Testnet, with all metadata and artwork stored on IPFS.

This project builds upon the same professional Hardhat environment established in the `Tokenizer` (BEP-20) project.

**For a complete, step-by-step guide on how to set up the environment, deploy, and mint an NFT, please see the [FULL TUTORIAL](documentation/TUTORIAL.md).**

---

## NFT Details & Deployment

-   **Network**: BNB Smart Chain Testnet
-   **NFT Contract Address**: `0x5E4b723c5f6053dC9B62601FB97D20d5B6257aCE`
-   **BscScan Link**: [**View Verified Contract**](https://testnet.bscscan.com/address/0x5E4b723c5f6053dC9B62601FB97D20d5B6257aCE)
-   **Metadata**: The metadata for all tokens is permanently stored on IPFS and can be viewed here: [View Metadata](https://gateway.pinata.cloud/ipfs/bafkreibn7tml7cewx4xsqxe4d42jmpga5zzy5ioylh77qm4xwt2enrrbrm)

---

## Technical Architecture & Justifications

The technology stack is consistent with industry best practices for security and reliability in Web3 development.

### Blockchain & Framework: BNB Smart Chain & Hardhat
The project is built on the BNB Smart Chain for its EVM compatibility and performance. The Hardhat framework was used to manage the entire development lifecycle, from local testing with a comprehensive test suite to repeatable deployments and automated contract verification.

### Contract Standard & Security: OpenZeppelin
Security is paramount. The contract inherits from OpenZeppelin's professionally audited base contracts to ensure robustness and prevent common vulnerabilities.
-   **`ERC721.sol`**: Provides a standard-compliant BEP-721 implementation, ensuring the NFT is compatible with all ecosystem tools.
-   **`Ownable.sol`**: Establishes a secure ownership model where only the contract deployer (the "owner") has the privilege to mint new NFTs.
-   **`Counters.sol`**: Used to safely generate incremental and unique token IDs for each minted NFT, preventing potential re-entrancy issues with manual counters.

### Decentralized Storage: IPFS
As required, all off-chain data (the artwork and the JSON metadata) is stored on the InterPlanetary File System (IPFS) via the Pinata pinning service. This ensures the NFT's data is decentralized and persistent, not reliant on a central server that could go offline. The contract stores an immutable link to this IPFS data.

---

## Docker-Based Workflow

This project is fully containerized using Docker and Docker Compose, ensuring a consistent and reproducible development environment. A `Makefile` provides simple commands to manage the entire workflow.

**Prerequisites**:
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

**Usage**:

1.  **Build and Start the Service**: This command builds the Docker image and starts the container in the background. It only needs to be run once initially or after modifying `Dockerfile` or `package.json`.
    ```shell
    make build
    ```

2.  **Run Core Commands**:
    -   **Compile Contracts**: `make compile`
    -   **Run Automated Tests**: `make test`
    -   **Deploy to BNB Testnet**: `make deploy`
    -   **Open a Shell in the Container**: `make shell` (for running ad-hoc commands)

3.  **Stop the Service**: When you're done, this command stops and removes the container.
    ```shell
    make clean
    ```
