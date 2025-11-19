// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from  "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CrowdFunding
 * @author Your Name
 * @notice Decentralized crowdfunding platform with milestone-based fund releases and reward tiers
 * @dev Uses USDC as the contribution token and implements pull payment pattern for security
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
    error CrowdFunding__AlreadyWithdrawn();
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
    error CrowdFunding__NotAContributor();
    error CrowdFunding__AlreadyVoted();
    error CrowdFunding__MilestoneDeadlineNotReached();
    error CrowdFunding__MilestoneVotingPeriodExpired();
    error CrowdFunding__MilestoneAlreadyReleased();
    error CrowdFunding__OnlyCreatorCanReleaseFunds();
    error CrowdFunding__MilestoneFundsAlreadyReleased();
    error CrowdFunding__NotEnoughVotesToApprove();
    error CrowdFunding__CampaignHasMilestones();
    error CrowdFunding__MilestoneNotFound();
    error CrowdFunding__MilestoneNotApproved();

    // ========== ENUMS & STRUCTS ==========
    
    /// @notice Campaign states
    enum States {
        Active,
        Successful,
        Failed
    }

    /// @notice Main campaign structure
    struct Campaign {
        string title;
        uint256 goal;
        uint256 raised;
        uint256 duration;
        string description;
        address creator;
        States state;
        bool fundsWithdrawn;
    }

    /// @notice Reward tier for contributors
    struct RewardTier {
        string name;
        string description;
        uint256 minContribution;
        uint256 maxBackers;
        uint256 currentBackers;
    }

    /// @notice Milestone with voting mechanism
    struct Milestone {
        string description;
        uint8 percentage;
        uint256 deadline;
        uint16 votesFor;
        uint16 votesAgainst;
        bool approved;
        bool fundsReleased;
    }

    // ========== EVENTS ==========
    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed creator,
        string title,
        uint256 goal,
        uint256 duration
    );
    event CampaignContributed(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256 amount
    );
    event CampaignWithdrawn(
        uint256 indexed campaignId,
        address indexed creator,
        uint256 amount,
        uint256 fee
    );
    event CampaignRefunded(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256 amount
    );
    event FeesWithdrawn(address indexed owner, uint256 amount);
    event MilestoneVoted(
        uint256 indexed campaignId, 
        uint256 indexed milestoneId, 
        address indexed voter, 
        bool vote,
        uint16 votesFor,
        uint16 votesAgainst
    );
    event MilestoneApproved(
        uint256 indexed campaignId, 
        uint256 indexed milestoneId
    );
    event MilestoneRejected(
        uint256 indexed campaignId,
        uint256 indexed milestoneId
    );
    event MilestoneFundsReleased(
        uint256 indexed campaignId, 
        uint256 indexed milestoneId, 
        uint256 amount,
        uint256 fee
    );

    // ========== STATE VARIABLES ==========
    Campaign[] public campaigns;
    IERC20 public immutable usdc;
    address public immutable owner;
    uint256 public accumulatedFees;

    // ========== MAPPINGS ==========
    mapping(uint256 => RewardTier[]) public campaignTiers;
    mapping(uint256 => Milestone[]) public campaignMilestones;
    mapping(uint256 => mapping(address => uint8)) public contributorTiers;
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public milestoneVotes;
    mapping(uint256 => bool) public campaignHasContributions;
    mapping(uint256 => uint256) public totalContributors;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    mapping(uint256 => mapping(uint256 => uint256)) public milestoneVotingDeadline;

    // ========== CONSTANTS ==========
    uint256 public constant MAX_STRING_LENGTH = 200;
    uint256 public constant MIN_TIER_CONTRIBUTION = 10 * 10**6; // 10 USDC
    uint8 public constant MIN_TIERS = 1;
    uint8 public constant MAX_TIERS = 5;
    uint8 public constant MIN_MILESTONES = 2;
    uint8 public constant MAX_MILESTONES = 5;
    uint8 public constant MIN_MILESTONE_PERCENTAGE = 10; // 10%
    uint256 public constant MAX_MILESTONE_DAYS = 365 days;
    uint256 public constant FEE = 3; // 3% platform fee
    uint256 public constant MIN_CAMPAIGN_GOAL = 100 * 10**6; // 100 USDC
    uint256 public constant MAX_CAMPAIGN_DURATION = 365 days;
    uint256 public constant DIVIDER = 100;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint8 public constant APPROVAL_THRESHOLD = 51; // 51% approval needed
    address public constant USDC_ADDRESS = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238; // Sepolia USDC

    // ========== CONSTRUCTOR ==========
    constructor() {
        owner = msg.sender;
        usdc = IERC20(USDC_ADDRESS);
    }

    // ========== MODIFIERS ==========
    modifier validateCampaignExists(uint256 campaignId) {
        if (campaignId >= campaigns.length) {
            revert CrowdFunding__CampaignDoesNotExist();
        }
        _;
    }

    // ========== MAIN FUNCTIONS ==========

    /**
     * @notice Creates a new crowdfunding campaign
     * @param _title Campaign title (max 200 chars)
     * @param _goal Funding goal in USDC (6 decimals)
     * @param _description Campaign description (max 200 chars)
     * @param _durationInDays Campaign duration in days
     * @param _tiers Array of reward tiers (1-5 tiers required)
     * @param _milestones Array of milestones (2-5 milestones required, must sum to 100%)
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
        
        if (_durationInDays == 0) {
            revert CrowdFunding__DurationMustBeGreaterThanZero();
        }
        if (_durationInDays > MAX_CAMPAIGN_DURATION) {
            revert CrowdFunding__DurationTooLong();
        }
        if (_goal < MIN_CAMPAIGN_GOAL) {
            revert CrowdFunding__GoalTooLow();
        }
        if (bytes(_title).length > MAX_STRING_LENGTH) {
            revert CrowdFunding__TitleTooLong();
        }
        if (bytes(_description).length > MAX_STRING_LENGTH) {
            revert CrowdFunding__DescriptionTooLong();
        }

        _validateTiers(_tiers);
        _validateMilestones(_milestones, duration);

        Campaign memory campaign = Campaign({
            title: _title,
            goal: _goal,
            duration: duration,
            description: _description,
            raised: 0,
            creator: msg.sender,
            state: States.Active,
            fundsWithdrawn: false
        });

        uint256 campaignId = campaigns.length;
        campaigns.push(campaign);
        
        RewardTier[] storage tiers = campaignTiers[campaignId];
        uint256 tierLength = _tiers.length;
        for (uint256 i = 0; i < tierLength; ++i) {
            tiers.push(_tiers[i]);
        }

        uint256 milestoneLength = _milestones.length;
        for (uint256 i = 0; i < milestoneLength; ++i) {
            Milestone memory milestone = Milestone({
                description: _milestones[i].description,
                percentage: _milestones[i].percentage,
                deadline: _milestones[i].deadline,
                votesFor: 0,
                votesAgainst: 0,
                approved: false,
                fundsReleased: false
            });
            campaignMilestones[campaignId].push(milestone);
        }
        
        emit CampaignCreated(campaignId, msg.sender, _title, _goal, duration);
    }

    /**
     * @notice Contribute USDC to a campaign
     * @dev User must approve this contract to spend USDC first
     * @param campaignId The campaign ID to contribute to
     * @param amount Amount of USDC to contribute (6 decimals)
     * @param tierIndex The reward tier index to join
     */
    function contribute(uint256 campaignId, uint256 amount, uint8 tierIndex) 
        external 
        nonReentrant
        validateCampaignExists(campaignId) 
    {
        Campaign storage campaign = campaigns[campaignId];

        if (campaign.creator == msg.sender) {
            revert CrowdFunding__YouCantContributeYourOwnCampaign();
        }
        if (block.timestamp > campaign.duration) {
            revert CrowdFunding__CampaignHasEnded();
        }
        if (amount == 0) {
            revert CrowdFunding__ValueMustBeGreaterThanZero();
        }
        if (tierIndex >= campaignTiers[campaignId].length) {
            revert CrowdFunding__CampaignDoesNotExist();
        }

        RewardTier storage tier = campaignTiers[campaignId][tierIndex];

        if (amount < tier.minContribution) {
            revert CrowdFunding__ContributionBelowTierMinimum();
        }
        if (tier.maxBackers > 0 && tier.currentBackers >= tier.maxBackers) {
            revert CrowdFunding__TierFull();
        }

        uint256 allowance = usdc.allowance(msg.sender, address(this));
        if (allowance < amount) {
            revert CrowdFunding__InsufficientAllowance();
        }
            
        bool isNewContributor = contributions[campaignId][msg.sender] == 0;

        usdc.safeTransferFrom(msg.sender, address(this), amount);

        campaign.raised += amount;
        contributions[campaignId][msg.sender] += amount;

        if (isNewContributor) {
            contributorTiers[campaignId][msg.sender] = tierIndex;
            tier.currentBackers++;
            totalContributors[campaignId]++;
        } else {
            uint8 currentTier = contributorTiers[campaignId][msg.sender];
            if (tierIndex > currentTier) {
                campaignTiers[campaignId][currentTier].currentBackers--;
                contributorTiers[campaignId][msg.sender] = tierIndex;
                tier.currentBackers++;
            }
        }
      
        emit CampaignContributed(campaignId, msg.sender, amount);
    }

    /**
     * @notice Vote on a milestone completion
     * @dev Only contributors can vote once per milestone. Voting opens after milestone deadline.
     * @param campaignId Campaign ID
     * @param milestoneId Milestone index (0, 1, 2...)
     * @param vote true = approve, false = reject
     */
    function voteMilestone(
        uint256 campaignId, 
        uint256 milestoneId, 
        bool vote
    ) 
        external 
        validateCampaignExists(campaignId) 
    {
        Campaign storage campaign = campaigns[campaignId];
        
        if (milestoneId >= campaignMilestones[campaignId].length) {
            revert CrowdFunding__MilestoneNotFound();
        }
        
        Milestone storage milestone = campaignMilestones[campaignId][milestoneId];
        
        if (contributions[campaignId][msg.sender] == 0) {
            revert CrowdFunding__NotAContributor();
        }
        
        if (milestoneVotes[campaignId][milestoneId][msg.sender]) {
            revert CrowdFunding__AlreadyVoted();
        }
        
        if (block.timestamp <= campaign.duration) {
            revert CrowdFunding__CampaignStillActive();
        }
        if (campaign.raised < campaign.goal) {
            revert CrowdFunding__NotEnoughMoneyRaised();
        }
        
        if (block.timestamp < milestone.deadline) {
            revert CrowdFunding__MilestoneDeadlineNotReached();
        }
        
        if (milestoneVotingDeadline[campaignId][milestoneId] == 0) {
            milestoneVotingDeadline[campaignId][milestoneId] = milestone.deadline + VOTING_PERIOD;
        }
        
        if (block.timestamp > milestoneVotingDeadline[campaignId][milestoneId]) {
            revert CrowdFunding__MilestoneVotingPeriodExpired();
        }
        
        if (milestone.approved || milestone.fundsReleased) {
            revert CrowdFunding__MilestoneAlreadyReleased();
        }
        
        milestoneVotes[campaignId][milestoneId][msg.sender] = true;
        
        if (vote) {
            milestone.votesFor++;
        } else {
            milestone.votesAgainst++;
        }
        
        uint256 totalVotes = milestone.votesFor + milestone.votesAgainst;
        uint256 totalContributorsCount = totalContributors[campaignId];
        
        // Auto-approve if all contributors voted
        if (!milestone.approved && totalVotes >= totalContributorsCount) {
            uint256 approvalPercentage = (milestone.votesFor * 100) / totalVotes;
            
            if (approvalPercentage >= APPROVAL_THRESHOLD) {
                milestone.approved = true;
                emit MilestoneApproved(campaignId, milestoneId);
            } else {
                emit MilestoneRejected(campaignId, milestoneId);
            }
        }
        
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
     * @notice Release funds for an approved milestone
     * @dev Only campaign creator can call. Milestones must be released sequentially.
     * @param campaignId Campaign ID
     * @param milestoneId Milestone index
     */
    function releaseMilestoneFunds(uint256 campaignId, uint256 milestoneId) 
        external 
        nonReentrant
        validateCampaignExists(campaignId) 
    {
        Campaign storage campaign = campaigns[campaignId];
        
        if (milestoneId >= campaignMilestones[campaignId].length) {
            revert CrowdFunding__MilestoneNotFound();
        }
        
        Milestone storage milestone = campaignMilestones[campaignId][milestoneId];

        if (campaign.creator != msg.sender) {
            revert CrowdFunding__OnlyCreatorCanReleaseFunds();
        }

        if (block.timestamp <= campaign.duration) {
            revert CrowdFunding__CampaignStillActive();
        }

        if (campaign.raised < campaign.goal) {
            revert CrowdFunding__NotEnoughMoneyRaised();
        }

        if (!milestone.approved) {
            revert CrowdFunding__MilestoneNotApproved();
        }

        if (milestone.fundsReleased) {
            revert CrowdFunding__MilestoneFundsAlreadyReleased();
        }

        // Ensure previous milestones are released
        if (milestoneId > 0) {
            for (uint256 i = 0; i < milestoneId; ++i) {
                if (!campaignMilestones[campaignId][i].fundsReleased) {
                    revert CrowdFunding__MilestoneNotApproved();
                }
            }
        }

        uint256 totalRaised = campaign.raised;
        uint256 milestoneAmount = (totalRaised * milestone.percentage) / DIVIDER;
        uint256 feeAmount = (milestoneAmount * FEE) / DIVIDER;
        uint256 amountToCreator = milestoneAmount - feeAmount;

        milestone.fundsReleased = true;
        campaign.raised -= milestoneAmount;
        
        bool allMilestonesReleased = true;
        for (uint256 i = 0; i < campaignMilestones[campaignId].length; ++i) {
            if (!campaignMilestones[campaignId][i].fundsReleased) {
                allMilestonesReleased = false;
                break;
            }
        }

        if (allMilestonesReleased) {
            campaign.state = States.Successful;
            campaign.fundsWithdrawn = true;
        }

        accumulatedFees += feeAmount;

        usdc.safeTransfer(campaign.creator, amountToCreator);
        
        emit MilestoneFundsReleased(campaignId, milestoneId, amountToCreator, feeAmount);
    }

    /**
     * @notice Finalize milestone voting after voting period ends
     * @dev Anyone can call this to finalize the vote
     * @param campaignId Campaign ID
     * @param milestoneId Milestone index
     */
    function finalizeMilestoneVoting(uint256 campaignId, uint256 milestoneId) 
        external 
        validateCampaignExists(campaignId) 
    {
        if (milestoneId >= campaignMilestones[campaignId].length) {
            revert CrowdFunding__MilestoneNotFound();
        }
        
        Milestone storage milestone = campaignMilestones[campaignId][milestoneId];
        
        if (milestone.approved || milestone.fundsReleased) {
            revert CrowdFunding__MilestoneAlreadyReleased();
        }
        
        uint256 votingDeadline = milestoneVotingDeadline[campaignId][milestoneId];
        if (votingDeadline == 0 || block.timestamp < votingDeadline) {
            revert CrowdFunding__CampaignStillActive();
        }
        
        uint256 totalVotes = milestone.votesFor + milestone.votesAgainst;
        
        if (totalVotes == 0) {
            revert CrowdFunding__NotEnoughVotesToApprove();
        }
        
        uint256 approvalPercentage = (milestone.votesFor * 100) / totalVotes;
        
        if (approvalPercentage >= APPROVAL_THRESHOLD) {
            milestone.approved = true;
            emit MilestoneApproved(campaignId, milestoneId);
        } else {
            emit MilestoneRejected(campaignId, milestoneId);
        }
    }

    /**
     * @notice Withdraw all funds at once (only for campaigns WITHOUT milestones)
     * @dev Uses pull payment pattern for security. 3% fee is deducted.
     * @param campaignId Campaign ID
     */
    function withdraw(uint256 campaignId) 
        external 
        nonReentrant 
        validateCampaignExists(campaignId) 
    {
        Campaign storage campaign = campaigns[campaignId];

        if (campaignMilestones[campaignId].length > 0) {
            revert CrowdFunding__CampaignHasMilestones();
        }

        if (campaign.creator != msg.sender) {
            revert CrowdFunding__OnlyOwnerOfCampaignCanWithdraw();
        }
        if (block.timestamp <= campaign.duration) {
            revert CrowdFunding__CampaignStillActive();
        }
        if (campaign.goal > campaign.raised) {
            revert CrowdFunding__NotEnoughMoneyRaised();
        }
        if (campaign.fundsWithdrawn) {
            revert CrowdFunding__AlreadyWithdrawn();
        }

        uint256 feeAmount = (campaign.raised * FEE) / DIVIDER;
        uint256 amountToCreator = campaign.raised - feeAmount;
        
        campaign.state = States.Successful;
        campaign.fundsWithdrawn = true;
        campaign.raised = 0;
        
        accumulatedFees += feeAmount;

        usdc.safeTransfer(campaign.creator, amountToCreator);

        emit CampaignWithdrawn(campaignId, campaign.creator, amountToCreator, feeAmount);
    }

    /**
     * @notice Platform owner withdraws accumulated fees
     * @dev Uses pull payment pattern
     */
    function withdrawFees() external nonReentrant {
        if (msg.sender != owner) {
            revert CrowdFunding__OnlyOwnerOfCampaignCanWithdraw();
        }
        if (accumulatedFees == 0) {
            revert CrowdFunding__NoFeesToWithdraw();
        }

        uint256 feesToWithdraw = accumulatedFees;
        accumulatedFees = 0;

        usdc.safeTransfer(owner, feesToWithdraw);

        emit FeesWithdrawn(owner, feesToWithdraw);
    }

    /**
     * @notice Refund contribution if campaign failed to reach goal
     * @dev Available after campaign ends and goal not met
     * @param campaignId Campaign ID
     */
    function refund(uint256 campaignId) 
        external 
        nonReentrant 
        validateCampaignExists(campaignId) 
    {
        Campaign storage campaign = campaigns[campaignId];

        if (block.timestamp <= campaign.duration) {
            revert CrowdFunding__CampaignStillActive();
        }
        if (campaign.goal <= campaign.raised) {
            revert CrowdFunding__CampaignRaisedEnoughMoney();
        }

        uint256 amount = contributions[campaignId][msg.sender];
        if (amount == 0) {
            revert CrowdFunding__NothingToRefund();
        }

        contributions[campaignId][msg.sender] = 0;
        campaign.raised -= amount;

        if (campaign.state != States.Failed) {
            campaign.state = States.Failed;
        }

        usdc.safeTransfer(msg.sender, amount);

        emit CampaignRefunded(campaignId, msg.sender, amount);
    }

    // ========== INTERNAL VALIDATION ==========

    /**
     * @dev Validates reward tiers structure
     */
    function _validateTiers(RewardTier[] memory _tiers) internal pure {
        if (_tiers.length < MIN_TIERS || _tiers.length > MAX_TIERS) {
            revert CrowdFunding__InvalidTierCount();
        }
        uint256 tierLength = _tiers.length;
        for (uint256 i = 0; i < tierLength; ++i) {
            if (bytes(_tiers[i].name).length > MAX_STRING_LENGTH) {
                revert CrowdFunding__StringTooLong();
            }
            if (bytes(_tiers[i].description).length > MAX_STRING_LENGTH) {
                revert CrowdFunding__StringTooLong();
            }
            if (_tiers[i].minContribution < MIN_TIER_CONTRIBUTION) {
                revert CrowdFunding__TierMinContributionTooLow();
            }
            if (i > 0 && _tiers[i].minContribution <= _tiers[i-1].minContribution) {
                revert CrowdFunding__TiersMustBeSorted();
            }
        }
    }

    /**
     * @dev Validates milestones structure and percentages
     */
    function _validateMilestones(Milestone[] memory _milestones, uint256 campaignEndTime) internal pure {
        if (_milestones.length < MIN_MILESTONES || _milestones.length > MAX_MILESTONES) {
            revert CrowdFunding__InvalidMilestoneCount();
        }
        
        uint256 totalPercentage = 0;
        uint256 milestoneLength = _milestones.length;
        for (uint256 i = 0; i < milestoneLength; i++) {
            if (bytes(_milestones[i].description).length > MAX_STRING_LENGTH) {
                revert CrowdFunding__StringTooLong();
            }
            
            if (_milestones[i].percentage < MIN_MILESTONE_PERCENTAGE) {
                revert CrowdFunding__MilestonePercentageTooLow();
            }
            totalPercentage += _milestones[i].percentage;
            
            if (_milestones[i].deadline <= campaignEndTime) {
                revert CrowdFunding__MilestoneDeadlinesNotSequential();
            }
            if (_milestones[i].deadline > campaignEndTime + (MAX_MILESTONE_DAYS * 1 days)) {
                revert CrowdFunding__MilestoneDeadlineTooLong();
            }
            
            if (i > 0 && _milestones[i].deadline <= _milestones[i-1].deadline) {
                revert CrowdFunding__MilestoneDeadlinesNotSequential();
            }
        }
        
        if (totalPercentage != 100) {
            revert CrowdFunding__MilestonePercentageMustSumTo100();
        }
    }

    // ========== VIEW FUNCTIONS ==========

    function getCampaign(uint256 campaignId)
        external
        view
        validateCampaignExists(campaignId)
        returns (Campaign memory)
    {
        return campaigns[campaignId];
    }

    function getContribution(uint256 campaignId, address contributor)
        external
        view
        validateCampaignExists(campaignId)
        returns (uint256)
    {
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

    function getCampaignTiers(uint256 campaignId) 
        external 
        view 
        validateCampaignExists(campaignId) 
        returns (RewardTier[] memory) 
    {
        return campaignTiers[campaignId];
    }

    function getCampaignMilestones(uint256 campaignId) 
        external 
        view 
        validateCampaignExists(campaignId) 
        returns (Milestone[] memory) 
    {
        return campaignMilestones[campaignId];
    }

    function getMilestone(uint256 campaignId, uint256 milestoneId) 
        external 
        view 
        validateCampaignExists(campaignId) 
        returns (Milestone memory) 
    {
        if (milestoneId >= campaignMilestones[campaignId].length) {
            revert CrowdFunding__MilestoneNotFound();
        }
        return campaignMilestones[campaignId][milestoneId];
    }

    function getContributorTier(uint256 campaignId, address contributor) 
        external 
        view 
        validateCampaignExists(campaignId) 
        returns (uint256) 
        {
            return contributorTiers[campaignId][contributor];
        }
}