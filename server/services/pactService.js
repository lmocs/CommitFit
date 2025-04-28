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

	getPactsByWallet: async (wallet_address) => {
		const sql = `
      SELECT * FROM pacts
      WHERE user1_id = $1 OR user2_id = $1;
    `;
		const values = [wallet_address];

		try {
			const results = await pool.query(sql, values);
			console.log('Pacts for wallet: ', wallet_address, results.rows);
			return results;
		} catch (err) {
			console.error('Error in getPactsByWallet:', err);
			throw err;
		}
	}
};

export default Pact;
