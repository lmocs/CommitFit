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
			pactData.contract_address ?? '0x', // default placeholder if not provided
		];

		try {
			const results = await pool.query(sql, values);
			console.log('Created pact: ', results.rows[0]);
			return results.rows[0];
		} catch (err) {
			console.error('Error in createPact:', err);
			throw err;
		}
	},

	getPactsByWallet: async (walletAddress) => {
		// walletAddress = 0xE2492E396aE3Dc3a1B530aA952e1be6928d32109
		const sql = `
			SELECT 
				p.*,
				u1.username AS user1_name,
				u2.username AS user2_name
			FROM pacts p
			LEFT JOIN users u1 ON u1.wallet_address = p.user1_id
			LEFT JOIN users u2 ON u2.wallet_address = p.user2_id
			WHERE p.user1_id = $1 OR p.user2_id = $1;
		`;
		const values = [walletAddress];

		try {
			const result = await pool.query(sql, values);
			console.log('Pacts for wallet:', walletAddress, result.rows);
			return result;
		} catch (err) {
			console.error('Error in getPactsByWallet:', err);
			throw err;
		}
	},

	deletePact: async (id) => {
		const sql = `DELETE FROM pacts WHERE id = $1 RETURNING *;`;
		const values = [id];

		try {
			const result = await pool.query(sql, values);
			console.log('Deleted pact:', result.rows[0]);
			return result.rows[0];
		} catch (err) {
			console.error('Error in deletePact:', err);
			throw err;
		}
	}
};

export default Pact;
