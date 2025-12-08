// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/CrowdFunding.sol";
import {MockUSDC} from "../Mock/ERC20Mock.sol";

contract DeployCrowdfunding is Script {
    MockUSDC usdc;
    function run() external {
        vm.startBroadcast();

        MockUSDC usdc = new MockUSDC();

        vm.stopBroadcast();
    }
}
