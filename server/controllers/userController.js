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

const createUser = async (req, res) => {
	try {
		const userData = req.body;
		await User.createUser(userData);
		res.json({ message: 'User created successfully' });
	} catch (err) {
		console.error('createUser Error:', err);
		res.status(500).json({ error: 'Failed to create user' });
	}
};

export default { getUsers, createUser };
