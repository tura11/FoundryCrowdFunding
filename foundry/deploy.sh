#!/bin/bash

# Deploy script for CrowdFunding contract with state saving

echo "🚀 Deploying CrowdFunding contract to Anvil..."

# Deploy contract and capture output
forge script script/DeployLocal.s.sol:DeployLocal \
  --rpc-url http://localhost:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  --broadcast \
  -vvvv

# Save the Anvil state
echo "💾 Saving Anvil state..."
curl -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"anvil_dumpState","params":[],"id":1}' \
  http://localhost:8545 \
  > anvil_state_local.json

echo "✅ State saved to anvil-state.json"
echo ""
echo "📝 To load this state later, run: anvil --load-state anvil-state.json"