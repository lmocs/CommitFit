import { useWallet } from '../context/WalletContext';

const ConnectWalletButton = () => {
  const { walletAddress, connectWallet, error } = useWallet();

  return (
    <div>
      {walletAddress ? (
        <p>Connected as: <strong>{walletAddress}</strong></p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ConnectWalletButton;

