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
    uint256 constant CAMPAIGN_DURATION = 30 days;
    uint256 constant VALUE_TO_CONTRIBUTE = 100 * 10**6;

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
            deadline: block.timestamp + 60 days,
            votesFor: 0,
            votesAgainst: 0,
            approved: false,
            fundsReleased: false
        });
        milestones[1] = CrowdFunding.Milestone({
            description: "Second milestone",
            percentage: 50,
            deadline: block.timestamp + 90 days,
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
            30, // 365 days
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
    //    TIERS & MILESTONES STORAGE
    // ============================

    function test_CreateCampaign_TiersStoredCorrectly() public {
        uint256 campaignId = _createDefaultCampaign();
        
        // Get tiers from storage
        CrowdFunding.RewardTier[] memory storedTiers = crowdFunding.getCampaignTiers(campaignId);
        
        // Verify length
        assertEq(storedTiers.length, 2, "Should have 2 tiers");
        
        // Verify first tier
        assertEq(storedTiers[0].name, "Bronze");
        assertEq(storedTiers[0].description, "Basic rewards");
        assertEq(storedTiers[0].minContribution, 10 * 10**6);
        assertEq(storedTiers[0].maxBackers, 100);
        assertEq(storedTiers[0].currentBackers, 0);
        
        // Verify second tier
        assertEq(storedTiers[1].name, "Gold");
        assertEq(storedTiers[1].description, "Premium rewards");
        assertEq(storedTiers[1].minContribution, 50 * 10**6);
        assertEq(storedTiers[1].maxBackers, 50);
        assertEq(storedTiers[1].currentBackers, 0);
    }

    function test_CreateCampaign_MilestonesStoredCorrectly() public {
        uint256 campaignId = _createDefaultCampaign();
        
        // Get milestones from storage
        CrowdFunding.Milestone[] memory storedMilestones = crowdFunding.getCampaignMilestones(campaignId);
        
        // Verify length
        assertEq(storedMilestones.length, 2, "Should have 2 milestones");
        
        // Verify first milestone
        assertEq(storedMilestones[0].description, "First milestone");
        assertEq(storedMilestones[0].percentage, 50);
        assertEq(storedMilestones[0].deadline, block.timestamp + 60 days);
        assertEq(storedMilestones[0].votesFor, 0);
        assertEq(storedMilestones[0].votesAgainst, 0);
        assertEq(storedMilestones[0].approved, false);
        assertEq(storedMilestones[0].fundsReleased, false);
        
        // Verify second milestone
        assertEq(storedMilestones[1].description, "Second milestone");
        assertEq(storedMilestones[1].percentage, 50);
        assertEq(storedMilestones[1].deadline, block.timestamp + 90 days);
        assertEq(storedMilestones[1].votesFor, 0);
        assertEq(storedMilestones[1].votesAgainst, 0);
        assertEq(storedMilestones[1].approved, false);
        assertEq(storedMilestones[1].fundsReleased, false);
    }

    function test_CreateCampaign_CampaignIdIncrementsCorrectly() public {
        // Create first campaign
        uint256 firstId = _createDefaultCampaign();
        assertEq(firstId, 0);
        assertEq(crowdFunding.getCampaignCount(), 1);
        
        // Create second campaign
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        crowdFunding.createCampaign(
            "Second Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        vm.stopPrank();
        
        assertEq(crowdFunding.getCampaignCount(), 2);
        
        // Verify both campaigns exist
        CrowdFunding.Campaign memory campaign1 = crowdFunding.getCampaign(0);
        CrowdFunding.Campaign memory campaign2 = crowdFunding.getCampaign(1);
        
        assertEq(campaign1.title, "Test Campaign");
        assertEq(campaign2.title, "Second Campaign");
    }

    function test_CreateCampaign_MultipleTiersPushedCorrectly() public {
        vm.startPrank(creator);
        
        // Create 5 tiers (maximum)
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](5);
        tiers[0] = CrowdFunding.RewardTier("Bronze", "Basic", 10 * 10**6, 100, 0);
        tiers[1] = CrowdFunding.RewardTier("Silver", "Good", 20 * 10**6, 80, 0);
        tiers[2] = CrowdFunding.RewardTier("Gold", "Great", 50 * 10**6, 50, 0);
        tiers[3] = CrowdFunding.RewardTier("Platinum", "Excellent", 100 * 10**6, 20, 0);
        tiers[4] = CrowdFunding.RewardTier("Diamond", "Premium", 200 * 10**6, 10, 0);
        
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        
        crowdFunding.createCampaign(
            "Multi Tier Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        
        vm.stopPrank();
        
        // Verify all tiers stored
        CrowdFunding.RewardTier[] memory storedTiers = crowdFunding.getCampaignTiers(0);
        assertEq(storedTiers.length, 5);
        assertEq(storedTiers[0].name, "Bronze");
        assertEq(storedTiers[1].name, "Silver");
        assertEq(storedTiers[2].name, "Gold");
        assertEq(storedTiers[3].name, "Platinum");
        assertEq(storedTiers[4].name, "Diamond");
    }

    function test_CreateCampaign_MultipleMilestonesPushedCorrectly() public {
        vm.startPrank(creator);
        
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        
        // Create 5 milestones (maximum)
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](5);
        milestones[0] = CrowdFunding.Milestone("M1", 20, block.timestamp + 60 days, 0, 0, false, false);
        milestones[1] = CrowdFunding.Milestone("M2", 20, block.timestamp + 90 days, 0, 0, false, false);
        milestones[2] = CrowdFunding.Milestone("M3", 20, block.timestamp + 120 days, 0, 0, false, false);
        milestones[3] = CrowdFunding.Milestone("M4", 20, block.timestamp + 150 days, 0, 0, false, false);
        milestones[4] = CrowdFunding.Milestone("M5", 20, block.timestamp + 180 days, 0, 0, false, false);
        
        crowdFunding.createCampaign(
            "Multi Milestone Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        
        vm.stopPrank();
        
        // Verify all milestones stored
        CrowdFunding.Milestone[] memory storedMilestones = crowdFunding.getCampaignMilestones(0);
        assertEq(storedMilestones.length, 5);
        assertEq(storedMilestones[0].description, "M1");
        assertEq(storedMilestones[1].description, "M2");
        assertEq(storedMilestones[2].description, "M3");
        assertEq(storedMilestones[3].description, "M4");
        assertEq(storedMilestones[4].description, "M5");
    }

    function test_CreateCampaign_EventEmittedWithCorrectCampaignId() public {
        vm.startPrank(creator);
        
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        
        // Expect event with campaignId = 0 (first campaign)
        vm.expectEmit(true, true, false, true);
        emit CrowdFunding.CampaignCreated(
            0, // campaignId from campaigns.length before push
            creator,
            "Test Campaign",
            CAMPAIGN_GOAL,
            block.timestamp + 30 days
        );
        
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        
        vm.stopPrank();
    }

    function test_CreateCampaign_MilestoneStructResetCorrectly() public {
        uint256 campaignId = _createDefaultCampaign();
        
        CrowdFunding.Milestone[] memory milestones = crowdFunding.getCampaignMilestones(campaignId);
        
        // Verify milestone voting fields are initialized to 0/false
        for (uint i = 0; i < milestones.length; i++) {
            assertEq(milestones[i].votesFor, 0, "votesFor should be 0");
            assertEq(milestones[i].votesAgainst, 0, "votesAgainst should be 0");
            assertEq(milestones[i].approved, false, "approved should be false");
            assertEq(milestones[i].fundsReleased, false, "fundsReleased should be false");
        }
    }

     // ============================
    //       CONTRIBUTION FUCNTIONS
    // ============================
    

    function testCreatorCantFundOwnCamapign() public {
        vm.startPrank(creator);
        
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        vm.expectRevert(CrowdFunding.CrowdFunding__YouCantContributeYourOwnCampaign.selector);
        crowdFunding.contribute(0,VALUE_TO_CONTRIBUTE, 1);
        
        vm.stopPrank();

    }

    function testContributeRevertsCamapignHasEnded() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        vm.stopPrank();
        vm.startPrank(contributor1);
        vm.warp(31 days);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignHasEnded.selector);
        crowdFunding.contribute(0,VALUE_TO_CONTRIBUTE, 1);
        
    }


    function testContributeRevertsInsufficientAmount() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        vm.stopPrank();
        vm.startPrank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__ValueMustBeGreaterThanZero.selector);
        crowdFunding.contribute(0,0, 1);
    }

    function testContributeRevertsCampaingDoesNotExist() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        vm.stopPrank();
        vm.startPrank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignTierDoesNotExist.selector);
        crowdFunding.contribute(0,VALUE_TO_CONTRIBUTE, 10);
    }

    function testContributeRevertsContributionBelowTierMinimum() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        vm.stopPrank();
        vm.startPrank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__ContributionBelowTierMinimum.selector);
        crowdFunding.contribute(0, 9 * 10**6, 0); //9usdc for reverts, min contribution is 10usdc
    }


    function test_Contribute_RevertIf_TierFull() public {
    vm.startPrank(creator);
    CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](2);
    tiers[0] = CrowdFunding.RewardTier({
        name: "Bronze",
        description: "Basic rewards",
        minContribution: 10 * 10**6,
        maxBackers: 2, // only 2 slots for tests
        currentBackers: 0
    });
    tiers[1] = CrowdFunding.RewardTier({
        name: "Gold",
        description: "Premium rewards",
        minContribution: 50 * 10**6,
        maxBackers: 50,
        currentBackers: 0
    });
    
    CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
    
    crowdFunding.createCampaign(
        "Limited Campaign",
        CAMPAIGN_GOAL,
        "Description",
        30,
        tiers,
        milestones
    );
    
    vm.stopPrank();
    
    // Contributor 1 - SUCCESS
    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), 100 * 10**6);
    crowdFunding.contribute(0, 100 * 10**6, 0);
    vm.stopPrank();
    
    // Contributor 2 - SUCCESS
    vm.startPrank(contributor2);
    usdc.approve(address(crowdFunding), 100 * 10**6);
    crowdFunding.contribute(0, 100 * 10**6, 0);
    vm.stopPrank();
    
    // Contributor 3 - SHOULD REVERT (tier full)
    address contributor3 = makeAddr("contributor3");
    usdc.mint(contributor3, INITIAL_BALANCE);
    
    vm.startPrank(contributor3);
    usdc.approve(address(crowdFunding), 100 * 10**6);
    
    vm.expectRevert(CrowdFunding.CrowdFunding__TierFull.selector);
    crowdFunding.contribute(0, 100 * 10**6, 0);
    
    vm.stopPrank();
}



