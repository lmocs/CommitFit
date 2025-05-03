import Checkin from '../services/checkinService.js';
import pool from '../config/db.js';

const createCheckin = async (req, res) => {
	try {
		const { user_address, pact_id, lat, lng } = req.body;

		// TODO: Query should be wallet address, not id (?)
		const userQuery = `SELECT id FROM users WHERE wallet_address = $1`;
		const userResult = await pool.query(userQuery, [user_address]);

		if (userResult.rows.length === 0) {
			return res.status(404).json({ error: 'User not found.' });
		}

		const user_id = userResult.rows[0].id;
		const checkin = await Checkin.createCheckin({ user_id, pact_id, lat, lng });
		res.json({ success: true, checkin });
	} catch (err) {
		console.error('Checkin error:', err);
		res.status(400).json({ success: false, error: err.message });
	}
};

export default { createCheckin };

