// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {CrowdFunding} from "../src/CrowdFunding.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

/// @title CrowdFundingTest
/// @notice Comprehensive unit test suite for the CrowdFunding contract
/// @dev Covers campaign creation, contributions, tier logic, milestone voting, fund releases,
///      refunds, fees, input validation, view functions, events, and modifiers.
contract CrowdFundingTest is Test {
    CrowdFunding public crowdFunding;
    ERC20Mock public usdc;

    address public owner;
    address public creator;
    address public contributor1;
    address public contributor2;
    address public contributor3;
    address public contributor4;

    uint256 constant INITIAL_BALANCE = 20_000 * 10**6;
    uint256 constant CAMPAIGN_GOAL = 1_000 * 10**6;
    uint256 constant CAMPAIGN_DURATION_DAYS = 30;

    /// @notice Sets up the test environment: deploys contracts, mints tokens, and assigns addresses
    function setUp() public {
        owner = address(this);
        creator = makeAddr("creator");
        contributor1 = makeAddr("contributor1");
        contributor2 = makeAddr("contributor2");
        contributor3 = makeAddr("contributor3");
        contributor4 = makeAddr("contributor4");

        usdc = new ERC20Mock();
        crowdFunding = new CrowdFunding(address(usdc));

        usdc.mint(creator, INITIAL_BALANCE);
        usdc.mint(contributor1, INITIAL_BALANCE);
        usdc.mint(contributor2, INITIAL_BALANCE);
        usdc.mint(contributor3, INITIAL_BALANCE);
        usdc.mint(contributor4, INITIAL_BALANCE);
    }

    // ============================================================================
    // HELPER FUNCTIONS
    // ============================================================================

    /// @notice Creates a default set of reward tiers (Bronze and Gold)
    /// @return tiers Array of RewardTier structs
    function _createDefaultTiers() internal pure returns (CrowdFunding.RewardTier[] memory) {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](2);
        tiers[0] = CrowdFunding.RewardTier("Bronze", "Basic rewards", 10 * 10**6, 100, 0);
        tiers[1] = CrowdFunding.RewardTier("Gold", "Premium rewards", 50 * 10**6, 50, 0);
        return tiers;
    }

    /// @notice Creates a default set of milestones (2 × 50%, deadlines 60 and 90 days from now)
    /// @return milestones Array of Milestone structs
    function _createDefaultMilestones() internal view returns (CrowdFunding.Milestone[] memory) {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone("First milestone", 50, block.timestamp + 60 days, 0, 0, false, false, false);
        milestones[1] = CrowdFunding.Milestone("Second milestone", 50, block.timestamp + 90 days, 0, 0, false, false, false);
        return milestones;
    }

    /// @notice Creates a default campaign and returns its ID
    /// @return campaignId ID of the newly created campaign
    function _createDefaultCampaign() internal returns (uint256) {
        vm.startPrank(creator);
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            _createDefaultMilestones()
        );
        vm.stopPrank();
        return crowdFunding.getCampaignCount() - 1;
    }

    // ============================================================================
    // CREATION & VALIDATION TESTS
    // ============================================================================

    /// @notice Tests successful campaign creation with default parameters
    function test_CreateCampaign_Success() public {
        uint256 id = _createDefaultCampaign();
        CrowdFunding.Campaign memory c = crowdFunding.getCampaign(id);

        assertEq(c.title, "Test Campaign");
        assertEq(c.goal, CAMPAIGN_GOAL);
        assertEq(c.originalGoal, CAMPAIGN_GOAL);
        assertEq(c.raised, 0);
        assertEq(c.creator, creator);
        assertEq(uint8(c.state), uint8(CrowdFunding.States.Active));
        assertFalse(c.anyMilestoneReleased);
        assertEq(crowdFunding.getCampaignCount(), 1);
    }

    /// @notice Reverts when campaign goal is too low
    function test_CreateCampaign_RevertIf_GoalTooLow() public {
        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__GoalTooLow.selector);
        crowdFunding.createCampaign("Low Goal", 50 * 10**6, "Desc", CAMPAIGN_DURATION_DAYS, _createDefaultTiers(), _createDefaultMilestones());
        vm.stopPrank();
    }

    /// @notice Reverts when campaign duration is zero
    function test_CreateCampaign_RevertIf_DurationZero() public {
        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__DurationMustBeGreaterThanZero.selector);
        crowdFunding.createCampaign("Zero Dur", CAMPAIGN_GOAL, "Desc", 0, _createDefaultTiers(), _createDefaultMilestones());
        vm.stopPrank();
    }

    /// @notice Reverts when campaign duration is too long (>365 days)
    function test_CreateCampaing_RevertIf_DurationTooLong() public {
        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__DurationTooLong.selector);
        crowdFunding.createCampaign("Too Long", CAMPAIGN_GOAL, "Desc", 366, _createDefaultTiers(), _createDefaultMilestones());
        vm.stopPrank();
    }

    /// @notice Reverts when campaign title is too long
    function test_CreateCampaign_RevertIf_TitleTooLong() public {
        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__TitleTooLong.selector);
        crowdFunding.createCampaign(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            CAMPAIGN_GOAL,
            "Valid description",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    /// @notice Reverts when campaign description is too long
    function test_CreateCampaign_RevertIf_DescriptionTooLong() public {
        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__DescriptionTooLong.selector);
        crowdFunding.createCampaign(
            "Valid title",
             CAMPAIGN_GOAL,
            "Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    // ============================================================================
    // CONTRIBUTION TESTS
    // ============================================================================

    /// @notice Reverts when a single contribution would exceed the campaign goal
    function test_Contribute_RevertIf_ExceedsGoal() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL + 1);
        vm.expectRevert(CrowdFunding.CrowdFunding__ContributionExceedsGoal.selector);
        crowdFunding.contribute(id, CAMPAIGN_GOAL + 1, 0);
        vm.stopPrank();
    }

    /// @notice Tests successful contribution and tier upgrade after additional payment
    function test_Contribute_SuccessAndTierUpgrade() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);

        crowdFunding.contribute(id, 10 * 10**6, 0); // Bronze
        assertEq(crowdFunding.getContributorTier(id, contributor1), 0);

        crowdFunding.contribute(id, 50 * 10**6, 1); // Upgrade to Gold
        assertEq(crowdFunding.getContributorTier(id, contributor1), 1);
        assertEq(crowdFunding.getContribution(id, contributor1), 60 * 10**6);

        vm.stopPrank();
    }

    /// @notice Creator cannot contribute to their own campaign
    function test_Contribute_RevertIf_CreatorContributes() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(creator);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__YouCantContributeYourOwnCampaign.selector);
        crowdFunding.contribute(id, 100 * 10**6, 0);
        vm.stopPrank();
    }

    /// @notice Reverts when trying to contribute after campaign has ended
    function testContributeRevertIfCampaingHasEnded() public {
        _createDefaultCampaign();

        vm.warp(block.timestamp + 31 days);

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignHasEnded.selector);
        crowdFunding.contribute(0, 100 * 10**6, 0);
        vm.stopPrank();
    }

    /// @notice Reverts when contribution amount is zero
    function testContributeRevertIfAmountIsZero() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__ValueMustBeGreaterThanZero.selector);
        crowdFunding.contribute(0, 0, 0);
        vm.stopPrank();
    }

    /// @notice Reverts when selected tier index does not exist
    function test_Contribute_RevertIf_CampaignTierDoesNotExist() public {
         _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignTierDoesNotExist.selector);
        crowdFunding.contribute(0, 100 * 10**6, 2);
        vm.stopPrank();
    }

    /// @notice Reverts when contribution is below the minimum for the selected tier
    function test_Contribute_RevertIf_ContributionBelowTierMinimum() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__ContributionBelowTierMinimum.selector);
        crowdFunding.contribute(0, 1 * 10**6, 0);
        vm.stopPrank();
    }

    /// @notice Tests tier backer limit – third contributor should revert
    function test_Contribute_RevertIf_TierFull() public {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](1);
        tiers[0] = CrowdFunding.RewardTier({
            name: "Limited Tier",
            description: "Only two backers allowed",
            minContribution: 10 * 10**6,
            maxBackers: 2,   
            currentBackers: 0
        });

        vm.startPrank(creator);
        crowdFunding.createCampaign(
            "Limited Campaign",
            CAMPAIGN_GOAL,
            "Campaign with tier limit = 2",
            CAMPAIGN_DURATION_DAYS,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();

        uint256 campaignId = crowdFunding.getCampaignCount() - 1;

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 10 * 10**6);
        crowdFunding.contribute(campaignId, 10 * 10**6, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), 10 * 10**6);
        crowdFunding.contribute(campaignId, 10 * 10**6, 0);
        vm.stopPrank();

        vm.startPrank(contributor3);
        usdc.approve(address(crowdFunding), 10 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__TierFull.selector);
        crowdFunding.contribute(campaignId, 10 * 10**6, 0);
        vm.stopPrank();
    }

    /// @notice Reverts when allowance is insufficient for the contribution
    function testContributterRevertIfInsuficientAllowance() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__InsufficientAllowance.selector);
        crowdFunding.contribute(0, 150 * 10**6, 0);
        vm.stopPrank();
    }

    /// @notice Tier upgrade correctly emits the TierUpgraded event
    function test_TierUpgrade_EmitsEvent() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        
        crowdFunding.contribute(id, 10 * 10**6, 0); // Bronze tier
        
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.TierUpgraded(id, contributor1, 0, 1);
        crowdFunding.contribute(id, 40 * 10**6, 1); // Upgrade to Gold
        
        vm.stopPrank();
    }

    /// @notice Tier upgrade correctly decrements old tier backers and increments new tier
    function test_TierUpgrade_UpdatesBackersCorrectly() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        
        crowdFunding.contribute(id, 10 * 10**6, 0);
        
        CrowdFunding.RewardTier[] memory tiersBefore = crowdFunding.getCampaignTiers(id);
        assertEq(tiersBefore[0].currentBackers, 1);
        assertEq(tiersBefore[1].currentBackers, 0);
        
        crowdFunding.contribute(id, 40 * 10**6, 1); // Upgrade
        
        CrowdFunding.RewardTier[] memory tiersAfter = crowdFunding.getCampaignTiers(id);
        assertEq(tiersAfter[0].currentBackers, 0);
        assertEq(tiersAfter[1].currentBackers, 1);
        
        vm.stopPrank();
    }

    /// @notice Multiple contributions to the same tier do not increase backer count
    function test_Contribute_SameTierMultipleTimes_NoUpgrade() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        
        crowdFunding.contribute(id, 10 * 10**6, 0);
        crowdFunding.contribute(id, 10 * 10**6, 0); // Same tier again
        
        assertEq(crowdFunding.getContributorTier(id, contributor1), 0);
        assertEq(crowdFunding.getContribution(id, contributor1), 20 * 10**6);
        
        CrowdFunding.RewardTier[] memory tiers = crowdFunding.getCampaignTiers(id);
        assertEq(tiers[0].currentBackers, 1); // Still 1
        
        vm.stopPrank();
    }
    // ============================================================================
    // VOTE MILESTONE TESTS
    // ============================================================================

    /// @notice Reverts when trying to vote on non-existent milestone
    function testVoteMilestoneRevertIFMilestoneNotFound() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.warp(block.timestamp + 31 days);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneNotFound.selector);
        crowdFunding.voteMilestone(0, 2, true);
        vm.stopPrank();
    }

    /// @notice Only contributors of the campaign can vote
    function testVoteMIlestoneRevertIfNotAContributor() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.warp(block.timestamp + 31 days);
        vm.stopPrank();

        vm.startPrank(contributor2);
        vm.expectRevert(CrowdFunding.CrowdFunding__NotAContributor.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    /// @notice Cannot vote twice on the same milestone
    function testVoteMilestoneRevertIfAlreadyVoted() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.warp(block.timestamp + 61 days);
        crowdFunding.voteMilestone(0, 0, true);
        vm.expectRevert(CrowdFunding.CrowdFunding__AlreadyVoted.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    /// @notice Cannot vote after milestone voting has been finalized
    function testVoteMilestoneRevertIfVotingAlreadyFinalized() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);

        vm.startPrank(contributor1);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();

        vm.warp(block.timestamp + 8 days);
        crowdFunding.finalizeMilestoneVoting(0, 0);

        vm.startPrank(contributor2);
        vm.expectRevert(CrowdFunding.CrowdFunding__VotingAlreadyFinalized.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    /// @notice Voting is not allowed while campaign is still active
    function testVoteMilestoneRevertIfCampaignStillActive() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignStillActive.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    /// @notice Requires at least the full goal to be raised before voting
    function testVoteMilestoneRevertIfNotEnoughMoneyRaised() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.warp(block.timestamp + 61 days);
        vm.expectRevert(CrowdFunding.CrowdFunding__NotEnoughMoneyRaised.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    /// @notice Voting only possible after milestone deadline is reached
    function testVoteMilestoneRevertIfMilestoneDeadlineNotReached() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.warp(block.timestamp + 31 days);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneDeadlineNotReached.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    /// @notice Voting period expires after VOTING_PERIOD (7 days)
    function testVoteMilestoneRevertIfMilestoneVotingPeriodExpired() public {
         _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.warp(block.timestamp + 68 days);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneVotingPeriodExpired.selector);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();
    }

    // ============================================================================
    // RELEASE MILESTONE FUNDS
    // ============================================================================

    /// @notice Reverts when trying to release funds for non-existent milestone
    function testReleaseMilestoneRevertIfMilestoneNotFOund() public {
        _createDefaultCampaign();
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneNotFound.selector);
        crowdFunding.releaseMilestoneFunds(0, 2);
    }

    /// @notice Only campaign creator can release milestone funds
    function testReleaseMilestoneRevertIfOnlyCreatorCanReleaseFunds() public {
        _createDefaultCampaign();
        
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);

        vm.startPrank(contributor1);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();

        vm.startPrank(contributor2);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();

        vm.startPrank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__OnlyCreatorCanReleaseFunds.selector);
        crowdFunding.releaseMilestoneFunds(0, 0);
        vm.stopPrank();
    }

   
    /// @notice Milestone must be approved via voting before release
    function testReleaseMilestoneRevertIfMilestoneNotApproved() public {
         _createDefaultCampaign();
        
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);

        vm.startPrank(contributor1);
        crowdFunding.voteMilestone(0, 0, true);
        vm.stopPrank();

        vm.startPrank(contributor2);
        crowdFunding.voteMilestone(0, 0, false);
        vm.stopPrank();

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneNotApproved.selector);
        crowdFunding.releaseMilestoneFunds(0, 0);
        vm.stopPrank();
    }



   
    // ============================================================================
    // FINALIZE MILESTONE VOTING TESTS
    // ============================================================================

    /// @notice Reverts when finalizing non-existent milestone
    function testFinalizeMIlestoneRevertIfMilestoneNotFound() public {
        _createDefaultCampaign();
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneNotFound.selector);
        crowdFunding.finalizeMilestoneVoting(0, 2);
    }

    /// @notice Cannot finalize already finalized voting
    function testFinalizeMIlestoneRevertIfVotingAlreadyFinalized() public {
        _createDefaultCampaign();
        
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);

        vm.prank(contributor1);
        crowdFunding.voteMilestone(0, 0, true);

        vm.warp(block.timestamp + 8 days);
        crowdFunding.finalizeMilestoneVoting(0, 0);

        vm.expectRevert(CrowdFunding.CrowdFunding__VotingAlreadyFinalized.selector);
        crowdFunding.finalizeMilestoneVoting(0, 0);
    }

    /// @notice Finalization only possible after voting period has ended
    function testFinalizeMIlestoneRevertIfVotingPeriodNotExpired() public {
        _createDefaultCampaign();
        
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(0, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);

        vm.prank(contributor1);
        crowdFunding.voteMilestone(0, 0, true);

        CrowdFunding.Milestone memory m = crowdFunding.getMilestone(0, 0);
        uint256 votingDeadline = m.deadline + crowdFunding.VOTING_PERIOD();

        vm.warp(votingDeadline - 1);

        vm.expectRevert(CrowdFunding.CrowdFunding__VotingPeriodNotExpired.selector);
        crowdFunding.finalizeMilestoneVoting(0, 0);
    }

    /// @notice Reverts if not enough votes to approve (no votes at all)
    function testFinalizeMilestoneRevertIfNotEnoughVotesToApprove() public {
        _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(0, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 31 days);

        CrowdFunding.Milestone memory m = crowdFunding.getMilestone(0, 0);
        vm.warp(m.deadline + crowdFunding.VOTING_PERIOD() + 1);

        vm.expectRevert(CrowdFunding.CrowdFunding__NotEnoughVotesToApprove.selector);
        crowdFunding.finalizeMilestoneVoting(0, 0);
    }

    function test_FunctionRevertIfNoContributors() public {
    uint256 campaignId = _createDefaultCampaign(); 

    // Pobieramy deadline pierwszego milestone
    CrowdFunding.Milestone[] memory milestones = crowdFunding.getCampaignMilestones(campaignId);
    uint256 firstMilestoneDeadline = milestones[0].deadline;

    // Przesuwamy czas po zakończeniu okresu głosowania
    vm.warp(firstMilestoneDeadline + crowdFunding.VOTING_PERIOD() + 1);

    // Spodziewamy się revert CrowdFunding__NotEnoughTotalConitributors
    vm.expectRevert(CrowdFunding.CrowdFunding__NotEnoughTotalConitributors.selector);

    // Wywołanie finalizeMilestoneVoting bez żadnych contributorów
    crowdFunding.finalizeMilestoneVoting(campaignId, 0); 
}

    // ============================================================================
    // VOTING LOGIC TESTS
    // ============================================================================

    /// @notice Milestone approval requires >51% of total contributors to vote yes
    function test_Voting_Requires51PercentOfAllContributors() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 3);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 3, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 3);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 3, 0);
        vm.stopPrank();

        vm.startPrank(contributor3);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 3 + 1);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 3 + 1, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + CAMPAIGN_DURATION_DAYS + 61 days);

        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 0, true);
        vm.prank(contributor2);
        crowdFunding.voteMilestone(id, 0, true);

        CrowdFunding.Milestone memory m = crowdFunding.getMilestone(id, 0);
        assertFalse(m.approved);
        assertFalse(m.votingFinalized);

        vm.warp(block.timestamp + 8 days);
        crowdFunding.finalizeMilestoneVoting(id, 0);

        m = crowdFunding.getMilestone(id, 0);
        assertTrue(m.votingFinalized);
        assertTrue(m.approved); // 2 out of 3 = 66.6% > 51%
    }

    // ============================================================================
    // WITHDRAW FEES TESTS
    // ============================================================================

    /// @notice Owner can successfully withdraw accumulated fees after milestone release
    function test_WithdrawFees_Success() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 2, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);
        
        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 0, true);
        vm.prank(contributor2);
        crowdFunding.voteMilestone(id, 0, true);

        vm.warp(block.timestamp + 8 days);
        crowdFunding.finalizeMilestoneVoting(id, 0);

        vm.prank(creator);
        crowdFunding.releaseMilestoneFunds(id, 0);

        uint256 expectedFee = (CAMPAIGN_GOAL * 50 / 100) * 3 / 100;
        assertEq(crowdFunding.getAccumulatedFees(), expectedFee);

        uint256 ownerBalanceBefore = usdc.balanceOf(owner);
        
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.FeesWithdrawn(owner, expectedFee);
        
        crowdFunding.withdrawFees();

        assertEq(usdc.balanceOf(owner), ownerBalanceBefore + expectedFee);
        assertEq(crowdFunding.getAccumulatedFees(), 0);
    }

    /// @notice Only contract owner can withdraw fees
    function test_WithdrawFees_RevertIf_NotOwner() public {
        vm.prank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__OnlyOwnerOfCampaignCanWithdraw.selector);
        crowdFunding.withdrawFees();
    }

    /// @notice Reverts when there are no fees to withdraw
    function test_WithdrawFees_RevertIf_NoFees() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__NoFeesToWithdraw.selector);
        crowdFunding.withdrawFees();
    }

    // ============================================================================
    // REFUND TESTS
    // ============================================================================

    /// @notice Successful refund when campaign fails to reach goal
    function test_Refund_Success() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(id, 100 * 10**6, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 31 days);

        uint256 balanceBefore = usdc.balanceOf(contributor1);

        vm.prank(contributor1);
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.CampaignRefunded(id, contributor1, 100 * 10**6);
        crowdFunding.refund(id);

        assertEq(usdc.balanceOf(contributor1), balanceBefore + 100 * 10**6);
        assertEq(crowdFunding.getContribution(id, contributor1), 0);
        
        CrowdFunding.Campaign memory c = crowdFunding.getCampaign(id);
        assertEq(uint8(c.state), uint8(CrowdFunding.States.Failed));
    }

    /// @notice Cannot refund while campaign is still active
    function test_Refund_RevertIf_CampaignStillActive() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(id, 100 * 10**6, 0);
        
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignStillActive.selector);
        crowdFunding.refund(id);
        vm.stopPrank();
    }

    /// @notice Cannot refund when campaign reached its goal
    function test_Refund_RevertIf_CampaignRaisedEnoughMoney() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 31 days);

        vm.prank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignRaisedEnoughMoney.selector);
        crowdFunding.refund(id);
    }

  

    /// @notice Reverts when contributor has nothing to refund
    function test_Refund_RevertIf_NothingToRefund() public {
        uint256 id = _createDefaultCampaign();

        vm.warp(block.timestamp + 31 days);

        vm.prank(contributor1);
        vm.expectRevert(CrowdFunding.CrowdFunding__NothingToRefund.selector);
        crowdFunding.refund(id);
    }

    // ============================================================================
    // INPUT VALIDATION TESTS (tiers & milestones)
    // ============================================================================

    /// @notice Reverts when no reward tiers are provided
    function test_CreateCampaign_RevertIf_InvalidTierCount_TooFew() public {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](0);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__InvalidTierCount.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    /// @notice Reverts when too many reward tiers (>5)
    function test_CreateCampaign_RevertIf_InvalidTierCount_TooMany() public {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](6);
        for (uint i = 0; i < 6; i++) {
            tiers[i] = CrowdFunding.RewardTier("Tier", "Desc", (i + 1) * 10 * 10**6, 0, 0);
        }

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__InvalidTierCount.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    /// @notice Reverts when tier name is too long
    function test_CreateCampaign_RevertIf_TierNameTooLong() public {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](1);
        tiers[0] = CrowdFunding.RewardTier(
            "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "Desc",
            10 * 10**6,
            0,
            0
        );

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__StringTooLong.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    /// @notice Reverts when tier description is too long
    function test_CreateCampaign_RevertIf_TierDescriptionTooLong() public {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](1);
        tiers[0] = CrowdFunding.RewardTier(
            "Name",
            "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            10 * 10**6,
            0,
            0
        );

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__StringTooLong.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    /// @notice Reverts when tier minimum contribution is too low
    function test_CreateCampaign_RevertIf_TierMinContributionTooLow() public {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](1);
        tiers[0] = CrowdFunding.RewardTier("Name", "Desc", 5 * 10**6, 0, 0);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__TierMinContributionTooLow.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    /// @notice Reverts when tiers are not sorted by minContribution ascending
    function test_CreateCampaign_RevertIf_TiersNotSorted() public {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](2);
        tiers[0] = CrowdFunding.RewardTier("Gold", "Premium", 50 * 10**6, 0, 0);
        tiers[1] = CrowdFunding.RewardTier("Bronze", "Basic", 10 * 10**6, 0, 0);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__TiersMustBeSorted.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            tiers,
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    /// @notice Reverts when too few milestones provided
    function test_CreateCampaign_RevertIf_InvalidMilestoneCount_TooFew() public {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](1);
        milestones[0] = CrowdFunding.Milestone("M1", 100, block.timestamp + 60 days, 0, 0, false, false, false);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__InvalidMilestoneCount.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            milestones
        );
        vm.stopPrank();
    }

    /// @notice Reverts when too many milestones (>5)
    function test_CreateCampaign_RevertIf_InvalidMilestoneCount_TooMany() public {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](6);
        for (uint i = 0; i < 6; i++) {
            milestones[i] = CrowdFunding.Milestone(
                "M",
                16,
                block.timestamp + 60 days + (i * 30 days),
                0, 0, false, false, false
            );
        }
        milestones[5].percentage = 20;

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__InvalidMilestoneCount.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            milestones
        );
        vm.stopPrank();
    }

    /// @notice Reverts when milestone description is too long
    function test_CreateCampaign_RevertIf_MilestoneDescriptionTooLong() public {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone(
            "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            50,
            block.timestamp + 60 days,
            0, 0, false, false, false
        );
        milestones[1] = CrowdFunding.Milestone("M2", 50, block.timestamp + 90 days, 0, 0, false, false, false);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__StringTooLong.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            milestones
        );
        vm.stopPrank();
    }

    /// @notice Reverts when any milestone percentage is too low (<10%)
    function test_CreateCampaign_RevertIf_MilestonePercentageTooLow() public {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone("M1", 5, block.timestamp + 60 days, 0, 0, false, false, false);
        milestones[1] = CrowdFunding.Milestone("M2", 95, block.timestamp + 90 days, 0, 0, false, false, false);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestonePercentageTooLow.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            milestones
        );
        vm.stopPrank();
    }

    /// @notice Reverts when milestone percentages do not sum to 100
    function test_CreateCampaign_RevertIf_MilestonePercentageNotSumTo100() public {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone("M1", 40, block.timestamp + 60 days, 0, 0, false, false, false);
        milestones[1] = CrowdFunding.Milestone("M2", 50, block.timestamp + 90 days, 0, 0, false, false, false);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestonePercentageMustSumTo100.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            milestones
        );
        vm.stopPrank();
    }

    /// @notice Reverts when any milestone deadline is before campaign end
    function test_CreateCampaign_RevertIf_MilestoneDeadlineBeforeCampaignEnd() public {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone("M1", 50, block.timestamp + 20 days, 0, 0, false, false, false);
        milestones[1] = CrowdFunding.Milestone("M2", 50, block.timestamp + 90 days, 0, 0, false, false, false);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneDeadlinesNotSequential.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            milestones
        );
        vm.stopPrank();
    }

    /// @notice Reverts when a milestone deadline is too far in the future
    function test_CreateCampaign_RevertIf_MilestoneDeadlineTooLong() public {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone("M1", 50, block.timestamp + 60 days, 0, 0, false, false, false);
        milestones[1] = CrowdFunding.Milestone("M2", 50, block.timestamp + 400 days, 0, 0, false, false, false);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneDeadlineTooLong.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            milestones
        );
        vm.stopPrank();
    }

    /// @notice Reverts when milestone deadlines are not strictly increasing
    function test_CreateCampaign_RevertIf_MilestoneDeadlinesNotSequential() public {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone("M1", 50, block.timestamp + 90 days, 0, 0, false, false, false);
        milestones[1] = CrowdFunding.Milestone("M2", 50, block.timestamp + 60 days, 0, 0, false, false, false);

        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneDeadlinesNotSequential.selector);
        crowdFunding.createCampaign(
            "Test",
            CAMPAIGN_GOAL,
            "Desc",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            milestones
        );
        vm.stopPrank();
    }

    // ============================================================================
    // VIEW FUNCTION TESTS
    // ============================================================================

    /// @notice Returns correct contract owner
    function test_GetOwner() public {
        assertEq(crowdFunding.getOwner(), owner);
    }

    /// @notice Returns correct USDC token address
    function test_GetUSDCAddress() public {
        assertEq(crowdFunding.getUSDCAddress(), address(usdc));
    }

    /// @notice Returns correct accumulated fees (initially 0)
    function test_GetAccumulatedFees() public {
        assertEq(crowdFunding.getAccumulatedFees(), 0);
    }

    /// @notice Returns correct campaign tiers
    function test_GetCampaignTiers() public {
        uint256 id = _createDefaultCampaign();
        CrowdFunding.RewardTier[] memory tiers = crowdFunding.getCampaignTiers(id);
        assertEq(tiers.length, 2);
        assertEq(tiers[0].name, "Bronze");
        assertEq(tiers[1].name, "Gold");
    }

    /// @notice Returns correct campaign milestones
    function test_GetCampaignMilestones() public {
        uint256 id = _createDefaultCampaign();
        CrowdFunding.Milestone[] memory milestones = crowdFunding.getCampaignMilestones(id);
        assertEq(milestones.length, 2);
        assertEq(milestones[0].percentage, 50);
        assertEq(milestones[1].percentage, 50);
    }

    /// @notice Returns correct individual milestone
    function test_GetMilestone() public {
        uint256 id = _createDefaultCampaign();
        CrowdFunding.Milestone memory m = crowdFunding.getMilestone(id, 0);
        assertEq(m.description, "First milestone");
        assertEq(m.percentage, 50);
    }

    /// @notice Reverts when requesting non-existent milestone
    function test_GetMilestone_RevertIf_NotFound() public {
        uint256 id = _createDefaultCampaign();
        vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneNotFound.selector);
        crowdFunding.getMilestone(id, 5);
    }

    /// @notice Returns correct contributor tier
    function test_GetContributorTier() public {
        uint256 id = _createDefaultCampaign();
        
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(id, 100 * 10**6, 1);
        vm.stopPrank();

        assertEq(crowdFunding.getContributorTier(id, contributor1), 1);
    }

    /// @notice Returns correct total number of contributors
    function test_GetTotalContributors() public {
        uint256 id = _createDefaultCampaign();
        
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(id, 100 * 10**6, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(id, 100 * 10**6, 0);
        vm.stopPrank();

        assertEq(crowdFunding.getTotalContributors(id), 2);
    }

    /// @notice Campaign counter increments correctly
    function test_GetCampaignCount() public {
        uint256 countBefore = crowdFunding.getCampaignCount();
        _createDefaultCampaign();
        assertEq(crowdFunding.getCampaignCount(), countBefore + 1);
    }

    // ============================================================================
    // VOTING EDGE CASES
    // ============================================================================

    /// @notice Milestone is rejected when >51% vote no
    function test_Voting_RejectedWhen51PercentVoteNo() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 4);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 4, 0);
        vm.stopPrank();

        vm.startPrank(contributor2);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 4);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 4, 0);
        vm.stopPrank();

        vm.startPrank(contributor3);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 4);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 4, 0);
        vm.stopPrank();

        vm.startPrank(contributor4);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 4);
        crowdFunding.contribute(id, CAMPAIGN_GOAL / 4, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);

        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 0, true);
        vm.prank(contributor2);
        crowdFunding.voteMilestone(id, 0, false);
        vm.prank(contributor3);
        crowdFunding.voteMilestone(id, 0, false);
        vm.prank(contributor4);
        crowdFunding.voteMilestone(id, 0, false);

        vm.warp(block.timestamp + 8 days);
        
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.MilestoneRejected(id, 0);
        crowdFunding.finalizeMilestoneVoting(id, 0);

        CrowdFunding.Milestone memory m = crowdFunding.getMilestone(id, 0);
        assertTrue(m.votingFinalized);
        assertFalse(m.approved);
    }

    /// @notice Milestone approved with exactly 51% turnout and all yes votes
    function test_Voting_ApprovedWithExactly51PercentTurnout() public {
        uint256 id = _createDefaultCampaign();

        for (uint i = 0; i < 100; i++) {
            address contrib = makeAddr(string(abi.encodePacked("contrib", i)));
            usdc.mint(contrib, CAMPAIGN_GOAL / 100 + 1);
            
            vm.startPrank(contrib);
            usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 100);
            crowdFunding.contribute(id, CAMPAIGN_GOAL / 100, 0);
            vm.stopPrank();
        }

        vm.warp(block.timestamp + 61 days);

        for (uint i = 0; i < 51; i++) {
            address contrib = makeAddr(string(abi.encodePacked("contrib", i)));
            vm.prank(contrib);
            crowdFunding.voteMilestone(id, 0, true);
        }

        vm.warp(block.timestamp + 8 days);
        crowdFunding.finalizeMilestoneVoting(id, 0);

        CrowdFunding.Milestone memory m = crowdFunding.getMilestone(id, 0);
        assertTrue(m.approved);
    }

    // ============================================================================
    // EVENTS
    // ============================================================================

    /// @notice CampaignCreated event is emitted correctly
    function test_Event_CampaignCreated() public {
        vm.startPrank(creator);
        
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.CampaignCreated(
            0,
            creator,
            "Test Campaign",
            CAMPAIGN_GOAL,
            block.timestamp + CAMPAIGN_DURATION_DAYS * 1 days
        );
        
        crowdFunding.createCampaign(
            "Test Campaign",
            CAMPAIGN_GOAL,
            "Test Description",
            CAMPAIGN_DURATION_DAYS,
            _createDefaultTiers(),
            _createDefaultMilestones()
        );
        vm.stopPrank();
    }

    /// @notice CampaignContributed event is emitted correctly
    function test_Event_CampaignContributed() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.CampaignContributed(id, contributor1, 100 * 10**6, 0);
        
        crowdFunding.contribute(id, 100 * 10**6, 0);
        vm.stopPrank();
    }

    /// @notice MilestoneVoted event is emitted correctly
    function test_Event_MilestoneVoted() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);

        vm.prank(contributor1);
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.MilestoneVoted(id, 0, contributor1, true, 1, 0);
        crowdFunding.voteMilestone(id, 0, true);
    }

    /// @notice MilestoneApproved event is emitted on successful finalization
    function test_Event_MilestoneApproved() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);
        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 0, true);

        vm.warp(block.timestamp + 8 days);
        
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.MilestoneApproved(id, 0);
        crowdFunding.finalizeMilestoneVoting(id, 0);
    }

    /// @notice MilestoneFundsReleased event is emitted with correct amounts
    function test_Event_MilestoneFundsReleased() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + 61 days);
        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 0, true);
        vm.warp(block.timestamp + 8 days);
        crowdFunding.finalizeMilestoneVoting(id, 0);

        uint256 milestoneAmount = (CAMPAIGN_GOAL * 50) / 100;
        uint256 feeAmount = (milestoneAmount * 3) / 100;
        uint256 amountToCreator = milestoneAmount - feeAmount;

        vm.prank(creator);
        vm.expectEmit(true, true, true, true);
        emit CrowdFunding.MilestoneFundsReleased(id, 0, amountToCreator, feeAmount);
        crowdFunding.releaseMilestoneFunds(id, 0);
    }


    // ============================================================================
    // CUSTOM EVENTS DECLARATION (for testing)
    // ============================================================================

    event CampaignCreated(uint256 indexed campaignId, address indexed creator, string title, uint256 goal, uint256 duration);
    event CampaignContributed(uint256 indexed campaignId, address indexed contributor, uint256 amount, uint8 tierIndex);
    event CampaignRefunded(uint256 indexed campaignId, address indexed contributor, uint256 amount);
    event FeesWithdrawn(address indexed owner, uint256 amount);
    event MilestoneVoted(uint256 indexed campaignId, uint256 indexed milestoneId, address indexed voter, bool vote, uint16 votesFor, uint16 votesAgainst);
    event MilestoneApproved(uint256 indexed campaignId, uint256 indexed milestoneId);
    event MilestoneRejected(uint256 indexed campaignId, uint256 indexed milestoneId);
    event MilestoneFundsReleased(uint256 indexed campaignId, uint256 indexed milestoneId, uint256 amount, uint256 fee);
    event TierUpgraded(uint256 indexed campaignId, address indexed contributor, uint8 oldTier, uint8 newTier);

    // ============================================================================
    // MODIFIER TESTS
    // ============================================================================


    /// @notice Test revert in modifier when accessing non-existent campaign via view function
    function test_Modifier_RevertIf_CampaignDoesNotExist_GetCampaign() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getCampaign(0);
    }

    /// @notice Test revert in modifier when contributing to non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_Contribute() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.contribute(999, 100 * 10**6, 0);
    }

    /// @notice Test revert in modifier when voting on non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_VoteMilestone() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.voteMilestone(999, 0, true);
    }

    /// @notice Test revert in modifier when releasing funds from non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_ReleaseFunds() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.releaseMilestoneFunds(999, 0);
    }

    /// @notice Test revert in modifier when finalizing voting on non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_FinalizeVoting() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.finalizeMilestoneVoting(999, 0);
    }

    /// @notice Test revert in modifier when refunding from non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_Refund() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.refund(999);
    }

    /// @notice Test revert in modifier when getting tiers of non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_GetTiers() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getCampaignTiers(0);
    }

    /// @notice Test revert in modifier when getting milestones of non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_GetMilestones() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getCampaignMilestones(0);
    }

    /// @notice Test revert in modifier when getting specific milestone from non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_GetMilestone() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getMilestone(0, 0);
    }

    /// @notice Test revert in modifier when getting contributor tier from non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_GetContributorTier() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getContributorTier(0, address(1));
    }

    /// @notice Test revert in modifier when getting total contributors from non-existent campaign
    function test_Modifier_RevertIf_CampaignDoesNotExist_GetTotalContributors() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getTotalContributors(0);
    }


    function test_Contribute_SameTier_NoUpgrade() public {
    uint256 id = _createDefaultCampaign();

    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), 100 * 10**6);
    
   
    crowdFunding.contribute(id, 10 * 10**6, 0);
    assertEq(crowdFunding.getContributorTier(id, contributor1), 0);
    
    CrowdFunding.RewardTier[] memory tiersBefore = crowdFunding.getCampaignTiers(id);
    uint256 backersBefore = tiersBefore[0].currentBackers;


    crowdFunding.contribute(id, 15 * 10**6, 0); 
    
    assertEq(crowdFunding.getContributorTier(id, contributor1), 0);
    assertEq(crowdFunding.getContribution(id, contributor1), 25 * 10**6);
    
    
    CrowdFunding.RewardTier[] memory tiersAfter = crowdFunding.getCampaignTiers(id);
    assertEq(tiersAfter[0].currentBackers, backersBefore);
    
    vm.stopPrank();
}




