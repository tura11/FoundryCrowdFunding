## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.aCrowdFunding Smart Contract
Overview
The CrowdFunding smart contract is a decentralized crowdfunding platform built on Ethereum using Solidity. It allows users to create crowdfunding campaigns, contribute Ether to campaigns, withdraw funds if the campaign succeeds, and request refunds if the campaign fails to meet its goal. The contract incorporates a 3% fee on successful campaigns, which is sent to the contract owner, and includes security features like reentrancy protection using OpenZeppelin's ReentrancyGuard.
Features

Create Campaigns: Users can create campaigns with a title, funding goal (minimum 1 ETH), description, and duration (up to 365 days).
Contribute to Campaigns: Users can contribute Ether to active campaigns, except to their own campaigns.
Withdraw Funds: Campaign creators can withdraw funds after the campaign duration if the funding goal is met, with a 3% fee sent to the contract owner.
Refund Contributions: Contributors can request refunds if the campaign ends without meeting its goal.
Getter Functions: Retrieve campaign details, contribution amounts, campaign count, and contract owner.
Security: Uses OpenZeppelin's ReentrancyGuard to prevent reentrancy attacks and includes various validation checks (e.g., campaign existence, duration, and goal).

Contract Details

Solidity Version: ^0.8.28
Dependencies: OpenZeppelin Contracts (ReentrancyGuard)
License: MIT
Constants:
FEE: 3% (applied to successful campaign withdrawals)
MAX_DURATION: 365 days
MIN_CAMPAIGN_GOAL: 1 ETH



Prerequisites

Node.js: For installing dependencies (if needed).
Foundry: For compiling, testing, and deploying the smart contract.
Solidity: Version 0.8.28 or compatible.
Ethereum Wallet: For deployment and interaction (e.g., MetaMask).
Ether: For testing and deployment on testnets.

Installation

Clone the Repository:
git clone https://github.com/your-username/crowdfunding.git
cd crowdfunding


Install Foundry (if not already installed):
curl -L https://foundry.paradigm.xyz | bash
foundryup


Install Dependencies:The contract uses OpenZeppelin’s ReentrancyGuard. Install it via Forge:
forge install OpenZeppelin/openzeppelin-contracts@v5.0.2 --no-commit


Update foundry.toml (if not already configured):Ensure the remappings section includes:
[profile.default]
src = 'src'
out = 'out'
libs = ['lib']
remappings = ['@openzeppelin/contracts=lib/openzeppelin-contracts/contracts']



Usage
Compile the Contract
Compile the smart contract using Foundry:
forge build

Run Tests
The project includes a comprehensive test suite in test/CrowdFundingTest.t.sol. Run the tests with:
forge test

To view test coverage:
forge coverage

The test suite covers:

Campaign creation and validation (duration, goal, existence).
Contribution logic (including reverts for invalid contributions).
Withdrawal logic (including reverts for unauthorized or premature withdrawals).
Refund logic (including reverts for invalid refunds).
Getter functions (getCampaign, getContribution, getCampaignCount, getOwner).

Note: The tests intentionally skip coverage for CrowdFunding__TransactionFailed reverts to avoid complex setup for simulating failed external calls.
Deploy the Contract
Deploy the contract to a testnet (e.g., Sepolia) using Foundry. Example:
forge create --rpc-url <YOUR_RPC_URL> --private-key <YOUR_PRIVATE_KEY> src/CrowdFunding.sol:CrowdFunding

Replace <YOUR_RPC_URL> and <YOUR_PRIVATE_KEY> with your Ethereum node URL and private key.
Interact with the Contract
You can interact with the deployed contract using:

Foundry's cast: For command-line interaction.cast call <CONTRACT_ADDRESS> "getOwner()(address)"


Ethers.js/Web3.js: For programmatic interaction.
Frontend DApp: Build a frontend using React or similar to interact with the contract.

Testing Details
The test suite (test/CrowdFundingTest.t.sol) uses Foundry’s testing framework and includes 17 test functions:

Campaign Creation: Tests campaign creation, including reverts for zero duration, duration too long, and goal too low.
Contributions: Tests contribution logic, including reverts for contributing to own campaign, ended campaigns, or zero-value contributions.
Withdrawals: Tests withdrawal logic, including reverts for non-owners, active campaigns, or insufficient funds.
Refunds: Tests refund logic, including reverts for active campaigns, successful campaigns, or no contributions.
Getters: Tests getContribution, getCampaignCount, and getOwner functions.

Coverage: The test suite achieves near-100% line and function coverage, except for branches related to CrowdFunding__TransactionFailed reverts, as per project requirements.

Security Considerations

Reentrancy Protection: Uses ReentrancyGuard for withdraw and refund functions.
Input Validation: Enforces minimum campaign goal, maximum duration, and campaign existence.
Access Control: Restricts withdrawals to campaign creators and ensures contributors cannot contribute to their own campaigns.
Gas Optimization: Uses custom errors and immutable variables (e.g., owner).

Future Improvements

Add events for more granular tracking of state changes.
Implement a pause mechanism for emergency stops.
Support for ERC20 tokens in addition to Ether.
Add a frontend interface for user-friendly interaction.

Contributing
Contributions are welcome! Please:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License. See the SPDX-License-Identifier: MIT in the contract source for details.
Contact
For questions or support, open an issue on the repository or contact the maintainer at your-email@example.com.

Built with ❤️ using Solidity and Foundry.


## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
