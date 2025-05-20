// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {CrowdFunding} from "src/CrowdFunding.sol";

contract testCrowdFunding is Test {
    CrowdFunding public crowdFunding;
    address public owner;
    address public user;
   

    function setUp() public {
        
        owner = address(this);
        user = makeAddr("user");
        vm.startPrank(owner);
        crowdFunding = new CrowdFunding();
        vm.stopPrank();

    }

    function testCreateCampaignAddsToCampaignsArray() public {
        string memory title = "Test Campaign";
        string memory description = "Description here";
        uint256 goal = 10 ether;
        uint256 durationInDays = 7;

        crowdFunding.createCampaign(title, goal, description, durationInDays);

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
        assertEq(_duration, block.timestamp + (durationInDays * 1 days));
        assertEq(uint256(state), uint256(CrowdFunding.States.Active));
    }


    function testConstructor() public {
        assertEq(owner, address(this));
    }


    function testContribute() public {
        vm.prank(user);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        crowdFunding.contribute{value: 10 ether}(0);
        CrowdFunding.Campaign memory c = crowdFunding.getCampaign(0);
        assertEq(c.raised, 10 ether);
    }


    function testContributeRevertCantContrubuteYourOwnCamapign() public {
        vm.prank(owner);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.expectRevert(CrowdFunding.CrowdFunding__YouCantContriuteYourOwnCampaign.selector);
        crowdFunding.contribute{value: 10 ether}(0);
    }


    function testContributeRevertCamapingHasEnded() public {
        vm.prank(user);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 1);
        vm.warp(2 days);
        vm.expectRevert(CrowdFunding.CrowdFunding__CamapignHasEnded.selector);
        crowdFunding.contribute{value: 10 ether}(0);
    }

    



}
