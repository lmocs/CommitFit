import pool from '../config/db.js';

const User = {
	checkUser: async (userData) => {
		const sql = `SELECT * FROM users WHERE wallet_address = $1`
		const values = [userData.wallet_address];

		try {
			const existingUser = await pool.query(sql, values);
			if (existingUser.rows.length === 0) {
				const newUser = await pool.query('INSERT INTO users (wallet_address) VALUES ($1)', values);
				console.log('New user: ', newUser.rows);
				return newUser;
			}
			console.log('Existing user: ', existingUser.rows);
			return existingUser;
		} catch (err) {
			console.error('Error in checkUser:', err);
			throw err;
		}
	},

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
