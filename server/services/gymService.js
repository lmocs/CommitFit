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
		try {
			// Check if gym already exists
			const check = await pool.query(
				'SELECT id FROM gyms WHERE place_id = $1',
				[gymData.place_id]
			);

			let gymId;
			if (check.rows.length > 0) {
				gymId = check.rows[0].id;
			} else {
				// Insert gym
				const insertGym = await pool.query(
					`INSERT INTO gyms (name, address, place_id, lat, lng)
					VALUES ($1, $2, $3, $4, $5) RETURNING id`,
					[
						gymData.name,
						gymData.address,
						gymData.place_id,
						gymData.lat,
						gymData.lng,
					]
				);
				gymId = insertGym.rows[0].id;
			}

			// Link gym to user in user_gyms
			await pool.query(
				`INSERT INTO user_gyms (user_id, gym_id)
				VALUES ($1, $2) ON CONFLICT DO NOTHING`,
				[gymData.user_id, gymId]
			);

			console.log('Gym linked to user:', gymData.user_id, gymId);
			return { success: true };
		} catch (err) {
			console.error('Error in createGym:', err);
			throw err;
		}
	}
};

export default Gym;
