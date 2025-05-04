import Checkin from '../services/checkinService.js';
import pool from '../config/db.js';

const createCheckin = async (req, res) => {
	try {
		const { user_address, pact_id, lat, lng } = req.body;

		const checkin = await Checkin.createCheckin({ wallet_address: user_address, pact_id, lat, lng });
		res.json({ success: true, checkin });
	} catch (err) {
		console.error('Checkin error:', err);
		res.status(400).json({ success: false, error: err.message });
	}
};

export default { createCheckin };

