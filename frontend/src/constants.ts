// constants.ts

// -------------------------------
// Contract addresses (current for local Anvil)
// -------------------------------
export const chainsToCrowdFunding: Record<number, { CrowdFunding: `0x${string}` }> = {
  // Local Anvil (chainId: 31337)
  31337: {
    CrowdFunding: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", 
  },
}

export const chainsToMockToken: Record<number, { token: `0x${string}` }> = {
  31337: {
    token: "0x5FbDB2315678afecb367f032d93F642f64180aa3", 
  },
}

export const crowdFundingABI = [
    {
    "ContractABI": [
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
            "name": "campaignHasContributions",
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
                    "type": "bool",
                    "internalType": "bool"
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
                    "name": "fundsWithdrawn",
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
                            "name": "fundsWithdrawn",
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
            "name": "milestoneVotingDeadline",
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
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
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
            "name": "withdraw",
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
            "name": "CampaignWithdrawn",
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
            "type": "error",
            "name": "CrowdFunding__AlreadyVoted",
            "inputs": []
        },
        {
            "type": "error",
            "name": "CrowdFunding__AlreadyWithdrawn",
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
            "name": "CrowdFunding__CampaignHasMilestones",
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
            "name": "CrowdFunding__ContributionBelowTierMinimum",
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
            "name": "CrowdFunding__MilestoneAlreadyReleased",
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
            "name": "CrowdFunding__MilestoneDoesNotExist",
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
    ],
    "bytecode": {
        "object": "0x60c060405234801561000f575f5ffd5b50604051615c36380380615c3683398181016040528101906100319190610104565b60015f819055503373ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250505061012f565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100d3826100aa565b9050919050565b6100e3816100c9565b81146100ed575f5ffd5b50565b5f815190506100fe816100da565b92915050565b5f60208284031215610119576101186100a6565b5b5f610126848285016100f0565b91505092915050565b60805160a051615a9961019d5f395f81816119aa01528181611a7a01528181611ae201528181612837015261286301525f8181610ea101528181611212015281816118e90152818161197e01528181611a9c0152818161208e015281816121bc015261313c0152615a995ff3fe608060405234801561000f575f5ffd5b506004361061027d575f3560e01c806362043bd81161015a578063918cb241116100cc578063c57981b511610085578063c57981b5146107dc578063d4ee247e146107fa578063d87c8c7f14610816578063e081dbf914610846578063e653dabd14610876578063f91e4b29146108a65761027d565b8063918cb24114610718578063932e109e1461073457806396c1d8f114610764578063a01a633d14610782578063b1610d7e146107a0578063bc06e81d146107be5761027d565b8063837160041161011e578063837160041461064257806388e951dd1461065e578063893d20e81461068e5780638c7bc838146106ac5780638da5cb5b146106ca5780638ed9895c146106e85761027d565b806362043bd81461059c5780636a4a340c146105ba5780636caa9218146105d857806377d6cf19146105f6578063797adde4146106125761027d565b80633ab34290116101f35780634a6a49f4116101b75780634a6a49f4146104c45780634c05abeb146104e25780635598f8cc14610500578063583fa50514610530578063587f5ed7146105605780635df45a371461057e5761027d565b80633ab34290146104325780633d891f59146104505780633de1bb15146104805780633e413bee1461049c578063476343ee146104ba5761027d565b80631d3c3603116102455780631d3c36031461036a578063278ecde1146103885780632e1a7d4d146103a45780633178492a146103c057806334ccc5ea146103f65780633a6600fe146104145761027d565b806307c3d4af14610281578063099107ad1461029f5780630e222a08146102cf578063108f9c0b146102ff578063141961bc14610333575b5f5ffd5b6102896108d6565b604051610296919061434e565b60405180910390f35b6102b960048036038101906102b491906143ab565b6108db565b6040516102c691906143e5565b60405180910390f35b6102e960048036038101906102e49190614458565b610935565b6040516102f6919061434e565b60405180910390f35b61031960048036038101906103149190614496565b61095f565b60405161032a959493929190614544565b60405180910390f35b61034d600480360381019061034891906143ab565b610ab7565b60405161036198979695949392919061463f565b60405180910390f35b610372610c4f565b60405161037f919061434e565b60405180910390f35b6103a2600480360381019061039d91906143ab565b610c54565b005b6103be60048036038101906103b991906143ab565b610f42565b005b6103da60048036038101906103d59190614496565b6112d9565b6040516103ed97969594939291906146e5565b60405180910390f35b6103fe6113f8565b60405161040b91906143e5565b60405180910390f35b61041c6113fd565b604051610429919061434e565b60405180910390f35b61043a611402565b604051610447919061434e565b60405180910390f35b61046a60048036038101906104659190614458565b611407565b60405161047791906143e5565b60405180910390f35b61049a60048036038101906104959190614496565b611427565b005b6104a461197c565b6040516104b191906147b4565b60405180910390f35b6104c26119a0565b005b6104cc611b59565b6040516104d9919061434e565b60405180910390f35b6104ea611b5e565b6040516104f7919061434e565b60405180910390f35b61051a600480360381019061051591906143ab565b611b63565b6040516105279190614905565b60405180910390f35b61054a60048036038101906105459190614496565b611dc6565b60405161055791906143e5565b60405180910390f35b610568611de6565b60405161057591906143e5565b60405180910390f35b610586611dec565b60405161059391906143e5565b60405180910390f35b6105a4611df5565b6040516105b191906143e5565b60405180910390f35b6105c2611dfa565b6040516105cf91906143e5565b60405180910390f35b6105e0611e01565b6040516105ed91906143e5565b60405180910390f35b610610600480360381019061060b919061494f565b611e0d565b005b61062c60048036038101906106279190614458565b6124c0565b60405161063991906143e5565b60405180910390f35b61065c60048036038101906106579190614496565b612565565b005b610678600480360381019061067391906143ab565b61281f565b60405161068591906143e5565b60405180910390f35b610696612834565b6040516106a3919061499f565b60405180910390f35b6106b461285b565b6040516106c191906143e5565b60405180910390f35b6106d2612861565b6040516106df919061499f565b60405180910390f35b61070260048036038101906106fd9190614496565b612885565b60405161070f9190614a6f565b60405180910390f35b610732600480360381019061072d9190614ab9565b612a86565b005b61074e600480360381019061074991906143ab565b613107565b60405161075b9190614b09565b60405180910390f35b61076c613124565b60405161077991906143e5565b60405180910390f35b61078a61312a565b60405161079791906143e5565b60405180910390f35b6107a8613132565b6040516107b591906143e5565b60405180910390f35b6107c6613139565b6040516107d3919061499f565b60405180910390f35b6107e4613160565b6040516107f191906143e5565b60405180910390f35b610814600480360381019061080f9190614fce565b613165565b005b610830600480360381019061082b91906143ab565b613712565b60405161083d91906151fc565b60405180910390f35b610860600480360381019061085b9190614458565b6138fc565b60405161086d91906143e5565b60405180910390f35b610890600480360381019061088b919061521c565b613992565b60405161089d9190614b09565b60405180910390f35b6108c060048036038101906108bb91906143ab565b6139c7565b6040516108cd91906153c0565b60405180910390f35b600581565b5f81600180549050811061091b576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60085f8481526020019081526020015f2054915050919050565b6005602052815f5260405f20602052805f5260405f205f915091509054906101000a900460ff1681565b6003602052815f5260405f208181548110610978575f80fd5b905f5260205f2090600502015f9150915050805f0180546109989061540d565b80601f01602080910402602001604051908101604052809291908181526020018280546109c49061540d565b8015610a0f5780601f106109e657610100808354040283529160200191610a0f565b820191905f5260205f20905b8154815290600101906020018083116109f257829003601f168201915b505050505090806001018054610a249061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054610a509061540d565b8015610a9b5780601f10610a7257610100808354040283529160200191610a9b565b820191905f5260205f20905b815481529060010190602001808311610a7e57829003601f168201915b5050505050908060020154908060030154908060040154905085565b60018181548110610ac6575f80fd5b905f5260205f2090600602015f91509050805f018054610ae59061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054610b119061540d565b8015610b5c5780601f10610b3357610100808354040283529160200191610b5c565b820191905f5260205f20905b815481529060010190602001808311610b3f57829003601f168201915b505050505090806001015490806002015490806003015490806004018054610b839061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054610baf9061540d565b8015610bfa5780601f10610bd157610100808354040283529160200191610bfa565b820191905f5260205f20905b815481529060010190602001808311610bdd57829003601f168201915b505050505090806005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050160149054906101000a900460ff16908060050160159054906101000a900460ff16905088565b600181565b610c5c613b9e565b806001805490508110610c9b576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60018381548110610cb057610caf61543d565b5b905f5260205f209060060201905080600301544211610cfb576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060020154816001015411610d3c576040517f40ea60d900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60095f8581526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490505f8103610dc5576040517fcba6f7ed00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60095f8681526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208190555080826002015f828254610e299190615497565b92505081905550600280811115610e4357610e426145b2565b5b8260050160149054906101000a900460ff166002811115610e6757610e666145b2565b5b14610e9a5760028260050160146101000a81548160ff02191690836002811115610e9457610e936145b2565b5b02179055505b610ee533827f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613be29092919063ffffffff16565b3373ffffffffffffffffffffffffffffffffffffffff16847f7c0c3709e95c5fe35b43c791adf5cef83416410f63319764e6e5bc218bd6e17f83604051610f2c91906143e5565b60405180910390a3505050610f3f613c61565b50565b610f4a613b9e565b806001805490508110610f89576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60018381548110610f9e57610f9d61543d565b5b905f5260205f20906006020190505f60045f8581526020019081526020015f20805490501115610ffa576040517f64c04fd800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16816005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611082576040517f9a3a410700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806003015442116110bf576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806002015481600101541115611101576040517fe71157f900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060050160159054906101000a900460ff161561114a576040517f8cd9548500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60646003836002015461115e91906154ca565b6111689190615538565b90505f81836002015461117b9190615497565b905060018360050160146101000a81548160ff021916908360028111156111a5576111a46145b2565b5b021790555060018360050160156101000a81548160ff0219169083151502179055505f83600201819055508160025f8282546111e19190615568565b92505081905550611256836005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16827f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613be29092919063ffffffff16565b826005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16857ff6855da62af7f8886a08b21d9396963710107b9819475543c2ab579138620bf883856040516112c292919061559b565b60405180910390a3505050506112d6613c61565b50565b6004602052815f5260405f2081815481106112f2575f80fd5b905f5260205f2090600402015f9150915050805f0180546113129061540d565b80601f016020809104026020016040519081016040528092919081815260200182805461133e9061540d565b80156113895780601f1061136057610100808354040283529160200191611389565b820191905f5260205f20905b81548152906001019060200180831161136c57829003601f168201915b505050505090806001015f9054906101000a900460ff1690806002015490806003015f9054906101000a900461ffff16908060030160029054906101000a900461ffff16908060030160049054906101000a900460ff16908060030160059054906101000a900460ff16905087565b60c881565b600a81565b603381565b6009602052815f5260405f20602052805f5260405f205f91509150505481565b61142f613b9e565b81600180549050811061146e576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600184815481106114835761148261543d565b5b905f5260205f209060060201905060045f8581526020019081526020015f208054905083106114de576040517ff1afccb200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60045f8681526020019081526020015f2084815481106115025761150161543d565b5b905f5260205f20906004020190503373ffffffffffffffffffffffffffffffffffffffff16826005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611598576040517f017ce7a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b816003015442116115d5576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b816001015482600201541015611617576040517fe71157f900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060030160049054906101000a900460ff1661165f576040517f11b9a30c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060030160059054906101000a900460ff16156116a8576040517f173aadf400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f841115611740575f5f90505b8481101561173e5760045f8781526020019081526020015f2081815481106116e0576116df61543d565b5b905f5260205f20906004020160030160059054906101000a900460ff16611733576040517f11b9a30c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060010190506116b5565b505b5f826002015490505f6064836001015f9054906101000a900460ff1660ff168361176a91906154ca565b6117749190615538565b90505f606460038361178691906154ca565b6117909190615538565b90505f818361179f9190615497565b905060018560030160056101000a81548160ff02191690831515021790555082866002015f8282546117d19190615497565b925050819055505f600190505f5f90505b60045f8c81526020019081526020015f20805490508110156118555760045f8c81526020019081526020015f2081815481106118215761182061543d565b5b905f5260205f20906004020160030160059054906101000a900460ff1661184a575f9150611855565b8060010190506117e2565b5080156118a75760018760050160146101000a81548160ff02191690836002811115611884576118836145b2565b5b021790555060018760050160156101000a81548160ff0219169083151502179055505b8260025f8282546118b89190615568565b9250508190555061192d876005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613be29092919063ffffffff16565b888a7f33c27824d686c889fbd1a95ddd35a05f7c862e8e3f8d7ebb959f9b0db35f1ca0848660405161196092919061559b565b60405180910390a35050505050505050611978613c61565b5050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6119a8613b9e565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611a2d576040517f9a3a410700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60025403611a68576040517f412dcb5900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60025490505f600281905550611ae07f0000000000000000000000000000000000000000000000000000000000000000827f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613be29092919063ffffffff16565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff167fc0819c13be868895eb93e40eaceb96de976442fa1d404e5c55f14bb65a8c489a82604051611b4691906143e5565b60405180910390a250611b57613c61565b565b600281565b600581565b611b6b614284565b816001805490508110611baa576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018381548110611bbe57611bbd61543d565b5b905f5260205f209060060201604051806101000160405290815f82018054611be59061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054611c119061540d565b8015611c5c5780601f10611c3357610100808354040283529160200191611c5c565b820191905f5260205f20905b815481529060010190602001808311611c3f57829003601f168201915b50505050508152602001600182015481526020016002820154815260200160038201548152602001600482018054611c939061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054611cbf9061540d565b8015611d0a5780601f10611ce157610100808354040283529160200191611d0a565b820191905f5260205f20905b815481529060010190602001808311611ced57829003601f168201915b50505050508152602001600582015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016005820160149054906101000a900460ff166002811115611d8d57611d8c6145b2565b5b6002811115611d9f57611d9e6145b2565b5b81526020016005820160159054906101000a900460ff161515151581525050915050919050565b600a602052815f5260405f20602052805f5260405f205f91509150505481565b60025481565b5f600254905090565b606481565b6298968081565b5f600180549050905090565b611e15613b9e565b826001805490508110611e54576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60018581548110611e6957611e6861543d565b5b905f5260205f20906006020190503373ffffffffffffffffffffffffffffffffffffffff16816005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603611eff576040517f4c7637b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060030154421115611f3d576040517fce4ecb8800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f8403611f76576040517ff3df71c500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60035f8681526020019081526020015f20805490508360ff1610611fc6576040517fa776a5a500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60035f8781526020019081526020015f208460ff1681548110611fed57611fec61543d565b5b905f5260205f20906005020190508060020154851015612039576040517fb385fa6100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f816003015411801561205457508060030154816004015410155b1561208b576040517f5fdb939700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b81526004016120e79291906155c2565b602060405180830381865afa158015612102573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061212691906155fd565b905085811015612162576040517fb3f6223d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5f60095f8a81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20541490506122013330897f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613c6a909392919063ffffffff16565b86846002015f8282546122149190615568565b925050819055508660095f8a81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546122769190615568565b92505081905550801561232b578560055f8a81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff021916908360ff160217905550826004015f8154809291906122fb90615628565b919050555060085f8981526020019081526020015f205f81548092919061232190615628565b919050555061245f565b5f60055f8a81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1690508060ff168760ff16111561245d5760035f8a81526020019081526020015f208160ff16815481106123bb576123ba61543d565b5b905f5260205f2090600502016004015f8154809291906123da9061566f565b91905055508660055f8b81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff021916908360ff160217905550836004015f81548092919061245790615628565b91905055505b505b3373ffffffffffffffffffffffffffffffffffffffff16887f9f0a129b85334ce6dc53da0a3aaafaacdce8b4704cc424c4835d88f4371cb716896040516124a691906143e5565b60405180910390a350505050506124bb613c61565b505050565b5f826001805490508110612500576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60055f8581526020019081526020015f205f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1660ff1691505092915050565b8160018054905081106125a4576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045f8481526020019081526020015f208054905082106125f1576040517ff1afccb200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60045f8581526020019081526020015f2083815481106126155761261461543d565b5b905f5260205f20906004020190508060030160049054906101000a900460ff168061264e57508060030160059054906101000a900460ff165b15612685576040517fbd77588f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600a5f8681526020019081526020015f205f8581526020019081526020015f205490505f8114806126b657508042105b156126ed576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f8260030160029054906101000a900461ffff16836003015f9054906101000a900461ffff1661271d9190615696565b61ffff1690505f810361275c576040517feef41eef00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f816064856003015f9054906101000a900461ffff1661277c91906156cb565b61ffff1661278a9190615538565b9050603360ff1681106127e75760018460030160046101000a81548160ff02191690831515021790555085877f939da3b627c123c81fe5aacebf925163337a0d4f8a03724640618078cad2489460405160405180910390a3612816565b85877f4e2fd11f84344693b41d2aba9910e33b34a4f02d4d3a65b65b2201f3c8fa3c8960405160405180910390a35b50505050505050565b6008602052805f5260405f205f915090505481565b5f7f0000000000000000000000000000000000000000000000000000000000000000905090565b61016d81565b7f000000000000000000000000000000000000000000000000000000000000000081565b61288d6142ed565b8260018054905081106128cc576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045f8581526020019081526020015f20805490508310612919576040517ff1afccb200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045f8581526020019081526020015f20838154811061293c5761293b61543d565b5b905f5260205f2090600402016040518060e00160405290815f820180546129629061540d565b80601f016020809104026020016040519081016040528092919081815260200182805461298e9061540d565b80156129d95780601f106129b0576101008083540402835291602001916129d9565b820191905f5260205f20905b8154815290600101906020018083116129bc57829003601f168201915b50505050508152602001600182015f9054906101000a900460ff1660ff1660ff16815260200160028201548152602001600382015f9054906101000a900461ffff1661ffff1661ffff1681526020016003820160029054906101000a900461ffff1661ffff1661ffff1681526020016003820160049054906101000a900460ff161515151581526020016003820160059054906101000a900460ff16151515158152505091505092915050565b826001805490508110612ac5576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60018581548110612ada57612ad961543d565b5b905f5260205f209060060201905060045f8681526020019081526020015f20805490508410612b35576040517ff1afccb200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60045f8781526020019081526020015f208581548110612b5957612b5861543d565b5b905f5260205f20906004020190505f60095f8881526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205403612bec576040517f3d38c2b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60065f8781526020019081526020015f205f8681526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1615612c8b576040517f3a51598200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81600301544211612cc8576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b816001015482600201541015612d0a576040517fe71157f900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060020154421015612d48576040517f0c08306200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600a5f8881526020019081526020015f205f8781526020019081526020015f205403612da75762093a808160020154612d829190615568565b600a5f8881526020019081526020015f205f8781526020019081526020015f20819055505b600a5f8781526020019081526020015f205f8681526020019081526020015f2054421115612e01576040517f50ec222700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060030160049054906101000a900460ff1680612e2c57508060030160059054906101000a900460ff165b15612e63576040517fbd77588f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160065f8881526020019081526020015f205f8781526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055508315612f1d57806003015f81819054906101000a900461ffff1680929190612efd90615707565b91906101000a81548161ffff021916908361ffff16021790555050612f5b565b80600301600281819054906101000a900461ffff1680929190612f3f90615707565b91906101000a81548161ffff021916908361ffff160217905550505b5f8160030160029054906101000a900461ffff16826003015f9054906101000a900461ffff16612f8b9190615696565b61ffff1690505f60085f8981526020019081526020015f205490508260030160049054906101000a900460ff16158015612fc55750808210155b15613086575f826064856003015f9054906101000a900461ffff16612fea91906156cb565b61ffff16612ff89190615538565b9050603360ff1681106130555760018460030160046101000a81548160ff02191690831515021790555087897f939da3b627c123c81fe5aacebf925163337a0d4f8a03724640618078cad2489460405160405180910390a3613084565b87897f4e2fd11f84344693b41d2aba9910e33b34a4f02d4d3a65b65b2201f3c8fa3c8960405160405180910390a35b505b3373ffffffffffffffffffffffffffffffffffffffff1687897f3ff40397b1f2a9b9b1de9005d111deb35664035aadef4e7a4df9d3a70e96a83989876003015f9054906101000a900461ffff168860030160029054906101000a900461ffff166040516130f593929190615730565b60405180910390a45050505050505050565b6007602052805f5260405f205f915054906101000a900460ff1681565b61016d81565b6305f5e10081565b62093a8081565b5f7f0000000000000000000000000000000000000000000000000000000000000000905090565b600381565b5f620151808461317591906154ca565b426131809190615568565b90505f84036131bb576040517fefb2a55500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61016d8411156131f7576040517f98fbdf7c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6305f5e100861015613235576040517ff60d673c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60c887511115613271576040517f197fcc6600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60c8855111156132ad576040517f87724cc200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6132b683613cec565b6132c08282613ef8565b5f6040518061010001604052808981526020018881526020015f81526020018381526020018781526020013373ffffffffffffffffffffffffffffffffffffffff1681526020015f600281111561331a576133196145b2565b5b81526020015f151581525090505f6001805490509050600182908060018154018082558091505060019003905f5260205f2090600602015f909190919091505f820151815f01908161336c91906158fc565b5060208201518160010155604082015181600201556060820151816003015560808201518160040190816133a091906158fc565b5060a0820151816005015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160050160146101000a81548160ff02191690836002811115613412576134116145b2565b5b021790555060e08201518160050160156101000a81548160ff02191690831515021790555050505f60035f8381526020019081526020015f2090505f865190505f5f90505b818110156134f657828882815181106134735761347261543d565b5b6020026020010151908060018154018082558091505060019003905f5260205f2090600502015f909190919091505f820151815f0190816134b491906158fc565b5060208201518160010190816134ca91906158fc565b506040820151816002015560608201518160030155608082015181600401555050806001019050613457565b505f865190505f5f90505b818110156136b0575f6040518060e001604052808a84815181106135285761352761543d565b5b60200260200101515f015181526020018a848151811061354b5761354a61543d565b5b60200260200101516020015160ff1681526020018a84815181106135725761357161543d565b5b60200260200101516040015181526020015f61ffff1681526020015f61ffff1681526020015f151581526020015f1515815250905060045f8781526020019081526020015f2081908060018154018082558091505060019003905f5260205f2090600402015f909190919091505f820151815f0190816135f291906158fc565b506020820151816001015f6101000a81548160ff021916908360ff160217905550604082015181600201556060820151816003015f6101000a81548161ffff021916908361ffff16021790555060808201518160030160026101000a81548161ffff021916908361ffff16021790555060a08201518160030160046101000a81548160ff02191690831515021790555060c08201518160030160056101000a81548160ff021916908315150217905550505050806001019050613501565b503373ffffffffffffffffffffffffffffffffffffffff16847fdc26653af5b99b2da33e2ad69ee6600d9aeccc82b034501db4338309615ca2388e8e8a6040516136fc939291906159cb565b60405180910390a3505050505050505050505050565b6060816001805490508110613753576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60035f8481526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b828210156138f0578382905f5260205f2090600502016040518060a00160405290815f820180546137b39061540d565b80601f01602080910402602001604051908101604052809291908181526020018280546137df9061540d565b801561382a5780601f106138015761010080835404028352916020019161382a565b820191905f5260205f20905b81548152906001019060200180831161380d57829003601f168201915b505050505081526020016001820180546138439061540d565b80601f016020809104026020016040519081016040528092919081815260200182805461386f9061540d565b80156138ba5780601f10613891576101008083540402835291602001916138ba565b820191905f5260205f20905b81548152906001019060200180831161389d57829003601f168201915b50505050508152602001600282015481526020016003820154815260200160048201548152505081526020019060010190613783565b50505050915050919050565b5f82600180549050811061393c576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60095f8581526020019081526020015f205f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205491505092915050565b6006602052825f5260405f20602052815f5260405f20602052805f5260405f205f92509250509054906101000a900460ff1681565b6060816001805490508110613a08576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045f8481526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b82821015613b92578382905f5260205f2090600402016040518060e00160405290815f82018054613a689061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054613a949061540d565b8015613adf5780601f10613ab657610100808354040283529160200191613adf565b820191905f5260205f20905b815481529060010190602001808311613ac257829003601f168201915b50505050508152602001600182015f9054906101000a900460ff1660ff1660ff16815260200160028201548152602001600382015f9054906101000a900461ffff1661ffff1661ffff1681526020016003820160029054906101000a900461ffff1661ffff1661ffff1681526020016003820160049054906101000a900460ff161515151581526020016003820160059054906101000a900460ff16151515158152505081526020019060010190613a38565b50505050915050919050565b60025f5403613bd9576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60025f81905550565b613c5c838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401613c15929190615a07565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506141e9565b505050565b60015f81905550565b613ce6848573ffffffffffffffffffffffffffffffffffffffff166323b872dd868686604051602401613c9f93929190615a2e565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506141e9565b50505050565b600160ff1681511080613d035750600560ff168151115b15613d3a576040517feb006cc300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f815190505f5f90505b81811015613ef35760c8838281518110613d6157613d6061543d565b5b60200260200101515f0151511115613da5576040517f19ae67ea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60c8838281518110613dba57613db961543d565b5b602002602001015160200151511115613dff576040517f19ae67ea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b62989680838281518110613e1657613e1561543d565b5b6020026020010151604001511015613e5a576040517f8720bc8300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f81118015613eb1575082600182613e729190615497565b81518110613e8357613e8261543d565b5b602002602001015160400151838281518110613ea257613ea161543d565b5b60200260200101516040015111155b15613ee8576040517f1779c61d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806001019050613d44565b505050565b600260ff1682511080613f0f5750600560ff168251115b15613f46576040517f852319a800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5f90505f835190505f5f90505b818110156141a85760c8858281518110613f7157613f7061543d565b5b60200260200101515f0151511115613fb5576040517f19ae67ea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600a60ff16858281518110613fcd57613fcc61543d565b5b60200260200101516020015160ff161015614014576040517fee5759d400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8481815181106140275761402661543d565b5b60200260200101516020015160ff16836140419190615568565b9250838582815181106140575761405661543d565b5b6020026020010151604001511161409a576040517f48317e3e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6201518061016d6140ab91906154ca565b846140b69190615568565b8582815181106140c9576140c861543d565b5b602002602001015160400151111561410d576040517f5da0c79600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f811180156141645750846001826141259190615497565b815181106141365761413561543d565b5b6020026020010151604001518582815181106141555761415461543d565b5b60200260200101516040015111155b1561419b576040517f48317e3e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8080600101915050613f54565b50606482146141e3576040517fb85922df00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b5f5f60205f8451602086015f885af180614208576040513d5f823e3d81fd5b3d92505f519150505f821461422157600181141561423c565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b1561427e57836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401614275919061499f565b60405180910390fd5b50505050565b604051806101000160405280606081526020015f81526020015f81526020015f8152602001606081526020015f73ffffffffffffffffffffffffffffffffffffffff1681526020015f60028111156142df576142de6145b2565b5b81526020015f151581525090565b6040518060e00160405280606081526020015f60ff1681526020015f81526020015f61ffff1681526020015f61ffff1681526020015f151581526020015f151581525090565b5f60ff82169050919050565b61434881614333565b82525050565b5f6020820190506143615f83018461433f565b92915050565b5f604051905090565b5f5ffd5b5f5ffd5b5f819050919050565b61438a81614378565b8114614394575f5ffd5b50565b5f813590506143a581614381565b92915050565b5f602082840312156143c0576143bf614370565b5b5f6143cd84828501614397565b91505092915050565b6143df81614378565b82525050565b5f6020820190506143f85f8301846143d6565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f614427826143fe565b9050919050565b6144378161441d565b8114614441575f5ffd5b50565b5f813590506144528161442e565b92915050565b5f5f6040838503121561446e5761446d614370565b5b5f61447b85828601614397565b925050602061448c85828601614444565b9150509250929050565b5f5f604083850312156144ac576144ab614370565b5b5f6144b985828601614397565b92505060206144ca85828601614397565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f614516826144d4565b61452081856144de565b93506145308185602086016144ee565b614539816144fc565b840191505092915050565b5f60a0820190508181035f83015261455c818861450c565b90508181036020830152614570818761450c565b905061457f60408301866143d6565b61458c60608301856143d6565b61459960808301846143d6565b9695505050505050565b6145ac8161441d565b82525050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602160045260245ffd5b600381106145f0576145ef6145b2565b5b50565b5f819050614600826145df565b919050565b5f61460f826145f3565b9050919050565b61461f81614605565b82525050565b5f8115159050919050565b61463981614625565b82525050565b5f610100820190508181035f830152614658818b61450c565b9050614667602083018a6143d6565b61467460408301896143d6565b61468160608301886143d6565b8181036080830152614693818761450c565b90506146a260a08301866145a3565b6146af60c0830185614616565b6146bc60e0830184614630565b9998505050505050505050565b5f61ffff82169050919050565b6146df816146c9565b82525050565b5f60e0820190508181035f8301526146fd818a61450c565b905061470c602083018961433f565b61471960408301886143d6565b61472660608301876146d6565b61473360808301866146d6565b61474060a0830185614630565b61474d60c0830184614630565b98975050505050505050565b5f819050919050565b5f61477c614777614772846143fe565b614759565b6143fe565b9050919050565b5f61478d82614762565b9050919050565b5f61479e82614783565b9050919050565b6147ae81614794565b82525050565b5f6020820190506147c75f8301846147a5565b92915050565b5f82825260208201905092915050565b5f6147e7826144d4565b6147f181856147cd565b93506148018185602086016144ee565b61480a816144fc565b840191505092915050565b61481e81614378565b82525050565b61482d8161441d565b82525050565b61483c81614605565b82525050565b61484b81614625565b82525050565b5f61010083015f8301518482035f86015261486c82826147dd565b91505060208301516148816020860182614815565b5060408301516148946040860182614815565b5060608301516148a76060860182614815565b50608083015184820360808601526148bf82826147dd565b91505060a08301516148d460a0860182614824565b5060c08301516148e760c0860182614833565b5060e08301516148fa60e0860182614842565b508091505092915050565b5f6020820190508181035f83015261491d8184614851565b905092915050565b61492e81614333565b8114614938575f5ffd5b50565b5f8135905061494981614925565b92915050565b5f5f5f6060848603121561496657614965614370565b5b5f61497386828701614397565b935050602061498486828701614397565b92505060406149958682870161493b565b9150509250925092565b5f6020820190506149b25f8301846145a3565b92915050565b6149c181614333565b82525050565b6149d0816146c9565b82525050565b5f60e083015f8301518482035f8601526149f082826147dd565b9150506020830151614a0560208601826149b8565b506040830151614a186040860182614815565b506060830151614a2b60608601826149c7565b506080830151614a3e60808601826149c7565b5060a0830151614a5160a0860182614842565b5060c0830151614a6460c0860182614842565b508091505092915050565b5f6020820190508181035f830152614a8781846149d6565b905092915050565b614a9881614625565b8114614aa2575f5ffd5b50565b5f81359050614ab381614a8f565b92915050565b5f5f5f60608486031215614ad057614acf614370565b5b5f614add86828701614397565b9350506020614aee86828701614397565b9250506040614aff86828701614aa5565b9150509250925092565b5f602082019050614b1c5f830184614630565b92915050565b5f5ffd5b5f5ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b614b60826144fc565b810181811067ffffffffffffffff82111715614b7f57614b7e614b2a565b5b80604052505050565b5f614b91614367565b9050614b9d8282614b57565b919050565b5f67ffffffffffffffff821115614bbc57614bbb614b2a565b5b614bc5826144fc565b9050602081019050919050565b828183375f83830152505050565b5f614bf2614bed84614ba2565b614b88565b905082815260208101848484011115614c0e57614c0d614b26565b5b614c19848285614bd2565b509392505050565b5f82601f830112614c3557614c34614b22565b5b8135614c45848260208601614be0565b91505092915050565b5f67ffffffffffffffff821115614c6857614c67614b2a565b5b602082029050602081019050919050565b5f5ffd5b5f5ffd5b5f5ffd5b5f60a08284031215614c9a57614c99614c7d565b5b614ca460a0614b88565b90505f82013567ffffffffffffffff811115614cc357614cc2614c81565b5b614ccf84828501614c21565b5f83015250602082013567ffffffffffffffff811115614cf257614cf1614c81565b5b614cfe84828501614c21565b6020830152506040614d1284828501614397565b6040830152506060614d2684828501614397565b6060830152506080614d3a84828501614397565b60808301525092915050565b5f614d58614d5384614c4e565b614b88565b90508083825260208201905060208402830185811115614d7b57614d7a614c79565b5b835b81811015614dc257803567ffffffffffffffff811115614da057614d9f614b22565b5b808601614dad8982614c85565b85526020850194505050602081019050614d7d565b5050509392505050565b5f82601f830112614de057614ddf614b22565b5b8135614df0848260208601614d46565b91505092915050565b5f67ffffffffffffffff821115614e1357614e12614b2a565b5b602082029050602081019050919050565b614e2d816146c9565b8114614e37575f5ffd5b50565b5f81359050614e4881614e24565b92915050565b5f60e08284031215614e6357614e62614c7d565b5b614e6d60e0614b88565b90505f82013567ffffffffffffffff811115614e8c57614e8b614c81565b5b614e9884828501614c21565b5f830152506020614eab8482850161493b565b6020830152506040614ebf84828501614397565b6040830152506060614ed384828501614e3a565b6060830152506080614ee784828501614e3a565b60808301525060a0614efb84828501614aa5565b60a08301525060c0614f0f84828501614aa5565b60c08301525092915050565b5f614f2d614f2884614df9565b614b88565b90508083825260208201905060208402830185811115614f5057614f4f614c79565b5b835b81811015614f9757803567ffffffffffffffff811115614f7557614f74614b22565b5b808601614f828982614e4e565b85526020850194505050602081019050614f52565b5050509392505050565b5f82601f830112614fb557614fb4614b22565b5b8135614fc5848260208601614f1b565b91505092915050565b5f5f5f5f5f5f60c08789031215614fe857614fe7614370565b5b5f87013567ffffffffffffffff81111561500557615004614374565b5b61501189828a01614c21565b965050602061502289828a01614397565b955050604087013567ffffffffffffffff81111561504357615042614374565b5b61504f89828a01614c21565b945050606061506089828a01614397565b935050608087013567ffffffffffffffff81111561508157615080614374565b5b61508d89828a01614dcc565b92505060a087013567ffffffffffffffff8111156150ae576150ad614374565b5b6150ba89828a01614fa1565b9150509295509295509295565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f60a083015f8301518482035f86015261510a82826147dd565b9150506020830151848203602086015261512482826147dd565b91505060408301516151396040860182614815565b50606083015161514c6060860182614815565b50608083015161515f6080860182614815565b508091505092915050565b5f61517583836150f0565b905092915050565b5f602082019050919050565b5f615193826150c7565b61519d81856150d1565b9350836020820285016151af856150e1565b805f5b858110156151ea57848403895281516151cb858261516a565b94506151d68361517d565b925060208a019950506001810190506151b2565b50829750879550505050505092915050565b5f6020820190508181035f8301526152148184615189565b905092915050565b5f5f5f6060848603121561523357615232614370565b5b5f61524086828701614397565b935050602061525186828701614397565b925050604061526286828701614444565b9150509250925092565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f60e083015f8301518482035f8601526152af82826147dd565b91505060208301516152c460208601826149b8565b5060408301516152d76040860182614815565b5060608301516152ea60608601826149c7565b5060808301516152fd60808601826149c7565b5060a083015161531060a0860182614842565b5060c083015161532360c0860182614842565b508091505092915050565b5f6153398383615295565b905092915050565b5f602082019050919050565b5f6153578261526c565b6153618185615276565b93508360208202850161537385615286565b805f5b858110156153ae578484038952815161538f858261532e565b945061539a83615341565b925060208a01995050600181019050615376565b50829750879550505050505092915050565b5f6020820190508181035f8301526153d8818461534d565b905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061542457607f821691505b602082108103615437576154366153e0565b5b50919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6154a182614378565b91506154ac83614378565b92508282039050818111156154c4576154c361546a565b5b92915050565b5f6154d482614378565b91506154df83614378565b92508282026154ed81614378565b915082820484148315176155045761550361546a565b5b5092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f61554282614378565b915061554d83614378565b92508261555d5761555c61550b565b5b828204905092915050565b5f61557282614378565b915061557d83614378565b92508282019050808211156155955761559461546a565b5b92915050565b5f6040820190506155ae5f8301856143d6565b6155bb60208301846143d6565b9392505050565b5f6040820190506155d55f8301856145a3565b6155e260208301846145a3565b9392505050565b5f815190506155f781614381565b92915050565b5f6020828403121561561257615611614370565b5b5f61561f848285016155e9565b91505092915050565b5f61563282614378565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036156645761566361546a565b5b600182019050919050565b5f61567982614378565b91505f820361568b5761568a61546a565b5b600182039050919050565b5f6156a0826146c9565b91506156ab836146c9565b9250828201905061ffff8111156156c5576156c461546a565b5b92915050565b5f6156d5826146c9565b91506156e0836146c9565b92508282026156ee816146c9565b9150808214615700576156ff61546a565b5b5092915050565b5f615711826146c9565b915061ffff82036157255761572461546a565b5b600182019050919050565b5f6060820190506157435f830186614630565b61575060208301856146d6565b61575d60408301846146d6565b949350505050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026157c17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82615786565b6157cb8683615786565b95508019841693508086168417925050509392505050565b5f6157fd6157f86157f384614378565b614759565b614378565b9050919050565b5f819050919050565b615816836157e3565b61582a61582282615804565b848454615792565b825550505050565b5f5f905090565b615841615832565b61584c81848461580d565b505050565b5b8181101561586f576158645f82615839565b600181019050615852565b5050565b601f8211156158b45761588581615765565b61588e84615777565b8101602085101561589d578190505b6158b16158a985615777565b830182615851565b50505b505050565b5f82821c905092915050565b5f6158d45f19846008026158b9565b1980831691505092915050565b5f6158ec83836158c5565b9150826002028217905092915050565b615905826144d4565b67ffffffffffffffff81111561591e5761591d614b2a565b5b615928825461540d565b615933828285615873565b5f60209050601f831160018114615964575f8415615952578287015190505b61595c85826158e1565b8655506159c3565b601f19841661597286615765565b5f5b8281101561599957848901518255600182019150602085019450602081019050615974565b868310156159b657848901516159b2601f8916826158c5565b8355505b6001600288020188555050505b505050505050565b5f6060820190508181035f8301526159e3818661450c565b90506159f260208301856143d6565b6159ff60408301846143d6565b949350505050565b5f604082019050615a1a5f8301856145a3565b615a2760208301846143d6565b9392505050565b5f606082019050615a415f8301866145a3565b615a4e60208301856145a3565b615a5b60408301846143d6565b94935050505056fea264697066735822122043439a0bd16ddd425a9e04430e627ec299c7186dfb3e19bc0c82ce04b70e971c64736f6c634300081e0033",
        "sourceMap": "541:26619:31:-:0;;;6918:106;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;1857:1:29;2061:7;:21;;;;6970:10:31;6962:18;;;;;;;;;;7004:12;6990:27;;;;;;;;;;6918:106;541:26619;;88:117:33;197:1;194;187:12;334:126;371:7;411:42;404:5;400:54;389:65;;334:126;;;:::o;466:96::-;503:7;532:24;550:5;532:24;:::i;:::-;521:35;;466:96;;;:::o;568:122::-;641:24;659:5;641:24;:::i;:::-;634:5;631:35;621:63;;680:1;677;670:12;621:63;568:122;:::o;696:143::-;753:5;784:6;778:13;769:22;;800:33;827:5;800:33;:::i;:::-;696:143;;;;:::o;845:351::-;915:6;964:2;952:9;943:7;939:23;935:32;932:119;;;970:79;;:::i;:::-;932:119;1090:1;1115:64;1171:7;1162:6;1151:9;1147:22;1115:64;:::i;:::-;1105:74;;1061:128;845:351;;;;:::o;541:26619:31:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",
        "linkReferences": {}
    },
    "deployedBytecode": {
        "object": "0x608060405234801561000f575f5ffd5b506004361061027d575f3560e01c806362043bd81161015a578063918cb241116100cc578063c57981b511610085578063c57981b5146107dc578063d4ee247e146107fa578063d87c8c7f14610816578063e081dbf914610846578063e653dabd14610876578063f91e4b29146108a65761027d565b8063918cb24114610718578063932e109e1461073457806396c1d8f114610764578063a01a633d14610782578063b1610d7e146107a0578063bc06e81d146107be5761027d565b8063837160041161011e578063837160041461064257806388e951dd1461065e578063893d20e81461068e5780638c7bc838146106ac5780638da5cb5b146106ca5780638ed9895c146106e85761027d565b806362043bd81461059c5780636a4a340c146105ba5780636caa9218146105d857806377d6cf19146105f6578063797adde4146106125761027d565b80633ab34290116101f35780634a6a49f4116101b75780634a6a49f4146104c45780634c05abeb146104e25780635598f8cc14610500578063583fa50514610530578063587f5ed7146105605780635df45a371461057e5761027d565b80633ab34290146104325780633d891f59146104505780633de1bb15146104805780633e413bee1461049c578063476343ee146104ba5761027d565b80631d3c3603116102455780631d3c36031461036a578063278ecde1146103885780632e1a7d4d146103a45780633178492a146103c057806334ccc5ea146103f65780633a6600fe146104145761027d565b806307c3d4af14610281578063099107ad1461029f5780630e222a08146102cf578063108f9c0b146102ff578063141961bc14610333575b5f5ffd5b6102896108d6565b604051610296919061434e565b60405180910390f35b6102b960048036038101906102b491906143ab565b6108db565b6040516102c691906143e5565b60405180910390f35b6102e960048036038101906102e49190614458565b610935565b6040516102f6919061434e565b60405180910390f35b61031960048036038101906103149190614496565b61095f565b60405161032a959493929190614544565b60405180910390f35b61034d600480360381019061034891906143ab565b610ab7565b60405161036198979695949392919061463f565b60405180910390f35b610372610c4f565b60405161037f919061434e565b60405180910390f35b6103a2600480360381019061039d91906143ab565b610c54565b005b6103be60048036038101906103b991906143ab565b610f42565b005b6103da60048036038101906103d59190614496565b6112d9565b6040516103ed97969594939291906146e5565b60405180910390f35b6103fe6113f8565b60405161040b91906143e5565b60405180910390f35b61041c6113fd565b604051610429919061434e565b60405180910390f35b61043a611402565b604051610447919061434e565b60405180910390f35b61046a60048036038101906104659190614458565b611407565b60405161047791906143e5565b60405180910390f35b61049a60048036038101906104959190614496565b611427565b005b6104a461197c565b6040516104b191906147b4565b60405180910390f35b6104c26119a0565b005b6104cc611b59565b6040516104d9919061434e565b60405180910390f35b6104ea611b5e565b6040516104f7919061434e565b60405180910390f35b61051a600480360381019061051591906143ab565b611b63565b6040516105279190614905565b60405180910390f35b61054a60048036038101906105459190614496565b611dc6565b60405161055791906143e5565b60405180910390f35b610568611de6565b60405161057591906143e5565b60405180910390f35b610586611dec565b60405161059391906143e5565b60405180910390f35b6105a4611df5565b6040516105b191906143e5565b60405180910390f35b6105c2611dfa565b6040516105cf91906143e5565b60405180910390f35b6105e0611e01565b6040516105ed91906143e5565b60405180910390f35b610610600480360381019061060b919061494f565b611e0d565b005b61062c60048036038101906106279190614458565b6124c0565b60405161063991906143e5565b60405180910390f35b61065c60048036038101906106579190614496565b612565565b005b610678600480360381019061067391906143ab565b61281f565b60405161068591906143e5565b60405180910390f35b610696612834565b6040516106a3919061499f565b60405180910390f35b6106b461285b565b6040516106c191906143e5565b60405180910390f35b6106d2612861565b6040516106df919061499f565b60405180910390f35b61070260048036038101906106fd9190614496565b612885565b60405161070f9190614a6f565b60405180910390f35b610732600480360381019061072d9190614ab9565b612a86565b005b61074e600480360381019061074991906143ab565b613107565b60405161075b9190614b09565b60405180910390f35b61076c613124565b60405161077991906143e5565b60405180910390f35b61078a61312a565b60405161079791906143e5565b60405180910390f35b6107a8613132565b6040516107b591906143e5565b60405180910390f35b6107c6613139565b6040516107d3919061499f565b60405180910390f35b6107e4613160565b6040516107f191906143e5565b60405180910390f35b610814600480360381019061080f9190614fce565b613165565b005b610830600480360381019061082b91906143ab565b613712565b60405161083d91906151fc565b60405180910390f35b610860600480360381019061085b9190614458565b6138fc565b60405161086d91906143e5565b60405180910390f35b610890600480360381019061088b919061521c565b613992565b60405161089d9190614b09565b60405180910390f35b6108c060048036038101906108bb91906143ab565b6139c7565b6040516108cd91906153c0565b60405180910390f35b600581565b5f81600180549050811061091b576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60085f8481526020019081526020015f2054915050919050565b6005602052815f5260405f20602052805f5260405f205f915091509054906101000a900460ff1681565b6003602052815f5260405f208181548110610978575f80fd5b905f5260205f2090600502015f9150915050805f0180546109989061540d565b80601f01602080910402602001604051908101604052809291908181526020018280546109c49061540d565b8015610a0f5780601f106109e657610100808354040283529160200191610a0f565b820191905f5260205f20905b8154815290600101906020018083116109f257829003601f168201915b505050505090806001018054610a249061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054610a509061540d565b8015610a9b5780601f10610a7257610100808354040283529160200191610a9b565b820191905f5260205f20905b815481529060010190602001808311610a7e57829003601f168201915b5050505050908060020154908060030154908060040154905085565b60018181548110610ac6575f80fd5b905f5260205f2090600602015f91509050805f018054610ae59061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054610b119061540d565b8015610b5c5780601f10610b3357610100808354040283529160200191610b5c565b820191905f5260205f20905b815481529060010190602001808311610b3f57829003601f168201915b505050505090806001015490806002015490806003015490806004018054610b839061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054610baf9061540d565b8015610bfa5780601f10610bd157610100808354040283529160200191610bfa565b820191905f5260205f20905b815481529060010190602001808311610bdd57829003601f168201915b505050505090806005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050160149054906101000a900460ff16908060050160159054906101000a900460ff16905088565b600181565b610c5c613b9e565b806001805490508110610c9b576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60018381548110610cb057610caf61543d565b5b905f5260205f209060060201905080600301544211610cfb576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060020154816001015411610d3c576040517f40ea60d900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60095f8581526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490505f8103610dc5576040517fcba6f7ed00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60095f8681526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208190555080826002015f828254610e299190615497565b92505081905550600280811115610e4357610e426145b2565b5b8260050160149054906101000a900460ff166002811115610e6757610e666145b2565b5b14610e9a5760028260050160146101000a81548160ff02191690836002811115610e9457610e936145b2565b5b02179055505b610ee533827f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613be29092919063ffffffff16565b3373ffffffffffffffffffffffffffffffffffffffff16847f7c0c3709e95c5fe35b43c791adf5cef83416410f63319764e6e5bc218bd6e17f83604051610f2c91906143e5565b60405180910390a3505050610f3f613c61565b50565b610f4a613b9e565b806001805490508110610f89576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60018381548110610f9e57610f9d61543d565b5b905f5260205f20906006020190505f60045f8581526020019081526020015f20805490501115610ffa576040517f64c04fd800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16816005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611082576040517f9a3a410700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806003015442116110bf576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806002015481600101541115611101576040517fe71157f900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060050160159054906101000a900460ff161561114a576040517f8cd9548500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60646003836002015461115e91906154ca565b6111689190615538565b90505f81836002015461117b9190615497565b905060018360050160146101000a81548160ff021916908360028111156111a5576111a46145b2565b5b021790555060018360050160156101000a81548160ff0219169083151502179055505f83600201819055508160025f8282546111e19190615568565b92505081905550611256836005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16827f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613be29092919063ffffffff16565b826005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16857ff6855da62af7f8886a08b21d9396963710107b9819475543c2ab579138620bf883856040516112c292919061559b565b60405180910390a3505050506112d6613c61565b50565b6004602052815f5260405f2081815481106112f2575f80fd5b905f5260205f2090600402015f9150915050805f0180546113129061540d565b80601f016020809104026020016040519081016040528092919081815260200182805461133e9061540d565b80156113895780601f1061136057610100808354040283529160200191611389565b820191905f5260205f20905b81548152906001019060200180831161136c57829003601f168201915b505050505090806001015f9054906101000a900460ff1690806002015490806003015f9054906101000a900461ffff16908060030160029054906101000a900461ffff16908060030160049054906101000a900460ff16908060030160059054906101000a900460ff16905087565b60c881565b600a81565b603381565b6009602052815f5260405f20602052805f5260405f205f91509150505481565b61142f613b9e565b81600180549050811061146e576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600184815481106114835761148261543d565b5b905f5260205f209060060201905060045f8581526020019081526020015f208054905083106114de576040517ff1afccb200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60045f8681526020019081526020015f2084815481106115025761150161543d565b5b905f5260205f20906004020190503373ffffffffffffffffffffffffffffffffffffffff16826005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611598576040517f017ce7a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b816003015442116115d5576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b816001015482600201541015611617576040517fe71157f900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060030160049054906101000a900460ff1661165f576040517f11b9a30c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060030160059054906101000a900460ff16156116a8576040517f173aadf400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f841115611740575f5f90505b8481101561173e5760045f8781526020019081526020015f2081815481106116e0576116df61543d565b5b905f5260205f20906004020160030160059054906101000a900460ff16611733576040517f11b9a30c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060010190506116b5565b505b5f826002015490505f6064836001015f9054906101000a900460ff1660ff168361176a91906154ca565b6117749190615538565b90505f606460038361178691906154ca565b6117909190615538565b90505f818361179f9190615497565b905060018560030160056101000a81548160ff02191690831515021790555082866002015f8282546117d19190615497565b925050819055505f600190505f5f90505b60045f8c81526020019081526020015f20805490508110156118555760045f8c81526020019081526020015f2081815481106118215761182061543d565b5b905f5260205f20906004020160030160059054906101000a900460ff1661184a575f9150611855565b8060010190506117e2565b5080156118a75760018760050160146101000a81548160ff02191690836002811115611884576118836145b2565b5b021790555060018760050160156101000a81548160ff0219169083151502179055505b8260025f8282546118b89190615568565b9250508190555061192d876005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613be29092919063ffffffff16565b888a7f33c27824d686c889fbd1a95ddd35a05f7c862e8e3f8d7ebb959f9b0db35f1ca0848660405161196092919061559b565b60405180910390a35050505050505050611978613c61565b5050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6119a8613b9e565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611a2d576040517f9a3a410700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60025403611a68576040517f412dcb5900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60025490505f600281905550611ae07f0000000000000000000000000000000000000000000000000000000000000000827f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613be29092919063ffffffff16565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff167fc0819c13be868895eb93e40eaceb96de976442fa1d404e5c55f14bb65a8c489a82604051611b4691906143e5565b60405180910390a250611b57613c61565b565b600281565b600581565b611b6b614284565b816001805490508110611baa576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018381548110611bbe57611bbd61543d565b5b905f5260205f209060060201604051806101000160405290815f82018054611be59061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054611c119061540d565b8015611c5c5780601f10611c3357610100808354040283529160200191611c5c565b820191905f5260205f20905b815481529060010190602001808311611c3f57829003601f168201915b50505050508152602001600182015481526020016002820154815260200160038201548152602001600482018054611c939061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054611cbf9061540d565b8015611d0a5780601f10611ce157610100808354040283529160200191611d0a565b820191905f5260205f20905b815481529060010190602001808311611ced57829003601f168201915b50505050508152602001600582015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016005820160149054906101000a900460ff166002811115611d8d57611d8c6145b2565b5b6002811115611d9f57611d9e6145b2565b5b81526020016005820160159054906101000a900460ff161515151581525050915050919050565b600a602052815f5260405f20602052805f5260405f205f91509150505481565b60025481565b5f600254905090565b606481565b6298968081565b5f600180549050905090565b611e15613b9e565b826001805490508110611e54576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60018581548110611e6957611e6861543d565b5b905f5260205f20906006020190503373ffffffffffffffffffffffffffffffffffffffff16816005015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603611eff576040517f4c7637b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060030154421115611f3d576040517fce4ecb8800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f8403611f76576040517ff3df71c500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60035f8681526020019081526020015f20805490508360ff1610611fc6576040517fa776a5a500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60035f8781526020019081526020015f208460ff1681548110611fed57611fec61543d565b5b905f5260205f20906005020190508060020154851015612039576040517fb385fa6100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f816003015411801561205457508060030154816004015410155b1561208b576040517f5fdb939700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b81526004016120e79291906155c2565b602060405180830381865afa158015612102573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061212691906155fd565b905085811015612162576040517fb3f6223d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5f60095f8a81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20541490506122013330897f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613c6a909392919063ffffffff16565b86846002015f8282546122149190615568565b925050819055508660095f8a81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546122769190615568565b92505081905550801561232b578560055f8a81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff021916908360ff160217905550826004015f8154809291906122fb90615628565b919050555060085f8981526020019081526020015f205f81548092919061232190615628565b919050555061245f565b5f60055f8a81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1690508060ff168760ff16111561245d5760035f8a81526020019081526020015f208160ff16815481106123bb576123ba61543d565b5b905f5260205f2090600502016004015f8154809291906123da9061566f565b91905055508660055f8b81526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff021916908360ff160217905550836004015f81548092919061245790615628565b91905055505b505b3373ffffffffffffffffffffffffffffffffffffffff16887f9f0a129b85334ce6dc53da0a3aaafaacdce8b4704cc424c4835d88f4371cb716896040516124a691906143e5565b60405180910390a350505050506124bb613c61565b505050565b5f826001805490508110612500576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60055f8581526020019081526020015f205f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1660ff1691505092915050565b8160018054905081106125a4576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045f8481526020019081526020015f208054905082106125f1576040517ff1afccb200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60045f8581526020019081526020015f2083815481106126155761261461543d565b5b905f5260205f20906004020190508060030160049054906101000a900460ff168061264e57508060030160059054906101000a900460ff165b15612685576040517fbd77588f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600a5f8681526020019081526020015f205f8581526020019081526020015f205490505f8114806126b657508042105b156126ed576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f8260030160029054906101000a900461ffff16836003015f9054906101000a900461ffff1661271d9190615696565b61ffff1690505f810361275c576040517feef41eef00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f816064856003015f9054906101000a900461ffff1661277c91906156cb565b61ffff1661278a9190615538565b9050603360ff1681106127e75760018460030160046101000a81548160ff02191690831515021790555085877f939da3b627c123c81fe5aacebf925163337a0d4f8a03724640618078cad2489460405160405180910390a3612816565b85877f4e2fd11f84344693b41d2aba9910e33b34a4f02d4d3a65b65b2201f3c8fa3c8960405160405180910390a35b50505050505050565b6008602052805f5260405f205f915090505481565b5f7f0000000000000000000000000000000000000000000000000000000000000000905090565b61016d81565b7f000000000000000000000000000000000000000000000000000000000000000081565b61288d6142ed565b8260018054905081106128cc576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045f8581526020019081526020015f20805490508310612919576040517ff1afccb200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045f8581526020019081526020015f20838154811061293c5761293b61543d565b5b905f5260205f2090600402016040518060e00160405290815f820180546129629061540d565b80601f016020809104026020016040519081016040528092919081815260200182805461298e9061540d565b80156129d95780601f106129b0576101008083540402835291602001916129d9565b820191905f5260205f20905b8154815290600101906020018083116129bc57829003601f168201915b50505050508152602001600182015f9054906101000a900460ff1660ff1660ff16815260200160028201548152602001600382015f9054906101000a900461ffff1661ffff1661ffff1681526020016003820160029054906101000a900461ffff1661ffff1661ffff1681526020016003820160049054906101000a900460ff161515151581526020016003820160059054906101000a900460ff16151515158152505091505092915050565b826001805490508110612ac5576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60018581548110612ada57612ad961543d565b5b905f5260205f209060060201905060045f8681526020019081526020015f20805490508410612b35576040517ff1afccb200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f60045f8781526020019081526020015f208581548110612b5957612b5861543d565b5b905f5260205f20906004020190505f60095f8881526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205403612bec576040517f3d38c2b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60065f8781526020019081526020015f205f8681526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1615612c8b576040517f3a51598200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81600301544211612cc8576040517fffe9d8b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b816001015482600201541015612d0a576040517fe71157f900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060020154421015612d48576040517f0c08306200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600a5f8881526020019081526020015f205f8781526020019081526020015f205403612da75762093a808160020154612d829190615568565b600a5f8881526020019081526020015f205f8781526020019081526020015f20819055505b600a5f8781526020019081526020015f205f8681526020019081526020015f2054421115612e01576040517f50ec222700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060030160049054906101000a900460ff1680612e2c57508060030160059054906101000a900460ff165b15612e63576040517fbd77588f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160065f8881526020019081526020015f205f8781526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055508315612f1d57806003015f81819054906101000a900461ffff1680929190612efd90615707565b91906101000a81548161ffff021916908361ffff16021790555050612f5b565b80600301600281819054906101000a900461ffff1680929190612f3f90615707565b91906101000a81548161ffff021916908361ffff160217905550505b5f8160030160029054906101000a900461ffff16826003015f9054906101000a900461ffff16612f8b9190615696565b61ffff1690505f60085f8981526020019081526020015f205490508260030160049054906101000a900460ff16158015612fc55750808210155b15613086575f826064856003015f9054906101000a900461ffff16612fea91906156cb565b61ffff16612ff89190615538565b9050603360ff1681106130555760018460030160046101000a81548160ff02191690831515021790555087897f939da3b627c123c81fe5aacebf925163337a0d4f8a03724640618078cad2489460405160405180910390a3613084565b87897f4e2fd11f84344693b41d2aba9910e33b34a4f02d4d3a65b65b2201f3c8fa3c8960405160405180910390a35b505b3373ffffffffffffffffffffffffffffffffffffffff1687897f3ff40397b1f2a9b9b1de9005d111deb35664035aadef4e7a4df9d3a70e96a83989876003015f9054906101000a900461ffff168860030160029054906101000a900461ffff166040516130f593929190615730565b60405180910390a45050505050505050565b6007602052805f5260405f205f915054906101000a900460ff1681565b61016d81565b6305f5e10081565b62093a8081565b5f7f0000000000000000000000000000000000000000000000000000000000000000905090565b600381565b5f620151808461317591906154ca565b426131809190615568565b90505f84036131bb576040517fefb2a55500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61016d8411156131f7576040517f98fbdf7c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6305f5e100861015613235576040517ff60d673c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60c887511115613271576040517f197fcc6600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60c8855111156132ad576040517f87724cc200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6132b683613cec565b6132c08282613ef8565b5f6040518061010001604052808981526020018881526020015f81526020018381526020018781526020013373ffffffffffffffffffffffffffffffffffffffff1681526020015f600281111561331a576133196145b2565b5b81526020015f151581525090505f6001805490509050600182908060018154018082558091505060019003905f5260205f2090600602015f909190919091505f820151815f01908161336c91906158fc565b5060208201518160010155604082015181600201556060820151816003015560808201518160040190816133a091906158fc565b5060a0820151816005015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160050160146101000a81548160ff02191690836002811115613412576134116145b2565b5b021790555060e08201518160050160156101000a81548160ff02191690831515021790555050505f60035f8381526020019081526020015f2090505f865190505f5f90505b818110156134f657828882815181106134735761347261543d565b5b6020026020010151908060018154018082558091505060019003905f5260205f2090600502015f909190919091505f820151815f0190816134b491906158fc565b5060208201518160010190816134ca91906158fc565b506040820151816002015560608201518160030155608082015181600401555050806001019050613457565b505f865190505f5f90505b818110156136b0575f6040518060e001604052808a84815181106135285761352761543d565b5b60200260200101515f015181526020018a848151811061354b5761354a61543d565b5b60200260200101516020015160ff1681526020018a84815181106135725761357161543d565b5b60200260200101516040015181526020015f61ffff1681526020015f61ffff1681526020015f151581526020015f1515815250905060045f8781526020019081526020015f2081908060018154018082558091505060019003905f5260205f2090600402015f909190919091505f820151815f0190816135f291906158fc565b506020820151816001015f6101000a81548160ff021916908360ff160217905550604082015181600201556060820151816003015f6101000a81548161ffff021916908361ffff16021790555060808201518160030160026101000a81548161ffff021916908361ffff16021790555060a08201518160030160046101000a81548160ff02191690831515021790555060c08201518160030160056101000a81548160ff021916908315150217905550505050806001019050613501565b503373ffffffffffffffffffffffffffffffffffffffff16847fdc26653af5b99b2da33e2ad69ee6600d9aeccc82b034501db4338309615ca2388e8e8a6040516136fc939291906159cb565b60405180910390a3505050505050505050505050565b6060816001805490508110613753576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60035f8481526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b828210156138f0578382905f5260205f2090600502016040518060a00160405290815f820180546137b39061540d565b80601f01602080910402602001604051908101604052809291908181526020018280546137df9061540d565b801561382a5780601f106138015761010080835404028352916020019161382a565b820191905f5260205f20905b81548152906001019060200180831161380d57829003601f168201915b505050505081526020016001820180546138439061540d565b80601f016020809104026020016040519081016040528092919081815260200182805461386f9061540d565b80156138ba5780601f10613891576101008083540402835291602001916138ba565b820191905f5260205f20905b81548152906001019060200180831161389d57829003601f168201915b50505050508152602001600282015481526020016003820154815260200160048201548152505081526020019060010190613783565b50505050915050919050565b5f82600180549050811061393c576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60095f8581526020019081526020015f205f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205491505092915050565b6006602052825f5260405f20602052815f5260405f20602052805f5260405f205f92509250509054906101000a900460ff1681565b6060816001805490508110613a08576040517f5259f15000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60045f8481526020019081526020015f20805480602002602001604051908101604052809291908181526020015f905b82821015613b92578382905f5260205f2090600402016040518060e00160405290815f82018054613a689061540d565b80601f0160208091040260200160405190810160405280929190818152602001828054613a949061540d565b8015613adf5780601f10613ab657610100808354040283529160200191613adf565b820191905f5260205f20905b815481529060010190602001808311613ac257829003601f168201915b50505050508152602001600182015f9054906101000a900460ff1660ff1660ff16815260200160028201548152602001600382015f9054906101000a900461ffff1661ffff1661ffff1681526020016003820160029054906101000a900461ffff1661ffff1661ffff1681526020016003820160049054906101000a900460ff161515151581526020016003820160059054906101000a900460ff16151515158152505081526020019060010190613a38565b50505050915050919050565b60025f5403613bd9576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60025f81905550565b613c5c838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401613c15929190615a07565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506141e9565b505050565b60015f81905550565b613ce6848573ffffffffffffffffffffffffffffffffffffffff166323b872dd868686604051602401613c9f93929190615a2e565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506141e9565b50505050565b600160ff1681511080613d035750600560ff168151115b15613d3a576040517feb006cc300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f815190505f5f90505b81811015613ef35760c8838281518110613d6157613d6061543d565b5b60200260200101515f0151511115613da5576040517f19ae67ea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60c8838281518110613dba57613db961543d565b5b602002602001015160200151511115613dff576040517f19ae67ea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b62989680838281518110613e1657613e1561543d565b5b6020026020010151604001511015613e5a576040517f8720bc8300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f81118015613eb1575082600182613e729190615497565b81518110613e8357613e8261543d565b5b602002602001015160400151838281518110613ea257613ea161543d565b5b60200260200101516040015111155b15613ee8576040517f1779c61d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806001019050613d44565b505050565b600260ff1682511080613f0f5750600560ff168251115b15613f46576040517f852319a800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f5f90505f835190505f5f90505b818110156141a85760c8858281518110613f7157613f7061543d565b5b60200260200101515f0151511115613fb5576040517f19ae67ea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600a60ff16858281518110613fcd57613fcc61543d565b5b60200260200101516020015160ff161015614014576040517fee5759d400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8481815181106140275761402661543d565b5b60200260200101516020015160ff16836140419190615568565b9250838582815181106140575761405661543d565b5b6020026020010151604001511161409a576040517f48317e3e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6201518061016d6140ab91906154ca565b846140b69190615568565b8582815181106140c9576140c861543d565b5b602002602001015160400151111561410d576040517f5da0c79600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f811180156141645750846001826141259190615497565b815181106141365761413561543d565b5b6020026020010151604001518582815181106141555761415461543d565b5b60200260200101516040015111155b1561419b576040517f48317e3e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8080600101915050613f54565b50606482146141e3576040517fb85922df00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b5f5f60205f8451602086015f885af180614208576040513d5f823e3d81fd5b3d92505f519150505f821461422157600181141561423c565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b1561427e57836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401614275919061499f565b60405180910390fd5b50505050565b604051806101000160405280606081526020015f81526020015f81526020015f8152602001606081526020015f73ffffffffffffffffffffffffffffffffffffffff1681526020015f60028111156142df576142de6145b2565b5b81526020015f151581525090565b6040518060e00160405280606081526020015f60ff1681526020015f81526020015f61ffff1681526020015f61ffff1681526020015f151581526020015f151581525090565b5f60ff82169050919050565b61434881614333565b82525050565b5f6020820190506143615f83018461433f565b92915050565b5f604051905090565b5f5ffd5b5f5ffd5b5f819050919050565b61438a81614378565b8114614394575f5ffd5b50565b5f813590506143a581614381565b92915050565b5f602082840312156143c0576143bf614370565b5b5f6143cd84828501614397565b91505092915050565b6143df81614378565b82525050565b5f6020820190506143f85f8301846143d6565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f614427826143fe565b9050919050565b6144378161441d565b8114614441575f5ffd5b50565b5f813590506144528161442e565b92915050565b5f5f6040838503121561446e5761446d614370565b5b5f61447b85828601614397565b925050602061448c85828601614444565b9150509250929050565b5f5f604083850312156144ac576144ab614370565b5b5f6144b985828601614397565b92505060206144ca85828601614397565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f614516826144d4565b61452081856144de565b93506145308185602086016144ee565b614539816144fc565b840191505092915050565b5f60a0820190508181035f83015261455c818861450c565b90508181036020830152614570818761450c565b905061457f60408301866143d6565b61458c60608301856143d6565b61459960808301846143d6565b9695505050505050565b6145ac8161441d565b82525050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602160045260245ffd5b600381106145f0576145ef6145b2565b5b50565b5f819050614600826145df565b919050565b5f61460f826145f3565b9050919050565b61461f81614605565b82525050565b5f8115159050919050565b61463981614625565b82525050565b5f610100820190508181035f830152614658818b61450c565b9050614667602083018a6143d6565b61467460408301896143d6565b61468160608301886143d6565b8181036080830152614693818761450c565b90506146a260a08301866145a3565b6146af60c0830185614616565b6146bc60e0830184614630565b9998505050505050505050565b5f61ffff82169050919050565b6146df816146c9565b82525050565b5f60e0820190508181035f8301526146fd818a61450c565b905061470c602083018961433f565b61471960408301886143d6565b61472660608301876146d6565b61473360808301866146d6565b61474060a0830185614630565b61474d60c0830184614630565b98975050505050505050565b5f819050919050565b5f61477c614777614772846143fe565b614759565b6143fe565b9050919050565b5f61478d82614762565b9050919050565b5f61479e82614783565b9050919050565b6147ae81614794565b82525050565b5f6020820190506147c75f8301846147a5565b92915050565b5f82825260208201905092915050565b5f6147e7826144d4565b6147f181856147cd565b93506148018185602086016144ee565b61480a816144fc565b840191505092915050565b61481e81614378565b82525050565b61482d8161441d565b82525050565b61483c81614605565b82525050565b61484b81614625565b82525050565b5f61010083015f8301518482035f86015261486c82826147dd565b91505060208301516148816020860182614815565b5060408301516148946040860182614815565b5060608301516148a76060860182614815565b50608083015184820360808601526148bf82826147dd565b91505060a08301516148d460a0860182614824565b5060c08301516148e760c0860182614833565b5060e08301516148fa60e0860182614842565b508091505092915050565b5f6020820190508181035f83015261491d8184614851565b905092915050565b61492e81614333565b8114614938575f5ffd5b50565b5f8135905061494981614925565b92915050565b5f5f5f6060848603121561496657614965614370565b5b5f61497386828701614397565b935050602061498486828701614397565b92505060406149958682870161493b565b9150509250925092565b5f6020820190506149b25f8301846145a3565b92915050565b6149c181614333565b82525050565b6149d0816146c9565b82525050565b5f60e083015f8301518482035f8601526149f082826147dd565b9150506020830151614a0560208601826149b8565b506040830151614a186040860182614815565b506060830151614a2b60608601826149c7565b506080830151614a3e60808601826149c7565b5060a0830151614a5160a0860182614842565b5060c0830151614a6460c0860182614842565b508091505092915050565b5f6020820190508181035f830152614a8781846149d6565b905092915050565b614a9881614625565b8114614aa2575f5ffd5b50565b5f81359050614ab381614a8f565b92915050565b5f5f5f60608486031215614ad057614acf614370565b5b5f614add86828701614397565b9350506020614aee86828701614397565b9250506040614aff86828701614aa5565b9150509250925092565b5f602082019050614b1c5f830184614630565b92915050565b5f5ffd5b5f5ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b614b60826144fc565b810181811067ffffffffffffffff82111715614b7f57614b7e614b2a565b5b80604052505050565b5f614b91614367565b9050614b9d8282614b57565b919050565b5f67ffffffffffffffff821115614bbc57614bbb614b2a565b5b614bc5826144fc565b9050602081019050919050565b828183375f83830152505050565b5f614bf2614bed84614ba2565b614b88565b905082815260208101848484011115614c0e57614c0d614b26565b5b614c19848285614bd2565b509392505050565b5f82601f830112614c3557614c34614b22565b5b8135614c45848260208601614be0565b91505092915050565b5f67ffffffffffffffff821115614c6857614c67614b2a565b5b602082029050602081019050919050565b5f5ffd5b5f5ffd5b5f5ffd5b5f60a08284031215614c9a57614c99614c7d565b5b614ca460a0614b88565b90505f82013567ffffffffffffffff811115614cc357614cc2614c81565b5b614ccf84828501614c21565b5f83015250602082013567ffffffffffffffff811115614cf257614cf1614c81565b5b614cfe84828501614c21565b6020830152506040614d1284828501614397565b6040830152506060614d2684828501614397565b6060830152506080614d3a84828501614397565b60808301525092915050565b5f614d58614d5384614c4e565b614b88565b90508083825260208201905060208402830185811115614d7b57614d7a614c79565b5b835b81811015614dc257803567ffffffffffffffff811115614da057614d9f614b22565b5b808601614dad8982614c85565b85526020850194505050602081019050614d7d565b5050509392505050565b5f82601f830112614de057614ddf614b22565b5b8135614df0848260208601614d46565b91505092915050565b5f67ffffffffffffffff821115614e1357614e12614b2a565b5b602082029050602081019050919050565b614e2d816146c9565b8114614e37575f5ffd5b50565b5f81359050614e4881614e24565b92915050565b5f60e08284031215614e6357614e62614c7d565b5b614e6d60e0614b88565b90505f82013567ffffffffffffffff811115614e8c57614e8b614c81565b5b614e9884828501614c21565b5f830152506020614eab8482850161493b565b6020830152506040614ebf84828501614397565b6040830152506060614ed384828501614e3a565b6060830152506080614ee784828501614e3a565b60808301525060a0614efb84828501614aa5565b60a08301525060c0614f0f84828501614aa5565b60c08301525092915050565b5f614f2d614f2884614df9565b614b88565b90508083825260208201905060208402830185811115614f5057614f4f614c79565b5b835b81811015614f9757803567ffffffffffffffff811115614f7557614f74614b22565b5b808601614f828982614e4e565b85526020850194505050602081019050614f52565b5050509392505050565b5f82601f830112614fb557614fb4614b22565b5b8135614fc5848260208601614f1b565b91505092915050565b5f5f5f5f5f5f60c08789031215614fe857614fe7614370565b5b5f87013567ffffffffffffffff81111561500557615004614374565b5b61501189828a01614c21565b965050602061502289828a01614397565b955050604087013567ffffffffffffffff81111561504357615042614374565b5b61504f89828a01614c21565b945050606061506089828a01614397565b935050608087013567ffffffffffffffff81111561508157615080614374565b5b61508d89828a01614dcc565b92505060a087013567ffffffffffffffff8111156150ae576150ad614374565b5b6150ba89828a01614fa1565b9150509295509295509295565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f60a083015f8301518482035f86015261510a82826147dd565b9150506020830151848203602086015261512482826147dd565b91505060408301516151396040860182614815565b50606083015161514c6060860182614815565b50608083015161515f6080860182614815565b508091505092915050565b5f61517583836150f0565b905092915050565b5f602082019050919050565b5f615193826150c7565b61519d81856150d1565b9350836020820285016151af856150e1565b805f5b858110156151ea57848403895281516151cb858261516a565b94506151d68361517d565b925060208a019950506001810190506151b2565b50829750879550505050505092915050565b5f6020820190508181035f8301526152148184615189565b905092915050565b5f5f5f6060848603121561523357615232614370565b5b5f61524086828701614397565b935050602061525186828701614397565b925050604061526286828701614444565b9150509250925092565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f60e083015f8301518482035f8601526152af82826147dd565b91505060208301516152c460208601826149b8565b5060408301516152d76040860182614815565b5060608301516152ea60608601826149c7565b5060808301516152fd60808601826149c7565b5060a083015161531060a0860182614842565b5060c083015161532360c0860182614842565b508091505092915050565b5f6153398383615295565b905092915050565b5f602082019050919050565b5f6153578261526c565b6153618185615276565b93508360208202850161537385615286565b805f5b858110156153ae578484038952815161538f858261532e565b945061539a83615341565b925060208a01995050600181019050615376565b50829750879550505050505092915050565b5f6020820190508181035f8301526153d8818461534d565b905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061542457607f821691505b602082108103615437576154366153e0565b5b50919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6154a182614378565b91506154ac83614378565b92508282039050818111156154c4576154c361546a565b5b92915050565b5f6154d482614378565b91506154df83614378565b92508282026154ed81614378565b915082820484148315176155045761550361546a565b5b5092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f61554282614378565b915061554d83614378565b92508261555d5761555c61550b565b5b828204905092915050565b5f61557282614378565b915061557d83614378565b92508282019050808211156155955761559461546a565b5b92915050565b5f6040820190506155ae5f8301856143d6565b6155bb60208301846143d6565b9392505050565b5f6040820190506155d55f8301856145a3565b6155e260208301846145a3565b9392505050565b5f815190506155f781614381565b92915050565b5f6020828403121561561257615611614370565b5b5f61561f848285016155e9565b91505092915050565b5f61563282614378565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036156645761566361546a565b5b600182019050919050565b5f61567982614378565b91505f820361568b5761568a61546a565b5b600182039050919050565b5f6156a0826146c9565b91506156ab836146c9565b9250828201905061ffff8111156156c5576156c461546a565b5b92915050565b5f6156d5826146c9565b91506156e0836146c9565b92508282026156ee816146c9565b9150808214615700576156ff61546a565b5b5092915050565b5f615711826146c9565b915061ffff82036157255761572461546a565b5b600182019050919050565b5f6060820190506157435f830186614630565b61575060208301856146d6565b61575d60408301846146d6565b949350505050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026157c17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82615786565b6157cb8683615786565b95508019841693508086168417925050509392505050565b5f6157fd6157f86157f384614378565b614759565b614378565b9050919050565b5f819050919050565b615816836157e3565b61582a61582282615804565b848454615792565b825550505050565b5f5f905090565b615841615832565b61584c81848461580d565b505050565b5b8181101561586f576158645f82615839565b600181019050615852565b5050565b601f8211156158b45761588581615765565b61588e84615777565b8101602085101561589d578190505b6158b16158a985615777565b830182615851565b50505b505050565b5f82821c905092915050565b5f6158d45f19846008026158b9565b1980831691505092915050565b5f6158ec83836158c5565b9150826002028217905092915050565b615905826144d4565b67ffffffffffffffff81111561591e5761591d614b2a565b5b615928825461540d565b615933828285615873565b5f60209050601f831160018114615964575f8415615952578287015190505b61595c85826158e1565b8655506159c3565b601f19841661597286615765565b5f5b8281101561599957848901518255600182019150602085019450602081019050615974565b868310156159b657848901516159b2601f8916826158c5565b8355505b6001600288020188555050505b505050505050565b5f6060820190508181035f8301526159e3818661450c565b90506159f260208301856143d6565b6159ff60408301846143d6565b949350505050565b5f604082019050615a1a5f8301856145a3565b615a2760208301846143d6565b9392505050565b5f606082019050615a415f8301866145a3565b615a4e60208301856145a3565b615a5b60408301846143d6565b94935050505056fea264697066735822122043439a0bd16ddd425a9e04430e627ec299c7186dfb3e19bc0c82ce04b70e971c64736f6c634300081e0033",
        "sourceMap": "541:26619:31:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5854:35;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;26947:210;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5200:69;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5078:53;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;4900:27;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;;;;;5813:35;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;21554:885;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;19577:1227;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;5137:57;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;5685:47;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5987:51;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;6386:45;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5487:68;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;15544:2324;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;4933:28;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;20921:447;;;:::i;:::-;;5895:40;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5941;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;25024:197;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5561:78;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5003:30;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;25758:101;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;6291:37;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5738:58;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;25464:100;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;10270:2040;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;26701:241;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;18089:1275;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;5429:52;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;25570:81;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;6234:51;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;4967:30;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;26316:379;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;12618:2684;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;5367:56;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;6051:48;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;6161:55;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;6334:46;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;25657:95;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;6105:31;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;7750:2214;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;25865:215;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;25227:231;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5275:86;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;26086:224;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5854:35;5888:1;5854:35;:::o;26947:210::-;27091:7;27061:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;27121:17:::1;:29;27139:10;27121:29;;;;;;;;;;;;27114:36;;26947:210:::0;;;;:::o;5200:69::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;5078:53::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;4900:27::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;5813:35::-;5847:1;5813:35;:::o;21554:885::-;2500:21:29;:19;:21::i;:::-;21662:10:31::1;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;21689:25:::2;21717:9;21727:10;21717:21;;;;;;;;:::i;:::-;;;;;;;;;;;;21689:49;;21772:8;:17;;;21753:15;:36;21749:109;;21812:35;;;;;;;;;;;;;;21749:109;21888:8;:15;;;21871:8;:13;;;:32;21867:111;;21926:41;;;;;;;;;;;;;;21867:111;21988:14;22005:13;:25;22019:10;22005:25;;;;;;;;;;;:37;22031:10;22005:37;;;;;;;;;;;;;;;;21988:54;;22066:1;22056:6;:11:::0;22052:80:::2;;22090:31;;;;;;;;;;;;;;22052:80;22182:1;22142:13;:25;22156:10;22142:25;;;;;;;;;;;:37;22168:10;22142:37;;;;;;;;;;;;;;;:41;;;;22212:6;22193:8;:15;;;:25;;;;;;;:::i;:::-;;;;;;;;22251:13;22233:31:::0;::::2;;;;;;;:::i;:::-;;:8;:14;;;;;;;;;;;;:31;;;;;;;;:::i;:::-;;;22229:92;;22297:13;22280:8;:14;;;:30;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;22229:92;22331:37;22349:10;22361:6;22331:4;:17;;;;:37;;;;;:::i;:::-;22413:10;22384:48;;22401:10;22384:48;22425:6;22384:48;;;;;;:::i;:::-;;;;;;;;21679:760;;2531:1:29::1;2542:20:::0;:18;:20::i;:::-;21554:885:31;:::o;19577:1227::-;2500:21:29;:19;:21::i;:::-;19687:10:31::1;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;19714:25:::2;19742:9;19752:10;19742:21;;;;;;;;:::i;:::-;;;;;;;;;;;;19714:49;;19818:1;19778:18;:30;19797:10;19778:30;;;;;;;;;;;:37;;;;:41;19774:116;;;19842:37;;;;;;;;;;;;;;19774:116;19924:10;19904:30;;:8;:16;;;;;;;;;;;;:30;;;19900:114;;19957:46;;;;;;;;;;;;;;19900:114;20046:8;:17;;;20027:15;:36;20023:109;;20086:35;;;;;;;;;;;;;;20023:109;20161:8;:15;;;20145:8;:13;;;:31;20141:105;;;20199:36;;;;;;;;;;;;;;20141:105;20259:8;:23;;;;;;;;;;;;20255:93;;;20305:32;;;;;;;;;;;;;;20255:93;20358:17;6325:3;6135:1;20379:8;:15;;;:21;;;;:::i;:::-;20378:33;;;;:::i;:::-;20358:53;;20421:23;20465:9;20447:8;:15;;;:27;;;;:::i;:::-;20421:53;;20510:17;20493:8;:14;;;:34;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;20563:4;20537:8;:23;;;:30;;;;;;;;;;;;;;;;;;20595:1;20577:8;:15;;:19;;;;20634:9;20615:15;;:28;;;;;;;:::i;:::-;;;;;;;;20654:52;20672:8;:16;;;;;;;;;;;;20690:15;20654:4;:17;;;;:52;;;;;:::i;:::-;20752:8;:16;;;;;;;;;;;;20722:75;;20740:10;20722:75;20770:15;20787:9;20722:75;;;;;;;:::i;:::-;;;;;;;;19704:1100;;;2531:1:29::1;2542:20:::0;:18;:20::i;:::-;19577:1227:31;:::o;5137:57::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;5685:47::-;5729:3;5685:47;:::o;5987:51::-;6036:2;5987:51;:::o;6386:45::-;6429:2;6386:45;:::o;5487:68::-;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;15544:2324::-;2500:21:29;:19;:21::i;:::-;15687:10:31::1;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;15714:25:::2;15742:9;15752:10;15742:21;;;;;;;;:::i;:::-;;;;;;;;;;;;15714:49;;15801:18;:30;15820:10;15801:30;;;;;;;;;;;:37;;;;15786:11;:52;15782:123;;15861:33;;;;;;;;;;;;;;15782:123;15923:27;15953:18;:30;15972:10;15953:30;;;;;;;;;;;15984:11;15953:43;;;;;;;;:::i;:::-;;;;;;;;;;;;15923:73;;16031:10;16011:30;;:8;:16;;;;;;;;;;;;:30;;;16007:110;;16064:42;;;;;;;;;;;;;;16007:110;16150:8;:17;;;16131:15;:36;16127:109;;16190:35;;;;;;;;;;;;;;16127:109;16268:8;:13;;;16250:8;:15;;;:31;16246:105;;;16304:36;;;;;;;;;;;;;;16246:105;16366:9;:18;;;;;;;;;;;;16361:93;;16407:36;;;;;;;;;;;;;;16361:93;16468:9;:23;;;;;;;;;;;;16464:106;;;16514:45;;;;;;;;;;;;;;16464:106;16649:1;16635:11;:15;16631:257;;;16671:9;16683:1;16671:13;;16666:212;16690:11;16686:1;:15;16666:212;;;16731:18;:30;16750:10;16731:30;;;;;;;;;;;16762:1;16731:33;;;;;;;;:::i;:::-;;;;;;;;;;;;:47;;;;;;;;;;;;16726:138;;16809:36;;;;;;;;;;;;;;16726:138;16703:3;;;;;16666:212;;;;16631:257;16898:19;16920:8;:15;;;16898:37;;16945:23;6325:3;16986:9;:20;;;;;;;;;;;;16972:34;;:11;:34;;;;:::i;:::-;16971:46;;;;:::i;:::-;16945:72;;17027:17;6325:3;6135:1;17048:15;:21;;;;:::i;:::-;17047:33;;;;:::i;:::-;17027:53;;17090:23;17134:9;17116:15;:27;;;;:::i;:::-;17090:53;;17180:4;17154:9;:23;;;:30;;;;;;;;;;;;;;;;;;17213:15;17194:8;:15;;;:34;;;;;;;:::i;:::-;;;;;;;;17247:26;17276:4;17247:33;;17295:9;17307:1;17295:13;;17290:231;17314:18;:30;17333:10;17314:30;;;;;;;;;;;:37;;;;17310:1;:41;17290:231;;;17377:18;:30;17396:10;17377:30;;;;;;;;;;;17408:1;17377:33;;;;;;;;:::i;:::-;;;;;;;;;;;;:47;;;;;;;;;;;;17372:139;;17468:5;17444:29;;17491:5;;17372:139;17353:3;;;;;17290:231;;;;17535:21;17531:130;;;17589:17;17572:8;:14;;;:34;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;17646:4;17620:8;:23;;;:30;;;;;;;;;;;;;;;;;;17531:130;17690:9;17671:15;;:28;;;;;;;:::i;:::-;;;;;;;;17710:52;17728:8;:16;;;;;;;;;;;;17746:15;17710:4;:17;;;;:52;;;;;:::i;:::-;17821:11;17809:10;17786:75;17834:15;17851:9;17786:75;;;;;;;:::i;:::-;;;;;;;;15704:2164;;;;;;;2531:1:29::1;2542:20:::0;:18;:20::i;:::-;15544:2324:31;;:::o;4933:28::-;;;:::o;20921:447::-;2500:21:29;:19;:21::i;:::-;20995:5:31::1;20981:19;;:10;:19;;;20977:103;;21023:46;;;;;;;;;;;;;;20977:103;21112:1;21093:15;;:20:::0;21089:90:::1;;21136:32;;;;;;;;;;;;;;21089:90;21189:22;21214:15;;21189:40;;21257:1;21239:15;:19;;;;21269:40;21287:5;21294:14;21269:4;:17;;;;:40;;;;;:::i;:::-;21339:5;21325:36;;;21346:14;21325:36;;;;;;:::i;:::-;;;;;;;;20967:401;2542:20:29::0;:18;:20::i;:::-;20921:447:31:o;5895:40::-;5934:1;5895:40;:::o;5941:::-;5980:1;5941:40;:::o;25024:197::-;25155:15;;:::i;:::-;25126:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;25193:9:::1;25203:10;25193:21;;;;;;;;:::i;:::-;;;;;;;;;;;;25186:28;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;25024:197:::0;;;;:::o;5561:78::-;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;5003:30::-;;;;:::o;25758:101::-;25811:7;25837:15;;25830:22;;25758:101;:::o;6291:37::-;6325:3;6291:37;:::o;5738:58::-;5786:10;5738:58;:::o;25464:100::-;25515:7;25541:9;:16;;;;25534:23;;25464:100;:::o;10270:2040::-;2500:21:29;:19;:21::i;:::-;10414:10:31::1;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;10441:25:::2;10469:9;10479:10;10469:21;;;;;;;;:::i;:::-;;;;;;;;;;;;10441:49;;10525:10;10505:30;;:8;:16;;;;;;;;;;;;:30;;::::0;10501:116:::2;;10558:48;;;;;;;;;;;;;;10501:116;10648:8;:17;;;10630:15;:35;10626:105;;;10688:32;;;;;;;;;;;;;;10626:105;10754:1;10744:6;:11:::0;10740:91:::2;;10778:42;;;;;;;;;;;;;;10740:91;10857:13;:25;10871:10;10857:25;;;;;;;;;;;:32;;;;10844:9;:45;;;10840:123;;10912:40;;;;;;;;;;;;;;10840:123;10973:23;10999:13;:25;11013:10;10999:25;;;;;;;;;;;11025:9;10999:36;;;;;;;;;;:::i;:::-;;;;;;;;;;;;10973:62;;11059:4;:20;;;11050:6;:29;11046:111;;;11102:44;;;;;;;;;;;;;;11046:111;11188:1;11170:4;:15;;;:19;:61;;;;;11216:4;:15;;;11193:4;:19;;;:38;;11170:61;11166:123;;;11254:24;;;;;;;;;;;;;;11166:123;11299:17;11319:4;:14;;;11334:10;11354:4;11319:41;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;11299:61;;11386:6;11374:9;:18;11370:93;;;11415:37;;;;;;;;;;;;;;11370:93;11485:21;11550:1;11509:13;:25;11523:10;11509:25;;;;;;;;;;;:37;11535:10;11509:37;;;;;;;;;;;;;;;;:42;11485:66;;11562:56;11584:10;11604:4;11611:6;11562:4;:21;;;;:56;;;;;;:::i;:::-;11648:6;11629:8;:15;;;:25;;;;;;;:::i;:::-;;;;;;;;11705:6;11664:13;:25;11678:10;11664:25;;;;;;;;;;;:37;11690:10;11664:37;;;;;;;;;;;;;;;;:47;;;;;;;:::i;:::-;;;;;;;;11726:16;11722:509;;;11801:9;11758:16;:28;11775:10;11758:28;;;;;;;;;;;:40;11787:10;11758:40;;;;;;;;;;;;;;;;:52;;;;;;;;;;;;;;;;;;11824:4;:19;;;:21;;;;;;;;;:::i;:::-;;;;;;11859:17;:29;11877:10;11859:29;;;;;;;;;;;;:31;;;;;;;;;:::i;:::-;;;;;;11722:509;;;11921:17;11941:16;:28;11958:10;11941:28;;;;;;;;;;;:40;11970:10;11941:40;;;;;;;;;;;;;;;;;;;;;;;;;11921:60;;12011:11;11999:23;;:9;:23;;;11995:226;;;12042:13;:25;12056:10;12042:25;;;;;;;;;;;12068:11;12042:38;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:53;;;:55;;;;;;;;;:::i;:::-;;;;;;12158:9;12115:16;:28;12132:10;12115:28;;;;;;;;;;;:40;12144:10;12115:40;;;;;;;;;;;;;;;;:52;;;;;;;;;;;;;;;;;;12185:4;:19;;;:21;;;;;;;;;:::i;:::-;;;;;;11995:226;11907:324;11722:509;12284:10;12252:51;;12272:10;12252:51;12296:6;12252:51;;;;;;:::i;:::-;;;;;;;;10431:1879;;;;2531:1:29::1;2542:20:::0;:18;:20::i;:::-;10270:2040:31;;;:::o;26701:241::-;26864:7;26834:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;26894:16:::1;:28;26911:10;26894:28;;;;;;;;;;;:41;26923:11;26894:41;;;;;;;;;;;;;;;;;;;;;;;;;26887:48;;;;26701:241:::0;;;;;:::o;18089:1275::-;18213:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;18259:18:::1;:30;18278:10;18259:30;;;;;;;;;;;:37;;;;18244:11;:52;18240:123;;18319:33;;;;;;;;;;;;;;18240:123;18381:27;18411:18;:30;18430:10;18411:30;;;;;;;;;;;18442:11;18411:43;;;;;;;;:::i;:::-;;;;;;;;;;;;18381:73;;18477:9;:18;;;;;;;;;;;;:45;;;;18499:9;:23;;;;;;;;;;;;18477:45;18473:123;;;18545:40;;;;;;;;;;;;;;18473:123;18614:22;18639:23;:35;18663:10;18639:35;;;;;;;;;;;:48;18675:11;18639:48;;;;;;;;;;;;18614:73;;18719:1;18701:14;:19;:55;;;;18742:14;18724:15;:32;18701:55;18697:128;;;18779:35;;;;;;;;;;;;;;18697:128;18843:18;18885:9;:22;;;;;;;;;;;;18864:9;:18;;;;;;;;;;;;:43;;;;:::i;:::-;18843:64;;;;18944:1;18930:10;:15:::0;18926:92:::1;;18968:39;;;;;;;;;;;;;;18926:92;19036:26;19094:10;19087:3;19066:9;:18;;;;;;;;;;;;:24;;;;:::i;:::-;19065:39;;;;;;:::i;:::-;19036:68;;6429:2;19127:40;;:18;:40;19123:235;;19204:4;19183:9;:18;;;:25;;;;;;;;;;;;;;;;;;19257:11;19245:10;19227:42;;;;;;;;;;19123:235;;;19335:11;19323:10;19305:42;;;;;;;;;;19123:235;18230:1134;;;;18089:1275:::0;;;:::o;5429:52::-;;;;;;;;;;;;;;;;;:::o;25570:81::-;25613:7;25639:5;25632:12;;25570:81;:::o;6234:51::-;6282:3;6234:51;:::o;4967:30::-;;;:::o;26316:379::-;26473:16;;:::i;:::-;26443:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;26525:18:::1;:30;26544:10;26525:30;;;;;;;;;;;:37;;;;26510:11;:52;26506:123;;26585:33;;;;;;;;;;;;;;26506:123;26645:18;:30;26664:10;26645:30;;;;;;;;;;;26676:11;26645:43;;;;;;;;:::i;:::-;;;;;;;;;;;;26638:50;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;26316:379:::0;;;;;:::o;12618:2684::-;12775:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;12802:25:::1;12830:9;12840:10;12830:21;;;;;;;;:::i;:::-;;;;;;;;;;;;12802:49;;12889:18;:30;12908:10;12889:30;;;;;;;;;;;:37;;;;12874:11;:52;12870:123;;12949:33;;;;;;;;;;;;;;12870:123;13011:27;13041:18;:30;13060:10;13041:30;;;;;;;;;;;13072:11;13041:43;;;;;;;;:::i;:::-;;;;;;;;;;;;13011:73;;13148:1;13107:13;:25;13121:10;13107:25;;;;;;;;;;;:37;13133:10;13107:37;;;;;;;;;;;;;;;;:42:::0;13103:111:::1;;13172:31;;;;;;;;;;;;;;13103:111;13236:14;:26;13251:10;13236:26;;;;;;;;;;;:39;13263:11;13236:39;;;;;;;;;;;:51;13276:10;13236:51;;;;;;;;;;;;;;;;;;;;;;;;;13232:117;;;13310:28;;;;;;;;;;;;;;13232:117;13390:8;:17;;;13371:15;:36;13367:109;;13430:35;;;;;;;;;;;;;;13367:109;13507:8;:13;;;13489:8;:15;;;:31;13485:105;;;13543:36;;;;;;;;;;;;;;13485:105;13630:9;:18;;;13612:15;:36;13608:117;;;13671:43;;;;;;;;;;;;;;13608:117;13799:1;13747:23;:35;13771:10;13747:35;;;;;;;;;;;:48;13783:11;13747:48;;;;;;;;;;;;:53:::0;13743:169:::1;;6374:6;13867:9;:18;;;:34;;;;:::i;:::-;13816:23;:35;13840:10;13816:35;;;;;;;;;;;:48;13852:11;13816:48;;;;;;;;;;;:85;;;;13743:169;13952:23;:35;13976:10;13952:35;;;;;;;;;;;:48;13988:11;13952:48;;;;;;;;;;;;13934:15;:66;13930:148;;;14023:44;;;;;;;;;;;;;;13930:148;14100:9;:18;;;;;;;;;;;;:45;;;;14122:9;:23;;;;;;;;;;;;14100:45;14096:123;;;14168:40;;;;;;;;;;;;;;14096:123;14291:4;14237:14;:26;14252:10;14237:26;;;;;;;;;;;:39;14264:11;14237:39;;;;;;;;;;;:51;14277:10;14237:51;;;;;;;;;;;;;;;;:58;;;;;;;;;;;;;;;;;;14318:4;14314:110;;;14338:9;:18;;;:20;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;14314:110;;;14389:9;:22;;;:24;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;14314:110;14442:18;14484:9;:22;;;;;;;;;;;;14463:9;:18;;;;;;;;;;;;:43;;;;:::i;:::-;14442:64;;;;14516:30;14549:17;:29;14567:10;14549:29;;;;;;;;;;;;14516:62;;14652:9;:18;;;;;;;;;;;;14651:19;:59;;;;;14688:22;14674:10;:36;;14651:59;14647:439;;;14726:26;14784:10;14777:3;14756:9;:18;;;;;;;;;;;;:24;;;;:::i;:::-;14755:39;;;;;;:::i;:::-;14726:68;;6429:2;14825:40;;:18;:40;14821:255;;14906:4;14885:9;:18;;;:25;;;;;;;;;;;;;;;;;;14963:11;14951:10;14933:42;;;;;;;;;;14821:255;;;15049:11;15037:10;15019:42;;;;;;;;;;14821:255;14712:374;14647:439;15188:10;15109:186;;15162:11;15137:10;15109:186;15213:4;15231:9;:18;;;;;;;;;;;;15263:9;:22;;;;;;;;;;;;15109:186;;;;;;;;:::i;:::-;;;;;;;;12792:2510;;;;12618:2684:::0;;;;:::o;5367:56::-;;;;;;;;;;;;;;;;;;;;;;:::o;6051:48::-;6096:3;6051:48;:::o;6161:55::-;6205:11;6161:55;:::o;6334:46::-;6374:6;6334:46;:::o;25657:95::-;25706:7;25740:4;25725:20;;25657:95;:::o;6105:31::-;6135:1;6105:31;:::o;7750:2214::-;7997:16;8053:6;8035:15;:24;;;;:::i;:::-;8016:15;:44;;;;:::i;:::-;7997:63;;8102:1;8083:15;:20;8079:103;;8126:45;;;;;;;;;;;;;;8079:103;6282:3;8195:15;:39;8191:108;;;8257:31;;;;;;;;;;;;;;8191:108;6205:11;8312:5;:25;8308:89;;;8360:26;;;;;;;;;;;;;;8308:89;5729:3;8416:6;8410:20;:40;8406:106;;;8473:28;;;;;;;;;;;;;;8406:106;5729:3;8531:12;8525:26;:46;8521:118;;;8594:34;;;;;;;;;;;;;;8521:118;8649:22;8664:6;8649:14;:22::i;:::-;8681:42;8701:11;8714:8;8681:19;:42::i;:::-;8734:24;8761:268;;;;;;;;8791:6;8761:268;;;;8817:5;8761:268;;;;8915:1;8761:268;;;;8846:8;8761:268;;;;8881:12;8761:268;;;;8939:10;8761:268;;;;;;8970:13;8761:268;;;;;;;;:::i;:::-;;;;;;9013:5;8761:268;;;;;8734:295;;9040:18;9061:9;:16;;;;9040:37;;9087:9;9102:8;9087:24;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;9130:26;9159:13;:25;9173:10;9159:25;;;;;;;;;;;9130:54;;9194:18;9215:6;:13;9194:34;;9243:9;9255:1;9243:13;;9238:87;9262:10;9258:1;:14;9238:87;;;9293:5;9304:6;9311:1;9304:9;;;;;;;;:::i;:::-;;;;;;;;9293:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;9274:3;;;;;9238:87;;;;9335:23;9361:11;:18;9335:44;;9394:9;9406:1;9394:13;;9389:481;9413:15;9409:1;:19;9389:481;;;9449:26;9478:321;;;;;;;;9519:11;9531:1;9519:14;;;;;;;;:::i;:::-;;;;;;;;:26;;;9478:321;;;;9575:11;9587:1;9575:14;;;;;;;;:::i;:::-;;;;;;;;:25;;;9478:321;;;;;;9628:11;9640:1;9628:14;;;;;;;;:::i;:::-;;;;;;;;:23;;;9478:321;;;;9679:1;9478:321;;;;;;9712:1;9478:321;;;;;;9741:5;9478:321;;;;;;9779:5;9478:321;;;;;9449:350;;9813:18;:30;9832:10;9813:30;;;;;;;;;;;9849:9;9813:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;9435:435;9430:3;;;;;9389:481;;;;9921:10;9893:64;;9909:10;9893:64;9933:6;9941:5;9948:8;9893:64;;;;;;;;:::i;:::-;;;;;;;;7987:1977;;;;;;7750:2214;;;;;;:::o;25865:215::-;26005:19;25975:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;26048:13:::1;:25;26062:10;26048:25;;;;;;;;;;;26041:32;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;;;;;;25865:215:::0;;;;:::o;25227:231::-;25383:7;25354:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;25413:13:::1;:25;25427:10;25413:25;;;;;;;;;;;:38;25439:11;25413:38;;;;;;;;;;;;;;;;25406:45;;25227:231:::0;;;;;:::o;5275:86::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;26086:224::-;26231:18;26201:10;7149:9;:16;;;;7135:10;:30;7131:104;;7188:36;;;;;;;;;;;;;;7131:104;26273:18:::1;:30;26292:10;26273:30;;;;;;;;;;;26266:37;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::::0;::::1;;;;;;;;;;;;;;;;;;26086:224:::0;;;;:::o;2575:307:29:-;1899:1;2702:7;;:18;2698:86;;2743:30;;;;;;;;;;;;;;2698:86;1899:1;2858:7;:17;;;;2575:307::o;1219:160:27:-;1301:71;1321:5;1343;:14;;;1360:2;1364:5;1328:43;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1301:19;:71::i;:::-;1219:160;;;:::o;2888:208:29:-;1857:1;3068:7;:21;;;;2888:208::o;1618:188:27:-;1718:81;1738:5;1760;:18;;;1781:4;1787:2;1791:5;1745:53;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1718:19;:81::i;:::-;1618:188;;;;:::o;22556:896:31:-;5847:1;22636:25;;:6;:13;:25;:54;;;;5888:1;22665:25;;:6;:13;:25;22636:54;22632:124;;;22713:32;;;;;;;;;;;;;;22632:124;22765:18;22786:6;:13;22765:34;;22814:9;22826:1;22814:13;;22809:637;22833:10;22829:1;:14;22809:637;;;5729:3;22874:6;22881:1;22874:9;;;;;;;;:::i;:::-;;;;;;;;:14;;;22868:28;:48;22864:123;;;22943:29;;;;;;;;;;;;;;22864:123;5729:3;23010:6;23017:1;23010:9;;;;;;;;:::i;:::-;;;;;;;;:21;;;23004:35;:55;23000:130;;;23086:29;;;;;;;;;;;;;;23000:130;5786:10;23147:6;23154:1;23147:9;;;;;;;;:::i;:::-;;;;;;;;:25;;;:49;23143:136;;;23223:41;;;;;;;;;;;;;;23143:136;23300:1;23296;:5;:65;;;;;23334:6;23343:1;23341;:3;;;;:::i;:::-;23334:11;;;;;;;;:::i;:::-;;;;;;;;:27;;;23305:6;23312:1;23305:9;;;;;;;;:::i;:::-;;;;;;;;:25;;;:56;;23296:65;23292:144;;;23388:33;;;;;;;;;;;;;;23292:144;22845:3;;;;;22809:637;;;;22622:830;22556:896;:::o;23533:1440::-;5934:1;23647:35;;:11;:18;:35;:74;;;;5980:1;23686:35;;:11;:18;:35;23647:74;23643:149;;;23744:37;;;;;;;;;;;;;;23643:149;23810:23;23836:1;23810:27;;23847:23;23873:11;:18;23847:44;;23906:9;23918:1;23906:13;;23901:941;23925:15;23921:1;:19;23901:941;;;5729:3;23971:11;23983:1;23971:14;;;;;;;;:::i;:::-;;;;;;;;:26;;;23965:40;:60;23961:135;;;24052:29;;;;;;;;;;;;;;23961:135;6036:2;24126:52;;:11;24138:1;24126:14;;;;;;;;:::i;:::-;;;;;;;;:25;;;:52;;;24122:139;;;24205:41;;;;;;;;;;;;;;24122:139;24293:11;24305:1;24293:14;;;;;;;;:::i;:::-;;;;;;;;:25;;;24274:44;;;;;;;:::i;:::-;;;24376:15;24349:11;24361:1;24349:14;;;;;;;;:::i;:::-;;;;;;;;:23;;;:42;24345:135;;24418:47;;;;;;;;;;;;;;24345:135;24563:6;6096:3;24542:27;;;;:::i;:::-;24523:15;:47;;;;:::i;:::-;24497:11;24509:1;24497:14;;;;;;;;:::i;:::-;;;;;;;;:23;;;:73;24493:159;;;24597:40;;;;;;;;;;;;;;24493:159;24686:1;24682;:5;:61;;;;;24718:11;24732:1;24730;:3;;;;:::i;:::-;24718:16;;;;;;;;:::i;:::-;;;;;;;;:25;;;24691:11;24703:1;24691:14;;;;;;;;:::i;:::-;;;;;;;;:23;;;:52;;24682:61;24678:154;;;24770:47;;;;;;;;;;;;;;24678:154;23942:3;;;;;;;23901:941;;;;24883:3;24864:15;:22;24860:107;;24909:47;;;;;;;;;;;;;;24860:107;23633:1340;;23533:1440;;:::o;8370:720:27:-;8450:18;8478:19;8616:4;8613:1;8606:4;8600:11;8593:4;8587;8583:15;8580:1;8573:5;8566;8561:60;8673:7;8663:176;;8717:4;8711:11;8762:16;8759:1;8754:3;8739:40;8808:16;8803:3;8796:29;8663:176;8866:16;8852:30;;8916:1;8910:8;8895:23;;8532:396;8956:1;8942:10;:15;:68;;9009:1;8994:11;:16;;8942:68;;;8990:1;8968:5;8960:26;;;:31;8942:68;8938:146;;;9066:5;9033:40;;;;;;;;;;;:::i;:::-;;;;;;;;8938:146;8440:650;;8370:720;;:::o;-1:-1:-1:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;7:86:33:-;42:7;82:4;75:5;71:16;60:27;;7:86;;;:::o;99:112::-;182:22;198:5;182:22;:::i;:::-;177:3;170:35;99:112;;:::o;217:214::-;306:4;344:2;333:9;329:18;321:26;;357:67;421:1;410:9;406:17;397:6;357:67;:::i;:::-;217:214;;;;:::o;437:75::-;470:6;503:2;497:9;487:19;;437:75;:::o;518:117::-;627:1;624;617:12;641:117;750:1;747;740:12;764:77;801:7;830:5;819:16;;764:77;;;:::o;847:122::-;920:24;938:5;920:24;:::i;:::-;913:5;910:35;900:63;;959:1;956;949:12;900:63;847:122;:::o;975:139::-;1021:5;1059:6;1046:20;1037:29;;1075:33;1102:5;1075:33;:::i;:::-;975:139;;;;:::o;1120:329::-;1179:6;1228:2;1216:9;1207:7;1203:23;1199:32;1196:119;;;1234:79;;:::i;:::-;1196:119;1354:1;1379:53;1424:7;1415:6;1404:9;1400:22;1379:53;:::i;:::-;1369:63;;1325:117;1120:329;;;;:::o;1455:118::-;1542:24;1560:5;1542:24;:::i;:::-;1537:3;1530:37;1455:118;;:::o;1579:222::-;1672:4;1710:2;1699:9;1695:18;1687:26;;1723:71;1791:1;1780:9;1776:17;1767:6;1723:71;:::i;:::-;1579:222;;;;:::o;1807:126::-;1844:7;1884:42;1877:5;1873:54;1862:65;;1807:126;;;:::o;1939:96::-;1976:7;2005:24;2023:5;2005:24;:::i;:::-;1994:35;;1939:96;;;:::o;2041:122::-;2114:24;2132:5;2114:24;:::i;:::-;2107:5;2104:35;2094:63;;2153:1;2150;2143:12;2094:63;2041:122;:::o;2169:139::-;2215:5;2253:6;2240:20;2231:29;;2269:33;2296:5;2269:33;:::i;:::-;2169:139;;;;:::o;2314:474::-;2382:6;2390;2439:2;2427:9;2418:7;2414:23;2410:32;2407:119;;;2445:79;;:::i;:::-;2407:119;2565:1;2590:53;2635:7;2626:6;2615:9;2611:22;2590:53;:::i;:::-;2580:63;;2536:117;2692:2;2718:53;2763:7;2754:6;2743:9;2739:22;2718:53;:::i;:::-;2708:63;;2663:118;2314:474;;;;;:::o;2794:::-;2862:6;2870;2919:2;2907:9;2898:7;2894:23;2890:32;2887:119;;;2925:79;;:::i;:::-;2887:119;3045:1;3070:53;3115:7;3106:6;3095:9;3091:22;3070:53;:::i;:::-;3060:63;;3016:117;3172:2;3198:53;3243:7;3234:6;3223:9;3219:22;3198:53;:::i;:::-;3188:63;;3143:118;2794:474;;;;;:::o;3274:99::-;3326:6;3360:5;3354:12;3344:22;;3274:99;;;:::o;3379:169::-;3463:11;3497:6;3492:3;3485:19;3537:4;3532:3;3528:14;3513:29;;3379:169;;;;:::o;3554:139::-;3643:6;3638:3;3633;3627:23;3684:1;3675:6;3670:3;3666:16;3659:27;3554:139;;;:::o;3699:102::-;3740:6;3791:2;3787:7;3782:2;3775:5;3771:14;3767:28;3757:38;;3699:102;;;:::o;3807:377::-;3895:3;3923:39;3956:5;3923:39;:::i;:::-;3978:71;4042:6;4037:3;3978:71;:::i;:::-;3971:78;;4058:65;4116:6;4111:3;4104:4;4097:5;4093:16;4058:65;:::i;:::-;4148:29;4170:6;4148:29;:::i;:::-;4143:3;4139:39;4132:46;;3899:285;3807:377;;;;:::o;4190:846::-;4435:4;4473:3;4462:9;4458:19;4450:27;;4523:9;4517:4;4513:20;4509:1;4498:9;4494:17;4487:47;4551:78;4624:4;4615:6;4551:78;:::i;:::-;4543:86;;4676:9;4670:4;4666:20;4661:2;4650:9;4646:18;4639:48;4704:78;4777:4;4768:6;4704:78;:::i;:::-;4696:86;;4792:72;4860:2;4849:9;4845:18;4836:6;4792:72;:::i;:::-;4874;4942:2;4931:9;4927:18;4918:6;4874:72;:::i;:::-;4956:73;5024:3;5013:9;5009:19;5000:6;4956:73;:::i;:::-;4190:846;;;;;;;;:::o;5042:118::-;5129:24;5147:5;5129:24;:::i;:::-;5124:3;5117:37;5042:118;;:::o;5166:180::-;5214:77;5211:1;5204:88;5311:4;5308:1;5301:15;5335:4;5332:1;5325:15;5352:117;5437:1;5430:5;5427:12;5417:46;;5443:18;;:::i;:::-;5417:46;5352:117;:::o;5475:135::-;5524:7;5553:5;5542:16;;5559:45;5598:5;5559:45;:::i;:::-;5475:135;;;:::o;5616:::-;5676:9;5709:36;5739:5;5709:36;:::i;:::-;5696:49;;5616:135;;;:::o;5757:151::-;5854:47;5895:5;5854:47;:::i;:::-;5849:3;5842:60;5757:151;;:::o;5914:90::-;5948:7;5991:5;5984:13;5977:21;5966:32;;5914:90;;;:::o;6010:109::-;6091:21;6106:5;6091:21;:::i;:::-;6086:3;6079:34;6010:109;;:::o;6125:1187::-;6458:4;6496:3;6485:9;6481:19;6473:27;;6546:9;6540:4;6536:20;6532:1;6521:9;6517:17;6510:47;6574:78;6647:4;6638:6;6574:78;:::i;:::-;6566:86;;6662:72;6730:2;6719:9;6715:18;6706:6;6662:72;:::i;:::-;6744;6812:2;6801:9;6797:18;6788:6;6744:72;:::i;:::-;6826;6894:2;6883:9;6879:18;6870:6;6826:72;:::i;:::-;6946:9;6940:4;6936:20;6930:3;6919:9;6915:19;6908:49;6974:78;7047:4;7038:6;6974:78;:::i;:::-;6966:86;;7062:73;7130:3;7119:9;7115:19;7106:6;7062:73;:::i;:::-;7145:83;7223:3;7212:9;7208:19;7199:6;7145:83;:::i;:::-;7238:67;7300:3;7289:9;7285:19;7276:6;7238:67;:::i;:::-;6125:1187;;;;;;;;;;;:::o;7318:89::-;7354:7;7394:6;7387:5;7383:18;7372:29;;7318:89;;;:::o;7413:115::-;7498:23;7515:5;7498:23;:::i;:::-;7493:3;7486:36;7413:115;;:::o;7534:937::-;7795:4;7833:3;7822:9;7818:19;7810:27;;7883:9;7877:4;7873:20;7869:1;7858:9;7854:17;7847:47;7911:78;7984:4;7975:6;7911:78;:::i;:::-;7903:86;;7999:68;8063:2;8052:9;8048:18;8039:6;7999:68;:::i;:::-;8077:72;8145:2;8134:9;8130:18;8121:6;8077:72;:::i;:::-;8159:70;8225:2;8214:9;8210:18;8201:6;8159:70;:::i;:::-;8239:71;8305:3;8294:9;8290:19;8281:6;8239:71;:::i;:::-;8320:67;8382:3;8371:9;8367:19;8358:6;8320:67;:::i;:::-;8397;8459:3;8448:9;8444:19;8435:6;8397:67;:::i;:::-;7534:937;;;;;;;;;;:::o;8477:60::-;8505:3;8526:5;8519:12;;8477:60;;;:::o;8543:142::-;8593:9;8626:53;8644:34;8653:24;8671:5;8653:24;:::i;:::-;8644:34;:::i;:::-;8626:53;:::i;:::-;8613:66;;8543:142;;;:::o;8691:126::-;8741:9;8774:37;8805:5;8774:37;:::i;:::-;8761:50;;8691:126;;;:::o;8823:142::-;8889:9;8922:37;8953:5;8922:37;:::i;:::-;8909:50;;8823:142;;;:::o;8971:163::-;9074:53;9121:5;9074:53;:::i;:::-;9069:3;9062:66;8971:163;;:::o;9140:254::-;9249:4;9287:2;9276:9;9272:18;9264:26;;9300:87;9384:1;9373:9;9369:17;9360:6;9300:87;:::i;:::-;9140:254;;;;:::o;9400:159::-;9474:11;9508:6;9503:3;9496:19;9548:4;9543:3;9539:14;9524:29;;9400:159;;;;:::o;9565:357::-;9643:3;9671:39;9704:5;9671:39;:::i;:::-;9726:61;9780:6;9775:3;9726:61;:::i;:::-;9719:68;;9796:65;9854:6;9849:3;9842:4;9835:5;9831:16;9796:65;:::i;:::-;9886:29;9908:6;9886:29;:::i;:::-;9881:3;9877:39;9870:46;;9647:275;9565:357;;;;:::o;9928:108::-;10005:24;10023:5;10005:24;:::i;:::-;10000:3;9993:37;9928:108;;:::o;10042:::-;10119:24;10137:5;10119:24;:::i;:::-;10114:3;10107:37;10042:108;;:::o;10156:141::-;10243:47;10284:5;10243:47;:::i;:::-;10238:3;10231:60;10156:141;;:::o;10303:99::-;10374:21;10389:5;10374:21;:::i;:::-;10369:3;10362:34;10303:99;;:::o;10476:1759::-;10599:3;10635:6;10630:3;10626:16;10725:4;10718:5;10714:16;10708:23;10778:3;10772:4;10768:14;10761:4;10756:3;10752:14;10745:38;10804:73;10872:4;10858:12;10804:73;:::i;:::-;10796:81;;10652:236;10970:4;10963:5;10959:16;10953:23;10989:63;11046:4;11041:3;11037:14;11023:12;10989:63;:::i;:::-;10898:164;11146:4;11139:5;11135:16;11129:23;11165:63;11222:4;11217:3;11213:14;11199:12;11165:63;:::i;:::-;11072:166;11324:4;11317:5;11313:16;11307:23;11343:63;11400:4;11395:3;11391:14;11377:12;11343:63;:::i;:::-;11248:168;11505:4;11498:5;11494:16;11488:23;11558:3;11552:4;11548:14;11541:4;11536:3;11532:14;11525:38;11584:73;11652:4;11638:12;11584:73;:::i;:::-;11576:81;;11426:242;11753:4;11746:5;11742:16;11736:23;11772:63;11829:4;11824:3;11820:14;11806:12;11772:63;:::i;:::-;11678:167;11928:4;11921:5;11917:16;11911:23;11947:73;12014:4;12009:3;12005:14;11991:12;11947:73;:::i;:::-;11855:175;12122:4;12115:5;12111:16;12105:23;12141:57;12192:4;12187:3;12183:14;12169:12;12141:57;:::i;:::-;12040:168;12225:4;12218:11;;10604:1631;10476:1759;;;;:::o;12241:381::-;12388:4;12426:2;12415:9;12411:18;12403:26;;12475:9;12469:4;12465:20;12461:1;12450:9;12446:17;12439:47;12503:112;12610:4;12601:6;12503:112;:::i;:::-;12495:120;;12241:381;;;;:::o;12628:118::-;12699:22;12715:5;12699:22;:::i;:::-;12692:5;12689:33;12679:61;;12736:1;12733;12726:12;12679:61;12628:118;:::o;12752:135::-;12796:5;12834:6;12821:20;12812:29;;12850:31;12875:5;12850:31;:::i;:::-;12752:135;;;;:::o;12893:615::-;12968:6;12976;12984;13033:2;13021:9;13012:7;13008:23;13004:32;13001:119;;;13039:79;;:::i;:::-;13001:119;13159:1;13184:53;13229:7;13220:6;13209:9;13205:22;13184:53;:::i;:::-;13174:63;;13130:117;13286:2;13312:53;13357:7;13348:6;13337:9;13333:22;13312:53;:::i;:::-;13302:63;;13257:118;13414:2;13440:51;13483:7;13474:6;13463:9;13459:22;13440:51;:::i;:::-;13430:61;;13385:116;12893:615;;;;;:::o;13514:222::-;13607:4;13645:2;13634:9;13630:18;13622:26;;13658:71;13726:1;13715:9;13711:17;13702:6;13658:71;:::i;:::-;13514:222;;;;:::o;13742:102::-;13815:22;13831:5;13815:22;:::i;:::-;13810:3;13803:35;13742:102;;:::o;13850:105::-;13925:23;13942:5;13925:23;:::i;:::-;13920:3;13913:36;13850:105;;:::o;14031:1504::-;14156:3;14192:4;14187:3;14183:14;14286:4;14279:5;14275:16;14269:23;14339:3;14333:4;14329:14;14322:4;14317:3;14313:14;14306:38;14365:73;14433:4;14419:12;14365:73;:::i;:::-;14357:81;;14207:242;14537:4;14530:5;14526:16;14520:23;14556:59;14609:4;14604:3;14600:14;14586:12;14556:59;:::i;:::-;14459:166;14711:4;14704:5;14700:16;14694:23;14730:63;14787:4;14782:3;14778:14;14764:12;14730:63;:::i;:::-;14635:168;14889:4;14882:5;14878:16;14872:23;14908:61;14963:4;14958:3;14954:14;14940:12;14908:61;:::i;:::-;14813:166;15069:4;15062:5;15058:16;15052:23;15088:61;15143:4;15138:3;15134:14;15120:12;15088:61;:::i;:::-;14989:170;15245:4;15238:5;15234:16;15228:23;15264:57;15315:4;15310:3;15306:14;15292:12;15264:57;:::i;:::-;15169:162;15422:4;15415:5;15411:16;15405:23;15441:57;15492:4;15487:3;15483:14;15469:12;15441:57;:::i;:::-;15341:167;15525:4;15518:11;;14161:1374;14031:1504;;;;:::o;15541:385::-;15690:4;15728:2;15717:9;15713:18;15705:26;;15777:9;15771:4;15767:20;15763:1;15752:9;15748:17;15741:47;15805:114;15914:4;15905:6;15805:114;:::i;:::-;15797:122;;15541:385;;;;:::o;15932:116::-;16002:21;16017:5;16002:21;:::i;:::-;15995:5;15992:32;15982:60;;16038:1;16035;16028:12;15982:60;15932:116;:::o;16054:133::-;16097:5;16135:6;16122:20;16113:29;;16151:30;16175:5;16151:30;:::i;:::-;16054:133;;;;:::o;16193:613::-;16267:6;16275;16283;16332:2;16320:9;16311:7;16307:23;16303:32;16300:119;;;16338:79;;:::i;:::-;16300:119;16458:1;16483:53;16528:7;16519:6;16508:9;16504:22;16483:53;:::i;:::-;16473:63;;16429:117;16585:2;16611:53;16656:7;16647:6;16636:9;16632:22;16611:53;:::i;:::-;16601:63;;16556:118;16713:2;16739:50;16781:7;16772:6;16761:9;16757:22;16739:50;:::i;:::-;16729:60;;16684:115;16193:613;;;;;:::o;16812:210::-;16899:4;16937:2;16926:9;16922:18;16914:26;;16950:65;17012:1;17001:9;16997:17;16988:6;16950:65;:::i;:::-;16812:210;;;;:::o;17028:117::-;17137:1;17134;17127:12;17151:117;17260:1;17257;17250:12;17274:180;17322:77;17319:1;17312:88;17419:4;17416:1;17409:15;17443:4;17440:1;17433:15;17460:281;17543:27;17565:4;17543:27;:::i;:::-;17535:6;17531:40;17673:6;17661:10;17658:22;17637:18;17625:10;17622:34;17619:62;17616:88;;;17684:18;;:::i;:::-;17616:88;17724:10;17720:2;17713:22;17503:238;17460:281;;:::o;17747:129::-;17781:6;17808:20;;:::i;:::-;17798:30;;17837:33;17865:4;17857:6;17837:33;:::i;:::-;17747:129;;;:::o;17882:308::-;17944:4;18034:18;18026:6;18023:30;18020:56;;;18056:18;;:::i;:::-;18020:56;18094:29;18116:6;18094:29;:::i;:::-;18086:37;;18178:4;18172;18168:15;18160:23;;17882:308;;;:::o;18196:148::-;18294:6;18289:3;18284;18271:30;18335:1;18326:6;18321:3;18317:16;18310:27;18196:148;;;:::o;18350:425::-;18428:5;18453:66;18469:49;18511:6;18469:49;:::i;:::-;18453:66;:::i;:::-;18444:75;;18542:6;18535:5;18528:21;18580:4;18573:5;18569:16;18618:3;18609:6;18604:3;18600:16;18597:25;18594:112;;;18625:79;;:::i;:::-;18594:112;18715:54;18762:6;18757:3;18752;18715:54;:::i;:::-;18434:341;18350:425;;;;;:::o;18795:340::-;18851:5;18900:3;18893:4;18885:6;18881:17;18877:27;18867:122;;18908:79;;:::i;:::-;18867:122;19025:6;19012:20;19050:79;19125:3;19117:6;19110:4;19102:6;19098:17;19050:79;:::i;:::-;19041:88;;18857:278;18795:340;;;;:::o;19141:::-;19247:4;19337:18;19329:6;19326:30;19323:56;;;19359:18;;:::i;:::-;19323:56;19409:4;19401:6;19397:17;19389:25;;19469:4;19463;19459:15;19451:23;;19141:340;;;:::o;19487:117::-;19596:1;19593;19586:12;19610:117;19719:1;19716;19709:12;19733:117;19842:1;19839;19832:12;19894:1436;19972:5;20016:4;20004:9;19999:3;19995:19;19991:30;19988:117;;;20024:79;;:::i;:::-;19988:117;20123:21;20139:4;20123:21;:::i;:::-;20114:30;;20231:1;20220:9;20216:17;20203:31;20261:18;20253:6;20250:30;20247:117;;;20283:79;;:::i;:::-;20247:117;20403:59;20458:3;20449:6;20438:9;20434:22;20403:59;:::i;:::-;20396:4;20389:5;20385:16;20378:85;20154:320;20568:2;20557:9;20553:18;20540:32;20599:18;20591:6;20588:30;20585:117;;;20621:79;;:::i;:::-;20585:117;20741:59;20796:3;20787:6;20776:9;20772:22;20741:59;:::i;:::-;20734:4;20727:5;20723:16;20716:85;20484:328;20882:2;20923:49;20968:3;20959:6;20948:9;20944:22;20923:49;:::i;:::-;20916:4;20909:5;20905:16;20898:75;20822:162;21049:2;21090:49;21135:3;21126:6;21115:9;21111:22;21090:49;:::i;:::-;21083:4;21076:5;21072:16;21065:75;20994:157;21220:3;21262:49;21307:3;21298:6;21287:9;21283:22;21262:49;:::i;:::-;21255:4;21248:5;21244:16;21237:75;21161:162;19894:1436;;;;:::o;21376:1002::-;21501:5;21526:110;21542:93;21628:6;21542:93;:::i;:::-;21526:110;:::i;:::-;21517:119;;21656:5;21685:6;21678:5;21671:21;21719:4;21712:5;21708:16;21701:23;;21772:4;21764:6;21760:17;21752:6;21748:30;21801:3;21793:6;21790:15;21787:122;;;21820:79;;:::i;:::-;21787:122;21935:6;21918:454;21952:6;21947:3;21944:15;21918:454;;;22041:3;22028:17;22077:18;22064:11;22061:35;22058:122;;;22099:79;;:::i;:::-;22058:122;22223:11;22215:6;22211:24;22261:66;22323:3;22311:10;22261:66;:::i;:::-;22256:3;22249:79;22357:4;22352:3;22348:14;22341:21;;21994:378;;21978:4;21973:3;21969:14;21962:21;;21918:454;;;21922:21;21507:871;;21376:1002;;;;;:::o;22424:428::-;22524:5;22573:3;22566:4;22558:6;22554:17;22550:27;22540:122;;22581:79;;:::i;:::-;22540:122;22698:6;22685:20;22723:123;22842:3;22834:6;22827:4;22819:6;22815:17;22723:123;:::i;:::-;22714:132;;22530:322;22424:428;;;;:::o;22858:339::-;22963:4;23053:18;23045:6;23042:30;23039:56;;;23075:18;;:::i;:::-;23039:56;23125:4;23117:6;23113:17;23105:25;;23185:4;23179;23175:15;23167:23;;22858:339;;;:::o;23203:120::-;23275:23;23292:5;23275:23;:::i;:::-;23268:5;23265:34;23255:62;;23313:1;23310;23303:12;23255:62;23203:120;:::o;23329:137::-;23374:5;23412:6;23399:20;23390:29;;23428:32;23454:5;23428:32;:::i;:::-;23329:137;;;;:::o;23509:1587::-;23586:5;23630:4;23618:9;23613:3;23609:19;23605:30;23602:117;;;23638:79;;:::i;:::-;23602:117;23737:21;23753:4;23737:21;:::i;:::-;23728:30;;23852:1;23841:9;23837:17;23824:31;23882:18;23874:6;23871:30;23868:117;;;23904:79;;:::i;:::-;23868:117;24024:59;24079:3;24070:6;24059:9;24055:22;24024:59;:::i;:::-;24017:4;24010:5;24006:16;23999:85;23768:327;24160:2;24201:47;24244:3;24235:6;24224:9;24220:22;24201:47;:::i;:::-;24194:4;24187:5;24183:16;24176:73;24105:155;24323:2;24364:49;24409:3;24400:6;24389:9;24385:22;24364:49;:::i;:::-;24357:4;24350:5;24346:16;24339:75;24270:155;24488:2;24529:48;24573:3;24564:6;24553:9;24549:22;24529:48;:::i;:::-;24522:4;24515:5;24511:16;24504:74;24435:154;24656:3;24698:48;24742:3;24733:6;24722:9;24718:22;24698:48;:::i;:::-;24691:4;24684:5;24680:16;24673:74;24599:159;24821:3;24863:46;24905:3;24896:6;24885:9;24881:22;24863:46;:::i;:::-;24856:4;24849:5;24845:16;24838:72;24768:153;24989:3;25031:46;25073:3;25064:6;25053:9;25049:22;25031:46;:::i;:::-;25024:4;25017:5;25013:16;25006:72;24931:158;23509:1587;;;;:::o;25141:999::-;25265:5;25290:109;25306:92;25391:6;25306:92;:::i;:::-;25290:109;:::i;:::-;25281:118;;25419:5;25448:6;25441:5;25434:21;25482:4;25475:5;25471:16;25464:23;;25535:4;25527:6;25523:17;25515:6;25511:30;25564:3;25556:6;25553:15;25550:122;;;25583:79;;:::i;:::-;25550:122;25698:6;25681:453;25715:6;25710:3;25707:15;25681:453;;;25804:3;25791:17;25840:18;25827:11;25824:35;25821:122;;;25862:79;;:::i;:::-;25821:122;25986:11;25978:6;25974:24;26024:65;26085:3;26073:10;26024:65;:::i;:::-;26019:3;26012:78;26119:4;26114:3;26110:14;26103:21;;25757:377;;25741:4;25736:3;25732:14;25725:21;;25681:453;;;25685:21;25271:869;;25141:999;;;;;:::o;26185:426::-;26284:5;26333:3;26326:4;26318:6;26314:17;26310:27;26300:122;;26341:79;;:::i;:::-;26300:122;26458:6;26445:20;26483:122;26601:3;26593:6;26586:4;26578:6;26574:17;26483:122;:::i;:::-;26474:131;;26290:321;26185:426;;;;:::o;26617:1951::-;26848:6;26856;26864;26872;26880;26888;26937:3;26925:9;26916:7;26912:23;26908:33;26905:120;;;26944:79;;:::i;:::-;26905:120;27092:1;27081:9;27077:17;27064:31;27122:18;27114:6;27111:30;27108:117;;;27144:79;;:::i;:::-;27108:117;27249:63;27304:7;27295:6;27284:9;27280:22;27249:63;:::i;:::-;27239:73;;27035:287;27361:2;27387:53;27432:7;27423:6;27412:9;27408:22;27387:53;:::i;:::-;27377:63;;27332:118;27517:2;27506:9;27502:18;27489:32;27548:18;27540:6;27537:30;27534:117;;;27570:79;;:::i;:::-;27534:117;27675:63;27730:7;27721:6;27710:9;27706:22;27675:63;:::i;:::-;27665:73;;27460:288;27787:2;27813:53;27858:7;27849:6;27838:9;27834:22;27813:53;:::i;:::-;27803:63;;27758:118;27943:3;27932:9;27928:19;27915:33;27975:18;27967:6;27964:30;27961:117;;;27997:79;;:::i;:::-;27961:117;28102:107;28201:7;28192:6;28181:9;28177:22;28102:107;:::i;:::-;28092:117;;27886:333;28286:3;28275:9;28271:19;28258:33;28318:18;28310:6;28307:30;28304:117;;;28340:79;;:::i;:::-;28304:117;28445:106;28543:7;28534:6;28523:9;28519:22;28445:106;:::i;:::-;28435:116;;28229:332;26617:1951;;;;;;;;:::o;28574:143::-;28670:6;28704:5;28698:12;28688:22;;28574:143;;;:::o;28723:213::-;28851:11;28885:6;28880:3;28873:19;28925:4;28920:3;28916:14;28901:29;;28723:213;;;;:::o;28942:161::-;29038:4;29061:3;29053:11;;29091:4;29086:3;29082:14;29074:22;;28942:161;;;:::o;29181:1231::-;29298:3;29334:4;29329:3;29325:14;29421:4;29414:5;29410:16;29404:23;29474:3;29468:4;29464:14;29457:4;29452:3;29448:14;29441:38;29500:73;29568:4;29554:12;29500:73;:::i;:::-;29492:81;;29349:235;29673:4;29666:5;29662:16;29656:23;29726:3;29720:4;29716:14;29709:4;29704:3;29700:14;29693:38;29752:73;29820:4;29806:12;29752:73;:::i;:::-;29744:81;;29594:242;29929:4;29922:5;29918:16;29912:23;29948:63;30005:4;30000:3;29996:14;29982:12;29948:63;:::i;:::-;29846:175;30109:4;30102:5;30098:16;30092:23;30128:63;30185:4;30180:3;30176:14;30162:12;30128:63;:::i;:::-;30031:170;30293:4;30286:5;30282:16;30276:23;30312:63;30369:4;30364:3;30360:14;30346:12;30312:63;:::i;:::-;30211:174;30402:4;30395:11;;29303:1109;29181:1231;;;;:::o;30418:272::-;30545:10;30580:104;30680:3;30672:6;30580:104;:::i;:::-;30566:118;;30418:272;;;;:::o;30696:142::-;30795:4;30827;30822:3;30818:14;30810:22;;30696:142;;;:::o;30920:1143::-;31097:3;31126:83;31203:5;31126:83;:::i;:::-;31225:115;31333:6;31328:3;31225:115;:::i;:::-;31218:122;;31366:3;31411:4;31403:6;31399:17;31394:3;31390:27;31441:85;31520:5;31441:85;:::i;:::-;31549:7;31580:1;31565:453;31590:6;31587:1;31584:13;31565:453;;;31661:9;31655:4;31651:20;31646:3;31639:33;31712:6;31706:13;31740:122;31857:4;31842:13;31740:122;:::i;:::-;31732:130;;31885:89;31967:6;31885:89;:::i;:::-;31875:99;;32003:4;31998:3;31994:14;31987:21;;31625:393;31612:1;31609;31605:9;31600:14;;31565:453;;;31569:14;32034:4;32027:11;;32054:3;32047:10;;31102:961;;;;;30920:1143;;;;:::o;32069:489::-;32270:4;32308:2;32297:9;32293:18;32285:26;;32357:9;32351:4;32347:20;32343:1;32332:9;32328:17;32321:47;32385:166;32546:4;32537:6;32385:166;:::i;:::-;32377:174;;32069:489;;;;:::o;32564:619::-;32641:6;32649;32657;32706:2;32694:9;32685:7;32681:23;32677:32;32674:119;;;32712:79;;:::i;:::-;32674:119;32832:1;32857:53;32902:7;32893:6;32882:9;32878:22;32857:53;:::i;:::-;32847:63;;32803:117;32959:2;32985:53;33030:7;33021:6;33010:9;33006:22;32985:53;:::i;:::-;32975:63;;32930:118;33087:2;33113:53;33158:7;33149:6;33138:9;33134:22;33113:53;:::i;:::-;33103:63;;33058:118;32564:619;;;;;:::o;33189:142::-;33284:6;33318:5;33312:12;33302:22;;33189:142;;;:::o;33337:212::-;33464:11;33498:6;33493:3;33486:19;33538:4;33533:3;33529:14;33514:29;;33337:212;;;;:::o;33555:160::-;33650:4;33673:3;33665:11;;33703:4;33698:3;33694:14;33686:22;;33555:160;;;:::o;33791:1494::-;33906:3;33942:4;33937:3;33933:14;34036:4;34029:5;34025:16;34019:23;34089:3;34083:4;34079:14;34072:4;34067:3;34063:14;34056:38;34115:73;34183:4;34169:12;34115:73;:::i;:::-;34107:81;;33957:242;34287:4;34280:5;34276:16;34270:23;34306:59;34359:4;34354:3;34350:14;34336:12;34306:59;:::i;:::-;34209:166;34461:4;34454:5;34450:16;34444:23;34480:63;34537:4;34532:3;34528:14;34514:12;34480:63;:::i;:::-;34385:168;34639:4;34632:5;34628:16;34622:23;34658:61;34713:4;34708:3;34704:14;34690:12;34658:61;:::i;:::-;34563:166;34819:4;34812:5;34808:16;34802:23;34838:61;34893:4;34888:3;34884:14;34870:12;34838:61;:::i;:::-;34739:170;34995:4;34988:5;34984:16;34978:23;35014:57;35065:4;35060:3;35056:14;35042:12;35014:57;:::i;:::-;34919:162;35172:4;35165:5;35161:16;35155:23;35191:57;35242:4;35237:3;35233:14;35219:12;35191:57;:::i;:::-;35091:167;35275:4;35268:11;;33911:1374;33791:1494;;;;:::o;35291:268::-;35416:10;35451:102;35549:3;35541:6;35451:102;:::i;:::-;35437:116;;35291:268;;;;:::o;35565:141::-;35663:4;35695;35690:3;35686:14;35678:22;;35565:141;;;:::o;35786:1135::-;35961:3;35990:82;36066:5;35990:82;:::i;:::-;36088:114;36195:6;36190:3;36088:114;:::i;:::-;36081:121;;36228:3;36273:4;36265:6;36261:17;36256:3;36252:27;36303:84;36381:5;36303:84;:::i;:::-;36410:7;36441:1;36426:450;36451:6;36448:1;36445:13;36426:450;;;36522:9;36516:4;36512:20;36507:3;36500:33;36573:6;36567:13;36601:120;36716:4;36701:13;36601:120;:::i;:::-;36593:128;;36744:88;36825:6;36744:88;:::i;:::-;36734:98;;36861:4;36856:3;36852:14;36845:21;;36486:390;36473:1;36470;36466:9;36461:14;;36426:450;;;36430:14;36892:4;36885:11;;36912:3;36905:10;;35966:955;;;;;35786:1135;;;;:::o;36927:485::-;37126:4;37164:2;37153:9;37149:18;37141:26;;37213:9;37207:4;37203:20;37199:1;37188:9;37184:17;37177:47;37241:164;37400:4;37391:6;37241:164;:::i;:::-;37233:172;;36927:485;;;;:::o;37418:180::-;37466:77;37463:1;37456:88;37563:4;37560:1;37553:15;37587:4;37584:1;37577:15;37604:320;37648:6;37685:1;37679:4;37675:12;37665:22;;37732:1;37726:4;37722:12;37753:18;37743:81;;37809:4;37801:6;37797:17;37787:27;;37743:81;37871:2;37863:6;37860:14;37840:18;37837:38;37834:84;;37890:18;;:::i;:::-;37834:84;37655:269;37604:320;;;:::o;37930:180::-;37978:77;37975:1;37968:88;38075:4;38072:1;38065:15;38099:4;38096:1;38089:15;38116:180;38164:77;38161:1;38154:88;38261:4;38258:1;38251:15;38285:4;38282:1;38275:15;38302:194;38342:4;38362:20;38380:1;38362:20;:::i;:::-;38357:25;;38396:20;38414:1;38396:20;:::i;:::-;38391:25;;38440:1;38437;38433:9;38425:17;;38464:1;38458:4;38455:11;38452:37;;;38469:18;;:::i;:::-;38452:37;38302:194;;;;:::o;38502:410::-;38542:7;38565:20;38583:1;38565:20;:::i;:::-;38560:25;;38599:20;38617:1;38599:20;:::i;:::-;38594:25;;38654:1;38651;38647:9;38676:30;38694:11;38676:30;:::i;:::-;38665:41;;38855:1;38846:7;38842:15;38839:1;38836:22;38816:1;38809:9;38789:83;38766:139;;38885:18;;:::i;:::-;38766:139;38550:362;38502:410;;;;:::o;38918:180::-;38966:77;38963:1;38956:88;39063:4;39060:1;39053:15;39087:4;39084:1;39077:15;39104:185;39144:1;39161:20;39179:1;39161:20;:::i;:::-;39156:25;;39195:20;39213:1;39195:20;:::i;:::-;39190:25;;39234:1;39224:35;;39239:18;;:::i;:::-;39224:35;39281:1;39278;39274:9;39269:14;;39104:185;;;;:::o;39295:191::-;39335:3;39354:20;39372:1;39354:20;:::i;:::-;39349:25;;39388:20;39406:1;39388:20;:::i;:::-;39383:25;;39431:1;39428;39424:9;39417:16;;39452:3;39449:1;39446:10;39443:36;;;39459:18;;:::i;:::-;39443:36;39295:191;;;;:::o;39492:332::-;39613:4;39651:2;39640:9;39636:18;39628:26;;39664:71;39732:1;39721:9;39717:17;39708:6;39664:71;:::i;:::-;39745:72;39813:2;39802:9;39798:18;39789:6;39745:72;:::i;:::-;39492:332;;;;;:::o;39830:::-;39951:4;39989:2;39978:9;39974:18;39966:26;;40002:71;40070:1;40059:9;40055:17;40046:6;40002:71;:::i;:::-;40083:72;40151:2;40140:9;40136:18;40127:6;40083:72;:::i;:::-;39830:332;;;;;:::o;40168:143::-;40225:5;40256:6;40250:13;40241:22;;40272:33;40299:5;40272:33;:::i;:::-;40168:143;;;;:::o;40317:351::-;40387:6;40436:2;40424:9;40415:7;40411:23;40407:32;40404:119;;;40442:79;;:::i;:::-;40404:119;40562:1;40587:64;40643:7;40634:6;40623:9;40619:22;40587:64;:::i;:::-;40577:74;;40533:128;40317:351;;;;:::o;40674:233::-;40713:3;40736:24;40754:5;40736:24;:::i;:::-;40727:33;;40782:66;40775:5;40772:77;40769:103;;40852:18;;:::i;:::-;40769:103;40899:1;40892:5;40888:13;40881:20;;40674:233;;;:::o;40913:171::-;40952:3;40975:24;40993:5;40975:24;:::i;:::-;40966:33;;41021:4;41014:5;41011:15;41008:41;;41029:18;;:::i;:::-;41008:41;41076:1;41069:5;41065:13;41058:20;;40913:171;;;:::o;41090:193::-;41129:3;41148:19;41165:1;41148:19;:::i;:::-;41143:24;;41181:19;41198:1;41181:19;:::i;:::-;41176:24;;41223:1;41220;41216:9;41209:16;;41246:6;41241:3;41238:15;41235:41;;;41256:18;;:::i;:::-;41235:41;41090:193;;;;:::o;41289:275::-;41328:7;41351:19;41368:1;41351:19;:::i;:::-;41346:24;;41384:19;41401:1;41384:19;:::i;:::-;41379:24;;41438:1;41435;41431:9;41460:29;41477:11;41460:29;:::i;:::-;41449:40;;41521:11;41512:7;41509:24;41499:58;;41537:18;;:::i;:::-;41499:58;41336:228;41289:275;;;;:::o;41570:171::-;41608:3;41631:23;41648:5;41631:23;:::i;:::-;41622:32;;41676:6;41669:5;41666:17;41663:43;;41686:18;;:::i;:::-;41663:43;41733:1;41726:5;41722:13;41715:20;;41570:171;;;:::o;41747:422::-;41886:4;41924:2;41913:9;41909:18;41901:26;;41937:65;41999:1;41988:9;41984:17;41975:6;41937:65;:::i;:::-;42012:70;42078:2;42067:9;42063:18;42054:6;42012:70;:::i;:::-;42092;42158:2;42147:9;42143:18;42134:6;42092:70;:::i;:::-;41747:422;;;;;;:::o;42175:141::-;42224:4;42247:3;42239:11;;42270:3;42267:1;42260:14;42304:4;42301:1;42291:18;42283:26;;42175:141;;;:::o;42322:93::-;42359:6;42406:2;42401;42394:5;42390:14;42386:23;42376:33;;42322:93;;;:::o;42421:107::-;42465:8;42515:5;42509:4;42505:16;42484:37;;42421:107;;;;:::o;42534:393::-;42603:6;42653:1;42641:10;42637:18;42676:97;42706:66;42695:9;42676:97;:::i;:::-;42794:39;42824:8;42813:9;42794:39;:::i;:::-;42782:51;;42866:4;42862:9;42855:5;42851:21;42842:30;;42915:4;42905:8;42901:19;42894:5;42891:30;42881:40;;42610:317;;42534:393;;;;;:::o;42933:142::-;42983:9;43016:53;43034:34;43043:24;43061:5;43043:24;:::i;:::-;43034:34;:::i;:::-;43016:53;:::i;:::-;43003:66;;42933:142;;;:::o;43081:75::-;43124:3;43145:5;43138:12;;43081:75;;;:::o;43162:269::-;43272:39;43303:7;43272:39;:::i;:::-;43333:91;43382:41;43406:16;43382:41;:::i;:::-;43374:6;43367:4;43361:11;43333:91;:::i;:::-;43327:4;43320:105;43238:193;43162:269;;;:::o;43437:73::-;43482:3;43503:1;43496:8;;43437:73;:::o;43516:189::-;43593:32;;:::i;:::-;43634:65;43692:6;43684;43678:4;43634:65;:::i;:::-;43569:136;43516:189;;:::o;43711:186::-;43771:120;43788:3;43781:5;43778:14;43771:120;;;43842:39;43879:1;43872:5;43842:39;:::i;:::-;43815:1;43808:5;43804:13;43795:22;;43771:120;;;43711:186;;:::o;43903:543::-;44004:2;43999:3;43996:11;43993:446;;;44038:38;44070:5;44038:38;:::i;:::-;44122:29;44140:10;44122:29;:::i;:::-;44112:8;44108:44;44305:2;44293:10;44290:18;44287:49;;;44326:8;44311:23;;44287:49;44349:80;44405:22;44423:3;44405:22;:::i;:::-;44395:8;44391:37;44378:11;44349:80;:::i;:::-;44008:431;;43993:446;43903:543;;;:::o;44452:117::-;44506:8;44556:5;44550:4;44546:16;44525:37;;44452:117;;;;:::o;44575:169::-;44619:6;44652:51;44700:1;44696:6;44688:5;44685:1;44681:13;44652:51;:::i;:::-;44648:56;44733:4;44727;44723:15;44713:25;;44626:118;44575:169;;;;:::o;44749:295::-;44825:4;44971:29;44996:3;44990:4;44971:29;:::i;:::-;44963:37;;45033:3;45030:1;45026:11;45020:4;45017:21;45009:29;;44749:295;;;;:::o;45049:1395::-;45166:37;45199:3;45166:37;:::i;:::-;45268:18;45260:6;45257:30;45254:56;;;45290:18;;:::i;:::-;45254:56;45334:38;45366:4;45360:11;45334:38;:::i;:::-;45419:67;45479:6;45471;45465:4;45419:67;:::i;:::-;45513:1;45537:4;45524:17;;45569:2;45561:6;45558:14;45586:1;45581:618;;;;46243:1;46260:6;46257:77;;;46309:9;46304:3;46300:19;46294:26;46285:35;;46257:77;46360:67;46420:6;46413:5;46360:67;:::i;:::-;46354:4;46347:81;46216:222;45551:887;;45581:618;45633:4;45629:9;45621:6;45617:22;45667:37;45699:4;45667:37;:::i;:::-;45726:1;45740:208;45754:7;45751:1;45748:14;45740:208;;;45833:9;45828:3;45824:19;45818:26;45810:6;45803:42;45884:1;45876:6;45872:14;45862:24;;45931:2;45920:9;45916:18;45903:31;;45777:4;45774:1;45770:12;45765:17;;45740:208;;;45976:6;45967:7;45964:19;45961:179;;;46034:9;46029:3;46025:19;46019:26;46077:48;46119:4;46111:6;46107:17;46096:9;46077:48;:::i;:::-;46069:6;46062:64;45984:156;45961:179;46186:1;46182;46174:6;46170:14;46166:22;46160:4;46153:36;45588:611;;;45551:887;;45141:1303;;;45049:1395;;:::o;46450:533::-;46619:4;46657:2;46646:9;46642:18;46634:26;;46706:9;46700:4;46696:20;46692:1;46681:9;46677:17;46670:47;46734:78;46807:4;46798:6;46734:78;:::i;:::-;46726:86;;46822:72;46890:2;46879:9;46875:18;46866:6;46822:72;:::i;:::-;46904;46972:2;46961:9;46957:18;46948:6;46904:72;:::i;:::-;46450:533;;;;;;:::o;46989:332::-;47110:4;47148:2;47137:9;47133:18;47125:26;;47161:71;47229:1;47218:9;47214:17;47205:6;47161:71;:::i;:::-;47242:72;47310:2;47299:9;47295:18;47286:6;47242:72;:::i;:::-;46989:332;;;;;:::o;47327:442::-;47476:4;47514:2;47503:9;47499:18;47491:26;;47527:71;47595:1;47584:9;47580:17;47571:6;47527:71;:::i;:::-;47608:72;47676:2;47665:9;47661:18;47652:6;47608:72;:::i;:::-;47690;47758:2;47747:9;47743:18;47734:6;47690:72;:::i;:::-;47327:442;;;;;;:::o",
        "linkReferences": {},
        "immutableReferences": {
            "41016": [
                {
                    "start": 3745,
                    "length": 32
                },
                {
                    "start": 4626,
                    "length": 32
                },
                {
                    "start": 6377,
                    "length": 32
                },
                {
                    "start": 6526,
                    "length": 32
                },
                {
                    "start": 6812,
                    "length": 32
                },
                {
                    "start": 8334,
                    "length": 32
                },
                {
                    "start": 8636,
                    "length": 32
                },
                {
                    "start": 12604,
                    "length": 32
                }
            ],
            "41018": [
                {
                    "start": 6570,
                    "length": 32
                },
                {
                    "start": 6778,
                    "length": 32
                },
                {
                    "start": 6882,
                    "length": 32
                },
                {
                    "start": 10295,
                    "length": 32
                },
                {
                    "start": 10339,
                    "length": 32
                }
            ]
        }
    },
    "methodIdentifiers": {
        "APPROVAL_THRESHOLD()": "3ab34290",
        "DIVIDER()": "62043bd8",
        "FEE()": "c57981b5",
        "MAX_CAMPAIGN_DURATION()": "8c7bc838",
        "MAX_MILESTONES()": "4c05abeb",
        "MAX_MILESTONE_DAYS()": "96c1d8f1",
        "MAX_STRING_LENGTH()": "34ccc5ea",
        "MAX_TIERS()": "07c3d4af",
        "MIN_CAMPAIGN_GOAL()": "a01a633d",
        "MIN_MILESTONES()": "4a6a49f4",
        "MIN_MILESTONE_PERCENTAGE()": "3a6600fe",
        "MIN_TIERS()": "1d3c3603",
        "MIN_TIER_CONTRIBUTION()": "6a4a340c",
        "VOTING_PERIOD()": "b1610d7e",
        "accumulatedFees()": "587f5ed7",
        "campaignHasContributions(uint256)": "932e109e",
        "campaignMilestones(uint256,uint256)": "3178492a",
        "campaignTiers(uint256,uint256)": "108f9c0b",
        "campaigns(uint256)": "141961bc",
        "contribute(uint256,uint256,uint8)": "77d6cf19",
        "contributions(uint256,address)": "3d891f59",
        "contributorTiers(uint256,address)": "0e222a08",
        "createCampaign(string,uint256,string,uint256,(string,string,uint256,uint256,uint256)[],(string,uint8,uint256,uint16,uint16,bool,bool)[])": "d4ee247e",
        "finalizeMilestoneVoting(uint256,uint256)": "83716004",
        "getAccumulatedFees()": "5df45a37",
        "getCampaign(uint256)": "5598f8cc",
        "getCampaignCount()": "6caa9218",
        "getCampaignMilestones(uint256)": "f91e4b29",
        "getCampaignTiers(uint256)": "d87c8c7f",
        "getContribution(uint256,address)": "e081dbf9",
        "getContributorTier(uint256,address)": "797adde4",
        "getMilestone(uint256,uint256)": "8ed9895c",
        "getOwner()": "893d20e8",
        "getTotalContributors(uint256)": "099107ad",
        "getUSDCAddress()": "bc06e81d",
        "milestoneVotes(uint256,uint256,address)": "e653dabd",
        "milestoneVotingDeadline(uint256,uint256)": "583fa505",
        "owner()": "8da5cb5b",
        "refund(uint256)": "278ecde1",
        "releaseMilestoneFunds(uint256,uint256)": "3de1bb15",
        "totalContributors(uint256)": "88e951dd",
        "usdc()": "3e413bee",
        "voteMilestone(uint256,uint256,bool)": "918cb241",
        "withdraw(uint256)": "2e1a7d4d",
        "withdrawFees()": "476343ee"
    },
    "rawMetadata": "{\"compiler\":{\"version\":\"0.8.30+commit.73712a01\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_usdcAddress\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"CrowdFunding__AlreadyVoted\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__AlreadyWithdrawn\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__CampaignDoesNotExist\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__CampaignHasEnded\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__CampaignHasMilestones\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__CampaignRaisedEnoughMoney\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__CampaignStillActive\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__CampaignTierDoesNotExist\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__ContributionBelowTierMinimum\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__DescriptionTooLong\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__DurationMustBeGreaterThanZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__DurationTooLong\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__GoalTooLow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__InsufficientAllowance\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__InvalidMilestoneCount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__InvalidTierCount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneAlreadyReleased\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneDeadlineNotReached\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneDeadlineTooLong\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneDeadlinesNotSequential\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneDoesNotExist\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneFundsAlreadyReleased\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneNotApproved\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestonePercentageMustSumTo100\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestonePercentageTooLow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__MilestoneVotingPeriodExpired\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__NoFeesToWithdraw\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__NotAContributor\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__NotEnoughMoneyRaised\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__NotEnoughVotesToApprove\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__NothingToRefund\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__OnlyCreatorCanReleaseFunds\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__OnlyOwnerOfCampaignCanWithdraw\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__StringTooLong\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__TierFull\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__TierMinContributionTooLow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__TiersMustBeSorted\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__TitleTooLong\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__ValueMustBeGreaterThanZero\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CrowdFunding__YouCantContributeYourOwnCampaign\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"SafeERC20FailedOperation\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"contributor\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"CampaignContributed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"title\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"goal\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"duration\",\"type\":\"uint256\"}],\"name\":\"CampaignCreated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"contributor\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"CampaignRefunded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\"}],\"name\":\"CampaignWithdrawn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"FeesWithdrawn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"milestoneId\",\"type\":\"uint256\"}],\"name\":\"MilestoneApproved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"milestoneId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\"}],\"name\":\"MilestoneFundsReleased\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"milestoneId\",\"type\":\"uint256\"}],\"name\":\"MilestoneRejected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"milestoneId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"voter\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"vote\",\"type\":\"bool\"},{\"indexed\":false,\"internalType\":\"uint16\",\"name\":\"votesFor\",\"type\":\"uint16\"},{\"indexed\":false,\"internalType\":\"uint16\",\"name\":\"votesAgainst\",\"type\":\"uint16\"}],\"name\":\"MilestoneVoted\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"APPROVAL_THRESHOLD\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"DIVIDER\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"FEE\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_CAMPAIGN_DURATION\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_MILESTONES\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_MILESTONE_DAYS\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_STRING_LENGTH\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_TIERS\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MIN_CAMPAIGN_GOAL\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MIN_MILESTONES\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MIN_MILESTONE_PERCENTAGE\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MIN_TIERS\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MIN_TIER_CONTRIBUTION\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"VOTING_PERIOD\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"accumulatedFees\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"campaignHasContributions\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"campaignMilestones\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"percentage\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint16\",\"name\":\"votesFor\",\"type\":\"uint16\"},{\"internalType\":\"uint16\",\"name\":\"votesAgainst\",\"type\":\"uint16\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"fundsReleased\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"campaignTiers\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"minContribution\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"maxBackers\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"currentBackers\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"campaigns\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"title\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"goal\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"raised\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"duration\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"enum CrowdFunding.States\",\"name\":\"state\",\"type\":\"uint8\"},{\"internalType\":\"bool\",\"name\":\"fundsWithdrawn\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"tierIndex\",\"type\":\"uint8\"}],\"name\":\"contribute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"contributions\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"contributorTiers\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_title\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_goal\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"_description\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_durationInDays\",\"type\":\"uint256\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"minContribution\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"maxBackers\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"currentBackers\",\"type\":\"uint256\"}],\"internalType\":\"struct CrowdFunding.RewardTier[]\",\"name\":\"_tiers\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"percentage\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint16\",\"name\":\"votesFor\",\"type\":\"uint16\"},{\"internalType\":\"uint16\",\"name\":\"votesAgainst\",\"type\":\"uint16\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"fundsReleased\",\"type\":\"bool\"}],\"internalType\":\"struct CrowdFunding.Milestone[]\",\"name\":\"_milestones\",\"type\":\"tuple[]\"}],\"name\":\"createCampaign\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"milestoneId\",\"type\":\"uint256\"}],\"name\":\"finalizeMilestoneVoting\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getAccumulatedFees\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"}],\"name\":\"getCampaign\",\"outputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"title\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"goal\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"raised\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"duration\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"enum CrowdFunding.States\",\"name\":\"state\",\"type\":\"uint8\"},{\"internalType\":\"bool\",\"name\":\"fundsWithdrawn\",\"type\":\"bool\"}],\"internalType\":\"struct CrowdFunding.Campaign\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getCampaignCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"}],\"name\":\"getCampaignMilestones\",\"outputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"percentage\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint16\",\"name\":\"votesFor\",\"type\":\"uint16\"},{\"internalType\":\"uint16\",\"name\":\"votesAgainst\",\"type\":\"uint16\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"fundsReleased\",\"type\":\"bool\"}],\"internalType\":\"struct CrowdFunding.Milestone[]\",\"name\":\"\",\"type\":\"tuple[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"}],\"name\":\"getCampaignTiers\",\"outputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"minContribution\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"maxBackers\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"currentBackers\",\"type\":\"uint256\"}],\"internalType\":\"struct CrowdFunding.RewardTier[]\",\"name\":\"\",\"type\":\"tuple[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"contributor\",\"type\":\"address\"}],\"name\":\"getContribution\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"contributor\",\"type\":\"address\"}],\"name\":\"getContributorTier\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"milestoneId\",\"type\":\"uint256\"}],\"name\":\"getMilestone\",\"outputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"percentage\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint16\",\"name\":\"votesFor\",\"type\":\"uint16\"},{\"internalType\":\"uint16\",\"name\":\"votesAgainst\",\"type\":\"uint16\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"fundsReleased\",\"type\":\"bool\"}],\"internalType\":\"struct CrowdFunding.Milestone\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getOwner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"}],\"name\":\"getTotalContributors\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getUSDCAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"milestoneVotes\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"milestoneVotingDeadline\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"}],\"name\":\"refund\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"milestoneId\",\"type\":\"uint256\"}],\"name\":\"releaseMilestoneFunds\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"totalContributors\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"usdc\",\"outputs\":[{\"internalType\":\"contract IERC20\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"milestoneId\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"vote\",\"type\":\"bool\"}],\"name\":\"voteMilestone\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"campaignId\",\"type\":\"uint256\"}],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdrawFees\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"author\":\"Your Name\",\"details\":\"Uses USDC as the contribution token and implements pull payment pattern for security\",\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}],\"SafeERC20FailedOperation(address)\":[{\"details\":\"An operation with an ERC-20 token failed.\"}]},\"kind\":\"dev\",\"methods\":{\"constructor\":{\"details\":\"Use these addresses:      Sepolia: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238      Mainnet: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48      Base: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913      Polygon: 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359\",\"params\":{\"_usdcAddress\":\"Address of the USDC token contract\"}},\"contribute(uint256,uint256,uint8)\":{\"details\":\"User must approve this contract to spend USDC first\",\"params\":{\"amount\":\"Amount of USDC to contribute (6 decimals)\",\"campaignId\":\"The campaign ID to contribute to\",\"tierIndex\":\"The reward tier index to join\"}},\"createCampaign(string,uint256,string,uint256,(string,string,uint256,uint256,uint256)[],(string,uint8,uint256,uint16,uint16,bool,bool)[])\":{\"params\":{\"_description\":\"Campaign description (max 200 chars)\",\"_durationInDays\":\"Campaign duration in days\",\"_goal\":\"Funding goal in USDC (6 decimals)\",\"_milestones\":\"Array of milestones (2-5 milestones required, must sum to 100%)\",\"_tiers\":\"Array of reward tiers (1-5 tiers required)\",\"_title\":\"Campaign title (max 200 chars)\"}},\"finalizeMilestoneVoting(uint256,uint256)\":{\"details\":\"Anyone can call this to finalize the vote\",\"params\":{\"campaignId\":\"Campaign ID\",\"milestoneId\":\"Milestone index\"}},\"refund(uint256)\":{\"details\":\"Available after campaign ends and goal not met\",\"params\":{\"campaignId\":\"Campaign ID\"}},\"releaseMilestoneFunds(uint256,uint256)\":{\"details\":\"Only campaign creator can call. Milestones must be released sequentially.\",\"params\":{\"campaignId\":\"Campaign ID\",\"milestoneId\":\"Milestone index\"}},\"voteMilestone(uint256,uint256,bool)\":{\"details\":\"Only contributors can vote once per milestone. Voting opens after milestone deadline.\",\"params\":{\"campaignId\":\"Campaign ID\",\"milestoneId\":\"Milestone index (0, 1, 2...)\",\"vote\":\"true = approve, false = reject\"}},\"withdraw(uint256)\":{\"details\":\"Uses pull payment pattern for security. 3% fee is deducted.\",\"params\":{\"campaignId\":\"Campaign ID\"}},\"withdrawFees()\":{\"details\":\"Uses pull payment pattern\"}},\"title\":\"CrowdFunding\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"constructor\":{\"notice\":\"Initialize the crowdfunding contract\"},\"contribute(uint256,uint256,uint8)\":{\"notice\":\"Contribute USDC to a campaign\"},\"createCampaign(string,uint256,string,uint256,(string,string,uint256,uint256,uint256)[],(string,uint8,uint256,uint16,uint16,bool,bool)[])\":{\"notice\":\"Creates a new crowdfunding campaign\"},\"finalizeMilestoneVoting(uint256,uint256)\":{\"notice\":\"Finalize milestone voting after voting period ends\"},\"refund(uint256)\":{\"notice\":\"Refund contribution if campaign failed to reach goal\"},\"releaseMilestoneFunds(uint256,uint256)\":{\"notice\":\"Release funds for an approved milestone\"},\"voteMilestone(uint256,uint256,bool)\":{\"notice\":\"Vote on a milestone completion\"},\"withdraw(uint256)\":{\"notice\":\"Withdraw all funds at once (only for campaigns WITHOUT milestones)\"},\"withdrawFees()\":{\"notice\":\"Platform owner withdraws accumulated fees\"}},\"notice\":\"Decentralized crowdfunding platform with milestone-based fund releases and reward tiers\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/CrowdFunding.sol\":\"CrowdFunding\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"]},\"sources\":{\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0x9b6b3e7803bc5f2f8cd7ad57db8ac1def61a9930a5a3107df4882e028a9605d7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da62d6be1f5c6edf577f0cb45666a8aa9c2086a4bac87d95d65f02e2f4c36a4b\",\"dweb:/ipfs/QmNkpvBpoCMvX8JwAFNSc5XxJ2q5BXJpL5L1txb4QkqVFF\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0xde7e9fd9aee8d4f40772f96bb3b58836cbc6dfc0227014a061947f8821ea9724\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://11fea9f8bc98949ac6709f0c1699db7430d2948137aa94d5a9e95a91f61a710a\",\"dweb:/ipfs/QmQdfRXxQjwP6yn3DVo1GHPpriKNcFghSPi94Z1oKEFUNS\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0xce41876e78d1badc0512229b4d14e4daf83bc1003d7f83978d18e0e56f965b9c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a2608291cb038b388d80b79a06b6118a42f7894ff67b7da10ec0dbbf5b2973ba\",\"dweb:/ipfs/QmWohqcBLbcxmA4eGPhZDXe5RYMMEEpFq22nfkaUMvTfw1\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xe06a3f08a987af6ad2e1c1e774405d4fe08f1694b67517438b467cecf0da0ef7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://df6f0c459663c9858b6cba2cda1d14a7d05a985bed6d2de72bd8e78c25ee79db\",\"dweb:/ipfs/QmeTTxZ7qVk9rjEv2R4CpCwdf8UMCcRqDNMvzNxHc3Fnn9\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x982c5cb790ab941d1e04f807120a71709d4c313ba0bfc16006447ffbd27fbbd5\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8150ceb4ac947e8a442b2a9c017e01e880b2be2dd958f1fa9bc405f4c5a86508\",\"dweb:/ipfs/QmbcBmFX66AY6Kbhnd5gx7zpkgqnUafo43XnmayAM7zVdB\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0x11a5a79827df29e915a12740caf62fe21ebe27c08c9ae3e09abe9ee3ba3866d3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3cf0c69ab827e3251db9ee6a50647d62c90ba580a4d7bbff21f2bea39e7b2f4a\",\"dweb:/ipfs/QmZiKwtKU1SBX4RGfQtY7PZfiapbbu6SZ9vizGQD9UHjRA\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x79796192ec90263f21b464d5bc90b777a525971d3de8232be80d9c4f9fb353b8\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://f6fda447a62815e8064f47eff0dd1cf58d9207ad69b5d32280f8d7ed1d1e4621\",\"dweb:/ipfs/QmfDRc7pxfaXB2Dh9np5Uf29Na3pQ7tafRS684wd3GLjVL\"]},\"src/CrowdFunding.sol\":{\"keccak256\":\"0xe8ad22207e1bf55af0f5d142de6188bf1efd1bd62b0d1e615ab6b98bf3cba9c3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://846f0a245aa1f474bbbb06ad21d659d093ff71718a0c2ed33644df4cbe3d951c\",\"dweb:/ipfs/QmWABWcqr7jSkKbKZg4JY18x86V2E5PWcEx1b7UHctpmkF\"]}},\"version\":1}",
    "metadata": {
        "compiler": {
            "version": "0.8.30+commit.73712a01"
        },
        "language": "Solidity",
        "output": {
            "abi": [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_usdcAddress",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__AlreadyVoted"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__AlreadyWithdrawn"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__CampaignDoesNotExist"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__CampaignHasEnded"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__CampaignHasMilestones"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__CampaignRaisedEnoughMoney"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__CampaignStillActive"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__CampaignTierDoesNotExist"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__ContributionBelowTierMinimum"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__DescriptionTooLong"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__DurationMustBeGreaterThanZero"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__DurationTooLong"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__GoalTooLow"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__InsufficientAllowance"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__InvalidMilestoneCount"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__InvalidTierCount"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneAlreadyReleased"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneDeadlineNotReached"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneDeadlineTooLong"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneDeadlinesNotSequential"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneDoesNotExist"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneFundsAlreadyReleased"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneNotApproved"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneNotFound"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestonePercentageMustSumTo100"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestonePercentageTooLow"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__MilestoneVotingPeriodExpired"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__NoFeesToWithdraw"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__NotAContributor"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__NotEnoughMoneyRaised"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__NotEnoughVotesToApprove"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__NothingToRefund"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__OnlyCreatorCanReleaseFunds"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__OnlyOwnerOfCampaignCanWithdraw"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__StringTooLong"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__TierFull"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__TierMinContributionTooLow"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__TiersMustBeSorted"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__TitleTooLong"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__ValueMustBeGreaterThanZero"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "CrowdFunding__YouCantContributeYourOwnCampaign"
                },
                {
                    "inputs": [],
                    "type": "error",
                    "name": "ReentrancyGuardReentrantCall"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "token",
                            "type": "address"
                        }
                    ],
                    "type": "error",
                    "name": "SafeERC20FailedOperation"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "contributor",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "CampaignContributed",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string",
                            "indexed": false
                        },
                        {
                            "internalType": "uint256",
                            "name": "goal",
                            "type": "uint256",
                            "indexed": false
                        },
                        {
                            "internalType": "uint256",
                            "name": "duration",
                            "type": "uint256",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "CampaignCreated",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "contributor",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "CampaignRefunded",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256",
                            "indexed": false
                        },
                        {
                            "internalType": "uint256",
                            "name": "fee",
                            "type": "uint256",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "CampaignWithdrawn",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "FeesWithdrawn",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "milestoneId",
                            "type": "uint256",
                            "indexed": true
                        }
                    ],
                    "type": "event",
                    "name": "MilestoneApproved",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "milestoneId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256",
                            "indexed": false
                        },
                        {
                            "internalType": "uint256",
                            "name": "fee",
                            "type": "uint256",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "MilestoneFundsReleased",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "milestoneId",
                            "type": "uint256",
                            "indexed": true
                        }
                    ],
                    "type": "event",
                    "name": "MilestoneRejected",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "milestoneId",
                            "type": "uint256",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "voter",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "bool",
                            "name": "vote",
                            "type": "bool",
                            "indexed": false
                        },
                        {
                            "internalType": "uint16",
                            "name": "votesFor",
                            "type": "uint16",
                            "indexed": false
                        },
                        {
                            "internalType": "uint16",
                            "name": "votesAgainst",
                            "type": "uint16",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "MilestoneVoted",
                    "anonymous": false
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "APPROVAL_THRESHOLD",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "DIVIDER",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "FEE",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MAX_CAMPAIGN_DURATION",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MAX_MILESTONES",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MAX_MILESTONE_DAYS",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MAX_STRING_LENGTH",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MAX_TIERS",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MIN_CAMPAIGN_GOAL",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MIN_MILESTONES",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MIN_MILESTONE_PERCENTAGE",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MIN_TIERS",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "MIN_TIER_CONTRIBUTION",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "VOTING_PERIOD",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "accumulatedFees",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "campaignHasContributions",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "campaignMilestones",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "percentage",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deadline",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint16",
                            "name": "votesFor",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint16",
                            "name": "votesAgainst",
                            "type": "uint16"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "fundsReleased",
                            "type": "bool"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "campaignTiers",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "minContribution",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "maxBackers",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "currentBackers",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "campaigns",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "goal",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "raised",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "duration",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        },
                        {
                            "internalType": "enum CrowdFunding.States",
                            "name": "state",
                            "type": "uint8"
                        },
                        {
                            "internalType": "bool",
                            "name": "fundsWithdrawn",
                            "type": "bool"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint8",
                            "name": "tierIndex",
                            "type": "uint8"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "contribute"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "contributions",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "contributorTiers",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_title",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_goal",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_durationInDays",
                            "type": "uint256"
                        },
                        {
                            "internalType": "struct CrowdFunding.RewardTier[]",
                            "name": "_tiers",
                            "type": "tuple[]",
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "minContribution",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "maxBackers",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "currentBackers",
                                    "type": "uint256"
                                }
                            ]
                        },
                        {
                            "internalType": "struct CrowdFunding.Milestone[]",
                            "name": "_milestones",
                            "type": "tuple[]",
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "percentage",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "deadline",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint16",
                                    "name": "votesFor",
                                    "type": "uint16"
                                },
                                {
                                    "internalType": "uint16",
                                    "name": "votesAgainst",
                                    "type": "uint16"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "approved",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "fundsReleased",
                                    "type": "bool"
                                }
                            ]
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "createCampaign"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "milestoneId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "finalizeMilestoneVoting"
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getAccumulatedFees",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getCampaign",
                    "outputs": [
                        {
                            "internalType": "struct CrowdFunding.Campaign",
                            "name": "",
                            "type": "tuple",
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "title",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "goal",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "raised",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "duration",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                },
                                {
                                    "internalType": "address",
                                    "name": "creator",
                                    "type": "address"
                                },
                                {
                                    "internalType": "enum CrowdFunding.States",
                                    "name": "state",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "fundsWithdrawn",
                                    "type": "bool"
                                }
                            ]
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getCampaignCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getCampaignMilestones",
                    "outputs": [
                        {
                            "internalType": "struct CrowdFunding.Milestone[]",
                            "name": "",
                            "type": "tuple[]",
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "percentage",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "deadline",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint16",
                                    "name": "votesFor",
                                    "type": "uint16"
                                },
                                {
                                    "internalType": "uint16",
                                    "name": "votesAgainst",
                                    "type": "uint16"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "approved",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "fundsReleased",
                                    "type": "bool"
                                }
                            ]
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getCampaignTiers",
                    "outputs": [
                        {
                            "internalType": "struct CrowdFunding.RewardTier[]",
                            "name": "",
                            "type": "tuple[]",
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "minContribution",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "maxBackers",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "currentBackers",
                                    "type": "uint256"
                                }
                            ]
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "contributor",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getContribution",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "contributor",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getContributorTier",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "milestoneId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getMilestone",
                    "outputs": [
                        {
                            "internalType": "struct CrowdFunding.Milestone",
                            "name": "",
                            "type": "tuple",
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "percentage",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "deadline",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint16",
                                    "name": "votesFor",
                                    "type": "uint16"
                                },
                                {
                                    "internalType": "uint16",
                                    "name": "votesAgainst",
                                    "type": "uint16"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "approved",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "fundsReleased",
                                    "type": "bool"
                                }
                            ]
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getOwner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getTotalContributors",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getUSDCAddress",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "milestoneVotes",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "milestoneVotingDeadline",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "refund"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "milestoneId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "releaseMilestoneFunds"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "totalContributors",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "usdc",
                    "outputs": [
                        {
                            "internalType": "contract IERC20",
                            "name": "",
                            "type": "address"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "milestoneId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "vote",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "voteMilestone"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "campaignId",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "withdraw"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "withdrawFees"
                }
            ],
            "devdoc": {
                "kind": "dev",
                "methods": {
                    "constructor": {
                        "details": "Use these addresses:      Sepolia: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238      Mainnet: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48      Base: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913      Polygon: 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
                        "params": {
                            "_usdcAddress": "Address of the USDC token contract"
                        }
                    },
                    "contribute(uint256,uint256,uint8)": {
                        "details": "User must approve this contract to spend USDC first",
                        "params": {
                            "amount": "Amount of USDC to contribute (6 decimals)",
                            "campaignId": "The campaign ID to contribute to",
                            "tierIndex": "The reward tier index to join"
                        }
                    },
                    "createCampaign(string,uint256,string,uint256,(string,string,uint256,uint256,uint256)[],(string,uint8,uint256,uint16,uint16,bool,bool)[])": {
                        "params": {
                            "_description": "Campaign description (max 200 chars)",
                            "_durationInDays": "Campaign duration in days",
                            "_goal": "Funding goal in USDC (6 decimals)",
                            "_milestones": "Array of milestones (2-5 milestones required, must sum to 100%)",
                            "_tiers": "Array of reward tiers (1-5 tiers required)",
                            "_title": "Campaign title (max 200 chars)"
                        }
                    },
                    "finalizeMilestoneVoting(uint256,uint256)": {
                        "details": "Anyone can call this to finalize the vote",
                        "params": {
                            "campaignId": "Campaign ID",
                            "milestoneId": "Milestone index"
                        }
                    },
                    "refund(uint256)": {
                        "details": "Available after campaign ends and goal not met",
                        "params": {
                            "campaignId": "Campaign ID"
                        }
                    },
                    "releaseMilestoneFunds(uint256,uint256)": {
                        "details": "Only campaign creator can call. Milestones must be released sequentially.",
                        "params": {
                            "campaignId": "Campaign ID",
                            "milestoneId": "Milestone index"
                        }
                    },
                    "voteMilestone(uint256,uint256,bool)": {
                        "details": "Only contributors can vote once per milestone. Voting opens after milestone deadline.",
                        "params": {
                            "campaignId": "Campaign ID",
                            "milestoneId": "Milestone index (0, 1, 2...)",
                            "vote": "true = approve, false = reject"
                        }
                    },
                    "withdraw(uint256)": {
                        "details": "Uses pull payment pattern for security. 3% fee is deducted.",
                        "params": {
                            "campaignId": "Campaign ID"
                        }
                    },
                    "withdrawFees()": {
                        "details": "Uses pull payment pattern"
                    }
                },
                "version": 1
            },
            "userdoc": {
                "kind": "user",
                "methods": {
                    "constructor": {
                        "notice": "Initialize the crowdfunding contract"
                    },
                    "contribute(uint256,uint256,uint8)": {
                        "notice": "Contribute USDC to a campaign"
                    },
                    "createCampaign(string,uint256,string,uint256,(string,string,uint256,uint256,uint256)[],(string,uint8,uint256,uint16,uint16,bool,bool)[])": {
                        "notice": "Creates a new crowdfunding campaign"
                    },
                    "finalizeMilestoneVoting(uint256,uint256)": {
                        "notice": "Finalize milestone voting after voting period ends"
                    },
                    "refund(uint256)": {
                        "notice": "Refund contribution if campaign failed to reach goal"
                    },
                    "releaseMilestoneFunds(uint256,uint256)": {
                        "notice": "Release funds for an approved milestone"
                    },
                    "voteMilestone(uint256,uint256,bool)": {
                        "notice": "Vote on a milestone completion"
                    },
                    "withdraw(uint256)": {
                        "notice": "Withdraw all funds at once (only for campaigns WITHOUT milestones)"
                    },
                    "withdrawFees()": {
                        "notice": "Platform owner withdraws accumulated fees"
                    }
                },
                "version": 1
            }
        },
        "settings": {
            "remappings": [
                "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
                "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
                "forge-std/=lib/forge-std/src/",
                "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
                "openzeppelin-contracts/=lib/openzeppelin-contracts/"
            ],
            "optimizer": {
                "enabled": false,
                "runs": 200
            },
            "metadata": {
                "bytecodeHash": "ipfs"
            },
            "compilationTarget": {
                "src/CrowdFunding.sol": "CrowdFunding"
            },
            "evmVersion": "cancun",
            "libraries": {}
        },
        "sources": {
            "lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol": {
                "keccak256": "0x9b6b3e7803bc5f2f8cd7ad57db8ac1def61a9930a5a3107df4882e028a9605d7",
                "urls": [
                    "bzz-raw://da62d6be1f5c6edf577f0cb45666a8aa9c2086a4bac87d95d65f02e2f4c36a4b",
                    "dweb:/ipfs/QmNkpvBpoCMvX8JwAFNSc5XxJ2q5BXJpL5L1txb4QkqVFF"
                ],
                "license": "MIT"
            },
            "lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol": {
                "keccak256": "0xde7e9fd9aee8d4f40772f96bb3b58836cbc6dfc0227014a061947f8821ea9724",
                "urls": [
                    "bzz-raw://11fea9f8bc98949ac6709f0c1699db7430d2948137aa94d5a9e95a91f61a710a",
                    "dweb:/ipfs/QmQdfRXxQjwP6yn3DVo1GHPpriKNcFghSPi94Z1oKEFUNS"
                ],
                "license": "MIT"
            },
            "lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol": {
                "keccak256": "0xce41876e78d1badc0512229b4d14e4daf83bc1003d7f83978d18e0e56f965b9c",
                "urls": [
                    "bzz-raw://a2608291cb038b388d80b79a06b6118a42f7894ff67b7da10ec0dbbf5b2973ba",
                    "dweb:/ipfs/QmWohqcBLbcxmA4eGPhZDXe5RYMMEEpFq22nfkaUMvTfw1"
                ],
                "license": "MIT"
            },
            "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
                "keccak256": "0xe06a3f08a987af6ad2e1c1e774405d4fe08f1694b67517438b467cecf0da0ef7",
                "urls": [
                    "bzz-raw://df6f0c459663c9858b6cba2cda1d14a7d05a985bed6d2de72bd8e78c25ee79db",
                    "dweb:/ipfs/QmeTTxZ7qVk9rjEv2R4CpCwdf8UMCcRqDNMvzNxHc3Fnn9"
                ],
                "license": "MIT"
            },
            "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol": {
                "keccak256": "0x982c5cb790ab941d1e04f807120a71709d4c313ba0bfc16006447ffbd27fbbd5",
                "urls": [
                    "bzz-raw://8150ceb4ac947e8a442b2a9c017e01e880b2be2dd958f1fa9bc405f4c5a86508",
                    "dweb:/ipfs/QmbcBmFX66AY6Kbhnd5gx7zpkgqnUafo43XnmayAM7zVdB"
                ],
                "license": "MIT"
            },
            "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol": {
                "keccak256": "0x11a5a79827df29e915a12740caf62fe21ebe27c08c9ae3e09abe9ee3ba3866d3",
                "urls": [
                    "bzz-raw://3cf0c69ab827e3251db9ee6a50647d62c90ba580a4d7bbff21f2bea39e7b2f4a",
                    "dweb:/ipfs/QmZiKwtKU1SBX4RGfQtY7PZfiapbbu6SZ9vizGQD9UHjRA"
                ],
                "license": "MIT"
            },
            "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
                "keccak256": "0x79796192ec90263f21b464d5bc90b777a525971d3de8232be80d9c4f9fb353b8",
                "urls": [
                    "bzz-raw://f6fda447a62815e8064f47eff0dd1cf58d9207ad69b5d32280f8d7ed1d1e4621",
                    "dweb:/ipfs/QmfDRc7pxfaXB2Dh9np5Uf29Na3pQ7tafRS684wd3GLjVL"
                ],
                "license": "MIT"
            },
            "src/CrowdFunding.sol": {
                "keccak256": "0xe8ad22207e1bf55af0f5d142de6188bf1efd1bd62b0d1e615ab6b98bf3cba9c3",
                "urls": [
                    "bzz-raw://846f0a245aa1f474bbbb06ad21d659d093ff71718a0c2ed33644df4cbe3d951c",
                    "dweb:/ipfs/QmWABWcqr7jSkKbKZg4JY18x86V2E5PWcEx1b7UHctpmkF"
                ],
                "license": "MIT"
            }
        },
        "version": 1
    },
    "id": 31
}
]

