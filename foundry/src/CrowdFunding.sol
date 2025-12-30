// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CrowdFunding
 * @author Tura11
 * @notice Secure decentralized crowdfunding platform with milestone-based fund releases.
 *         Contributors can back campaigns with USDC and receive reward tiers.
 *         Funds are released to the creator only after community approval of each milestone.
 * @dev  Key security features:
 *      - Milestone payouts calculated from original goal (prevents overfunding exploits)
 *      - Refunds permanently blocked after any milestone payout
 *      - Flexible voting: 51% of all contributors OR 51% of votes cast (with turnout ≥51%)
 *      - Tier upgrades validated
 *      - Sequential milestone releases enforced
 *      - Reentrancy protection and safe ERC20 transfers
 */
contract CrowdFunding is ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ========== ERRORS ==========

    error CrowdFunding__YouCantContributeYourOwnCampaign();
    error CrowdFunding__CampaignDoesNotExist();
    error CrowdFunding__CampaignHasEnded();
    error CrowdFunding__ValueMustBeGreaterThanZero();
    error CrowdFunding__NotEnoughMoneyRaised();
    error CrowdFunding__OnlyOwnerOfCampaignCanWithdraw();
    error CrowdFunding__CampaignStillActive();
    error CrowdFunding__CampaignRaisedEnoughMoney();
    error CrowdFunding__NothingToRefund();
    error CrowdFunding__DurationMustBeGreaterThanZero();
    error CrowdFunding__DurationTooLong();
    error CrowdFunding__GoalTooLow();
    error CrowdFunding__InsufficientAllowance();
    error CrowdFunding__NoFeesToWithdraw();
    error CrowdFunding__InvalidTierCount();
    error CrowdFunding__InvalidMilestoneCount();
    error CrowdFunding__TiersMustBeSorted();
    error CrowdFunding__TierMinContributionTooLow();
    error CrowdFunding__MilestonePercentageMustSumTo100();
    error CrowdFunding__MilestonePercentageTooLow();
    error CrowdFunding__MilestoneDeadlinesNotSequential();
    error CrowdFunding__MilestoneDeadlineTooLong();
    error CrowdFunding__StringTooLong();
    error CrowdFunding__DescriptionTooLong();
    error CrowdFunding__TierFull();
    error CrowdFunding__ContributionBelowTierMinimum();
    error CrowdFunding__TitleTooLong();
    error CrowdFunding__MilestoneNotFound();
    error CrowdFunding__NotAContributor();
    error CrowdFunding__AlreadyVoted();
    error CrowdFunding__MilestoneDeadlineNotReached();
    error CrowdFunding__MilestoneVotingPeriodExpired();
    error CrowdFunding__MilestoneAlreadyReleased();
    error CrowdFunding__OnlyCreatorCanReleaseFunds();
    error CrowdFunding__MilestoneFundsAlreadyReleased();
    error CrowdFunding__NotEnoughVotesToApprove();
    error CrowdFunding__MilestoneNotApproved();
    error CrowdFunding__CampaignTierDoesNotExist();
    error CrowdFunding__PreviousMilestoneNotReleased();
    error CrowdFunding__VotingPeriodNotExpired();
    error CrowdFunding__VotingAlreadyFinalized();
    error CrowdFunding__CannotRefundAfterPayout();
    error CrowdFunding__ContributionExceedsGoal();
    error CrowdFunding__NotEnoughTotalConitributors();

    // ========== ENUMS & STRUCTS ==========

    /// @notice Campaign states
    enum States {
        Active,    // Campaign is ongoing
        Successful, // All milestones released
        Failed     // Campaign ended without reaching goal and no payouts made
    }

    /// @notice Core campaign data
    struct Campaign {
        string title;
        uint256 goal;                    // Current target (unused after creation)
        uint256 raised;                  // Total USDC currently held in contract
        uint256 originalGoal;            // Immutable goal used for all calculations
        uint256 duration;                // Unix timestamp when campaign ends
        string description;
        address creator;
        States state;
        bool fundsWithdrawn;             // Legacy flag (kept for compatibility)
        bool anyMilestoneReleased;       // Blocks refunds once any payout occurs
        bool fullyFunded;      
    }

    /// @notice Reward tier for contributors
    struct RewardTier {
        string name;
        string description;
        uint256 minContribution;         // Minimum USDC required (6 decimals)
        uint256 maxBackers;              // 0 = unlimited
        uint256 currentBackers;
    }

    /// @notice Milestone with community voting
    struct Milestone {
        string description;
        uint8 percentage;                // Percentage of originalGoal (10-100)
        uint256 deadline;                // Unix timestamp after which voting opens
        uint16 votesFor;
        uint16 votesAgainst;
        bool approved;
        bool fundsReleased;
        bool votingFinalized;
    }

    // ========== EVENTS ==========

    /// @notice Emitted when a new campaign is created
    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed creator,
        string title,
        uint256 goal,
        uint256 duration
    );

    /// @notice Emitted when a contributor backs a campaign
    event CampaignContributed(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256 amount,
        uint8 tierIndex
    );

    /// @notice Emitted when a contributor receives a refund
    event CampaignRefunded(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256 amount
    );

    /// @notice Emitted when platform fees are withdrawn by owner
    event FeesWithdrawn(address indexed owner, uint256 amount);

    /// @notice Emitted when a contributor votes on a milestone
    event MilestoneVoted(
        uint256 indexed campaignId,
        uint256 indexed milestoneId,
        address indexed voter,
        bool vote,
        uint16 votesFor,
        uint16 votesAgainst
    );

    /// @notice Emitted when a milestone is approved by community
    event MilestoneApproved(uint256 indexed campaignId, uint256 indexed milestoneId);

    /// @notice Emitted when a milestone is rejected by community
    event MilestoneRejected(uint256 indexed campaignId, uint256 indexed milestoneId);

    /// @notice Emitted when milestone funds are released to creator
    event MilestoneFundsReleased(
        uint256 indexed campaignId,
        uint256 indexed milestoneId,
        uint256 amount,
        uint256 fee
    );

    /// @notice Emitted when a contributor upgrades to a higher tier
    event TierUpgraded(
        uint256 indexed campaignId,
        address indexed contributor,
        uint8 oldTier,
        uint8 newTier
    );

    // ========== STATE VARIABLES ==========

    Campaign[] public campaigns;
    IERC20 public immutable usdc;
    address public immutable owner;
    uint256 public accumulatedFees;

    mapping(uint256 => RewardTier[]) public campaignTiers;
    mapping(uint256 => Milestone[]) public campaignMilestones;
    mapping(uint256 => mapping(address => uint8)) public contributorTiers;
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public milestoneVotes;
    mapping(uint256 => uint256) public totalContributors;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    // ========== CONSTANTS ==========

    uint256 public constant MAX_STRING_LENGTH = 200;
    uint256 public constant MIN_TIER_CONTRIBUTION = 10 * 10**6;
    uint8 public constant MIN_TIERS = 1;
    uint8 public constant MAX_TIERS = 5;
    uint8 public constant MIN_MILESTONES = 2;
    uint8 public constant MAX_MILESTONES = 5;
    uint8 public constant MIN_MILESTONE_PERCENTAGE = 10;
    uint256 public constant MAX_MILESTONE_DAYS = 365;
    uint256 public constant FEE = 3; // 3%
    uint256 public constant MIN_CAMPAIGN_GOAL = 100 * 10**6;
    uint256 public constant MAX_CAMPAIGN_DURATION = 365;
    uint256 public constant DIVIDER = 100;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint8 public constant APPROVAL_THRESHOLD = 51;

    // ========== CONSTRUCTOR ==========

    /// @notice Deploys the contract and sets the USDC token address
    /// @param _usdcAddress Address of USDC token (6 decimals)
    constructor(address _usdcAddress) {
        owner = msg.sender;
        usdc = IERC20(_usdcAddress);
    }

    // ========== MODIFIERS ==========

    modifier validateCampaignExists(uint256 campaignId) {
        if (campaignId >= campaigns.length) revert CrowdFunding__CampaignDoesNotExist();
        _;
    }

    // ========== MAIN FUNCTIONS ==========

    /**
     * @notice Creates a new crowdfunding campaign
     * @param _title Campaign title (max 200 chars)
     * @param _goal Funding goal in USDC (6 decimals, min 100 USDC)
     * @param _description Campaign description (max 200 chars)
     * @param _durationInDays Campaign duration in days (1-365)
     * @param _tiers Array of reward tiers (1-5 tiers)
     * @param _milestones Array of milestones (2-5 milestones)
     */
    function createCampaign(
        string memory _title,
        uint256 _goal,
        string memory _description,
        uint256 _durationInDays,
        RewardTier[] memory _tiers,
        Milestone[] memory _milestones
    ) external {
        uint256 duration = block.timestamp + (_durationInDays * 1 days);

        if (_durationInDays == 0) revert CrowdFunding__DurationMustBeGreaterThanZero();
        if (_durationInDays > MAX_CAMPAIGN_DURATION) revert CrowdFunding__DurationTooLong();
        if (_goal < MIN_CAMPAIGN_GOAL) revert CrowdFunding__GoalTooLow();
        if (bytes(_title).length > MAX_STRING_LENGTH) revert CrowdFunding__TitleTooLong();
        if (bytes(_description).length > MAX_STRING_LENGTH) revert CrowdFunding__DescriptionTooLong();

        _validateTiers(_tiers);
        _validateMilestones(_milestones, duration);

        Campaign memory campaign = Campaign({
            title: _title,
            goal: _goal,
            raised: 0,
            originalGoal: _goal,
            duration: duration,
            description: _description,
            creator: msg.sender,
            state: States.Active,
            fundsWithdrawn: false,
            anyMilestoneReleased: false,
            fullyFunded: false
        });

        uint256 campaignId = campaigns.length;
        campaigns.push(campaign);

        uint256 tiersLength = _tiers.length;
        uint256 milestonesLength = _milestones.length;

        RewardTier[] storage tiers = campaignTiers[campaignId];
        for (uint256 i = 0; i < tiersLength; ++i) {
            tiers.push(_tiers[i]);
        }

        Milestone[] storage milestones = campaignMilestones[campaignId];
        for (uint256 i = 0; i < milestonesLength; ++i) {
            milestones.push(Milestone({
                description: _milestones[i].description,
                percentage: _milestones[i].percentage,
                deadline: _milestones[i].deadline,
                votesFor: 0,
                votesAgainst: 0,
                approved: false,
                fundsReleased: false,
                votingFinalized: false
            }));
        }

        emit CampaignCreated(campaignId, msg.sender, _title, _goal, duration);
    }

    /**
     * @notice Contribute USDC to a campaign and claim a reward tier
     * @param campaignId ID of the campaign
     * @param amount Amount of USDC to contribute (6 decimals)
     * @param tierIndex Index of the desired reward tier
     * @dev Caller must approve this contract for at least `amount` USDC before calling
     */
    function contribute(uint256 campaignId, uint256 amount, uint8 tierIndex)
        external
        nonReentrant
        validateCampaignExists(campaignId)
    {
        Campaign storage campaign = campaigns[campaignId];

        if (campaign.creator == msg.sender) revert CrowdFunding__YouCantContributeYourOwnCampaign();
        if (block.timestamp > campaign.duration) revert CrowdFunding__CampaignHasEnded();
        if (amount == 0) revert CrowdFunding__ValueMustBeGreaterThanZero();
        if (campaign.raised + amount > campaign.originalGoal) revert CrowdFunding__ContributionExceedsGoal();

        if (tierIndex >= campaignTiers[campaignId].length) revert CrowdFunding__CampaignTierDoesNotExist();

        RewardTier storage tier = campaignTiers[campaignId][tierIndex];
        uint256 newTotalContribution = contributions[campaignId][msg.sender] + amount;

        if (newTotalContribution < tier.minContribution) revert CrowdFunding__ContributionBelowTierMinimum();
        if (tier.maxBackers > 0 && tier.currentBackers >= tier.maxBackers) revert CrowdFunding__TierFull();

        if (usdc.allowance(msg.sender, address(this)) < amount) revert CrowdFunding__InsufficientAllowance();

        bool isNewContributor = contributions[campaignId][msg.sender] == 0;
        uint8 oldTier = contributorTiers[campaignId][msg.sender];

        usdc.safeTransferFrom(msg.sender, address(this), amount);

        campaign.raised += amount;
        contributions[campaignId][msg.sender] += amount;
        if(campaign.raised == campaign.originalGoal){
            campaign.fullyFunded = true;
        }

        if (isNewContributor) {
            contributorTiers[campaignId][msg.sender] = tierIndex;
            tier.currentBackers++;
            totalContributors[campaignId]++;
        } else if (tierIndex != oldTier && tierIndex > oldTier && newTotalContribution >= tier.minContribution) {
            campaignTiers[campaignId][oldTier].currentBackers--;
            contributorTiers[campaignId][msg.sender] = tierIndex;
            tier.currentBackers++;
            emit TierUpgraded(campaignId, msg.sender, oldTier, tierIndex);
        }

        emit CampaignContributed(campaignId, msg.sender, amount, tierIndex);
    }

    /**
     * @notice Vote on a milestone approval after its deadline
     * @param campaignId Campaign ID
     * @param milestoneId Milestone index
     * @param vote true = approve, false = reject
     * @dev Only contributors can vote, once per milestone
     */
    function voteMilestone(uint256 campaignId, uint256 milestoneId, bool vote)
    external
    validateCampaignExists(campaignId)
    {
        if (milestoneId >= campaignMilestones[campaignId].length)
            revert CrowdFunding__MilestoneNotFound();

        Campaign storage campaign = campaigns[campaignId];
        Milestone storage milestone = campaignMilestones[campaignId][milestoneId];

        if (contributions[campaignId][msg.sender] == 0)
            revert CrowdFunding__NotAContributor();
        if (milestoneVotes[campaignId][milestoneId][msg.sender])
            revert CrowdFunding__AlreadyVoted();
        if (milestone.votingFinalized)
            revert CrowdFunding__VotingAlreadyFinalized();
        if (block.timestamp <= campaign.duration)
            revert CrowdFunding__CampaignStillActive();
        if (!campaign.fullyFunded)
            revert CrowdFunding__NotEnoughMoneyRaised();
        if (block.timestamp < milestone.deadline)
            revert CrowdFunding__MilestoneDeadlineNotReached();

        uint256 votingDeadline = milestone.deadline + VOTING_PERIOD;
        if (block.timestamp > votingDeadline)
            revert CrowdFunding__MilestoneVotingPeriodExpired();

        milestoneVotes[campaignId][milestoneId][msg.sender] = true;

        if (vote) milestone.votesFor++;
        else milestone.votesAgainst++;

        emit MilestoneVoted(
            campaignId,
            milestoneId,
            msg.sender,
            vote,
            milestone.votesFor,
            milestone.votesAgainst
        );
    }

    /**
     * @notice Release approved milestone funds to campaign creator
     * @param campaignId Campaign ID
     * @param milestoneId Milestone index
     * @dev Only campaign creator can call. Previous milestones must be released first.
     */
    function releaseMilestoneFunds(uint256 campaignId, uint256 milestoneId)
        external
        nonReentrant
        validateCampaignExists(campaignId)
    {

        if (milestoneId >= campaignMilestones[campaignId].length) revert CrowdFunding__MilestoneNotFound();


        Campaign storage campaign = campaigns[campaignId];
        Milestone storage milestone = campaignMilestones[campaignId][milestoneId];

        
        if (campaign.creator != msg.sender) revert CrowdFunding__OnlyCreatorCanReleaseFunds();
        if (block.timestamp <= campaign.duration) revert CrowdFunding__CampaignStillActive();
        if (!milestone.approved) revert CrowdFunding__MilestoneNotApproved();
        if (milestone.fundsReleased) revert CrowdFunding__MilestoneFundsAlreadyReleased();

        if (milestoneId > 0 && !campaignMilestones[campaignId][milestoneId - 1].fundsReleased) {
            revert CrowdFunding__PreviousMilestoneNotReleased();
        }

        uint256 milestoneAmount = (campaign.originalGoal * milestone.percentage) / DIVIDER;
        uint256 feeAmount = (milestoneAmount * FEE) / DIVIDER;
        uint256 amountToCreator = milestoneAmount - feeAmount;

        milestone.fundsReleased = true;
        campaign.raised -= milestoneAmount;
        campaign.anyMilestoneReleased = true;

        bool allReleased = true;
        uint256 count = campaignMilestones[campaignId].length;
        for (uint256 i = 0; i < count; ++i) {
            if (!campaignMilestones[campaignId][i].fundsReleased) {
                allReleased = false;
                break;
            }
        }

        if (allReleased) {
            campaign.state = States.Successful;
            campaign.fundsWithdrawn = true;
        }

        accumulatedFees += feeAmount;
        usdc.safeTransfer(campaign.creator, amountToCreator);

        emit MilestoneFundsReleased(campaignId, milestoneId, amountToCreator, feeAmount);
    }

    /**
     * @notice Finalize milestone voting after the 7-day voting period ends
     * @param campaignId Campaign ID
     * @param milestoneId Milestone index
     * @dev Approval requires either:
     *      - ≥51% yes votes AND ≥51% turnout, or
     *      - ≥51% of ALL contributors voted yes
     */
    function finalizeMilestoneVoting(uint256 campaignId, uint256 milestoneId)
    external
    validateCampaignExists(campaignId)
    {
        if (milestoneId >= campaignMilestones[campaignId].length)
            revert CrowdFunding__MilestoneNotFound();

        Milestone storage milestone = campaignMilestones[campaignId][milestoneId];

        if (milestone.votingFinalized)
            revert CrowdFunding__VotingAlreadyFinalized();

        uint256 votingDeadline = milestone.deadline + VOTING_PERIOD;
        if (block.timestamp < votingDeadline)
            revert CrowdFunding__VotingPeriodNotExpired();

        uint256 totalContributorsCount = totalContributors[campaignId];
        if (totalContributorsCount == 0)
            revert CrowdFunding__NotEnoughTotalConitributors();

        uint256 totalVotes = milestone.votesFor + milestone.votesAgainst;
        if (totalVotes == 0)
            revert CrowdFunding__NotEnoughVotesToApprove();

        uint256 approvalPercentageOfVotes =
            (milestone.votesFor * 100) / totalVotes;

        uint256 approvalPercentageOfAllContributors =
            (milestone.votesFor * 100) / totalContributorsCount;

        uint256 voteTurnoutPercentage =
            (totalVotes * 100) / totalContributorsCount;

        bool approved =
            (approvalPercentageOfVotes >= APPROVAL_THRESHOLD &&
            voteTurnoutPercentage >= APPROVAL_THRESHOLD)
            ||
            (approvalPercentageOfAllContributors >= APPROVAL_THRESHOLD);

        milestone.votingFinalized = true;

        if (approved) {
            milestone.approved = true;
            emit MilestoneApproved(campaignId, milestoneId);
        } else {
            emit MilestoneRejected(campaignId, milestoneId);
        }
    }

    /**
     * @notice Withdraw accumulated platform fees (3% of released milestones)
     * @dev Only contract owner can call
     */
    function withdrawFees() external nonReentrant {
        if (msg.sender != owner) revert CrowdFunding__OnlyOwnerOfCampaignCanWithdraw();
        if (accumulatedFees == 0) revert CrowdFunding__NoFeesToWithdraw();

        uint256 fees = accumulatedFees;
        accumulatedFees = 0;
        usdc.safeTransfer(owner, fees);

        emit FeesWithdrawn(owner, fees);
    }

    /**
     * @notice Refund contribution if campaign failed and no milestone was released
     * @param campaignId Campaign ID
     */
    function refund(uint256 campaignId)
        external
        nonReentrant
        validateCampaignExists(campaignId)
    {
        Campaign storage campaign = campaigns[campaignId];

        if (block.timestamp <= campaign.duration) revert CrowdFunding__CampaignStillActive();
        if (campaign.raised >= campaign.originalGoal) revert CrowdFunding__CampaignRaisedEnoughMoney();
        if (campaign.anyMilestoneReleased) revert CrowdFunding__CannotRefundAfterPayout();

        uint256 amount = contributions[campaignId][msg.sender];
        if (amount == 0) revert CrowdFunding__NothingToRefund();

        contributions[campaignId][msg.sender] = 0;
        campaign.raised -= amount;
        totalContributors[campaignId]--;

        if (campaign.state != States.Failed) campaign.state = States.Failed;

        usdc.safeTransfer(msg.sender, amount);
        emit CampaignRefunded(campaignId, msg.sender, amount);
    }

    // ========== INTERNAL VALIDATION ==========

    function _validateTiers(RewardTier[] memory _tiers) internal pure {
        if (_tiers.length < MIN_TIERS || _tiers.length > MAX_TIERS) revert CrowdFunding__InvalidTierCount();

        for (uint256 i = 0; i < _tiers.length; ++i) {
            if (bytes(_tiers[i].name).length > MAX_STRING_LENGTH) revert CrowdFunding__StringTooLong();
            if (bytes(_tiers[i].description).length > MAX_STRING_LENGTH) revert CrowdFunding__StringTooLong();
            if (_tiers[i].minContribution < MIN_TIER_CONTRIBUTION) revert CrowdFunding__TierMinContributionTooLow();
            if (i > 0 && _tiers[i].minContribution <= _tiers[i-1].minContribution) revert CrowdFunding__TiersMustBeSorted();
        }
    }

    function _validateMilestones(Milestone[] memory _milestones, uint256 campaignEndTime) internal pure {
        if (_milestones.length < MIN_MILESTONES || _milestones.length > MAX_MILESTONES) revert CrowdFunding__InvalidMilestoneCount();

        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < _milestones.length; ++i) {
            if (bytes(_milestones[i].description).length > MAX_STRING_LENGTH) revert CrowdFunding__StringTooLong();
            if (_milestones[i].percentage < MIN_MILESTONE_PERCENTAGE) revert CrowdFunding__MilestonePercentageTooLow();
            totalPercentage += _milestones[i].percentage;

            if (_milestones[i].deadline <= campaignEndTime) revert CrowdFunding__MilestoneDeadlinesNotSequential();
            if (_milestones[i].deadline > campaignEndTime + (MAX_MILESTONE_DAYS * 1 days)) revert CrowdFunding__MilestoneDeadlineTooLong();
            if (i > 0 && _milestones[i].deadline <= _milestones[i-1].deadline) revert CrowdFunding__MilestoneDeadlinesNotSequential();
        }

        if (totalPercentage != 100) revert CrowdFunding__MilestonePercentageMustSumTo100();
    }

