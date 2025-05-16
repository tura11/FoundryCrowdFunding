// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {CrowdFunding} from "src/CrowdFunding.sol";

contract testCrowdFunding is Test {
    CrowdFunding public crowdFunding;

    function setUp() public {
        crowdFunding = new CrowdFunding();
    }

    function testCreateCampaignAddsToCampaignsArray() public {
        string memory title = "Test Campaign";
        string memory description = "Description here";
        uint256 goal = 10 ether;

        crowdFunding.createCampaign(title, goal, description);

        (
            string memory _title,
            uint256 _goal,
            uint256 _raised,
            uint256 _duration,
            string memory _description,
            address creator,
            CrowdFunding.States state
        ) = crowdFunding.campaigns(0);

        assertEq(_title, title);
        assertEq(_goal, goal);
        assertEq(_raised, 0);
        assertEq(_description, description);
        assertEq(creator, address(this));
        assertGt(_duration, block.timestamp);
        assertEq(uint(state), uint(CrowdFunding.States.Active));
    }
}
