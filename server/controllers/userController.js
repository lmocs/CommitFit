import User from '../services/userService.js';

const getUsers = async (req, res) => {
	try {
		const users = await User.getUsers();
		res.json(users.rows);
	} catch (err) {
		console.error('Retrieval Error:', err);
		res.status(500).json({ error: 'Failed to get users' });
	}
};

const addUser = async (req, res) => {
	try {
		const userData = req.body;
		await User.addUser(userData);
		res.json({ message: 'User added successfully' });
	} catch (err) {
		console.error('Insert Error:', err);
		res.status(500).json({ error: 'Failed to insert user' });
	}
};

export default { getUsers, addUser };
