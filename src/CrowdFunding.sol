// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from  "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CrowdFunding is ReentrancyGuard {
    using SafeERC20 for IERC20;

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

    enum States {
        Active,
        Successful,
        Failed
    }

    struct Campaign {
        string title;
        uint256 goal;
        uint256 raised;
        uint256 duration;
        string description;
        address creator;
        States state;
        bool fundsWithdrawn; // Track if creator already withdrew
    }

    struct  RewardTier {
        string name; // name of the tier
        string description; // whats the reward for this tier
        uint256 minContribution; // minimum USDC required to join this tier
        uint256 maxBackers; // max number of backers
        uint256 currentBackers; // current number of backers
    }


    struct Milestone {
        string description; // description of the milestone
        uint8 percentage; // % of funds (must sum to 100%)
        uint256 deadline; // timestamp when milestone should be gone
        uint16 votesFor;
        uint16 votesAgainst;
        bool approved; // approved by voting
        bool fundsReleased; // funds sent to creator
    }





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

    Campaign[] public campaigns;
    IERC20 public immutable usdc; // USDC token contract

    //mappings
    
    mapping(uint256 => RewardTier[]) public campaignTiers;
    mapping(uint256 => Milestone[]) public campaignMilestones;
    mapping(uint256 => mapping(address => uint8)) public contributorTiers; // campaignId => contributor => tierIndex
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public milestoneVotes; // campaignId => milestoneId => voter => hasVoted
    mapping(uint256 => bool) public campaignHasContributions; // track if campaign received any contributions
    mapping(uint256 => uint256) public totalContributors; // count unique contributors per campaign
    mapping(uint256 => mapping(address => uint256)) public contributions;


    // constants


    uint256 public constant MAX_STRING_LENGTH = 200;
    uint256 public constant MIN_TIER_CONTRIBUTION = 10 * 10**6; // 10 USDC
    uint8 public constant MIN_TIERS = 1;
    uint8 public constant MAX_TIERS = 5;
    uint8 public constant MIN_MILESTONES = 2;
    uint8 public constant MAX_MILESTONES = 5;
    uint8 public constant MIN_MILESTONE_PERCENTAGE = 10; // 10%
    uint256 public constant MAX_MILESTONE_DAYS = 365 days;
    uint256 public constant FEE = 3; // 3% fee
    uint256 public constant MIN_CAMPAIGN_GOAL = 100 * 10**6; // 100 USDC (6 decimals)
    uint256 public constant MAX_CAMPAIGN_DURATION = 365 days;
    uint256 public constant DIVIDER = 100;

    address public immutable owner;
    uint256 public accumulatedFees; // Total fees collected
    

    // USDC addresses for different networks
    // Mainnet: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
    // Sepolia: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
    // Base: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
    // Polygon: 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
    address public constant USDC_ADDRESS = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238; // Sepolia USDC

    constructor() {
        owner = msg.sender;
        usdc = IERC20(USDC_ADDRESS);
    }

    modifier validateCampaignExists(uint256 campaignId) {
        if (campaignId >= campaigns.length) {
            revert CrowdFunding__CampaignDoesNotExist();
        }
        _;
    }

    /**
 * @notice Creates a new crowdfunding campaign with tiers and milestones
 * @param _title Campaign title (max 200 chars)
 * @param _goal Funding goal in USDC (with 6 decimals)
 * @param _description Campaign description (max 200 chars)
 * @param _durationInDays Campaign duration in days
 * @param _tiers Array of reward tiers
 * @param _milestones Array of milestones
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

        if(bytes(_title).length > MAX_STRING_LENGTH) {
            revert CrowdFunding__TitleTooLong();
        }
        if(bytes(_description).length > MAX_STRING_LENGTH) {
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
        for(uint256 i = 0; i < tierLength; ++i) {
            tiers.push(_tiers[i]);
        }

        uint256 milestoneLength = _milestones.length;
        for(uint256 i = 0; i < milestoneLength; ++i) {
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
     * @dev User must approve this contract to spend their USDC first
     * @param campaignId The ID of the campaign to contribute to
     * @param amount Amount of USDC to contribute (with 6 decimals)
     */
    function contribute(uint256 campaignId, uint256 amount, uint8 tierIndex) 
        external 
        nonReentrant
        validateCampaignExists(campaignId) 
         
    {
        Campaign storage campaign = campaigns[campaignId];
        RewardTier storage tier = campaignTiers[campaignId][tierIndex];


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
            revert CrowdFunding__CampaignDoesNotExist(); // reusing error for invalid tier
        }
        if (amount < tier.minContribution) {
            revert CrowdFunding__ContributionBelowTierMinimum();
        }
        if (tier.maxBackers > 0 && tier.currentBackers >= tier.maxBackers) {
            revert CrowdFunding__TierFull();
        }
            
        bool isNewContributor = contributions[campaignId][msg.sender] == 0;

        
        // Transfer USDC from contributor to this contract
        usdc.safeTransferFrom(msg.sender, address(this), amount);

        campaign.raised += amount;
        contributions[campaignId][msg.sender] += amount;

        // Check if user has approved enough USDC
       
        
        if (isNewContributor) {
        contributorTiers[campaignId][msg.sender] = tierIndex;
        tier.currentBackers++;
        totalContributors[campaignId]++;
        } else {
        // Allow upgrading to higher tier
        uint8 currentTier = contributorTiers[campaignId][msg.sender];
        if (tierIndex > currentTier) {
            campaignTiers[campaignId][currentTier].currentBackers--;
            contributorTiers[campaignId][msg.sender] = tierIndex;
            tier.currentBackers++;
        }
    }
        uint256 allowance = usdc.allowance(msg.sender, address(this));
            if (allowance < amount) {
                revert CrowdFunding__InsufficientAllowance();
            }

        emit CampaignContributed(campaignId, msg.sender, amount);
    }

    /**
     * @notice Withdraw funds after successful campaign (PULL PATTERN)
     * @dev Creator withdraws their funds, fees are kept in contract
     * @param campaignId The ID of the campaign to withdraw from
     */
    function withdraw(uint256 campaignId) 
        external 
        nonReentrant 
        validateCampaignExists(campaignId) 
        
    {
        Campaign storage campaign = campaigns[campaignId];

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
        
        // Update state BEFORE transfer (Checks-Effects-Interactions)
        campaign.state = States.Successful;
        campaign.fundsWithdrawn = true;
        campaign.raised = 0;
        
        // Accumulate fees in contract instead of pushing to owner
        accumulatedFees += feeAmount;

        // Transfer only to creator - fees stay in contract
        usdc.safeTransfer(campaign.creator, amountToCreator);

        emit CampaignWithdrawn(campaignId, campaign.creator, amountToCreator, feeAmount);
    }

    /**
     * @notice Owner withdraws accumulated fees (PULL PATTERN)
     * @dev Separate function for owner to withdraw fees at their convenience
     */
    function withdrawFees() external nonReentrant {
        if (msg.sender != owner) {
            revert CrowdFunding__OnlyOwnerOfCampaignCanWithdraw();
        }
        if (accumulatedFees == 0) {
            revert CrowdFunding__NoFeesToWithdraw();
        }

        uint256 feesToWithdraw = accumulatedFees;
        accumulatedFees = 0; // Reset before transfer

        usdc.safeTransfer(owner, feesToWithdraw);

        emit FeesWithdrawn(owner, feesToWithdraw);
    }

    /**
     * @notice Refund contribution if campaign failed
     * @param campaignId The ID of the campaign to refund from
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

        // Transfer USDC back to contributor
        usdc.safeTransfer(msg.sender, amount);

        emit CampaignRefunded(campaignId, msg.sender, amount);
    }

    function _validateTiers(RewardTier[] memory _tiers) internal pure  {
        if (_tiers.length < MIN_TIERS || _tiers.length > MAX_TIERS) {
            revert CrowdFunding__InvalidTierCount();
        }
        uint256 tierLength = _tiers.length;
        for(uint256 i = 0; i < tierLength; i++) {
            if (bytes(_tiers[i].name).length > MAX_STRING_LENGTH) {
                revert CrowdFunding__StringTooLong();
            }
            if(bytes(_tiers[i].description).length > MAX_STRING_LENGTH) {
                revert CrowdFunding__StringTooLong();
            }

            if(_tiers[i].minContribution < MIN_TIER_CONTRIBUTION) {
                revert CrowdFunding__TierMinContributionTooLow();
                
            }

            if (i > 0 && _tiers[i].minContribution <= _tiers[i-1].minContribution) {
            revert CrowdFunding__TiersMustBeSorted();
        }
      }

    }


    function _validateMilestones(Milestone[] memory _milestones, uint256 campaignEndTime) internal pure {
    if (_milestones.length < MIN_MILESTONES || _milestones.length > MAX_MILESTONES) {
        revert CrowdFunding__InvalidMilestoneCount();
    }
    
    uint256 totalPercentage = 0;
    uint256 milestoneLength = _milestones.length;
    for (uint256 i = 0; i < milestoneLength; i++) {
        // Check string length
        if (bytes(_milestones[i].description).length > MAX_STRING_LENGTH) {
            revert CrowdFunding__StringTooLong();
        }
        
        // Check percentage
        if (_milestones[i].percentage < MIN_MILESTONE_PERCENTAGE) {
            revert CrowdFunding__MilestonePercentageTooLow();
        }
        totalPercentage += _milestones[i].percentage;
        
        // Check deadline
        if (_milestones[i].deadline <= campaignEndTime) {
            revert CrowdFunding__MilestoneDeadlinesNotSequential();
        }
        if (_milestones[i].deadline > campaignEndTime + (MAX_MILESTONE_DAYS * 1 days)) {
            revert CrowdFunding__MilestoneDeadlineTooLong();
        }
        
        // Check deadlines are sequential
        if (i > 0 && _milestones[i].deadline <= _milestones[i-1].deadline) {
            revert CrowdFunding__MilestoneDeadlinesNotSequential();
        }
    }
    
    if (totalPercentage != 100) {
        revert CrowdFunding__MilestonePercentageMustSumTo100();
        }
  }


    // ========== GETTER FUNCTIONS ==========

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

    /**
     * @notice Get current state of campaign (computed)
     * @param campaignId The ID of the campaign
     */
    function getCampaignState(uint256 campaignId) 
        external 
        view 
        validateCampaignExists(campaignId) 
        returns (States) 
    {
        Campaign storage campaign = campaigns[campaignId];
        
        if (block.timestamp <= campaign.duration) {
            return States.Active;
        }
        if (campaign.raised >= campaign.goal) {
            return States.Successful;
        }
        return States.Failed;
    }
}