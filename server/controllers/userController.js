const User = require('../services/userService');

getUsers = async (req, res) => {
	try {
		const users = await User.getUsers();
		res.json(users.rows);
	} catch (err) {
		console.error('Retrieval Error:', err);
		res.status(500).json({ error: 'Failed to get users' });
	}
};

addUser = async (req, res) => {
	try {
		const userData = req.body;
		await User.addUser(userData);
		res.json({ message: 'User added successfully' });
	} catch (err) {
		console.error('Insert Error:', err);
		res.status(500).json({ error: 'Failed to insert user' });
	}
};

module.exports = {
	getUsers,
	addUser,
};
