const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const PactFactory = await.ethers.getContractFactory("PactFactory");
  const pactFactory = await PactFactory.deploy();
  await pactFactory.deployed();

  console.log("PactFactory deployed to:", pactFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
