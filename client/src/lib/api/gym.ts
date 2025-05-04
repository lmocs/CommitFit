const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const addGym = async (gym: {
	name: string;
	address: string;
	place_id: string;
	lat: number;
	lng: number;
	wallet_address: string;
}) => {
	const res = await fetch(`${API_URL}/gyms/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(gym),
	});

	if (!res.ok) throw new Error('Failed to add gym');
	return res.json();
};
