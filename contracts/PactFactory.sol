// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Pact } from "./Pact.sol";

contract PactFactory {
  address public appOwner;

  struct PactMeta { // struct has to be named this to avoid naming conflict lol

    // TODO: mockup items necessary to start a pact
    address user1;
    address user2;
  }

  PactMeta[] public pacts;
  mapping(address => PactMeta[]) public userPacts; // how to tether two users to a single pact? just initialize it twice or what?
  
  modifier onlyAppOwner() {
    _;
  }

  constructor() {
    // TODO: write PactFactory constructor
  }

  function createPact() external {
    // TODO: map parameters to Pact struct attributes and create the pact
    // TODO: Sort out payments?
  }

  function getUserPacts(address _user) external view returns (PactMeta[] memory) {
    return userPacts[_user];
  }

  function getAllCampaigns() external view returns (PactMeta[] memory) {
    return pacts;
  }
}