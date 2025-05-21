// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {CrowdFunding} from "src/CrowdFunding.sol";

contract testCrowdFunding is Test {
    CrowdFunding public crowdFunding;
    address public owner;
    address public user;
    address public creator;
    address public user2;

    // Add receive function to allow the contract to receive ETH
    receive() external payable {}

    function setUp() public {
        owner = address(this);
        user = makeAddr("user");
        user2 = makeAddr("user2");
        creator = makeAddr("creator");
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

    function testValidateCampaignExistsSuccess() public {
        vm.prank(creator);
        crowdFunding.createCampaign("Test", 1 ether, "desc", 7);

        vm.prank(user);
        vm.deal(user, 1 ether);
        crowdFunding.contribute{value: 1 ether}(0);
    }

    function testValidateCampaignExistsReverts() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.contribute{value: 1 ether}(999);
    }

    function testCreateCampaignRevertDurattionCantBeZero() public {
        vm.prank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__DurationMustBeGreaterThanZero.selector);
        crowdFunding.createCampaign("Test", 1 ether, "desc", 0);
    }

    function testCreateCampaignRevertDurattionTooLong() public {
        vm.prank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__DurationTooLong.selector);
        crowdFunding.createCampaign("Test", 1 ether, "desc", 530);
    }

    function testCreateCampaignRevertGoalTooLow() public {
        vm.prank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__GoalTooLow.selector);
        crowdFunding.createCampaign("Test", 0.5 ether, "desc", 7);
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

    function testContributeRevertValueMustBeGreaterThanZero() public {
        vm.prank(user);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.expectRevert(CrowdFunding.CrowdFunding__ValueMustBeGreaterThanZero.selector);
        crowdFunding.contribute{value: 0 ether}(0);
    }

    function testWithdraw() public {
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        vm.deal(user, 15 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 12 ether}(0);
        vm.stopPrank();

        vm.warp(8 days);

        uint256 creatorBalanceBefore = creator.balance;
        uint256 ownerBalanceBefore = owner.balance;

        CrowdFunding.Campaign memory campaignBefore = crowdFunding.getCampaign(0);
        assertEq(campaignBefore.raised, 12 ether);

        vm.prank(creator);
        crowdFunding.withdraw(0);

        uint256 feeAmount = (12 ether * 3) / 100; // 3% fee
        uint256 expectedCreatorAmount = 12 ether - feeAmount;

        assertEq(creator.balance, creatorBalanceBefore + expectedCreatorAmount);
        assertEq(owner.balance, ownerBalanceBefore + feeAmount);

        CrowdFunding.Campaign memory campaignAfter = crowdFunding.getCampaign(0);
        assertEq(campaignAfter.raised, 0);
        assertEq(uint256(campaignAfter.state), uint256(CrowdFunding.States.Succesful));
    }

    function testWithdrawRevertsWhenNotOwner() public {
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        vm.deal(user, 15 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 12 ether}(0);
        vm.stopPrank();

        vm.warp(8 days);

        vm.prank(user);
        vm.expectRevert(CrowdFunding.CrowdFunding__OnlyOwnerOfCampaignCanWithdraw.selector);
        crowdFunding.withdraw(0);
    }

    function testWithdrawRevertsWhenCampaignStillActive() public {
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        vm.deal(user, 15 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 12 ether}(0);
        vm.stopPrank();

        vm.prank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__CamapignStillActive.selector);
        crowdFunding.withdraw(0);
    }

    function testWithdrawRevertsWhenNotEnoughRaised() public {
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        vm.deal(user, 5 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 5 ether}(0);
        vm.stopPrank();

        vm.warp(8 days);

        vm.prank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__NotEnoughMoneyRaised.selector);
        crowdFunding.withdraw(0);
    }

    function testRefund() public {
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 15 ether, "Description here", 7);
        vm.stopPrank();

        vm.deal(user, 15 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 12 ether}(0);
        vm.stopPrank();

        vm.warp(block.timestamp + 8 days);
        uint256 amountBefore = user.balance;
        vm.prank(user);
        crowdFunding.refund(0);
        uint256 amountAfter = user.balance;
        assertEq(amountAfter, amountBefore + 12 ether);
    }

    function testRefundRevertCamapignStillActive() public {
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        vm.deal(user, 10 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 10 ether}(0);
        vm.stopPrank();

        vm.warp(6 days);
        vm.prank(user);
        vm.expectRevert(CrowdFunding.CrowdFunding__CamapignStillActive.selector);
        crowdFunding.refund(0);
    }

    function testRefundRevertCampaingRaisedEnoughMoney() public {
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        vm.deal(user, 15 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 12 ether}(0);
        vm.stopPrank();

        vm.warp(block.timestamp + 8 days);

        vm.prank(user);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaingRaisedEnoughMoney.selector);
        crowdFunding.refund(0);
    }

    function testRefundRevertNothingToRefund() public {
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        vm.deal(user, 15 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 5 ether}(0);
        vm.stopPrank();

        vm.warp(block.timestamp + 8 days);

        vm.deal(user2, 1 ether);

        vm.prank(user2);
        vm.expectRevert(CrowdFunding.CrowdFunding__NothingToRefund.selector);
        crowdFunding.refund(0);
    }

    function testGetContribution() public {
        // Create a campaign
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        // Contribute to the campaign
        vm.deal(user, 5 ether);
        vm.startPrank(user);
        crowdFunding.contribute{value: 5 ether}(0);
        vm.stopPrank();

        // Test getContribution for contributor
        uint256 contribution = crowdFunding.getContribution(0, user);
        assertEq(contribution, 5 ether);

        // Test getContribution for non-contributor
        contribution = crowdFunding.getContribution(0, user2);
        assertEq(contribution, 0);
    }

    function testGetCampaignCount() public {
        // Test initial campaign count
        uint256 count = crowdFunding.getCampaignCount();
        assertEq(count, 0);

        // Create a campaign
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign", 10 ether, "Description here", 7);
        vm.stopPrank();

        // Test campaign count after creating one campaign
        count = crowdFunding.getCampaignCount();
        assertEq(count, 1);

        // Create another campaign
        vm.startPrank(creator);
        crowdFunding.createCampaign("Test Campaign 2", 15 ether, "Description here 2", 7);
        vm.stopPrank();

        // Test campaign count after creating two campaigns
        count = crowdFunding.getCampaignCount();
        assertEq(count, 2);
    }

    function testGetOwner() public {
        // Test that getOwner returns the correct owner
        address contractOwner = crowdFunding.getOwner();
        assertEq(contractOwner, owner);
    }
}
