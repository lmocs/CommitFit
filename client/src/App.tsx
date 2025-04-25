import './App.css'
import { AuthenticationForm } from './components/AuthenticationForm';
import ConnectWalletButton from './components/ConnectWalletButton';

import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <ConnectWalletButton />
      <AuthenticationForm />
      <Dashboard />
    </>
  )
}

export default App
