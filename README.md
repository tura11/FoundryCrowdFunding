# CrowdFunding Smart Contract

A comprehensive, milestone-based crowdfunding platform built on Ethereum with advanced governance features, reward tiers, and community-driven fund distribution.

## 🌟 Overview

This smart contract enables creators to launch USDC-based crowdfunding campaigns with built-in accountability through milestone-based fund releases and contributor voting. Unlike traditional crowdfunding platforms, funds are released progressively as the creator demonstrates completion of predefined milestones, which must be approved by the community of contributors.

## 🎯 Key Features

### Campaign Management
- **USDC-Based Funding**: All contributions and payouts in USDC stablecoin
- **Flexible Campaign Duration**: 1-365 days campaign periods
- **Minimum Goal Protection**: $100 USDC minimum campaign goal
- **Creator Accountability**: Creators cannot contribute to their own campaigns

### Multi-Tier Reward System
- **1-5 Reward Tiers**: Customizable backer reward levels
- **Backer Limits**: Optional caps on tier availability
- **Automatic Tier Upgrades**: Contributors automatically upgrade tiers with additional contributions
- **Minimum Contribution**: 10 USDC minimum per tier

### Milestone-Based Fund Distribution
- **2-5 Milestones per Campaign**: Structured project delivery phases
- **Percentage-Based Allocation**: Milestones must total 100% of funding goal
- **Sequential Release**: Milestones must be completed and approved in order
- **Deadline Enforcement**: Each milestone has a completion deadline

### Community Governance
- **Contributor Voting**: Only campaign backers can vote on milestone completion
- **7-Day Voting Period**: One week after milestone deadline to cast votes
- **51% Approval Threshold**: Dual approval mechanism:
  - 51% of votes cast must approve, AND 51% voter turnout
  - OR 51% of all contributors vote yes
- **Transparent Results**: All votes publicly recorded on-chain

### Financial Safety
- **3% Platform Fee**: Collected on each milestone payout
- **Refund Mechanism**: Full refunds if campaign fails to reach goal
- **No Refunds After Payout**: Once any milestone is paid, refunds are disabled
- **Reentrancy Protection**: All fund transfers protected against reentrancy attacks

## 📋 Technical Specifications

### Contract Architecture

```solidity
CrowdFunding
├── Campaign Management
│   ├── createCampaign()
│   ├── contribute()
│   └── refund()
├── Voting System
│   ├── voteMilestone()
│   └── finalizeMilestoneVoting()
├── Fund Distribution
│   ├── releaseMilestoneFunds()
│   └── withdrawFees()
└── View Functions
    ├── getCampaign()
    ├── getCampaignTiers()
    ├── getCampaignMilestones()
    └── getContribution()
```

### Data Structures

**Campaign**
```solidity
struct Campaign {
    string title;
    uint256 goal;
    uint256 raised;
    uint256 originalGoal;
    uint256 duration;
    string description;
    address creator;
    States state; // Active, Successful, Failed
    bool anyMilestoneReleased;
}
```

**RewardTier**
```solidity
struct RewardTier {
    string name;
    string description;
    uint256 minContribution;
    uint256 maxBackers; // 0 = unlimited
    uint256 currentBackers;
}
```

**Milestone**
```solidity
struct Milestone {
    string description;
    uint8 percentage;
    uint256 deadline;
    uint16 votesFor;
    uint16 votesAgainst;
    bool approved;
    bool fundsReleased;
    bool votingFinalized;
}
```

### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `MIN_CAMPAIGN_GOAL` | 100 USDC | Minimum funding goal |
| `MAX_CAMPAIGN_DURATION` | 365 days | Maximum campaign length |
| `MIN_TIER_CONTRIBUTION` | 10 USDC | Minimum tier contribution |
| `MIN_TIERS` / `MAX_TIERS` | 1 / 5 | Tier count limits |
| `MIN_MILESTONES` / `MAX_MILESTONES` | 2 / 5 | Milestone count limits |
| `MIN_MILESTONE_PERCENTAGE` | 10% | Minimum milestone allocation |
| `MAX_MILESTONE_DAYS` | 365 days | Maximum time per milestone |
| `VOTING_PERIOD` | 7 days | Duration for milestone voting |
| `APPROVAL_THRESHOLD` | 51% | Required approval percentage |
| `FEE` | 3% | Platform fee on payouts |

