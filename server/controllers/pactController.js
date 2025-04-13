import Pact from '../services/pactService.js';

const getAllPacts = async (req, res) => {
	try {
		const pacts = await Pact.getAllPacts();
		res.json(pacts.rows);
	} catch (err) {
		console.error('Retrieval Error:', err);
		res.status(500).json({ error: 'Failed to get pacts' });
	}
};

const getPactByUserIds = async (req, res) => {
	try {
		const pactData = req.params;
		const pact = await Pact.getPactByUserIds(pactData);
		res.json(pact.rows);
	} catch (err) {
		console.error('Retrieval Error:', err);
		res.status(500).json({ error: 'Failed to get this pact' });
	}
};

const createPact = async (req, res) => {
	try {
		const pactData = req.body;
		await Pact.createPact(pactData);
		res.json({ message: 'Pact added successfully' });
	} catch (err) {
		console.error('Insert Error:', err);
		res.status(500).json({ error: 'Failed to insert pact' });
	}
};

export default { getAllPacts, getPactByUserIds, createPact };
