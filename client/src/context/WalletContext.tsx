import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import { createUser } from '../lib/api/user';

interface WalletContextType {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setWalletAddress(storedAddress);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) throw new Error('MetaMask not installed');

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    await createUser(address); // Send to backend
    setWalletAddress(address);
    localStorage.setItem('walletAddress', address);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used inside a WalletProvider');
  }
  return context;
};