function test_ReleaseMilestone_RevertIf_PreviousMilestoneNotReleased() public {
    uint256 id = _createDefaultCampaign();
    

    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
    crowdFunding.contribute(id, CAMPAIGN_GOAL / 2, 0);
    vm.stopPrank();

    vm.startPrank(contributor2);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL / 2);
    crowdFunding.contribute(id, CAMPAIGN_GOAL / 2, 0);
    vm.stopPrank();


    vm.warp(block.timestamp + 91 days);


    vm.prank(contributor1);
    crowdFunding.voteMilestone(id, 1, true);
    vm.prank(contributor2);
    crowdFunding.voteMilestone(id, 1, true);

    vm.warp(block.timestamp + 8 days);
    crowdFunding.finalizeMilestoneVoting(id, 1);

    vm.startPrank(creator);
    vm.expectRevert(CrowdFunding.CrowdFunding__PreviousMilestoneNotReleased.selector);
    crowdFunding.releaseMilestoneFunds(id, 1);
    vm.stopPrank();
}





function test_ReleaseMilestone_RevertIf_FundsAlreadyReleased() public {
    uint256 id = _createDefaultCampaign();

    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
    crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
    vm.stopPrank();

    vm.warp(block.timestamp + 61 days);
    vm.prank(contributor1);
    crowdFunding.voteMilestone(id, 0, true);
    vm.warp(block.timestamp + 8 days);
    crowdFunding.finalizeMilestoneVoting(id, 0);

    vm.startPrank(creator);
    crowdFunding.releaseMilestoneFunds(id, 0);


    vm.expectRevert(CrowdFunding.CrowdFunding__MilestoneFundsAlreadyReleased.selector);
    crowdFunding.releaseMilestoneFunds(id, 0);
    vm.stopPrank();
}

