// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/CrowdFunding.sol";

contract DeployCrowdFunding is Script {
    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        //ERC20Mock token contract address
        CrowdFunding crowdFunding = new CrowdFunding(0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9);
        
        vm.stopBroadcast();
        
        console.log("===========================================");
        console.log("CrowdFunding Contract Deployed!");
        console.log("===========================================");
        console.log("Contract Address:", address(crowdFunding));
        console.log("Deployer Address:", vm.addr(deployerPrivateKey));
        console.log("===========================================");
        
    }
}

//contract address 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512