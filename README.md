# MyToken ERC-20 Token Documentation

## Overview

"MyToken" is an ERC-20 compliant token developed on the Ethereum blockchain. It features basic token functionalities such as transfer, minting, and allowance checks, along with extended features including pausing the contract and setting rewards for block miners.

## Contract Functionalities

### Constructor

- Initializes the token with a name, symbol, and total supply.
- Mints the total supply to the contract deployer's address.

### Transfer

- Allows token holders to transfer tokens to another address.

### Minting

- Allows the contract owner to mint new tokens to a specified address.

### Setting Block Rewards

- Enables the contract owner to set rewards for miners who mine new blocks.

### Pausing the Contract

- The contract can be paused or unpaused by the owner, restricting token transfers while paused.

### Destruction

- Allows the contract owner to destroy the contract, removing it from the blockchain.

## Deployment Process

1. Compile the smart contract using Hardhat: `npx hardhat compile`.
2. Deploy to the desired network (e.g., Rinkeby testnet) using Hardhat: `npx hardhat run scripts/deploy.js --network rinkeby`.
3. Verify the contract on Etherscan for public transparency and interaction.

## Test Cases and Outcomes

Tests were conducted to ensure the contract behaves as expected, including:

- Deployment assigns the total supply to the owner.
- Tokens can be transferred between accounts.
- Only the owner can mint new tokens.
- The contract can be paused and unpaused, restricting transfers when paused.
- Setting block rewards and contract destruction are restricted to the owner.

Outcome: All tests passed, except for the "assign the total supply to the owner" due to an environment configuration issue with the `ethers` library in the testing suite.

## Interacting with MyToken

Interactions can be performed using Ethereum wallets like MetaMask or programmatically through Ethereum libraries such as ethers.js or web3.js. Common interactions include transferring tokens, approving allowances, and querying balances and allowances.

## Deployed Addresses

- Contract Address on Rinkeby: `0x84f83cce4cafbbcd1c6fb4aa7e2c784e241a0bdf`

## Version Control System Repository

- GitHub Repository URL: `https://github.com/Ozzy0153/lab4-ERC-20`

## Conclusion

"MyToken" demonstrates the core functionalities expected of an ERC-20 token, with additional features that enhance its utility and governance. The project's codebase, including deployment scripts and tests, is hosted on GitHub, providing a comprehensive toolkit for further development and deployment on the Ethereum network.
