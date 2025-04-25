import { useState } from 'react';
import { ethers } from 'ethers';
import { createUser } from '../lib/api/user';

export const useWallet = () => {
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const connectWallet = async () => {
		try {
			if (!window.ethereum) {
				throw new Error("MetaMask not installed");
			}

			const provider = new ethers.BrowserProvider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = await provider.getSigner();
			const address = await signer.getAddress();

			await createUser(address); // send to backend
			setWalletAddress(address);
		} catch (err: any) {
			setError(err.message || 'Wallet connection failed');
		}
	};

	return { walletAddress, connectWallet, error };
};