function test_ReleaseMilestone_FirstMilestone_StateRemainsActive() public {
    uint256 id = _createDefaultCampaign();


    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
    crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
    vm.stopPrank();


    vm.warp(block.timestamp + 61 days);
    
    vm.prank(contributor1);
    crowdFunding.voteMilestone(id, 0, true);

    vm.warp(block.timestamp + 8 days);
    crowdFunding.finalizeMilestoneVoting(id, 0);


    vm.prank(creator);
    crowdFunding.releaseMilestoneFunds(id, 0);

  
    CrowdFunding.Campaign memory c = crowdFunding.getCampaign(id);
    assertEq(uint8(c.state), uint8(CrowdFunding.States.Active));
    assertTrue(c.anyMilestoneReleased);
}


function test_ReleaseMilestone_AllMilestones_StateBecomesSuccessful() public {
    uint256 id = _createDefaultCampaign();

 
    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
    crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
    vm.stopPrank();


    vm.warp(block.timestamp + 61 days); 
    vm.prank(contributor1);
    crowdFunding.voteMilestone(id, 0, true);
    vm.warp(block.timestamp + 8 days); 
    crowdFunding.finalizeMilestoneVoting(id, 0);
    vm.prank(creator);
    crowdFunding.releaseMilestoneFunds(id, 0);


    CrowdFunding.Campaign memory cAfterFirst = crowdFunding.getCampaign(id);
    assertEq(uint8(cAfterFirst.state), uint8(CrowdFunding.States.Active));

 
    vm.warp(block.timestamp + 22 days); 
    vm.prank(contributor1);
    crowdFunding.voteMilestone(id, 1, true);
    vm.warp(block.timestamp + 8 days);
    crowdFunding.finalizeMilestoneVoting(id, 1);
    vm.prank(creator);
    crowdFunding.releaseMilestoneFunds(id, 1);

  
    CrowdFunding.Campaign memory cAfterAll = crowdFunding.getCampaign(id);
    assertEq(uint8(cAfterAll.state), uint8(CrowdFunding.States.Successful));
    assertTrue(cAfterAll.anyMilestoneReleased);
}


