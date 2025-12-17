// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/CrowdFunding.sol";
import {MockUSDC} from "../Mock/ERC20Mock.sol";
contract DeployLocal is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy mock USDC
        MockUSDC usdc = new MockUSDC();

        // Mint sobie dużo USDC do testów (opcjonalnie, ale super przydatne)
        usdc.mint(deployer, 100_000 * 10**6); // 100 000 USDC

        // 2. Deploy CrowdFunding z adresem naszego mock USDC
        CrowdFunding crowdFunding = new CrowdFunding(address(usdc));

        vm.stopBroadcast();

        console.log("===========================================");
        console.log("LOCAL DEPLOY (Anvil) - SUCCESS!");
        console.log("===========================================");
        console.log("Mock USDC Address:     ", address(usdc));
        console.log("CrowdFunding Address:  ", address(crowdFunding));
        console.log("Deployer Address:      ", deployer);
        console.log("USDC Balance (deployer):", usdc.balanceOf(deployer) / 10**6, "USDC");
        console.log("===========================================");
    }
}