import Gym from '../services/gymService.js';

const getGyms = async (req, res) => {
	try {
		const gyms = await Gym.getGyms();
		res.json(gyms.rows);
	} catch (err) {
		console.error('Retrieval Error:', err);
		res.status(500).json({ error: 'Failed to get gyms' });
	}
};

const createGym = async (req, res) => {
	try {
		const gymData = req.body;
		await Gym.createGym(gymData);
		res.json({ message: 'Gym created successfully' });
	} catch (err) {
		console.error('createGym Error:', err);
		res.status(500).json({ error: 'Failed to create gym' });
	}
};

export default { getGyms, createGym };
