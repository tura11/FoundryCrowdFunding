// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CrowdFunding - Advanced Crowdfunding Platform with Milestones and Voting
 * @author Tura11
 * @notice This contract enables the creation of USDC-based crowdfunding campaigns with the following features:
 *         - Multi-level reward tiers with optional backer limits
 *         - Milestones with percentage-based fund distribution
 *         - Contributor voting to approve each milestone after the campaign ends
 *         - Funds released only after community approval of a milestone
 *         - Refunds available if the campaign fails (goal not reached and no milestones released)
 *         - 3% platform fee collected on each milestone payout
 * @dev The contract uses USDC (6 decimals) as the payment token. All amounts are in the smallest USDC units.
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
    error CrowdFunding__TitleTooLong();
    error CrowdFunding__TierFull();
    error CrowdFunding__ContributionBelowTierMinimum();
    error CrowdFunding__MilestoneNotFound();
    error CrowdFunding__NotAContributor();
    error CrowdFunding__AlreadyVoted();
    error CrowdFunding__MilestoneDeadlineNotReached();
    error CrowdFunding__MilestoneVotingPeriodExpired();
    error CrowdFunding__OnlyCreatorCanReleaseFunds();
    error CrowdFunding__MilestoneFundsAlreadyReleased();
    error CrowdFunding__NotEnoughVotesToApprove();
    error CrowdFunding__MilestoneNotApproved();
    error CrowdFunding__CampaignTierDoesNotExist();
    error CrowdFunding__PreviousMilestoneNotReleased();
    error CrowdFunding__VotingPeriodNotExpired();
    error CrowdFunding__VotingAlreadyFinalized();
    error CrowdFunding__ContributionExceedsGoal();
    error CrowdFunding__NotEnoughTotalConitributors();

    // ========== ENUMS & STRUCTS ==========

    /// @notice Campaign states: Active (ongoing), Successful (all milestones released), Failed (refunded)
    enum States { Active, Successful, Failed }

    /// @notice Structure representing a crowdfunding campaign
    struct Campaign {
        string title;
        uint256 goal;
        uint256 raised;
        uint256 originalGoal;
        uint256 duration; // timestamp when campaign ends
        string description;
        address creator;
        States state;
        bool anyMilestoneReleased; // true if any milestone funds have been paid out
    }

    /// @notice Structure defining a reward tier
    struct RewardTier {
        string name;
        string description;
        uint256 minContribution;
        uint256 maxBackers; // 0 = unlimited
        uint256 currentBackers;
    }

    /// @notice Structure defining a milestone
    struct Milestone {
        string description;
        uint8 percentage; // percentage of originalGoal (sum must be 100)
        uint256 deadline; // timestamp by which milestone should be completed
        uint16 votesFor;
        uint16 votesAgainst;
        bool approved;
        bool fundsReleased;
        bool votingFinalized;
    }

    // ========== EVENTS ==========

    event CampaignCreated(uint256 indexed campaignId, address indexed creator, string title, uint256 goal, uint256 duration);
    event CampaignContributed(uint256 indexed campaignId, address indexed contributor, uint256 amount, uint8 tierIndex);
    event CampaignRefunded(uint256 indexed campaignId, address indexed contributor, uint256 amount);
    event FeesWithdrawn(address indexed owner, uint256 amount);
    event MilestoneVoted(uint256 indexed campaignId, uint256 indexed milestoneId, address indexed voter, bool vote, uint16 votesFor, uint16 votesAgainst);
    event MilestoneApproved(uint256 indexed campaignId, uint256 indexed milestoneId);
    event MilestoneRejected(uint256 indexed campaignId, uint256 indexed milestoneId);
    event MilestoneFundsReleased(uint256 indexed campaignId, uint256 indexed milestoneId, uint256 amount, uint256 fee);
    event TierUpgraded(uint256 indexed campaignId, address indexed contributor, uint8 oldTier, uint8 newTier);

    // ========== STATE VARIABLES ==========

    Campaign[] public campaigns;
    IERC20 public immutable usdc;
    address public immutable owner;
    uint256 public accumulatedFees; // 3% fees collected from milestone payouts

    mapping(uint256 => RewardTier[]) public campaignTiers;
    mapping(uint256 => Milestone[]) public campaignMilestones;
    mapping(uint256 => mapping(address => uint8)) public contributorTiers; // campaignId => contributor => tier index
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public milestoneVotes; // campaignId => milestoneId => voter => voted
    mapping(uint256 => uint256) public totalContributors; // campaignId => count of unique contributors
    mapping(uint256 => mapping(address => uint256)) public contributions; // campaignId => contributor => total amount

    // ========== CONSTANTS ==========

    uint256 public constant MAX_STRING_LENGTH = 200;
    uint256 public constant MIN_TIER_CONTRIBUTION = 10 * 10**6; // 10 USDC
    uint8 public constant MIN_TIERS = 1;
    uint8 public constant MAX_TIERS = 5;
    uint8 public constant MIN_MILESTONES = 2;
    uint8 public constant MAX_MILESTONES = 5;
    uint8 public constant MIN_MILESTONE_PERCENTAGE = 10;
    uint256 public constant MAX_MILESTONE_DAYS = 365;
    uint256 public constant FEE = 3; // 3%
    uint256 public constant MIN_CAMPAIGN_GOAL = 100 * 10**6; // 100 USDC
    uint256 public constant MAX_CAMPAIGN_DURATION = 365;
    uint256 public constant DIVIDER = 100;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint8 public constant APPROVAL_THRESHOLD = 51; // 51%

    // ========== CONSTRUCTOR ==========

    /**
     * @notice Deploys the contract and sets the USDC token address
     * @param _usdcAddress Address of the USDC ERC20 contract (6 decimals)
     */
    constructor(address _usdcAddress) {
        owner = msg.sender;
        usdc = IERC20(_usdcAddress);
    }

    // ========== MODIFIERS ==========

    /// @notice Reverts if campaign does not exist
    modifier validateCampaignExists(uint256 campaignId) {
        if (campaignId >= campaigns.length) revert CrowdFunding__CampaignDoesNotExist();
        _;
    }

    // ========== FUNCTIONS ==========

    /**
     * @notice Creates a new crowdfunding campaign
     * @param _title Campaign title (max 200 chars)
     * @param _goal Funding goal in USDC (min 100 USDC)
     * @param _description Campaign description (max 200 chars)
     * @param _durationInDays Duration in days (1-365)
     * @param _tiers Array of reward tiers (1-5, sorted by minContribution ascending)
     * @param _milestones Array of milestones (2-5, percentages sum to 100)
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
            anyMilestoneReleased: false
        });

        uint256 campaignId = campaigns.length;
        campaigns.push(campaign);

        for (uint256 i = 0; i < _tiers.length; i++) {
            campaignTiers[campaignId].push(_tiers[i]);
        }

        for (uint256 i = 0; i < _milestones.length; i++) {
            campaignMilestones[campaignId].push(Milestone({
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
     * @notice Contribute USDC to a campaign and select a reward tier
     * @dev Supports tier upgrades when additional contributions meet higher tier requirements
     * @param campaignId ID of the campaign
     * @param amount Amount of USDC to contribute
     * @param tierIndex Index of the desired tier
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
     * @notice Cast a vote on a milestone (only contributors, after campaign end and milestone deadline)
     * @param campaignId Campaign ID
     * @param milestoneId Milestone ID
     * @param vote true = approve, false = reject
     */
    function voteMilestone(uint256 campaignId, uint256 milestoneId, bool vote)
        external
        validateCampaignExists(campaignId)
    {
        if (milestoneId >= campaignMilestones[campaignId].length) revert CrowdFunding__MilestoneNotFound();
        Campaign storage campaign = campaigns[campaignId];
        Milestone storage milestone = campaignMilestones[campaignId][milestoneId];

        if (contributions[campaignId][msg.sender] == 0) revert CrowdFunding__NotAContributor();
        if (campaign.raised < campaign.originalGoal) revert CrowdFunding__NotEnoughMoneyRaised();
        if (milestoneVotes[campaignId][milestoneId][msg.sender]) revert CrowdFunding__AlreadyVoted();
        if (milestone.votingFinalized) revert CrowdFunding__VotingAlreadyFinalized();
        if (block.timestamp <= campaign.duration) revert CrowdFunding__CampaignStillActive();
        if (block.timestamp < milestone.deadline) revert CrowdFunding__MilestoneDeadlineNotReached();

        uint256 votingDeadline = milestone.deadline + VOTING_PERIOD;
        if (block.timestamp > votingDeadline) revert CrowdFunding__MilestoneVotingPeriodExpired();

        milestoneVotes[campaignId][milestoneId][msg.sender] = true;
        if (vote) milestone.votesFor++;
        else milestone.votesAgainst++;

        emit MilestoneVoted(campaignId, milestoneId, msg.sender, vote, milestone.votesFor, milestone.votesAgainst);
    }

    /**
     * @notice Finalize voting for a milestone once the voting period ends
     * @dev Anyone can call this. Approval requires 51% of votes OR 51% of all contributors voting yes
     * @param campaignId Campaign ID
     * @param milestoneId Milestone ID
     */
    function finalizeMilestoneVoting(uint256 campaignId, uint256 milestoneId)
        external
        validateCampaignExists(campaignId)
    {
        if (milestoneId >= campaignMilestones[campaignId].length) revert CrowdFunding__MilestoneNotFound();
        Milestone storage milestone = campaignMilestones[campaignId][milestoneId];
        if (milestone.votingFinalized) revert CrowdFunding__VotingAlreadyFinalized();

        uint256 votingDeadline = milestone.deadline + VOTING_PERIOD;
        if (block.timestamp < votingDeadline) revert CrowdFunding__VotingPeriodNotExpired();

        uint256 totalContributorsCount = totalContributors[campaignId];
        if (totalContributorsCount == 0) revert CrowdFunding__NotEnoughTotalConitributors();

        uint256 totalVotes = milestone.votesFor + milestone.votesAgainst;
        if (totalVotes == 0) revert CrowdFunding__NotEnoughVotesToApprove();

        uint256 approvalPercentageOfVotes = (milestone.votesFor * 100) / totalVotes;
        uint256 approvalPercentageOfAllContributors = (milestone.votesFor * 100) / totalContributorsCount;
        uint256 voteTurnoutPercentage = (totalVotes * 100) / totalContributorsCount;

        bool approved =
            (approvalPercentageOfVotes >= APPROVAL_THRESHOLD && voteTurnoutPercentage >= APPROVAL_THRESHOLD) ||
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
     * @notice Release funds for an approved milestone (only campaign creator)
     * @dev 3% platform fee is deducted. Milestones must be released sequentially
     * @param campaignId Campaign ID
     * @param milestoneId Milestone ID
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
        if (!milestone.approved) revert CrowdFunding__MilestoneNotApproved();
        if (milestone.fundsReleased) revert CrowdFunding__MilestoneFundsAlreadyReleased();
        if (milestoneId > 0 && !campaignMilestones[campaignId][milestoneId - 1].fundsReleased)
            revert CrowdFunding__PreviousMilestoneNotReleased();

        uint256 milestoneAmount = (campaign.originalGoal * milestone.percentage) / DIVIDER;
        uint256 feeAmount = (milestoneAmount * FEE) / DIVIDER;
        uint256 amountToCreator = milestoneAmount - feeAmount;

        milestone.fundsReleased = true;
        campaign.anyMilestoneReleased = true;

        bool allReleased = true;
        for (uint256 i = 0; i < campaignMilestones[campaignId].length; ++i) {
            if (!campaignMilestones[campaignId][i].fundsReleased) {
                allReleased = false;
                break;
            }
        }

        if (allReleased) {
            campaign.state = States.Successful;
        }

        accumulatedFees += feeAmount;
        usdc.safeTransfer(campaign.creator, amountToCreator);

        emit MilestoneFundsReleased(campaignId, milestoneId, amountToCreator, feeAmount);
    }

    /**
     * @notice Refund contribution if campaign failed and no milestones were released
     * @param campaignId Campaign ID
     */
    function refund(uint256 campaignId) external nonReentrant validateCampaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];

        if (block.timestamp <= campaign.duration) revert CrowdFunding__CampaignStillActive();
        if (campaign.raised >= campaign.originalGoal) revert CrowdFunding__CampaignRaisedEnoughMoney();

        uint256 amount = contributions[campaignId][msg.sender];
        if (amount == 0) revert CrowdFunding__NothingToRefund();

        contributions[campaignId][msg.sender] = 0;
        campaign.raised -= amount;
        totalContributors[campaignId]--;

        campaign.state = States.Failed;

        usdc.safeTransfer(msg.sender, amount);
        emit CampaignRefunded(campaignId, msg.sender, amount);
    }

    /**
     * @notice Withdraw fees for the owner
     * @dev Only the owner can withdraw
     */
    function withdrawFees() external nonReentrant {
        if (msg.sender != owner) revert CrowdFunding__OnlyOwnerOfCampaignCanWithdraw();
        uint256 amount = accumulatedFees;
        if (amount == 0) revert CrowdFunding__NoFeesToWithdraw();
        
        accumulatedFees = 0;
        usdc.safeTransfer(owner, amount);

        emit FeesWithdrawn(owner, amount);
    }

    // ========== INTERNAL VALIDATION ==========

    function _validateTiers(RewardTier[] memory _tiers) internal pure {
        if (_tiers.length < MIN_TIERS || _tiers.length > MAX_TIERS) revert CrowdFunding__InvalidTierCount();
        for (uint256 i = 0; i < _tiers.length; ++i) {
            if (bytes(_tiers[i].name).length > MAX_STRING_LENGTH) revert CrowdFunding__StringTooLong();
            if (bytes(_tiers[i].description).length > MAX_STRING_LENGTH) revert CrowdFunding__StringTooLong();
            if (_tiers[i].minContribution < MIN_TIER_CONTRIBUTION) revert CrowdFunding__TierMinContributionTooLow();
            if (i > 0 && _tiers[i].minContribution <= _tiers[i - 1].minContribution) revert CrowdFunding__TiersMustBeSorted();
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
            if (i > 0 && _milestones[i].deadline <= _milestones[i - 1].deadline) revert CrowdFunding__MilestoneDeadlinesNotSequential();
        }
        if (totalPercentage != 100) revert CrowdFunding__MilestonePercentageMustSumTo100();
    }

    // ========== VIEW FUNCTIONS ==========

    /**
     * @notice Returns full campaign data
     * @param campaignId Campaign ID
     * @return Campaign struct
     */
    function getCampaign(uint256 campaignId) external view validateCampaignExists(campaignId) returns (Campaign memory) {
        return campaigns[campaignId];
    }

    /**
     * @notice Returns contributor's total contribution to a campaign
     * @param campaignId Campaign ID
     * @param contributor Contributor address
     * @return Contributed amount
     */
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

    /**
     * @notice Returns all reward tiers for a campaign
     * @param campaignId Campaign ID
     * @return Array of RewardTier
     */
    function getCampaignTiers(uint256 campaignId) external view validateCampaignExists(campaignId) returns (RewardTier[] memory) {
        return campaignTiers[campaignId];
    }

    /**
     * @notice Returns all milestones for a campaign
     * @param campaignId Campaign ID
     * @return Array of Milestone
     */
    function getCampaignMilestones(uint256 campaignId) external view validateCampaignExists(campaignId) returns (Milestone[] memory) {
        return campaignMilestones[campaignId];
    }

    /**
     * @notice Returns a specific milestone
     * @param campaignId Campaign ID
     * @param milestoneId Milestone ID
     * @return Milestone struct
     */
    function getMilestone(uint256 campaignId, uint256 milestoneId) external view validateCampaignExists(campaignId) returns (Milestone memory) {
        if (milestoneId >= campaignMilestones[campaignId].length) revert CrowdFunding__MilestoneNotFound();
        return campaignMilestones[campaignId][milestoneId];
    }

    /**
     * @notice Returns contributor's current tier index (0 if none)
     * @param campaignId Campaign ID
     * @param contributor Contributor address
     * @return Tier index
     */
    function getContributorTier(uint256 campaignId, address contributor) external view validateCampaignExists(campaignId) returns (uint256) {
        return contributorTiers[campaignId][contributor];
    }

    /**
     * @notice Returns total number of unique contributors for a campaign
     * @param campaignId Campaign ID
     * @return Contributor count
     */
    function getTotalContributors(uint256 campaignId) external view validateCampaignExists(campaignId) returns (uint256) {
        return totalContributors[campaignId];
    }
}