const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const submitCheckin = async (data: {
	wallet_address: string;
	pact_id: number;
	lat: number;
	lng: number;
}) => {
	const res = await fetch(`${API_URL}/checkin`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const result = await res.json();
	if (!res.ok || !result.success) throw new Error(result.error || 'Check-in failed');

	return result.checkin;
};

export const getCheckinStatus = async (walletAddress: string, pactId: number) => {
	const res = await fetch(`${API_URL}/checkin/today/${walletAddress}/${pactId}`);
	if (!res.ok) throw new Error('Failed to fetch check-in status');
	return res.json();
};

export const getLast7DaysCheckins = async (pactId: number) => {
	const res = await fetch(`${API_URL}/checkin/pact/${pactId}/last7`);
	if (!res.ok) throw new Error('Failed to fetch check-in history');
	return res.json();
};

export const getCheckinStats = async (pactId: number) => {
	const res = await fetch(`${API_URL}/checkin/stats/${pactId}`);
	if (!res.ok) throw new Error('Failed to fetch check-in stats');
	return res.json();
};
