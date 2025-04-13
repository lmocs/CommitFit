import pool from '../config/db.js';

const User = {
	getUsers: async () => {
		const sql = `SELECT * FROM users`;

		try {
			const results = await pool.query(sql);
			console.log('All users: ', results.rows);
			return results;
		} catch (err) {
			console.error('Error in getUsers:', err);
			throw err;
		}
	},

	createUser: async (userData) => {
		const sql = `INSERT INTO users (wallet_address, username) VALUES ($1, $2) RETURNING *`;
		const values = [userData.wallet_address, userData.username];

		try {
			const results = await pool.query(sql, values);
			console.log('Created: ', results.rows);
			return results;
		} catch (err) {
			console.error('Error in createUser:', err);
			throw err;
		}
	},
};

export default User;
