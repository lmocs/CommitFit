import User from '../services/userService.js';

const checkUser = async (req, res) => {
	try {
		const userData = req.body;
		await User.checkUser(userData);
		res.status(200).json({ success: true });
	} catch (err) {
		console.error('Check Error: ', err);
		res.status(500).json({ error: 'Failed to create user' });
	}
}

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

const searchUsers = async (req, res) => {
	try {
		const query = req.query.q ?? "";
		const result = await User.searchUser(query);
		res.json(result.rows);
	} catch (err) {
		console.error('User search error:', err);
		res.status(500).json({ error: 'Failed to search users' });
	}
};

export default { checkUser, getUsers, createUser, searchUsers };
