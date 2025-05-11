import { ethers } from 'ethers';
import dotenv from 'dotenv';
import PactArtifact from '../../../contracts/artifacts/contracts/Pact.sol/Pact.json' with { type: 'json' };

dotenv.config();

const deployPactContract = async ({ user1, user2, stakeAmount, durationInDays }) => {
	const provider = new ethers.JsonRpcProvider(process.env.HARDHAT_RPC_URL);
	const signer = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);

	const Pact = new ethers.ContractFactory(PactArtifact.abi, PactArtifact.bytecode, signer);

	const contract = await Pact.deploy(
		signer.address,
		user1,
		user2,
		ethers.parseEther(stakeAmount.toString()), // ⚠️ assumes stake in ETH
		durationInDays
	);

	await contract.waitForDeployment();
	return contract.target;
};

export default deployPactContract;

