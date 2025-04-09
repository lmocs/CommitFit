const { pool } = require('../config/db');

const User = {
	getUsers: async () => {
		const sql = `SELECT * FROM users`;

		try {
			const results = await pool.query(sql);
			console.log('All users: ', results);
			return results;
		} catch (err) {
			console.error('Error in getUsers:', err);
			throw err;
		}
	},

	addUser: async (userData) => {
		const sql = `INSERT INTO users (wallet_address, username) VALUES (?, ?)`;
		const values = [userData.wallet_address, userData.username];

		try {
			const results = await pool.query(sql, values);
			return results;
		} catch (err) {
			console.error('Error in addUser:', err);
			throw err;
		}
	},
};

module.exports = User;
