// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {CrowdFunding} from "../src/CrowdFunding.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

contract CrowdFundingTest is Test {
    CrowdFunding public crowdFunding;
    ERC20Mock public usdc;

    address public owner;
    address public creator;
    address public contributor1;
    address public contributor2;
    address public contributor3;

    uint256 constant INITIAL_BALANCE = 20_000 * 10**6;
    uint256 constant CAMPAIGN_GOAL = 1_000 * 10**6;
    uint256 constant CAMPAIGN_DURATION_DAYS = 30;

    function setUp() public {
        owner = address(this);
        creator = makeAddr("creator");
        contributor1 = makeAddr("contributor1");
        contributor2 = makeAddr("contributor2");
        contributor3 = makeAddr("contributor3");

        usdc = new ERC20Mock();
        crowdFunding = new CrowdFunding(address(usdc));

        usdc.mint(creator, INITIAL_BALANCE);
        usdc.mint(contributor1, INITIAL_BALANCE);
        usdc.mint(contributor2, INITIAL_BALANCE);
        usdc.mint(contributor3, INITIAL_BALANCE);
    }

    // Helper functions
    function _createDefaultTiers() internal pure returns (CrowdFunding.RewardTier[] memory) {
        CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](2);
        tiers[0] = CrowdFunding.RewardTier("Bronze", "Basic rewards", 10 * 10**6, 100, 0);
        tiers[1] = CrowdFunding.RewardTier("Gold", "Premium rewards", 50 * 10**6, 50, 0);
        return tiers;
    }

    function _createDefaultMilestones() internal view returns (CrowdFunding.Milestone[] memory) {
        CrowdFunding.Milestone[] memory milestones = new CrowdFunding.Milestone[](2);
        milestones[0] = CrowdFunding.Milestone("First milestone", 50, block.timestamp + 60 days, 0, 0, false, false, false);
        milestones[1] = CrowdFunding.Milestone("Second milestone", 50, block.timestamp + 90 days, 0, 0, false, false, false);
        return milestones;
    }

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

    function test_CreateCampaign_RevertIf_GoalTooLow() public {
        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__GoalTooLow.selector);
        crowdFunding.createCampaign("Low Goal", 50 * 10**6, "Desc", CAMPAIGN_DURATION_DAYS, _createDefaultTiers(), _createDefaultMilestones());
        vm.stopPrank();
    }

    function test_CreateCampaign_RevertIf_DurationZero() public {
        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__DurationMustBeGreaterThanZero.selector);
        crowdFunding.createCampaign("Zero Dur", CAMPAIGN_GOAL, "Desc", 0, _createDefaultTiers(), _createDefaultMilestones());
        vm.stopPrank();
    }

    function test_CreateCampaing_RevertIf_DurationTooLong() public {
        vm.startPrank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__DurationTooLong.selector);
        crowdFunding.createCampaign("Too Long", CAMPAIGN_GOAL, "Desc", 366, _createDefaultTiers(), _createDefaultMilestones());
        vm.stopPrank();
    }

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

    function test_Contribute_RevertIf_ExceedsGoal() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL + 1);
        vm.expectRevert(CrowdFunding.CrowdFunding__ContributionExceedsGoal.selector);
        crowdFunding.contribute(id, CAMPAIGN_GOAL + 1, 0);
        vm.stopPrank();
    }

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

    function test_Contribute_RevertIf_CreatorContributes() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(creator);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__YouCantContributeYourOwnCampaign.selector);
        crowdFunding.contribute(id, 100 * 10**6, 0);
        vm.stopPrank();
    }

    function testContributeRevertIfCampaingHasEnded() public {
        _createDefaultCampaign();

        vm.warp(block.timestamp + 31 days);

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignHasEnded.selector);
        crowdFunding.contribute(0, 100 * 10**6, 0);
        vm.stopPrank();
    }


    function testContributeRevertIfAmountIsZero() public {
        _createDefaultCampaign();


        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__ValueMustBeGreaterThanZero.selector);
        crowdFunding.contribute(0, 0, 0);
        vm.stopPrank();
        
    }

    function test_Contribute_RevertIf_CampaignTierDoesNotExist() public {
         _createDefaultCampaign();


        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignTierDoesNotExist.selector);
        crowdFunding.contribute(0, 100 * 10**6, 2);
        vm.stopPrank();
        
    }


    function test_Contribute_RevertIf_ContributionBelowTierMinimum() public {
        _createDefaultCampaign();
        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        vm.expectRevert(CrowdFunding.CrowdFunding__ContributionBelowTierMinimum.selector);
        crowdFunding.contribute(0, 1 * 10**6, 0);
        vm.stopPrank();
    }
    function test_Contribute_RevertIf_TierFull() public {


    CrowdFunding.RewardTier[] memory tiers = new CrowdFunding.RewardTier[](1);
    tiers[0] = CrowdFunding.RewardTier({
        name: "Limited Tier",
        description: "Only two backers allowed",
        minContribution: 10 * 10**6,
        maxBackers: 2,   
        currentBackers: 0
    });


    // =========================
    // Create campaign
    // =========================
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

    // =========================
    // Contributor 1 → OK
    // =========================
    vm.startPrank(contributor1);
    usdc.approve(address(crowdFunding), 10 * 10**6);
    crowdFunding.contribute(campaignId, 10 * 10**6, 0);
    vm.stopPrank();

    // =========================
    // Contributor 2 → OK
    // =========================
    vm.startPrank(contributor2);
    usdc.approve(address(crowdFunding), 10 * 10**6);
    crowdFunding.contribute(campaignId, 10 * 10**6, 0);
    vm.stopPrank();

    // =========================
    // Contributor 3 → REVERT
    // =========================
    vm.startPrank(contributor3);
    usdc.approve(address(crowdFunding), 10 * 10**6);
    vm.expectRevert(CrowdFunding.CrowdFunding__TierFull.selector);
    crowdFunding.contribute(campaignId, 10 * 10**6, 0);
    vm.stopPrank();
    }



    // ============================================================================
    // VOTING & FINALIZE TESTS
    // ============================================================================

    function test_Voting_Requires51PercentOfAllContributors() public {
        uint256 id = _createDefaultCampaign();

        // 3 contributors
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

        // Only 2 vote yes → 66.6% of total contributors
        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 0, true);
        vm.prank(contributor2);
        crowdFunding.voteMilestone(id, 0, true);

        // Auto-approve doesn't trigger because totalVotes < totalContributors (2 < 3)
        CrowdFunding.Milestone memory m = crowdFunding.getMilestone(id, 0);
        assertFalse(m.approved);
        assertFalse(m.votingFinalized);

        // Finalize after voting period
        vm.warp(block.timestamp + 8 days);
        crowdFunding.finalizeMilestoneVoting(id, 0);

        m = crowdFunding.getMilestone(id, 0);
        assertTrue(m.votingFinalized);
        assertTrue(m.approved); // 2/3 > 51%
    }

   

    // ============================================================================
    // RELEASE & SECURITY TESTS
    // ============================================================================



    function test_ReleaseMilestoneFunds_RevertIf_PreviousNotReleased() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + CAMPAIGN_DURATION_DAYS + 91 days); // past both deadlines

        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 1, true); // vote on milestone 1 first

        vm.prank(creator);
        vm.expectRevert(CrowdFunding.CrowdFunding__PreviousMilestoneNotReleased.selector);
        crowdFunding.releaseMilestoneFunds(id, 1);
    }

    function test_Refund_RevertIf_AfterAnyPayout() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + CAMPAIGN_DURATION_DAYS + 61 days);
        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 0, true);
        vm.prank(creator);
        crowdFunding.releaseMilestoneFunds(id, 0);

        vm.warp(block.timestamp + 100 days);

        vm.expectRevert(CrowdFunding.CrowdFunding__CannotRefundAfterPayout.selector);
        crowdFunding.refund(id);
    }

    // ============================================================================
    // FEES & OWNER TESTS
    // ============================================================================

    function test_WithdrawFees_Success() public {
        uint256 id = _createDefaultCampaign();

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), CAMPAIGN_GOAL);
        crowdFunding.contribute(id, CAMPAIGN_GOAL, 0);
        vm.stopPrank();

        vm.warp(block.timestamp + CAMPAIGN_DURATION_DAYS + 61 days);
        vm.prank(contributor1);
        crowdFunding.voteMilestone(id, 0, true);
        vm.prank(creator);
        crowdFunding.releaseMilestoneFunds(id, 0);

        uint256 fees = crowdFunding.getAccumulatedFees();
        assertGt(fees, 0);

        uint256 ownerBalanceBefore = usdc.balanceOf(owner);
        crowdFunding.withdrawFees();
        uint256 ownerBalanceAfter = usdc.balanceOf(owner);

        assertEq(ownerBalanceAfter - ownerBalanceBefore, fees);
        assertEq(crowdFunding.getAccumulatedFees(), 0);
    }

    // ============================================================================
    // Test MODIFIFER
    // ============================================================================

    function test_Modifier_RevertIf_CampaignDoesNotExist() public {
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.getCampaign(0); 
    }


    function testModifierInContibute() public {
        _createDefaultCampaign();
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.contribute(1, 0, 0);
    }


    function testMoidiferInVoteMilestones() public {
        _createDefaultCampaign();
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.voteMilestone(2, 0, true);
    }


    function testMoidiferInReleaseMilestoneFunds() public {
        _createDefaultCampaign();
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.releaseMilestoneFunds(2, 0);
    }


    function testModifierInfinalizeMilestoneVoting() public {
        _createDefaultCampaign();
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.finalizeMilestoneVoting(2, 0);
    }


    function testModifierInRefund() public {
        _createDefaultCampaign();
        vm.expectRevert(CrowdFunding.CrowdFunding__CampaignDoesNotExist.selector);
        crowdFunding.refund(2);
    }

    function test_Modifier_SuccessPath_Contribute() public {
        uint256 id = _createDefaultCampaign(); 

        vm.startPrank(contributor1);
        usdc.approve(address(crowdFunding), 100 * 10**6);
        crowdFunding.contribute(id, 100 * 10**6, 0); 
        vm.stopPrank();
    }

}