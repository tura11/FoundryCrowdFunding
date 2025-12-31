// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {
        // Mint 1 million USDC (6 decimals)
        _mint(msg.sender, 1_000_000 * 10**6);
    }

    // Override decimals function
    function decimals() public pure override returns (uint8) {
        return 6;
    }

    // Mint function for testing
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function test() public {}
}