function test_ReleaseMilestone_ThreeMilestones_OnlyLastChangesState() public {
  
    CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](3);
    milestones[0] = CrowdFunding.Milestone("M1", 30, block.timestamp + 60 days, 0, 0, false, false, false);
    milestones[1] = CrowdFunding.Milestone("M2", 40, block.timestamp + 90 days, 0, 0, false, false, false);
    milestones[2] = CrowdFunding.Milestone("M3", 30, block.timestamp + 120 days, 0, 0, false, false, false);

    vm.startPrank(creator);
    crowdFunding.createCampaign(
        "Three Milestones",
        CAMPAIGN_GOAL,
        "Description",
        CAMPAIGN_DURATION_DAYS,
        _createDefaultTiers(),
        milestones
    );
    vm.stopPrank();

    uint256 id = crowdFunding.getCampaignCount() - 1;

    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
    crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
    vm.stopPrank();

   
    vm.warp(block.timestamp + 61 days);
    vm.prank(contributor1);
    crowdFunding.voteMilestone(id, 0, true);
    vm.warp(block.timestamp + 8 days); 
    crowdFunding.finalizeMilestoneVoting(id, 0);
    vm.prank(creator);
    crowdFunding.releaseMilestoneFunds(id, 0);
    
    CrowdFunding.Campaign memory c1 = crowdFunding.getCampaign(id);
    assertEq(uint8(c1.state), uint8(CrowdFunding.States.Active)); 

 
    vm.warp(block.timestamp + 22 days); 
    vm.prank(contributor1);
    crowdFunding.voteMilestone(id, 1, true);
    vm.warp(block.timestamp + 8 days); 
    crowdFunding.finalizeMilestoneVoting(id, 1);
    vm.prank(creator);
    crowdFunding.releaseMilestoneFunds(id, 1);
    
    CrowdFunding.Campaign memory c2 = crowdFunding.getCampaign(id);
    assertEq(uint8(c2.state), uint8(CrowdFunding.States.Active)); 

 
    vm.warp(block.timestamp + 22 days); 
    vm.prank(contributor1);
    crowdFunding.voteMilestone(id, 2, true);
    vm.warp(block.timestamp + 8 days); 
    crowdFunding.finalizeMilestoneVoting(id, 2);
    vm.prank(creator);
    crowdFunding.releaseMilestoneFunds(id, 2);
    
    CrowdFunding.Campaign memory c3 = crowdFunding.getCampaign(id);
    assertEq(uint8(c3.state), uint8(CrowdFunding.States.Successful)); 
}






}