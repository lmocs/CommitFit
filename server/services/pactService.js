import pool from '../config/db.js';

const Pact = {
	getAllPacts: async () => {
		const sql = `SELECT * FROM pacts;`;

		try {
			const results = await pool.query(sql);
			console.log('All pacts: ', results.rows);
			return results;
		} catch (err) {
			console.error('Error in getAllPacts:', err);
			throw err;
		}
	},

	getPactByUserIds: async (pactData) => {
		const sql = `
			SELECT * FROM pacts
			WHERE (user1_id = $1 AND user2_id = $2)
				OR (user1_id = $2 AND user2_id = $1);
		`;
		const values = [pactData.user1_id, pactData.user2_id];

		try {
			const results = await pool.query(sql, values);
			console.log('Pact: ', results.rows);
			return results;
		} catch (err) {
			console.error('Error in getPactByUserIds:', err);
			throw err;
		}
	},

	createPact: async (pactData) => {
		const sql = `
			INSERT INTO pacts (
				user1_id,
				user2_id,
				start_date,
				end_date,
				stake_amount,
				contract_address
			) VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *;
		`;

		const values = [
			pactData.user1_id,
			pactData.user2_id,
			pactData.start_date,
			pactData.end_date,
			pactData.stake_amount,
			pactData.contract_address
		];

		try {
			const results = await pool.query(sql, values);
			console.log('Created: ', results.rows);
			return results.rows[0];
		} catch (err) {
			console.error('Error in createPact:', err);
			throw err;
		}
	},
};

export default Pact;
