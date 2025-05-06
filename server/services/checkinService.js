import dayjs from 'dayjs';
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

		// 3. Get today's date using local time.
		const today = dayjs().format('YYYY-MM-DD');

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

	hasCheckedInToday: async (wallet_address, pact_id) => {
		const today = dayjs().format('YYYY-MM-DD');
		const result = await pool.query(
			`SELECT 1 FROM checkins WHERE wallet_address = $1 AND pact_id = $2 AND checkin_date = $3 AND is_valid = true`,
			[wallet_address, pact_id, today]
		);
		return result.rows.length > 0;
	},

	getLast7DaysByPact: async (pact_id) => {
		// Fetch pact participants
		console.log('pact_id: ', pact_id);
		const pactRes = await pool.query(
			`SELECT 
			u1.wallet_address AS user1,
			u2.wallet_address AS user2
			FROM pacts p
			JOIN users u1 ON p.user1_id = u1.wallet_address
			JOIN users u2 ON p.user2_id = u2.wallet_address
			WHERE p.id = $1`,
			[pact_id]
		);

		console.log('pactRes:', pactRes.rows[0]);
		if (pactRes.rows.length === 0) throw new Error('Pact not found');

		const { user1, user2 } = pactRes.rows[0];
		console.log('user1 wallet:', user1);
		console.log('user2 wallet:', user2);

		// Prepare date range: last 7 days
		const today = dayjs();
		const days = Array.from({ length: 7 }, (_, i) => today.subtract(i, 'day').format('YYYY-MM-DD')).reverse();

		const history = [];
		for (const day of days) {
			const result = await pool.query(
				`SELECT * FROM checkins WHERE pact_id = $1 AND checkin_date = $2`,
				[pact_id, day]
			);

			const row = {
				date: day,
				user1: user1,
				user2: user2,
			};

			for (const entry of result.rows) {
				if (entry.wallet_address === user1) row.user1 = entry;
				if (entry.wallet_address === user2) row.user2 = entry;
			}

			history.push(row);
		}
		return history;
	},
};

export default Checkin;
