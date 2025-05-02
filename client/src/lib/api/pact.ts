const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createPact = async (pactData: any) => {
	const res = await fetch(`${API_URL}/pacts`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(pactData),
	});

	if (!res.ok) throw new Error('Failed to create pact');
	return res.json();
};

export const getPactsByUser = async (walletAddress: string) => {
	const res = await fetch(`${API_URL}/pacts/user/${walletAddress}`);
	if (!res.ok) throw new Error('Failed to fetch pacts');
	return res.json();
};

export const deletePact = async (id: number) => {
	const res = await fetch(`${API_URL}/pacts/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) throw new Error('Failed to delete pact');
	return res.json();
};
