// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Pact } from "./Pact.sol";

contract PactFactory {
  address public appOwner;

  struct PactMeta { // struct has to be named this to avoid naming conflict lol

    // TODO: mockup items necessary to start a pact
    address pactAddress;
    address user1;
    address user2;
    uint256 createdAt;
  }

  struct PendingPact {
    address user1;
    address user2;
    uint256 wager;
    uint256 durationInDays;
    uint256 amountFunded; 
  }

  PactMeta[] public allPacts;
  mapping(address => PactMeta[]) public userPacts; // how to tether two users to a single pact? just initialize it twice or what?
  mapping(bytes32 => PendingPact) public pendingPacts;

  modifier onlyAppOwner() {
    _;
  }

  constructor() {
    appOwner = msg.sender;
  }

  function contributeToPact(address user1, 
                            address user2, 
                            uint256 wager, 
                            uint256 duration
  ) external payable {
    require(msg.value == wager, "Must contribute exactly the wager amount.");

    bytes32 pactId = keccak256(abi.encodePacked(user1, user2, wager, duration));
    PendingPact storage pact = pendingPacts[pactId];

    // if this is the first contribution to a pact (uint256s are initialized to zero), initialize the fields
    if (pact.amountFunded == 0) {
      pact.user1 = user1;
      pact.user2 = user2;
      pact.wager = wager;
      pact.durationInDays = duration;
    }

    pact.amountFunded += msg.value;

    // if the pact is fully funded, go ahead and create the pact now
    if (pact.amountFunded == wager * 2) {
      Pact newPact = new Pact{value: pact.amountFunded} (
        appOwner,
        user1,
        user2,
        wager,
        duration
      );

      PactMeta memory meta = PactMeta({
        pactAddress: address(newPact),
        user1: user1,
        user2: user2,
        createdAt: block.timestamp
      });

      allPacts.push(meta);

      // push pact for mapping in both participating users
      userPacts[user1].push(meta);
      userPacts[user2].push(meta);

      // once processed, remove this pact from pendingPacts mapping
      delete pendingPacts[pactId];
    }
  }

  function getUserPacts(address _user) external view returns (PactMeta[] memory) {
    return userPacts[_user];
  }

  function getAllPacts() external view returns (PactMeta[] memory) {
    return allPacts;
  }
}
