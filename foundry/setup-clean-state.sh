#!/bin/bash

echo "Uruchamiam Anvil z automatycznym dumpem state przy wyjściu..."
anvil --dump-state anvil_state_local.json > /dev/null 2>&1 &
ANVIL_PID=$!

echo "Anvil uruchomiony (PID: $ANVIL_PID). Poczekaj 3 sekundy..."
sleep 3

echo "Deployuję Mock USDC + CrowdFunding..."
forge script script/DeployLocal.s.sol \
  --broadcast \
  --rpc-url http://127.0.0.1:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

echo ""
echo "Deploy zakończony. Zamknij Anvil Ctrl+C – wtedy zapisze czysty state!"
echo "Po zamknięciu uruchom zawsze:"
echo "anvil --load-state ./anvil_state_local.json"