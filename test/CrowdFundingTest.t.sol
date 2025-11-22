// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {CrowdFunding} from "src/CrowdFunding.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

contract testCrowdFunding is Test {

    CrowdFunding public crowdFunding;
    ERC20Mock public usdc;

    address owner;
    address creator;
    address contributor1;
    address contributor2;

    uint256 constant INITIAL_BALANCE = 10_000 * 10**6;
    uint256 constant CAMPAIGN_GOAL = 1_000 * 10**6;
    uint256 constant CAMPAIGN_DURATION = 365 days;

    function setUp() public {
        owner = address(this);
        creator = makeAddr("creator");
        contributor1 = makeAddr("contributor1");
        contributor2 = makeAddr("contributor2");

        usdc = new ERC20Mock();
        crowdFunding = new CrowdFunding(address(usdc));

        usdc.mint(creator, INITIAL_BALANCE);
        usdc.mint(contributor1, INITIAL_BALANCE);
        usdc.mint(contributor2, INITIAL_BALANCE);
    }

    function testConstructor() public {
        assertEq(crowdFunding.owner(), address(this));
        assertEq(crowdFunding.getUSDCAddress(), address(usdc));
    }

    function test_CreateCampaign_Success() public {
        vm.startPrank(creator);
        
        // Create tiers
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](2);
        tiers[0] = CrowdFunding.RewardTier({
            name: "Bronze",
            description: "Basic rewards",
            minContribution: 10 * 10**6, //10 USDC
            maxBackers: 100,
            currentBackers: 0
        });
        tiers[1] = CrowdFunding.RewardTier({
            name: "Gold",
            description: "Premium rewards",
            minContribution: 50 * 10**6, //50 USDC
            maxBackers: 50,
            currentBackers: 0
        });
        
        // Create milestones
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone({
            description: "First milestone",
            percentage: 50,
            deadline: block.timestamp + 400 days,
            votesFor: 0,
            votesAgainst: 0,
            approved: false,
            fundsReleased: false
        });
        milestones[1] = CrowdFunding.Milestone({
            description: "Second milestone",
            percentage: 50,
            deadline: block.timestamp + 430 days,
            votesFor: 0,
            votesAgainst: 0,
            approved: false,
            fundsReleased: false
        });
        
        vm.expectEmit(true, true, false, true);
        emit CrowdFunding.CampaignCreated(
            0,
            creator,
            "Test Campaign",
            CAMPAIGN_GOAL,
            block.timestamp + CAMPAIGN_DURATION
        );
        
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            365, // 365 days
            tiers,
            milestones
        );
        
        vm.stopPrank();
        
        // Verify campaign
        CrowdFunding.Campaign memory campaign = crowdFunding.getCampaign(0);
        assertEq(campaign.title, "Test Campaign");
        assertEq(campaign.goal, CAMPAIGN_GOAL);
        assertEq(campaign.raised, 0);
        assertEq(campaign.creator, creator);
        assertEq(uint(campaign.state), uint(CrowdFunding.States.Active));
        assertEq(campaign.fundsWithdrawn, false);
        
        // Verify campaign count
        assertEq(crowdFunding.getCampaignCount(), 1);
    }

    // ============================
    //       CAMPAIGN REVERTS
    // ============================


    function testCreateCampaignRevertsDurationTooLong() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        vm.expectRevert(CrowdFunding.CrowdFunding__DurationTooLong.selector);
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            366, // 366 days
            tiers,
            milestones
        );
        vm.stopPrank();
    }

    function testCreateCampaingRevertDurationMustBeGraterThanZero() public {
           vm.startPrank(creator);
           CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
           CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
           vm.expectRevert(CrowdFunding.CrowdFunding__DurationMustBeGreaterThanZero.selector);
           crowdFunding.createCampaign(
               "Test Campaign",
               CAMPAIGN_GOAL,
               "Test Description",
               0, // 0 days
               tiers,
               milestones
           );
           vm.stopPrank();
    }

    function testCreateCampaignRevertGoalTooLow() public {
        uint256 campaingGoal = 10 * 10**6;
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        vm.expectRevert(CrowdFunding.CrowdFunding__GoalTooLow.selector);
        crowdFunding.createCampaign(
            "Test Campaign",
            campaingGoal,
            "Test Description",
            1, // 1 day
            tiers,
            milestones
        );
        vm.stopPrank();
    }

    function testCreateCampaginRevertsTitleTooLong() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        vm.expectRevert(CrowdFunding.CrowdFunding__TitleTooLong.selector);
        crowdFunding.createCampaign(
            "A highly extended crowdfunding campaign title intentionally crafted to exceed the typical two-hundred-character limit in order to thoroughly test input validation and ensure that long strings are properly rejected by the smart contract logic",
            CAMPAIGN_GOAL,
            "Test Description",
            1, // 1 day
            tiers,
            milestones
        );
        vm.stopPrank();
    }
    
    function testCreateCampaignRevertsDescriptionTooLong() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        vm.expectRevert(CrowdFunding.CrowdFunding__DescriptionTooLong.selector);
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "This campaign description is intentionally written to surpass two hundred characters, allowing you to verify that your smart contract correctly enforces maximum string length restrictions and triggers the appropriate custom error when oversized input is submitted ",
            1, // 1 day
            tiers,
            milestones
        );
    }





    // ============================
    //       HELPER FUNCTIONS
    // ============================

      function _createDefaultTiers() internal pure returns (CrowdFunding.RewardTier[] memory) {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](2);
        tiers[0] = CrowdFunding.RewardTier({
            name: "Bronze",
            description: "Basic rewards",
            minContribution: 10 * 10**6,
            maxBackers: 100,
            currentBackers: 0
        });
        tiers[1] = CrowdFunding.RewardTier({
            name: "Gold",
            description: "Premium rewards",
            minContribution: 50 * 10**6,
            maxBackers: 50,
            currentBackers: 0
        });
        return tiers;
    }
    
    function _createDefaultMilestones() internal view returns (CrowdFunding.Milestone[] memory) {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone({
            description: "First milestone",
            percentage: 50,
            deadline: block.timestamp + 400 days,
            votesFor: 0,
            votesAgainst: 0,
            approved: false,
            fundsReleased: false
        });
        milestones[1] = CrowdFunding.Milestone({
            description: "Second milestone",
            percentage: 50,
            deadline: block.timestamp + 430 days,
            votesFor: 0,
            votesAgainst: 0,
            approved: false,
            fundsReleased: false
        });
        return milestones;
    }

    function _createDefaultCampaign() internal returns (uint256) {
        vm.startPrank(creator);
        
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            365,
            tiers,
            milestones
        );
        
        vm.stopPrank();
        
        return 0; // First campaign ID
    }
}
