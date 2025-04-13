const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createPact = async (pactData) => {
	const res = await fetch(`${API_URL}/pacts/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(pactData),
	});

	if (!res.ok) throw new Error('Failed to create pact');
	return res.json();
};

// export const getPactsByUser = async (userId) => {
// 	const res = await fetch(`${API_URL}/pacts/user/${userId}`);
// 	if (!res.ok) throw new Error('Failed to get user pacts');
// 	return res.json();
// };

