// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CrowdFunding is ReentrancyGuard {
    using SafeERC20 for IERC20;

    error CrowdFunding__YouCantContributeYourOwnCampaign();
    error CrowdFunding__CampaignDoesNotExist();
    error CrowdFunding__CampaignHasEnded();
    error CrowdFunding__ValueMustBeGreaterThanZero();
    error CrowdFunding__NotEnoughMoneyRaised();
    error CrowdFunding__TransactionFailed();
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
    address public immutable owner;
    IERC20 public immutable usdc; // USDC token contract
    
    mapping(uint256 => mapping(address => uint256)) public contributions;
    uint256 public accumulatedFees; // Total fees collected
    
    uint256 public constant FEE = 3; // 3% fee
    uint256 public constant MAX_DURATION = 365 days;
    uint256 public constant MIN_CAMPAIGN_GOAL = 100 * 10**6; // 100 USDC (6 decimals)

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
     * @notice Creates a new crowdfunding campaign
     * @param _title Campaign title
     * @param _goal Funding goal in USDC (with 6 decimals, e.g., 1000000000 = 1000 USDC)
     * @param _description Campaign description
     * @param _durationInDays Campaign duration in days
     */
    function createCampaign(
        string memory _title,
        uint256 _goal,
        string memory _description,
        uint256 _durationInDays
    ) external {
        uint256 duration = block.timestamp + (_durationInDays * 1 days);
        
        if (_durationInDays == 0) {
            revert CrowdFunding__DurationMustBeGreaterThanZero();
        }
        if (_durationInDays > MAX_DURATION / 1 days) {
            revert CrowdFunding__DurationTooLong();
        }
        if (_goal < MIN_CAMPAIGN_GOAL) {
            revert CrowdFunding__GoalTooLow();
        }

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
        
        emit CampaignCreated(campaignId, msg.sender, _title, _goal, duration);
    }

    /**
     * @notice Contribute USDC to a campaign
     * @dev User must approve this contract to spend their USDC first
     * @param campaignId The ID of the campaign to contribute to
     * @param amount Amount of USDC to contribute (with 6 decimals)
     */
    function contribute(uint256 campaignId, uint256 amount) 
        external 
        validateCampaignExists(campaignId) 
        nonReentrant 
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

        // Check if user has approved enough USDC
        uint256 allowance = usdc.allowance(msg.sender, address(this));
        if (allowance < amount) {
            revert CrowdFunding__InsufficientAllowance();
        }

        // Transfer USDC from contributor to this contract
        usdc.safeTransferFrom(msg.sender, address(this), amount);

        campaign.raised += amount;
        contributions[campaignId][msg.sender] += amount;

        emit CampaignContributed(campaignId, msg.sender, amount);
    }

    /**
     * @notice Withdraw funds after successful campaign (PULL PATTERN)
     * @dev Creator withdraws their funds, fees are kept in contract
     * @param campaignId The ID of the campaign to withdraw from
     */
    function withdraw(uint256 campaignId) 
        external 
        validateCampaignExists(campaignId) 
        nonReentrant 
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

        uint256 feeAmount = (campaign.raised * FEE) / 100;
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
        validateCampaignExists(campaignId) 
        nonReentrant 
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