import Checkin from '../services/checkinService.js';

const createCheckin = async (req, res) => {
	try {
		const { wallet_address, pact_id, lat, lng } = req.body;
		const checkin = await Checkin.createCheckin({ wallet_address: wallet_address, pact_id, lat, lng });
		res.json({ success: true, checkin });
	} catch (err) {
		console.error('Checkin error:', err);
		res.status(400).json({ success: false, error: err.message });
	}
};

const hasCheckedInToday = async (req, res) => {
	try {
		const { wallet_address, pact_id } = req.params;
		const checkedIn = await Checkin.hasCheckedInToday(wallet_address, parseInt(pact_id));
		res.json({ checkedIn });
	} catch (err) {
		console.error('Checkin status error:', err);
		res.status(500).json({ error: 'Failed to retrieve check-in status' });
	}
};

const getLast7DaysByPact = async (req, res) => {
	try {
		const { pact_id } = req.params;
		const history = await Checkin.getLast7DaysByPact(pact_id);
		res.json(history);
	} catch (err) {
		console.error('Check-in history error:', err);
		res.status(500).json({ error: 'Failed to fetch check-in history' });
	}
};

const getCheckinStats = async (req, res) => {
	try {
		const { pact_id } = req.params;
		const stats = await Checkin.getCheckinStats(pact_id);
		res.json(stats);
	} catch (err) {
		console.error('getCheckinStats error:', err);
		res.status(500).json({ error: 'Failed to get check-in stats' });
	}
};

export default { createCheckin, hasCheckedInToday, getLast7DaysByPact, getCheckinStats };
