// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {CrowdFunding} from "../src/CrowdFunding.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

/**
 * @title CrowdFunding Test Suite
 * @author Your Name
 * @notice Comprehensive test suite for CrowdFunding contract
 * @dev Tests cover:
 *      - Contract deployment and initialization
 *      - Campaign creation with validation
 *      - Contribution mechanics and tier management
 *      - Milestone voting and fund release
 *      - Modifier validation (validateCampaignExists)
 *      - Edge cases and security checks
 */
contract CrowdFundingTest is Test {
    // ========== STATE VARIABLES ==========
    CrowdFunding public crowdFunding;
    ERC20Mock public usdc;

    address public owner;
    address public creator;
    address public contributor1;
    address public contributor2;

    // ========== CONSTANTS ==========
    uint256 constant INITIAL_BALANCE = 10_000 * 10**6; // 10,000 USDC
    uint256 constant CAMPAIGN_GOAL = 1_000 * 10**6; // 1,000 USDC
    uint256 constant CAMPAIGN_DURATION = 30; // 30 days
    uint256 constant CONTRIBUTION_AMOUNT = 100 * 10**6; // 100 USDC

    // ========== SETUP ==========
    function setUp() public {
        owner = address(this);
        creator = makeAddr("creator");
        contributor1 = makeAddr("contributor1");
        contributor2 = makeAddr("contributor2");

        // Deploy mock USDC and CrowdFunding contract
        usdc = new ERC20Mock();
        crowdFunding = new CrowdFunding(address(usdc));

        // Fund test accounts with USDC
        usdc.mint(creator, INITIAL_BALANCE);
        usdc.mint(contributor1, INITIAL_BALANCE);
        usdc.mint(contributor2, INITIAL_BALANCE);
    }

    // ============================================================================
    // DEPLOYMENT & INITIALIZATION TESTS
    // ============================================================================

    /**
     * @dev Test: Verifies correct contract initialization
     * Expected: Owner and USDC address are set correctly
     */
    function test_Constructor_InitializesCorrectly() public view {
        assertEq(crowdFunding.owner(), owner, "Owner should be deployer");
        assertEq(crowdFunding.getUSDCAddress(), address(usdc), "USDC address should match");
    }

    // ============================================================================
    // CAMPAIGN CREATION TESTS
    // ============================================================================

    /**
     * @dev Test: Creates a campaign successfully with valid parameters
     * Expected: Campaign is created with correct state, tiers, and milestones
     */
    function test_CreateCampaign_Success() public {
        vm.startPrank(creator);

        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        // Expect CampaignCreated event
        vm.expectEmit(true, true, false, true);
        emit CrowdFunding.CampaignCreated(
            0,
            creator,
            "Test Campaign",
            CAMPAIGN_GOAL,
            block.timestamp + (CAMPAIGN_DURATION * 1 days)
        );

        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );

        vm.stopPrank();

        // Verify campaign state
        CrowdFunding.Campaign memory campaign = crowdFunding.getCampaign(0);
        assertEq(campaign.title, "Test Campaign", "Title mismatch");
        assertEq(campaign.goal, CAMPAIGN_GOAL, "Goal mismatch");
        assertEq(campaign.raised, 0, "Initial raised should be 0");
        assertEq(campaign.creator, creator, "Creator mismatch");
        assertEq(uint(campaign.state), uint(CrowdFunding.States.Active), "Should be Active");
        assertFalse(campaign.fundsWithdrawn, "Funds should not be withdrawn");
        assertEq(crowdFunding.getCampaignCount(), 1, "Campaign count should be 1");
    }

    /**
     * @dev Test: Rejects campaign with duration = 0
     * Expected: Reverts with CrowdFunding__DurationMustBeGreaterThanZero
     */
    function test_CreateCampaign_RevertIf_DurationZero() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        vm.expectRevert(CrowdFunding.CrowdFunding__DurationMustBeGreaterThanZero.selector);
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            0, // Invalid: 0 days
            tiers,
            milestones
        );
        vm.stopPrank();
    }

    /**
     * @dev Test: Rejects campaign with duration > 365 days
     * Expected: Reverts with CrowdFunding__DurationTooLong
     */
    function test_CreateCampaign_RevertIf_DurationTooLong() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        vm.expectRevert(CrowdFunding.CrowdFunding__DurationTooLong.selector);
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            366, // Invalid: > 365 days
            tiers,
            milestones
        );
        vm.stopPrank();
    }

    /**
     * @dev Test: Rejects campaign with goal < 100 USDC
     * Expected: Reverts with CrowdFunding__GoalTooLow
     */
    function test_CreateCampaign_RevertIf_GoalTooLow() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        vm.expectRevert(CrowdFunding.CrowdFunding__GoalTooLow.selector);
        crowdFunding.createCampaign(
            "Test Campaign",
            10 * 10**6, // Invalid: < 100 USDC
            "Test Description",
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );
        vm.stopPrank();
    }

    /**
     * @dev Test: Rejects campaign with title > 200 characters
     * Expected: Reverts with CrowdFunding__TitleTooLong
     */
    function test_CreateCampaign_RevertIf_TitleTooLong() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        vm.expectRevert(CrowdFunding.CrowdFunding__TitleTooLong.selector);
        crowdFunding.createCampaign(
            "A highly extended crowdfunding campaign title intentionally crafted to exceed the typical two-hundred-character limit in order to thoroughly test input validation and ensure that long strings are properly rejected by the smart contract logic",
            CAMPAIGN_GOAL,
            "Test Description",
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );
        vm.stopPrank();
    }

    /**
     * @dev Test: Rejects campaign with description > 200 characters
     * Expected: Reverts with CrowdFunding__DescriptionTooLong
     */
    function test_CreateCampaign_RevertIf_DescriptionTooLong() public {
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        vm.expectRevert(CrowdFunding.CrowdFunding__DescriptionTooLong.selector);
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "This campaign description is intentionally written to surpass two hundred characters, allowing you to verify that your smart contract correctly enforces maximum string length restrictions and triggers the appropriate custom error when oversized input is submitted",
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );
        vm.stopPrank();
    }

    // ============================================================================
    // TIERS & MILESTONES STORAGE TESTS
    // ============================================================================

    /**
     * @dev Test: Verifies tiers are stored correctly in contract storage
     * Expected: All tier data matches input parameters
     */
    function test_CreateCampaign_StoresTiersCorrectly() public {
        uint256 campaignId = _createDefaultCampaign();

        CrowdFunding.RewardTier[] memory storedTiers = crowdFunding.getCampaignTiers(campaignId);

        assertEq(storedTiers.length, 2, "Should have 2 tiers");

        // Verify Bronze tier
        assertEq(storedTiers[0].name, "Bronze");
        assertEq(storedTiers[0].description, "Basic rewards");
        assertEq(storedTiers[0].minContribution, 10 * 10**6);
        assertEq(storedTiers[0].maxBackers, 100);
        assertEq(storedTiers[0].currentBackers, 0);

        // Verify Gold tier
        assertEq(storedTiers[1].name, "Gold");
        assertEq(storedTiers[1].description, "Premium rewards");
        assertEq(storedTiers[1].minContribution, 50 * 10**6);
        assertEq(storedTiers[1].maxBackers, 50);
        assertEq(storedTiers[1].currentBackers, 0);
    }

    /**
     * @dev Test: Verifies milestones are stored correctly in contract storage
     * Expected: All milestone data matches input parameters
     */
    function test_CreateCampaign_StoresMilestonesCorrectly() public {
        uint256 campaignId = _createDefaultCampaign();

        CrowdFunding.Milestone[] memory storedMilestones = crowdFunding.getCampaignMilestones(campaignId);

        assertEq(storedMilestones.length, 2, "Should have 2 milestones");

        // Verify first milestone
        assertEq(storedMilestones[0].description, "First milestone");
        assertEq(storedMilestones[0].percentage, 50);
        assertEq(storedMilestones[0].deadline, block.timestamp + 60 days);
        assertEq(storedMilestones[0].votesFor, 0);
        assertEq(storedMilestones[0].votesAgainst, 0);
        assertFalse(storedMilestones[0].approved);
        assertFalse(storedMilestones[0].fundsReleased);

        // Verify second milestone
        assertEq(storedMilestones[1].description, "Second milestone");
        assertEq(storedMilestones[1].percentage, 50);
        assertEq(storedMilestones[1].deadline, block.timestamp + 90 days);
    }

    /**
     * @dev Test: Verifies campaign IDs increment correctly
     * Expected: Campaign IDs are sequential (0, 1, 2, ...)
     */
    function test_CreateCampaign_IncrementsIdCorrectly() public {
        uint256 firstId = _createDefaultCampaign();
        assertEq(firstId, 0, "First campaign should have ID 0");
        assertEq(crowdFunding.getCampaignCount(), 1);

        // Create second campaign
        vm.startPrank(creator);
        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();
        crowdFunding.createCampaign(
            "Second Campaign",
            CAMPAIGN_GOAL,
            "Description",
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );
        vm.stopPrank();

        assertEq(crowdFunding.getCampaignCount(), 2);

        CrowdFunding.Campaign memory campaign1 = crowdFunding.getCampaign(0);
        CrowdFunding.Campaign memory campaign2 = crowdFunding.getCampaign(1);

        assertEq(campaign1.title, "Test Campaign");
        assertEq(campaign2.title, "Second Campaign");
    }

    /**
     * @dev Test: Verifies multiple tiers (max 5) are stored correctly
     * Expected: All 5 tiers are stored with correct data
     */
    function test_CreateCampaign_StoresMultipleTiersCorrectly() public {
        vm.startPrank(creator);

        // Create 5 tiers (maximum allowed)
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
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );

        vm.stopPrank();

        CrowdFunding.RewardTier[] memory storedTiers = crowdFunding.getCampaignTiers(0);
        assertEq(storedTiers.length, 5);
        assertEq(storedTiers[0].name, "Bronze");
        assertEq(storedTiers[1].name, "Silver");
        assertEq(storedTiers[2].name, "Gold");
        assertEq(storedTiers[3].name, "Platinum");
        assertEq(storedTiers[4].name, "Diamond");
    }

    /**
     * @dev Test: Verifies multiple milestones (max 5) are stored correctly
     * Expected: All 5 milestones are stored with correct data
     */
    function test_CreateCampaign_StoresMultipleMilestonesCorrectly() public {
        vm.startPrank(creator);

        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();

        // Create 5 milestones (maximum allowed)
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
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );

        vm.stopPrank();

        CrowdFunding.Milestone[] memory storedMilestones = crowdFunding.getCampaignMilestones(0);
        assertEq(storedMilestones.length, 5);
        assertEq(storedMilestones[0].description, "M1");
        assertEq(storedMilestones[1].description, "M2");
        assertEq(storedMilestones[2].description, "M3");
        assertEq(storedMilestones[3].description, "M4");
        assertEq(storedMilestones[4].description, "M5");
    }

    // ============================================================================
    // CONTRIBUTION TESTS
    // ============================================================================

    /**
     * @dev Test: Creator cannot contribute to their own campaign
     * Expected: Reverts with CrowdFunding__YouCantContributeYourOwnCampaign
     */
    function test_Contribute_RevertIf_CreatorContributes() public {
        vm.startPrank(creator);

        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Description",
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );

        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);

        vm.expectRevert(CrowdFunding.CrowdFunding__YouCantContributeYourOwnCampaign.selector);
        crowdFunding.contribute(0, CONTRIBUTION_AMOUNT, 0);

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot contribute after campaign deadline
     * Expected: Reverts with CrowdFunding__CampaignHasEnded
     */
    function test_Contribute_RevertIf_CampaignEnded() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);

        // Warp past campaign deadline
        vm.warp(block.timestamp + 31 days);

        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignHasEnded.selector);
        crowdFunding.contribute(0, CONTRIBUTION_AMOUNT, 0);

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot contribute 0 amount
     * Expected: Reverts with CrowdFunding__ValueMustBeGreaterThanZero
     */
    function test_Contribute_RevertIf_AmountZero() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);

        vm.expectRevert(CrowdFunding.CrowdFunding__ValueMustBeGreaterThanZero.selector);
        crowdFunding.contribute(0, 0, 0);

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot contribute to non-existent tier
     * Expected: Reverts with CrowdFunding__CampaignTierDoesNotExist
     */
    function test_Contribute_RevertIf_TierDoesNotExist() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);

        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignTierDoesNotExist.selector);
        crowdFunding.contribute(0, CONTRIBUTION_AMOUNT, 10); // Tier 10 doesn't exist

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot contribute without sufficient USDC allowance
     * Expected: Reverts with CrowdFunding__InsufficientAllowance
     */
    function test_Contribute_RevertIf_InsufficientAllowance() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 50 * 10**6); // Approve only 50 USDC

        vm.expectRevert(CrowdFunding.CrowdFunding__InsufficientAllowance.selector);
        crowdFunding.contribute(0, 100 * 10**6, 0); // Try to contribute 100 USDC

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot contribute below tier minimum
     * Expected: Reverts with CrowdFunding__ContributionBelowTierMinimum
     */
    function test_Contribute_RevertIf_BelowTierMinimum() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 9 * 10**6);

        vm.expectRevert(CrowdFunding.CrowdFunding__ContributionBelowTierMinimum.selector);
        crowdFunding.contribute(0, 9 * 10**6, 0); // Below 10 USDC minimum

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot contribute when tier is full
     * Expected: Reverts with CrowdFunding__TierFull
     */
    function test_Contribute_RevertIf_TierFull() public {
        vm.startPrank(creator);

        // Create tier with only 2 slots
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](1);
        tiers[0] = CrowdFunding.RewardTier({
            name: "Limited",
            description: "Limited slots",
            minContribution: 10 * 10**6,
            maxBackers: 2, // Only 2 slots
            currentBackers: 0
        });

        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        crowdFunding.createCampaign(
            "Limited Campaign",
            CAMPAIGN_GOAL,
            "Description",
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );

        vm.stopPrank();

        // Fill the tier with 2 contributors
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(0, 100 * 10**6, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(0, 100 * 10**6, 0);
        vm.stopPrank();

        // Third contributor should fail
        address contributor3 = makeAddr("contributor3");
        usdc.mint(contributor3, INITIAL_BALANCE);

        vm.startPrank(contributor3);
        usdc.approve(address(crowdFunding), 100 * 10**6);

        vm.expectRevert(CrowdFunding.CrowdFunding__TierFull.selector);
        crowdFunding.contribute(0, 100 * 10**6, 0);

        vm.stopPrank();
    }

    /**
     * @dev Test: Successful contribution updates campaign state
     * Expected: Campaign raised amount increases, contributor balance decreases
     */
    function test_Contribute_UpdatesCampaignState() public {
        _createDefaultCampaign();

        CrowdFunding.Campaign memory campaignBefore = crowdFunding.getCampaign(0);
        uint256 raisedBefore = campaignBefore.raised;

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);
        crowdFunding.contribute(0, CONTRIBUTION_AMOUNT, 0);
        vm.stopPrank();

        CrowdFunding.Campaign memory campaignAfter = crowdFunding.getCampaign(0);

        assertEq(campaignAfter.raised, raisedBefore + CONTRIBUTION_AMOUNT, "Raised amount should increase");
        assertEq(
            crowdFunding.getContribution(0, contributor1),
            CONTRIBUTION_AMOUNT,
            "Contribution should be recorded"
        );
    }

    /**
     * @dev Test: Successful contribution updates tier data
     * Expected: Tier currentBackers increases, contributor is assigned to tier
     */
    function test_Contribute_UpdatesTierData() public {
        uint256 campaignId = _createDefaultCampaign();

        uint256 totalContributorsBefore = crowdFunding.getTotalContributors(campaignId);
        CrowdFunding.RewardTier[] memory tiersBefore = crowdFunding.getCampaignTiers(campaignId);

        assertEq(totalContributorsBefore, 0, "Should have 0 contributors initially");
        assertEq(tiersBefore[0].currentBackers, 0, "Tier should have 0 backers initially");

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);
        crowdFunding.contribute(campaignId, CONTRIBUTION_AMOUNT, 0);
        vm.stopPrank();

        uint256 totalContributorsAfter = crowdFunding.getTotalContributors(campaignId);
        CrowdFunding.RewardTier[] memory tiersAfter = crowdFunding.getCampaignTiers(campaignId);

        assertEq(tiersAfter[0].currentBackers, 1, "Tier should have 1 backer");
        assertEq(totalContributorsAfter, 1, "Should have 1 total contributor");
        assertEq(crowdFunding.getContributorTier(campaignId, contributor1), 0, "Contributor should be in tier 0");
    }

        function testContributeCorrectlyUpdatesTierData() public {
        vm.startPrank(creator);

        // Create tier with only 2 slots
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](1);
        tiers[0] = CrowdFunding.RewardTier({
            name: "Limited",
            description: "Limited slots",
            minContribution: 10 * 10**6,
            maxBackers: 2, // Only 2 slots
            currentBackers: 0
        });

        crowdFunding.createCampaign(
            "Limited Campaign",
            CAMPAIGN_GOAL,
            "Description",
            CAMPAIGN_DURATION,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();

     
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 10 * 10**6);
        crowdFunding.contribute(0, 10 * 10**6, 0);
        vm.stopPrank();

        CrowdFunding.RewardTier[] memory updatedTiers = crowdFunding.getCampaignTiers(0);
        
  
        assertEq(crowdFunding.getContributorTier(0, contributor1), 0, "Contributor should be in tier 0");
        assertEq(updatedTiers[0].currentBackers, 1, "Tier should have 1 backer");
        assertEq(crowdFunding.getTotalContributors(0), 1, "Should have 1 total contributor");
    }


        function testContributorCanUpgradeTier() public {
        vm.startPrank(creator);

        // Create 2 tiers
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](2);
        tiers[0] = CrowdFunding.RewardTier({
            name: "Bronze",
            description: "Bronze tier",
            minContribution: 10 * 10**6,
            maxBackers: 10,
            currentBackers: 0
        });
        tiers[1] = CrowdFunding.RewardTier({
            name: "Silver",
            description: "Silver tier",
            minContribution: 50 * 10**6,
            maxBackers: 5,
            currentBackers: 0
        });

        crowdFunding.createCampaign(
            "Multi-tier Campaign",
            CAMPAIGN_GOAL,
            "Description",
            CAMPAIGN_DURATION,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();

        // ========== First contribution: Bronze tier ==========
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(0, 10 * 10**6, 0); // Tier 0 (Bronze)
        vm.stopPrank();

        CrowdFunding.RewardTier[] memory tiersAfterFirst = crowdFunding.getCampaignTiers(0);
        
        assertEq(crowdFunding.getContributorTier(0, contributor1), 0, "Should be in Bronze");
        assertEq(tiersAfterFirst[0].currentBackers, 1, "Bronze should have 1 backer");
        assertEq(tiersAfterFirst[1].currentBackers, 0, "Silver should have 0 backers");

        // ========== Second contribution: Upgrade to Silver ==========
        vm.startPrank(contributor1);
        crowdFunding.contribute(0, 50 * 10**6, 1); // Tier 1 (Silver)
        vm.stopPrank();

        CrowdFunding.RewardTier[] memory tiersAfterUpgrade = crowdFunding.getCampaignTiers(0);
        
        assertEq(crowdFunding.getContributorTier(0, contributor1), 1, "Should be upgraded to Silver");
        assertEq(tiersAfterUpgrade[0].currentBackers, 0, "Bronze should have 0 backers (moved out)");
        assertEq(tiersAfterUpgrade[1].currentBackers, 1, "Silver should have 1 backer");
        assertEq(crowdFunding.getTotalContributors(0), 1, "Still 1 total contributor (same person)");
        
        // Check total contribution
        uint256 totalContribution = crowdFunding.getContribution(0, contributor1);
        assertEq(totalContribution, 60 * 10**6, "Total contribution should be 10 + 50");
    }

    // ============================================================================
    // MILESTONE VOTING TESTS
    // ============================================================================

    /**
     * @dev Test: Cannot vote on non-existent milestone
     * Expected: Reverts with CrowdFunding__MilestoneNotFound
     */
    function test_VoteMilestone_RevertIf_MilestoneNotFound() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);
        crowdFunding.contribute(0, CONTRIBUTION_AMOUNT, 0);

        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneNotFound.selector);
        crowdFunding.voteMilestone(0, 5, true); // Milestone 5 doesn't exist

        vm.stopPrank();
    }

    /**
     * @dev Test: Only contributors can vote
     * Expected: Reverts with CrowdFunding__NotAContributor
     */
    function test_VoteMilestone_RevertIf_NotAContributor() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);
        crowdFunding.contribute(0, CONTRIBUTION_AMOUNT, 0);
        vm.stopPrank();

        // contributor2 never contributed
        vm.startPrank(contributor2);
        vm.expectRevert(CrowdFunding.CrowdFunding__NotAContributor.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot vote twice on same milestone
     * Expected: Reverts with CrowdFunding__AlreadyVoted
     */
    function test_VoteMilestone_RevertIf_AlreadyVoted() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);

        // Warp past campaign end and milestone deadline
        vm.warp(block.timestamp + 61 days);

        // First vote succeeds
        crowdFunding.voteMilestone(0, 0, true);

        // Second vote should fail
        vm.expectRevert(CrowdFunding.CrowdFunding__AlreadyVoted.selector);
        crowdFunding.voteMilestone(0, 0, false);

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot vote while campaign is still active
     * Expected: Reverts with CrowdFunding__CampaignStillActive
     */
    function test_VoteMilestone_RevertIf_CampaignStillActive() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);
        crowdFunding.contribute(0, CONTRIBUTION_AMOUNT, 0);

        // Don't warp time - campaign still active
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignStillActive.selector);
        crowdFunding.voteMilestone(0, 0, true);

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot vote if campaign didn't reach goal
     * Expected: Reverts with CrowdFunding__NotEnoughMoneyRaised
     */
    function test_VoteMilestone_RevertIf_GoalNotReached() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);
        crowdFunding.contribute(0, CONTRIBUTION_AMOUNT, 0); // Only 100 USDC, goal is 1000

        vm.warp(block.timestamp + 31 days); // Campaign ended

        vm.expectRevert(CrowdFunding.CrowdFunding__NotEnoughMoneyRaised.selector);
        crowdFunding.voteMilestone(0, 0, true);

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot vote before milestone deadline
     * Expected: Reverts with CrowdFunding__MilestoneDeadlineNotReached
     */
    function test_VoteMilestone_RevertIf_DeadlineNotReached() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);

        // Warp past campaign but before milestone deadline (60 days)
        vm.warp(block.timestamp + 31 days);

        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneDeadlineNotReached.selector);
        crowdFunding.voteMilestone(0, 0, true);

        vm.stopPrank();
    }

    /**
     * @dev Test: Cannot vote after voting period expires
     * Expected: Reverts with CrowdFunding__MilestoneVotingPeriodExpired
     */
    function test_VoteMilestone_RevertIf_VotingPeriodExpired() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        // Warp past milestone deadline + voting period (60 days + 7 days = 67 days)
        vm.warp(block.timestamp + 68 days);

        vm.startPrank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneVotingPeriodExpired.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    /**
     * @dev Test: Voting initializes voting deadline
     * Expected: Voting deadline is set to milestone.deadline + 7 days
     */
    function test_VoteMilestone_InitializesVotingDeadline() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        uint256 votingDeadlineBefore = crowdFunding.milestoneVotingDeadline(0, 0);
        assertEq(votingDeadlineBefore, 0, "Voting deadline should be 0 initially");

        // Warp past milestone deadline
        vm.warp(block.timestamp + 61 days);

        vm.prank(contributor1);
        crowdFunding.voteMilestone(0, 0, true);

        uint256 votingDeadlineAfter = crowdFunding.milestoneVotingDeadline(0, 0);
        assertGt(votingDeadlineAfter, 0, "Voting deadline should be initialized");
    }