// ========== VIEW FUNCTIONS ==========

    function getCampaign(uint256 campaignId) external view validateCampaignExists(campaignId) returns (Campaign memory) {
        return campaigns[campaignId];
    }

    function getContribution(uint256 campaignId, address contributor) external view validateCampaignExists(campaignId) returns (uint256) {
        return contributions[campaignId][contributor];
    }

    function getCampaignCount() external view returns (uint256) {
        return campaigns.length;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getUSDCAddress() external view returns (address) {
        return address(usdc);
    }

    function getAccumulatedFees() external view returns (uint256) {
        return accumulatedFees;
    }

    function getCampaignTiers(uint256 campaignId) external view validateCampaignExists(campaignId) returns (RewardTier[] memory) {
        return campaignTiers[campaignId];
    }

    function getCampaignMilestones(uint256 campaignId) external view validateCampaignExists(campaignId) returns (Milestone[] memory) {
        return campaignMilestones[campaignId];
    }

    function getMilestone(uint256 campaignId, uint256 milestoneId) external view validateCampaignExists(campaignId) returns (Milestone memory) {
        if (milestoneId >= campaignMilestones[campaignId].length) revert CrowdFunding__MilestoneNotFound();
        return campaignMilestones[campaignId][milestoneId];
    }

    function getContributorTier(uint256 campaignId, address contributor) external view validateCampaignExists(campaignId) returns (uint256) {
        return contributorTiers[campaignId][contributor];
    }

    function getTotalContributors(uint256 campaignId) external view validateCampaignExists(campaignId) returns (uint256) {
        return totalContributors[campaignId];
    }
}