## 🚀 Getting Started

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Node.js](https://nodejs.org/) (v16+)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/crowdfunding-contract.git
cd crowdfunding-contract

# Install dependencies
forge install

# Compile contracts
forge build
```

### Testing

```bash
# Run all tests
forge test

# Run tests with verbosity
forge test -vvv

# Run specific test
forge test --match-test test_CreateCampaign_Success

# Check code coverage
forge coverage

# Generate coverage report
forge coverage --report lcov
```

### Deployment

```bash
# Deploy to local network
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast

# Deploy to testnet (e.g., Sepolia)
forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify

# Deploy to mainnet
forge script script/Deploy.s.sol --rpc-url $MAINNET_RPC_URL --broadcast --verify
```

## 💡 Usage Examples

### Creating a Campaign

```solidity
// Define reward tiers
RewardTier[] memory tiers = new RewardTier[](2);
tiers[0] = RewardTier({
    name: "Bronze Supporter",
    description: "Early access to updates",
    minContribution: 10 * 10**6, // 10 USDC
    maxBackers: 100,
    currentBackers: 0
});
tiers[1] = RewardTier({
    name: "Gold Supporter",
    description: "Exclusive merchandise + early access",
    minContribution: 50 * 10**6, // 50 USDC
    maxBackers: 50,
    currentBackers: 0
});

// Define milestones
Milestone[] memory milestones = new Milestone[](2);
milestones[0] = Milestone({
    description: "Prototype Development",
    percentage: 60,
    deadline: block.timestamp + 90 days,
    votesFor: 0,
    votesAgainst: 0,
    approved: false,
    fundsReleased: false,
    votingFinalized: false
});
milestones[1] = Milestone({
    description: "Final Production & Delivery",
    percentage: 40,
    deadline: block.timestamp + 180 days,
    votesFor: 0,
    votesAgainst: 0,
    approved: false,
    fundsReleased: false,
    votingFinalized: false
});

// Create campaign
crowdFunding.createCampaign(
    "Revolutionary Widget",
    1000 * 10**6, // 1000 USDC goal
    "Building the future of widgets",
    30, // 30 days duration
    tiers,
    milestones
);
```

### Contributing to a Campaign

```solidity
// Approve USDC spending
usdc.approve(address(crowdFunding), 50 * 10**6);

// Contribute to campaign (tier 1 = Gold Supporter)
crowdFunding.contribute(
    0, // campaignId
    50 * 10**6, // 50 USDC
    1 // tierIndex (Gold)
);
```

### Voting on Milestones

```solidity
// Wait for campaign to end and milestone deadline to pass
// Then vote (true = approve, false = reject)
crowdFunding.voteMilestone(
    0, // campaignId
    0, // milestoneId
    true // vote to approve
);

// After voting period ends, anyone can finalize
crowdFunding.finalizeMilestoneVoting(0, 0);
```

### Releasing Funds

```solidity
// Creator releases approved milestone funds
crowdFunding.releaseMilestoneFunds(
    0, // campaignId
    0 // milestoneId
);
```

### Claiming Refunds

```solidity
// If campaign failed, contributors get refunds
crowdFunding.refund(0); // campaignId
```

## 🔒 Security Features

### Reentrancy Protection
- All external fund transfers protected with `nonReentrant` modifier
- Uses OpenZeppelin's battle-tested `ReentrancyGuard`

### Access Control
- Creator-only functions for fund releases
- Contributor-only voting rights
- Owner-only fee withdrawals

### Input Validation
- String length limits (200 chars)
- Percentage sum validation (milestones must = 100%)
- Sequential deadline enforcement
- Tier sorting verification

### State Management
- Campaign states prevent invalid operations
- Milestone sequential release enforcement
- Vote finalization prevents double-voting

## 📊 Test Coverage

The project includes comprehensive test coverage:

- ✅ Campaign creation and validation
- ✅ Contribution mechanics and tier upgrades
- ✅ Milestone voting and finalization
- ✅ Fund release mechanisms
- ✅ Refund processes
- ✅ Fee collection
- ✅ Edge cases and error conditions
- ✅ Event emissions
- ✅ Modifier validations

**Current Coverage: 100%**

## 🛠️ Built With

- **Solidity ^0.8.28** - Smart contract language
- **Foundry** - Development framework
- **OpenZeppelin Contracts** - Security libraries
  - SafeERC20 - Safe token transfers
  - ReentrancyGuard - Reentrancy protection
  - IERC20 - Token interface

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Tura11**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository.

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release
- Campaign creation with tiers and milestones
- Contributor voting system
- Sequential milestone fund releases
- Refund mechanism
- Platform fee collection

## ⚠️ Disclaimer

This smart contract is provided as-is. Users should conduct their own security audits before deploying to mainnet. The authors are not responsible for any loss of funds.

## 🔮 Future Enhancements

- [ ] Campaign updates and announcements
- [ ] Dispute resolution mechanism
- [ ] Multi-token support (beyond USDC)
- [ ] Campaign cancellation by creator
- [ ] Stretch goals functionality
- [ ] NFT-based reward tiers
- [ ] DAO governance integration

---

**Built with ❤️ for decentralized crowdfunding**