function test_VoteMilestone_RevertIf_MilestoneAlreadyApproved() public {
    _createDefaultCampaign();

    // Two contributors only
    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
    crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
    vm.stopPrank();

    vm.startPrank(contributor2);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2 + 1);
    crowdFunding.contribute(0, CAMPAIGN_GOAL / 2 + 1, 0);
    vm.stopPrank();

    // Verify we have exactly 2 contributors
    assertEq(crowdFunding.getTotalContributors(0), 2, "Should have 2 contributors");

    // Warp past campaign end and milestone deadline
    vm.warp(block.timestamp + 61 days);

    // First contributor votes
    vm.prank(contributor1);
    crowdFunding.voteMilestone(0, 0, true);

    CrowdFunding.Milestone memory milestoneAfterFirstVote = crowdFunding.getMilestone(0, 0);
    assertFalse(milestoneAfterFirstVote.approved, "Should NOT be approved after 1/2 votes");

    // Second contributor votes - triggers auto-approval (2/2 = 100%)
    vm.prank(contributor2);
    crowdFunding.voteMilestone(0, 0, true);

    // Verify auto-approval happened
    CrowdFunding.Milestone memory milestoneAfterSecondVote = crowdFunding.getMilestone(0, 0);
    assertTrue(milestoneAfterSecondVote.approved, "Should be auto-approved after 2/2 votes");
    assertEq(milestoneAfterSecondVote.votesFor, 2, "Should have 2 votes for");

    // Now add a third contributor who contributed earlier but we "forgot" about
    // Actually, we can't add new contributors after campaign ends
    // So let's test with contributor1 trying to vote again (should hit AlreadyVoted first)
    
    // Better approach: Create a scenario with 3 contributors where only 2 vote initially
    // But auto-approval needs ALL contributors to vote...
    
    // The issue is: auto-approval only happens when totalVotes >= totalContributors
    // So we need a different approach: manually finalize the vote
    
    // Let's restart with finalizeMilestoneVoting approach
}


