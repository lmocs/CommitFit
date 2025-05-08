import Pact from '../services/pactService.js';
import deployPactContract from '../lib/contract/deployPact.js';
import dayjs from 'dayjs';

const getAllPacts = async (req, res) => {
	try {
		const pacts = await Pact.getAllPacts();
		res.json(pacts.rows);
	} catch (err) {
		console.error('Retrieval Error:', err);
		res.status(500).json({ error: 'Failed to get pacts' });
	}
};

// const createPact = async (req, res) => {
// 	try {
// 		const pactData = req.body;
// 		const created = await Pact.createPact(pactData);
// 		res.json(created);
// 	} catch (err) {
// 		console.error('Insert Error:', err);
// 		res.status(500).json({ error: 'Failed to insert pact' });
// 	}
// };

const createPact = async (req, res) => {
	try {
		const pactData = req.body;

		// 🧮 Calculate duration from start_date to end_date
		const durationInDays = dayjs(pactData.end_date).diff(dayjs(pactData.start_date), 'day');

		// 🚀 Deploy the smart contract
		const contractAddress = await deployPactContract({
			user1: pactData.user1_id,
			user2: pactData.user2_id,
			stakeAmount: pactData.stake_amount,
			durationInDays,
		});

		// 📝 Save pact in DB with contract address
		const createdPact = await Pact.createPact({
			...pactData,
			contract_address: contractAddress,
		});

		res.json(createdPact); // 🟢 Send final object to client
	} catch (err) {
		console.error('Insert Error:', err);
		res.status(500).json({ error: 'Failed to insert pact' });
	}
};
const getPactsByWallet = async (req, res) => {
	try {
		const { wallet_address } = req.params;
		const pacts = await Pact.getPactsByWallet(wallet_address);
		res.json(pacts.rows);
	} catch (err) {
		console.error('Retrieval Error:', err);
		res.status(500).json({ error: 'Failed to get pacts by wallet' });
	}
};

const deletePact = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Pact.deletePact(id);
		res.json(deleted);
	} catch (err) {
		console.error('Delete error:', err);
		res.status(500).json({ error: 'Failed to delete pact' });
	}
};

export default { getAllPacts, createPact, getPactsByWallet, deletePact };
