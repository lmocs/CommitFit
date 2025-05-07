const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const PactModule = buildModule("TokenModule", (m) => {
  const appOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // testnet user 0
  const user1    = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // testnet user 1
  const user2    = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // testnet user 2
  wager = 1n * 10n ** 18n; // 1 ETH in wei (as BigInt)
  const duration = 7n; // 7 days:w

  const pact = m.contract("Pact", [appOwner, user1, user2, wager, duration]);

  return { pact };
});

module.exports = PactModule;
