// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Pact {
  address public owner;
  address public partner;
  uint256 pool;
  uint256 startDate;
  uint256 endDate;
  uint256 ownersEarnings;
  uint256 partnersEarnings;

  mapping(address => mapping(uint256 => bool)) checkIns;

  constructor(
    address _owner,
    address _partner,
    uint256 _wager,
    uint256 _durationInDays
  ) {
    owner = _owner;
    partner = _partner;
    pool = _wager * 2; // initialized pool consists of equal contribution from both users
    startDate = ((block.timestamp / 1 days) + 1) * 1 days;
    endDate = startDate + (_durationInDays * 1 days);
    ownersEarnings = 0;
    partnersEarnings = 0;
  }

  modifier onlyParticipants() {
    require(msg.sender == owner || msg.sender == partner, "Not a pact participant.");
    _;
  }

  modifier hasStarted() {
    require(block.timestamp >= startDate, "The pact has not begun yet.");
    _;
  }

  modifier notEnded() {
    require(block.timestamp < endDate, "The pact has ended.");
    _;
  }

  modifier hasEnded() {
    require(block.timestamp >= endDate, "The pact has not ended.");
    _;
  }

  // blindly check in the user; location validation will happen off-chain (JS)
  function recordUserCheckIn() public onlyParticipants hasStarted notEnded {
    // TODO: write this function
    uint256 currentDay = (block.timestamp - startDate) / 1 days;
    checkIns[msg.sender][currentDay] = true;
  }

  function withdraw() public onlyParticipants hasEnded {
    // TODO: continue writing function to draw from only from respective participants' earnings
  }

  function calculateEarnings() internal hasEnded { 
     // TODO: write this function                   
   }                                                

  // return information for tracking the relative progress of the Pact
  function getCheckInStats() public view returns (
    uint256 totalDaysElapsed,
    uint256 ownerCheckIns,
    uint256 partnerCheckIns
  ) {
    // TODO: Write this function
  }
}
