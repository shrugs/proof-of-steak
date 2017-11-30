#!/bin/sh

solidity_flattener \
  --solc-paths="zeppelin-solidity=/Users/matt/Projects/steak.network/token/node_modules/zeppelin-solidity" \
  contracts/ICS.sol > ./flattened/ICS.sol

solidity_flattener \
  --solc-paths="zeppelin-solidity=/Users/matt/Projects/steak.network/token/node_modules/zeppelin-solidity" \
  contracts/DonationSplitter.sol > ./flattened/DonationSplitter.sol
