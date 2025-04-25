// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Pact {
  address public owner;
  address public partner;
  uint256 pool;
  uint256 deadline; // the day the pact terminates
  uint256 ownersEarnings;
  uint256 partnersEarnings;

  enum PactState = { Active, Completed }

  PactState public state;

  constructor(
    address _owner,
    address _partner,
    uitn256 _wager,
    uint256 _durationInDays
  ) {
    owner = _owner;
    partner = _partner;
    pool = _wager * 2; // initialized pool consists of equal contribution from both users
    deadline = block.timestamp + (_durationInDays * 1 days);
    ownersEarnings = 0;
    partnersEarnings = 0;
  }

  modifier onlyParticipants() {
    require(msg.sender == owner || msg.sender == partner, "Not a pact participant.");
    _;
  }

  function checkAndUpdatePactState() internal {
    if (state == PactState.Active) {
      state = block.timestamp >= deadline ? PactState.Completed : PactState.Active;
    }
  }

  // blindly check in the user; location validation will happen off-chain (JS)
  function checkInUser() public onlyParticipants {
    // TODO: write this function
  }

  function withdraw() public onlyParticipants {
    checkAndUpdatePactState();
    require(state == PactState.Completed, "The pact is still in progress; cannot withdraw");
    
    // TODO: continue writing function to draw from only from respective participants' earnings
  }
}
