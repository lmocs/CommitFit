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

const getTodayCheckinStatus = async (req, res) => {
	try {
		const { wallet_address, pact_id } = req.params;
		console.log('wa: ', wallet_address);
		console.log('pi: ', pact_id);
		console.log('pi parsed: ', parseInt(pact_id));
		const checkedIn = await Checkin.hasCheckedInToday(wallet_address, parseInt(pact_id));
		res.json({ checkedIn });
	} catch (err) {
		console.error('Checkin status error:', err);
		res.status(500).json({ error: 'Failed to retrieve check-in status' });
	}
};

const getLast7DaysByPact = async (req, res) => {
	try {
		const { pactId } = req.params;
		const history = await Checkin.getLast7DaysByPact(pactId);
		res.json(history);
	} catch (err) {
		console.error('Check-in history error:', err);
		res.status(500).json({ error: 'Failed to fetch check-in history' });
	}
};

export default { createCheckin, getTodayCheckinStatus, getLast7DaysByPact };
