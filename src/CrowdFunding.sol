// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CrowdFunding is ReentrancyGuard {
    error CrowdFunding__YouCantContriuteYourOwnCampaign();
    error CrowdFunding__CampaignDoesNotExist();
    error CrowdFunding__CamapignHasEnded();
    error CrowdFunding__ValueMustBeGreaterThanZero();
    error CrowdFunding__NotEnoughMoneyRaised();
    error CrowdFunding__TransactionFailed();
    error CrowdFunding__OnlyOwnerOfCampaignCanWithdraw();
    error CrowdFunding__CamapignStillActive();
    error CrowdFunding__CampaingRaisedEnoughMoney();
    error CrowdFunding__NothingToRefund();
    error CrowdFunding__DurationMustBeGreaterThanZero();
    error CrowdFunding__DurationTooLong();
    error CrowdFunding__GoalTooLow();

    enum States {
        Active,
        Succesful,
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
    }

    event creatingCampaign(string _title, uint256 _goal, string _description, uint256 _durationInDays);
    event contributeCampaing(uint256 campaignId);
    event withdrawMoney(uint256 campaignId);
    event refundMoney(uint256 campaignId);

    Campaign[] public campaigns;
    address payable public immutable owner;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    uint256 public constant FEE = 3;
    uint256 public constant MAX_DURATION = 365 days;
    uint256 public constant MIN_CAMAPIGN_GOAL = 1 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    modifier validateCampaignExists(uint256 campaignId) {
        if (campaignId >= campaigns.length) {
            revert CrowdFunding__CampaignDoesNotExist();
        }
        _;
    }

    function createCampaign(string memory _title, uint256 _goal, string memory _description, uint256 _durationInDays)
        external
    {
        uint256 duration = block.timestamp + (_durationInDays * 1 days);
        if (_durationInDays == 0) {
            revert CrowdFunding__DurationMustBeGreaterThanZero();
        }
        if (_durationInDays > MAX_DURATION / 1 days) {
            revert CrowdFunding__DurationTooLong();
        }
        if (_goal < MIN_CAMAPIGN_GOAL) {
            revert CrowdFunding__GoalTooLow();
        }
        Campaign memory campaign = Campaign({
            title: _title,
            goal: _goal,
            duration: duration,
            description: _description,
            raised: 0,
            creator: msg.sender,
            state: States.Active
        });

        campaigns.push(campaign);
        emit creatingCampaign(_title, _goal, _description, _durationInDays);
    }

    function contribute(uint256 campaignId) external payable validateCampaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];

        if (campaign.creator == msg.sender) {
            revert CrowdFunding__YouCantContriuteYourOwnCampaign();
        }
        if (block.timestamp > campaign.duration) {
            revert CrowdFunding__CamapignHasEnded();
        }
        if (msg.value <= 0) {
            revert CrowdFunding__ValueMustBeGreaterThanZero();
        }

        campaign.raised += msg.value;
        contributions[campaignId][msg.sender] += msg.value;

        emit contributeCampaing(campaignId);
    }

    function withdraw(uint256 campaignId) external validateCampaignExists(campaignId) nonReentrant {
        Campaign storage campaign = campaigns[campaignId];

        if (campaign.creator != msg.sender) {
            revert CrowdFunding__OnlyOwnerOfCampaignCanWithdraw();
        }
        if (block.timestamp <= campaign.duration) {
            revert CrowdFunding__CamapignStillActive();
        }
        if (campaign.goal > campaign.raised) {
            revert CrowdFunding__NotEnoughMoneyRaised();
        }
        uint256 feeAmount = (campaign.raised * FEE) / 100;
        uint256 amountToCreator = (campaign.raised - feeAmount);
        campaign.raised = 0;
        campaign.state = States.Succesful;
        (bool success2,) = payable(owner).call{value: feeAmount}("");
        if (!success2) {
            revert CrowdFunding__TransactionFailed();
        }
        (bool success,) = payable(campaign.creator).call{value: amountToCreator}("");
        if (!success) {
            revert CrowdFunding__TransactionFailed();
        }

        emit withdrawMoney(campaignId);
    }

    function refund(uint256 campaignId) external validateCampaignExists(campaignId) nonReentrant {
        Campaign storage campaign = campaigns[campaignId];

        if (block.timestamp <= campaign.duration) {
            revert CrowdFunding__CamapignStillActive();
        }
        if (campaign.goal <= campaign.raised) {
            revert CrowdFunding__CampaingRaisedEnoughMoney();
        }

        uint256 amount = contributions[campaignId][msg.sender];
        if (amount == 0) {
            revert CrowdFunding__NothingToRefund();
        }

        contributions[campaignId][msg.sender] = 0;
        campaign.state = States.Failed;

        (bool success,) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert CrowdFunding__TransactionFailed();
        }
        emit refundMoney(campaignId);
    }
}
