// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Pact {
  address public factoryOwner;
  address public user1;          // refers to the person who initiated the pact
  address public user2;          // the person who got invited
  uint256 pool;
  uint256 startDate;
  uint256 endDate;
  uint256 ownersEarnings;
  uint256 partnersEarnings;
  bool earningsCalculated;

  mapping(address => mapping(uint256 => bool)) checkIns;
  mapping(address => bool) hasWithdrawn;

  constructor(
    address _appOwner,
    address _user1,
    address _user2,
    uint256 _wager,
    uint256 _durationInDays
  ) payable {
    factoryOwner = _appOwner;
    user1 = _user1;
    user2 = _user2;
    pool = _wager * 2; // initialized pool consists of equal contribution from both users
    startDate = ((block.timestamp / 1 days) + 1) * 1 days;
    endDate = startDate + (_durationInDays * 1 days);
    ownersEarnings = 0;
    partnersEarnings = 0;
    earningsCalculated = false;
  }

  modifier onlyOwner() {
    require(msg.sender == factoryOwner, "Not the deployer of this contract.");
    _;
  }

  modifier onlyParticipants() {
    require(msg.sender == user1 || msg.sender == user2, "Not a pact participant.");
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

  // location validation will happen off-chain (JS), then will call either this function or 
  // "markMissedCheckIn()" if midnight hits and user location is never verified
  function submitCheckIn(bool checkInStatus) public onlyParticipants hasStarted notEnded {
    uint256 currentDay = (block.timestamp - startDate) / 1 days;
    require(!checkIns[msg.sender][currentDay], "Already checked in today.");
    checkIns[msg.sender][currentDay] = checkInStatus;
  }

  function markMissedCheckIn(address user, uint256 day) public onlyOwner {
    require(user == user1 || user == user2, "Invalid user.");
    require(!checkIns[user][day], "Already submitted for this day.");
    checkIns[user][day] = false;
  }

  function withdraw() public onlyParticipants hasEnded {
    require(!hasWithdrawn[msg.sender], "This user has already withdrawn.");

    if (!earningsCalculated) {
      calculateEarnings();
    }

    uint256 amount;

    // select correctly the amount to withdraw (based on address)
    if (msg.sender == user1) {
      amount = ownersEarnings;
    } else {
      amount = partnersEarnings;
    }

    // perform the withdraw
    (bool success, ) = payable(msg.sender).call{value: amount}("");
    require(success, "Transfer failed.");

    // update mapping so user cannot withdraw multiple times
    hasWithdrawn[msg.sender] = true;
  }

  function calculateEarnings() internal hasEnded { 
    require(ownersEarnings == 0 && partnersEarnings == 0, "Earnings already calculated");

    uint256 duration = (endDate - startDate) / 1 days;
    uint256 ownerCheckIns = 0;
    uint256 partnerCheckIns = 0;

    for (uint256 day = 0; day < duration; day++) {
      if (checkIns[user1][day]) {
        ownerCheckIns++;
      }
      if (checkIns[user2][day]) {
        partnerCheckIns++;
      }
    }

    uint256 totalCheckIns = ownerCheckIns + partnerCheckIns;

    if (totalCheckIns == 0) {
      // if nobody checked in, split pool evenly (consider adding 3rd party to collect "lost" earnings if over a certain percentage?
      ownersEarnings = pool / 2;
      partnersEarnings = pool / 2;
    } else {
      // use porportional allocation
      ownersEarnings = (pool * ownerCheckIns) / totalCheckIns;
      partnersEarnings = pool - ownersEarnings; // don't need to calculate the porportion twice, just use remaining
    }

    earningsCalculated = true;    
   }                                                

  // return information for tracking the relative progress of the Pact
  function getCheckInStats() public view returns (
    uint256 totalDaysElapsed,
    uint256 ownerCheckIns,
    uint256 partnerCheckIns
  ) {
    if (block.timestamp < startDate) {
      return (0, 0, 0);
    }

    uint256 duration = (endDate - startDate) / 1 days;
    totalDaysElapsed = (block.timestamp - startDate) / 1 days;

    // no need to report more than total duration
    if (totalDaysElapsed > duration) {
      totalDaysElapsed = duration;
    }

    for (uint256 day = 0; day < totalDaysElapsed; day++) {
      if (checkIns[user1][day]) {
        ownerCheckIns++;
      }
      if (checkIns[user2][day]) {
        partnerCheckIns++;
      }
    }

    return (totalDaysElapsed, ownerCheckIns, partnerCheckIns);
  }

  // allow these contracts to hold ETH
  receive() external payable {}
}
