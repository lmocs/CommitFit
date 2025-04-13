import pool from '../config/db.js';

const Gym = {
	getGyms: async () => {
		const sql = `SELECT * FROM gyms`;

		try {
			const results = await pool.query(sql);
			console.log('All gyms: ', results.rows);
			return results;
		} catch (err) {
			console.error('Error in getGyms:', err);
			throw err;
		}
	},

	createGym: async (gymData) => {
		const sql = `
			INSERT INTO gyms (name, address, place_id, lat, lng)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING *
		`;

		const values = [
			gymData.name,
			gymData.address,
			gymData.place_id,
			gymData.lat,
			gymData.lng
		];

		try {
			const results = await pool.query(sql, values);
			console.log('Created: ', results.rows);
			return results;
		} catch (err) {
			console.error('Error in createGym:', err);
			throw err;
		}
	},
};

export default Gym;
