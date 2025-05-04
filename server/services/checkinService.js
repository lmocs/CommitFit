import pool from '../config/db.js';

const Checkin = {
	createCheckin: async ({ wallet_address, pact_id, lat, lng }) => {
		// 1. Get all gyms linked to this user
		console.log('Looking up gyms for wallet:', wallet_address);
		const gymQuery = `
			SELECT g.lat, g.lng FROM user_gyms ug
			JOIN gyms g ON ug.gym_id = g.id 
			WHERE ug.wallet_address = $1;
		`;
		const gyms = await pool.query(gymQuery, [wallet_address]);

		if (gyms.rows.length === 0) {
			throw new Error('No gyms linked to this user.');
		}

		// 2. Check distance to each gym (Haversine)
		const R = 6371e3; // Earth radius in meters
		let withinRange = false;

		for (const gym of gyms.rows) {
			const dLat = ((lat - gym.lat) * Math.PI) / 180;
			const dLng = ((lng - gym.lng) * Math.PI) / 180;
			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos((gym.lat * Math.PI) / 180) *
				Math.cos((lat * Math.PI) / 180) *
				Math.sin(dLng / 2) * Math.sin(dLng / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const d = R * c;

			if (d <= 100) {
				withinRange = true;
				break;
			}
		}

		// 3. Get today's date using Postgres' local date
		const todayResult = await pool.query(`SELECT CURRENT_DATE`);
		const today = todayResult.rows[0].current_date;

		// 4. Check if user already checked in
		const checkExisting = await pool.query(
			`SELECT * FROM checkins
			WHERE wallet_address = $1
			AND pact_id = $2
			AND checkin_date = $3`,
			[wallet_address, pact_id, today]
		);

		if (checkExisting.rows.length > 0) {
			return {
				alreadyCheckedIn: true,
				is_valid: checkExisting.rows[0].is_valid,
				...checkExisting.rows[0],
			};
		}

		// 4. Insert check-in
		const insert = await pool.query(
			`INSERT INTO checkins (wallet_address, pact_id, checkin_date, location_lat, location_lng, is_valid)
			VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
			[wallet_address, pact_id, today, lat, lng, withinRange]
		);

		return insert.rows[0];
	},
};

export default Checkin;
