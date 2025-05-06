const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createUser = async (wallet_address: string): Promise<void> => {
	try {
		await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ wallet_address }),
		});
	} catch (err) {
		console.error('createUser error: ', err);
		throw new Error('Failed to create or find user');
	}
};

export const searchUsers = async (query: string): Promise<string[]> => {
	const res = await fetch(`${API_URL}/users/search?q=${query}`);
	const rawText = await res.text(); // Using due to error with direct JSON parsing.

	try {
		const users = JSON.parse(rawText);
		return users.map((u: any) => ({
			label: `${u.username} (${u.wallet_address})`,
			value: u.wallet_address,  // for actual selection
			username: u.username,
		}));
	} catch (err: any) {
		console.error('JSON parse error:', err.message);
		console.error('Offending response:', rawText);
		return [];
	}
};
