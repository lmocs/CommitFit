require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://hardhat-node:8545",
    },
  },
  solidity: "0.8.28",
};