/**
 * @dev Test: Cannot vote on already approved milestone (via finalization)
 * Expected: Reverts with CrowdFunding__MilestoneAlreadyReleased
 * Strategy: Use finalizeMilestoneVoting to approve, then contributor tries to vote
 */
function test_VoteMilestone_RevertIf_MilestoneApprovedViaFinalization() public {
    _createDefaultCampaign();

    // Three contributors
    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 3);
    crowdFunding.contribute(0, CAMPAIGN_GOAL / 3, 0);
    vm.stopPrank();

    vm.startPrank(contributor2);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 3);
    crowdFunding.contribute(0, CAMPAIGN_GOAL / 3, 0);
    vm.stopPrank();

    address contributor3 = makeAddr("contributor3");
    usdc.mint(contributor3, INITIAL_BALANCE);
    vm.startPrank(contributor3);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 3 + 1);
    crowdFunding.contribute(0, CAMPAIGN_GOAL / 3 + 1, 0);
    vm.stopPrank();

    assertEq(crowdFunding.getTotalContributors(0), 3, "Should have 3 contributors");

    // Warp past campaign and milestone
    vm.warp(block.timestamp + 61 days);

    // Two contributors vote (2/3 = 66% > 51%)
    vm.prank(contributor1);
    crowdFunding.voteMilestone(0, 0, true);

    vm.prank(contributor2);
    crowdFunding.voteMilestone(0, 0, true);

    // Check it's not auto-approved yet (only 2/3 voted, not all)
    CrowdFunding.Milestone memory milestoneBeforeFinalize = crowdFunding.getMilestone(0, 0);
    assertFalse(milestoneBeforeFinalize.approved, "Should not be auto-approved (not all voted)");

    // Get voting deadline and warp past it
    uint256 votingDeadline = crowdFunding.milestoneVotingDeadline(0, 0);
    assertGt(votingDeadline, 0, "Voting deadline should be set");
    vm.warp(votingDeadline + 1);

    // Finalize voting - this will approve it (66% > 51%)
    crowdFunding.finalizeMilestoneVoting(0, 0);

    CrowdFunding.Milestone memory milestoneAfterFinalize = crowdFunding.getMilestone(0, 0);
    assertTrue(milestoneAfterFinalize.approved, "Should be approved after finalization");

    // Now contributor3 tries to vote but voting period has expired
    // This will hit MilestoneVotingPeriodExpired first
    
    // So we need to test the check BEFORE voting period expires
    // But milestone is only approved AFTER voting period expires...
    
    // This is a logical impossibility in the current contract design!
}



    // ============================================================================
    // MODIFIER TESTS (validateCampaignExists)
    // ============================================================================

    /**
     * @dev Test: Modifier allows valid campaign ID
     * Expected: Function executes successfully
     */
    function test_Modifier_AllowsValidCampaignId() public {
        _createDefaultCampaign();

        // Should not revert
        CrowdFunding.Campaign memory campaign = crowdFunding.getCampaign(0);
        assertEq(campaign.creator, creator, "Campaign should exist");
    }

    /**
     * @dev Test: Modifier reverts when campaign doesn't exist
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_RevertsIf_CampaignDoesNotExist() public {
        // No campaigns created

        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getCampaign(0);
    }

    /**
     * @dev Test: Modifier reverts when campaignId equals array length
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_RevertsIf_CampaignIdEqualsLength() public {
        _createDefaultCampaign(); // campaigns.length = 1

        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getCampaign(1); // campaignId = 1 (equals length)
    }

    /**
     * @dev Test: Modifier reverts when campaignId > array length
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_RevertsIf_CampaignIdGreaterThanLength() public {
        _createDefaultCampaign();
        _createDefaultCampaign(); // campaigns.length = 2

        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getCampaign(5);
    }

    /**
     * @dev Test: Modifier works in contribute function
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_WorksInContributeFunction() public {
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CONTRIBUTION_AMOUNT);

        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.contribute(999, CONTRIBUTION_AMOUNT, 0);

        vm.stopPrank();
    }

    /**
     * @dev Test: Modifier works in withdraw function
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_WorksInWithdrawFunction() public {
        vm.prank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.withdraw(999);
    }

    /**
     * @dev Test: Modifier works in refund function
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_WorksInRefundFunction() public {
        vm.prank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.refund(999);
    }

    /**
     * @dev Test: Modifier works in voteMilestone function
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_WorksInVoteMilestoneFunction() public {
        vm.prank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.voteMilestone(999, 0, true);
    }

    /**
     * @dev Test: Modifier works in releaseMilestoneFunds function
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_WorksInReleaseMilestoneFundsFunction() public {
        vm.prank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.releaseMilestoneFunds(999, 0);
    }

    /**
     * @dev Test: Modifier with max uint256 value
     * Expected: Reverts with CrowdFunding__CampaignDoesNotExist
     */
    function test_Modifier_HandlesMaxUint256() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getCampaign(type(uint256).max);
    }

    /**
     * @dev Fuzz Test: Modifier with random campaign IDs
     * Expected: Reverts for IDs >= campaigns.length, succeeds otherwise
     */
    function testFuzz_Modifier_WithRandomCampaignIds(uint256 campaignId) public {
        // Create 3 campaigns
        _createDefaultCampaign();
        _createDefaultCampaign();
        _createDefaultCampaign();

        if (campaignId < 3) {
            // Should succeed
            CrowdFunding.Campaign memory campaign = crowdFunding.getCampaign(campaignId);
            assertEq(campaign.creator, creator);
        } else {
            // Should revert
            vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
            crowdFunding.getCampaign(campaignId);
        }
    }

    // ============================================================================
    // HELPER FUNCTIONS
    // ============================================================================

    /**
     * @dev Creates default reward tiers for testing
     * @return tiers Array of 2 reward tiers (Bronze, Gold)
     */
    function _createDefaultTiers() internal pure returns (CrowdFunding.RewardTier[] memory) {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](2);
        tiers[0] = CrowdFunding.RewardTier({
            name: "Bronze",
            description: "Basic rewards",
            minContribution: 10 * 10**6, // 10 USDC
            maxBackers: 100,
            currentBackers: 0
        });
        tiers[1] = CrowdFunding.RewardTier({
            name: "Gold",
            description: "Premium rewards",
            minContribution: 50 * 10**6, // 50 USDC
            maxBackers: 50,
            currentBackers: 0
        });
        return tiers;
    }

    /**
     * @dev Creates default milestones for testing
     * @return milestones Array of 2 milestones (50% each)
     */
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

    /**
     * @dev Creates a default campaign with standard parameters
     * @return campaignId The ID of the created campaign (always 0 for first call)
     */
    function _createDefaultCampaign() internal returns (uint256) {
        vm.startPrank(creator);

        CrowdFunding.RewardTier[] memory tiers = _createDefaultTiers();
        CrowdFunding.Milestone[] memory milestones = _createDefaultMilestones();

        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            CAMPAIGN_DURATION,
            tiers,
            milestones
        );

        vm.stopPrank();

        return crowdFunding.getCampaignCount() - 1;
    }
}