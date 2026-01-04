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

        MockUSDC usdc = new MockUSDC();
        //Mint 100k USDC
        usdc.mint(deployer, 100_000 * 10**6); 

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
    //forge coverage exclude
    function test() public {}
}

//Mock USDC Address:      0x5FbDB2315678afecb367f032d93F642f64180aa3
//CrowdFunding Address:   0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0