import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// TODO: Update HeroText component.
// import { HeroText } from '../components/HeroText';

const Home = () => {
  const { walletAddress, connectWallet } = useWallet();
  const navigate = useNavigate();
  const [proceedEnabled, setProceedEnabled] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      setProceedEnabled(true);
    }
  }, [walletAddress]);

  const handleProceed = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Welcome to CommitFit 💪</h1>

      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected as {walletAddress}</p>
          <button onClick={handleProceed} disabled={!proceedEnabled}>
            Proceed to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

