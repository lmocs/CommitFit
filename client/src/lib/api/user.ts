const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createUser = async (wallet_address: string): Promise<void> => {
	try {
		await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ wallet_address }),
		});
	} catch (err) {
		console.error('ERROR: ', err);
		throw new Error('Failed to create or find user');
	}
};

