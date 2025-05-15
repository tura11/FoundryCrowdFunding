// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CrowdFunding {
    error CrowdFunding__YouCantContriuteYourOwnCampaign();
    error CrowdFunding__CampaignDoesNotExist();
    error CrowdFunding__CamapignHasEnded();
    error CrowdFunding__ValueMustBeGreaterThanZero();
    error CrowdFunding__NotEnoughMoneyRaised();
    error CrowdFunding__TransactionFailed();

    struct Campaign {
        string title;
        uint256 goal;
        uint256 raised;
        uint256 duration;
        string description;
        address creator;
    }
    enum States{
        Active,
        Succesful,
        Failed
    }

    Campaign[] public campaigns;
    address payable public immutable owner;
    mapping(address => uint256) contributions;


    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function createCampaign(string memory _title, uint256 _goal, string memory _description) external {
        uint256 duration = block.timestamp + 7 days;
        Campaign memory campaign = Campaign({
            title: _title,
            goal: _goal,
            duration: duration,
            description: _description,
            raised: 0,
            creator: msg.sender
        });

        campaigns.push(campaign);
    }

    function contribute(uint256 campaignId) external payable {
        if (campaignId >= campaigns.length) {
            revert CrowdFunding__CampaignDoesNotExist();
        }

        Campaign storage c = campaigns[campaignId];

        if (c.creator == msg.sender) {
            revert CrowdFunding__YouCantContriuteYourOwnCampaign();
        }
        if (block.timestamp > c.duration) {
            revert CrowdFunding__CamapignHasEnded();
        }
        if (msg.value <= 0) {
            revert CrowdFunding__ValueMustBeGreaterThanZero();
        }

        c.raised += msg.value;
        contributions[msg.sender] += msg.value;
    }


    function withdraw(uint256 campaignId) external {
        if (campaignId >= campaigns.length) {
            revert CrowdFunding__CampaignDoesNotExist();
        }
        Campaign storage c = campaigns[campaignId];

        if(c.goal <= c.raised){
            (bool success,) = owner.call{value: c.raised}("");
            if(!success){
                revert CrowdFunding__TransactionFailed();
            }
        }else{
            revert CrowdFunding__NotEnoughMoneyRaised();
        }
    }
}