function testContributeUpdatesState() public {
    vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Description",
            30,
            tiers,
            milestones
        );
        vm.stopPrank();
        CrowdFunding.Campaign memory campaignBefore = crowdFunding.getCampaign(0);
        uint256 balanceBefore = campaignBefore.raised;
        uint256 contributionsBefore = 0;

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), VALUE_TO_CONTRIBUTE);
        crowdFunding.contribute(0, VALUE_TO_CONTRIBUTE, 0);
        vm.stopPrank();
        
        CrowdFunding.Campaign memory campaignAfter = crowdFunding.getCampaign(0);
        uint256 contributionsAfter = 0 + VALUE_TO_CONTRIBUTE;
        
        assertEq(campaignAfter.raised, balanceBefore + VALUE_TO_CONTRIBUTE);
        assertEq(contributionsAfter, contributionsBefore + VALUE_TO_CONTRIBUTE);

    }

    function testContributeUpdatesTier() public {
    vm.startPrank(creator);
    CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
    CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
    crowdFunding.createCampaign(
        "Test Campaign",
        CAMPAIGN_GOAL,
        "Description",
        30,
        tiers,
        milestones
    );
    vm.stopPrank();
    
    uint256 campaignId = 0;
    

    uint256 totalContributorsBefore = crowdFunding.getTotalContributors(campaignId);
    CrowdFunding.RewardTier[] memory tiersBefore = crowdFunding.getCampaignTiers(campaignId);
    
    assertEq(totalContributorsBefore, 0);
    assertEq(tiersBefore[0].currentBackers, 0);
    

    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), VALUE_TO_CONTRIBUTE);
    crowdFunding.contribute(campaignId, VALUE_TO_CONTRIBUTE, 0); // tier index 0
    vm.stopPrank();
    
    uint256 totalContributorsAfter = crowdFunding.getTotalContributors(campaignId);
    CrowdFunding.RewardTier[] memory tiersAfter = crowdFunding.getCampaignTiers(campaignId);
    

    assertEq(tiersAfter[0].currentBackers, 1, "Tier 0 should have 1 backer");
    assertEq(totalContributorsAfter, 1, "Should have 1 total contributor");
  
    assertEq(crowdFunding.getContributorTier(campaignId, contributor1), 0, "Contributor should be in tier 0");
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
            deadline: block.timestamp + 60 days,
            votesFor: 0,
            votesAgainst: 0,
            approved: false,
            fundsReleased: false
        });
        milestones[1] = CrowdFunding.Milestone({
            description: "Second milestone",
            percentage: 50,
            deadline: block.timestamp + 90 days,
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
            30,
            tiers,
            milestones
        );
        
        vm.stopPrank();
        
        return 0; // First campaign ID
    }
}
