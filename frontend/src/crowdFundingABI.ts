export const crowdFundingABI = [

        {
            "type": "constructor",
            "inputs": [
                {
                    "name": "_usdcAddress",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "APPROVAL_THRESHOLD",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "DIVIDER",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "FEE",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MAX_CAMPAIGN_DURATION",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MAX_MILESTONES",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MAX_MILESTONE_DAYS",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MAX_STRING_LENGTH",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MAX_TIERS",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MIN_CAMPAIGN_GOAL",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MIN_MILESTONES",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MIN_MILESTONE_PERCENTAGE",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MIN_TIERS",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "MIN_TIER_CONTRIBUTION",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "VOTING_PERIOD",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "accumulatedFees",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "campaignMilestones",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "description",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "percentage",
                    "type": "uint8",
                    "internalType": "uint8"
                },
                {
                    "name": "deadline",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "votesFor",
                    "type": "uint16",
                    "internalType": "uint16"
                },
                {
                    "name": "votesAgainst",
                    "type": "uint16",
                    "internalType": "uint16"
                },
                {
                    "name": "approved",
                    "type": "bool",
                    "internalType": "bool"
                },
                {
                    "name": "fundsReleased",
                    "type": "bool",
                    "internalType": "bool"
                },
                {
                    "name": "votingFinalized",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "campaignTiers",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "name",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "description",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "minContribution",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "maxBackers",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "currentBackers",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "campaigns",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "title",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "goal",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "raised",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "originalGoal",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "duration",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "description",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "creator",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "state",
                    "type": "uint8",
                    "internalType": "enum CrowdFunding.States"
                },
                {
                    "name": "anyMilestoneReleased",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "contribute",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "tierIndex",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "contributions",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "contributorTiers",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint8",
                    "internalType": "uint8"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "createCampaign",
            "inputs": [
                {
                    "name": "_title",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "_goal",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "_description",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "_durationInDays",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "_tiers",
                    "type": "tuple[]",
                    "internalType": "struct CrowdFunding.RewardTier[]",
                    "components": [
                        {
                            "name": "name",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "minContribution",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "maxBackers",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "currentBackers",
                            "type": "uint256",
                            "internalType": "uint256"
                        }
                    ]
                },
                {
                    "name": "_milestones",
                    "type": "tuple[]",
                    "internalType": "struct CrowdFunding.Milestone[]",
                    "components": [
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "percentage",
                            "type": "uint8",
                            "internalType": "uint8"
                        },
                        {
                            "name": "deadline",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "votesFor",
                            "type": "uint16",
                            "internalType": "uint16"
                        },
                        {
                            "name": "votesAgainst",
                            "type": "uint16",
                            "internalType": "uint16"
                        },
                        {
                            "name": "approved",
                            "type": "bool",
                            "internalType": "bool"
                        },
                        {
                            "name": "fundsReleased",
                            "type": "bool",
                            "internalType": "bool"
                        },
                        {
                            "name": "votingFinalized",
                            "type": "bool",
                            "internalType": "bool"
                        }
                    ]
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "finalizeMilestoneVoting",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "milestoneId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "getAccumulatedFees",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getCampaign",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "tuple",
                    "internalType": "struct CrowdFunding.Campaign",
                    "components": [
                        {
                            "name": "title",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "goal",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "raised",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "originalGoal",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "duration",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "creator",
                            "type": "address",
                            "internalType": "address"
                        },
                        {
                            "name": "state",
                            "type": "uint8",
                            "internalType": "enum CrowdFunding.States"
                        },
                        {
                            "name": "anyMilestoneReleased",
                            "type": "bool",
                            "internalType": "bool"
                        }
                    ]
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getCampaignCount",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getCampaignMilestones",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "tuple[]",
                    "internalType": "struct CrowdFunding.Milestone[]",
                    "components": [
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "percentage",
                            "type": "uint8",
                            "internalType": "uint8"
                        },
                        {
                            "name": "deadline",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "votesFor",
                            "type": "uint16",
                            "internalType": "uint16"
                        },
                        {
                            "name": "votesAgainst",
                            "type": "uint16",
                            "internalType": "uint16"
                        },
                        {
                            "name": "approved",
                            "type": "bool",
                            "internalType": "bool"
                        },
                        {
                            "name": "fundsReleased",
                            "type": "bool",
                            "internalType": "bool"
                        },
                        {
                            "name": "votingFinalized",
                            "type": "bool",
                            "internalType": "bool"
                        }
                    ]
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getCampaignTiers",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "tuple[]",
                    "internalType": "struct CrowdFunding.RewardTier[]",
                    "components": [
                        {
                            "name": "name",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "minContribution",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "maxBackers",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "currentBackers",
                            "type": "uint256",
                            "internalType": "uint256"
                        }
                    ]
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getContribution",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "contributor",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getContributorTier",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "contributor",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getMilestone",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "milestoneId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "tuple",
                    "internalType": "struct CrowdFunding.Milestone",
                    "components": [
                        {
                            "name": "description",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "percentage",
                            "type": "uint8",
                            "internalType": "uint8"
                        },
                        {
                            "name": "deadline",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "votesFor",
                            "type": "uint16",
                            "internalType": "uint16"
                        },
                        {
                            "name": "votesAgainst",
                            "type": "uint16",
                            "internalType": "uint16"
                        },
                        {
                            "name": "approved",
                            "type": "bool",
                            "internalType": "bool"
                        },
                        {
                            "name": "fundsReleased",
                            "type": "bool",
                            "internalType": "bool"
                        },
                        {
                            "name": "votingFinalized",
                            "type": "bool",
                            "internalType": "bool"
                        }
                    ]
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getOwner",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getTotalContributors",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getUSDCAddress",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "milestoneVotes",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "owner",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "refund",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "releaseMilestoneFunds",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "milestoneId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "totalContributors",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "usdc",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "contract IERC20"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "voteMilestone",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "milestoneId",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "vote",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "withdrawFees",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "event",
            "name": "CampaignContributed",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "contributor",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "name": "tierIndex",
                    "type": "uint8",
                    "indexed": false,
                    "internalType": "uint8"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "CampaignCreated",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "creator",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "title",
                    "type": "string",
                    "indexed": false,
                    "internalType": "string"
                },
                {
                    "name": "goal",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "name": "duration",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "CampaignRefunded",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "contributor",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "FeesWithdrawn",
            "inputs": [
                {
                    "name": "owner",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "MilestoneApproved",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "milestoneId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "MilestoneFundsReleased",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "milestoneId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "name": "fee",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "MilestoneRejected",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "milestoneId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "MilestoneVoted",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "milestoneId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "voter",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "vote",
                    "type": "bool",
                    "indexed": false,
                    "internalType": "bool"
                },
                {
                    "name": "votesFor",
                    "type": "uint16",
                    "indexed": false,
                    "internalType": "uint16"
                },
                {
                    "name": "votesAgainst",
                    "type": "uint16",
                    "indexed": false,
                    "internalType": "uint16"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "TierUpgraded",
            "inputs": [
                {
                    "name": "campaignId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "name": "contributor",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "oldTier",
                    "type": "uint8",
                    "indexed": false,
                    "internalType": "uint8"
                },
                {
                    "name": "newTier",
                    "type": "uint8",
                    "indexed": false,
                    "internalType": "uint8"
                }
            ],
            "anonymous": false
        },
        {
            "type": "error",
            "name": "CrowdFunding__AlreadyVoted",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__CampaignDoesNotExist",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__CampaignHasEnded",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__CampaignRaisedEnoughMoney",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__CampaignStillActive",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__CampaignTierDoesNotExist",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__CannotRefundAfterPayout",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__ContributionBelowTierMinimum",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__ContributionExceedsGoal",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__DescriptionTooLong",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__DurationMustBeGreaterThanZero",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__DurationTooLong",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__GoalTooLow",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__InsufficientAllowance",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__InvalidMilestoneCount",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__InvalidTierCount",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestoneDeadlineNotReached",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestoneDeadlineTooLong",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestoneDeadlinesNotSequential",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestoneFundsAlreadyReleased",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestoneNotApproved",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestoneNotFound",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestonePercentageMustSumTo100",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestonePercentageTooLow",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__MilestoneVotingPeriodExpired",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__NoFeesToWithdraw",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__NotAContributor",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__NotEnoughMoneyRaised",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__NotEnoughTotalConitributors",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__NotEnoughVotesToApprove",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__NothingToRefund",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__OnlyCreatorCanReleaseFunds",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__OnlyOwnerOfCampaignCanWithdraw",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__PreviousMilestoneNotReleased",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__StringTooLong",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__TierFull",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__TierMinContributionTooLow",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__TiersMustBeSorted",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__TitleTooLong",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__ValueMustBeGreaterThanZero",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__VotingAlreadyFinalized",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__VotingPeriodNotExpired",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__YouCantContributeYourOwnCampaign",
            "inputs": []
        },
        {
            "type": "error",
            "name": "ReentrancyGuardReentrantCall",
            "inputs": []
        },
        {
            "type": "error",
            "name": "SafeERC20FailedOperation",
            "inputs": [
                {
                    "name": "token",
                    "type": "address",
                    "internalType": "address"
                }
            ]
        }
    ]