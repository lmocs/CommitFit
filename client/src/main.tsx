import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { WalletProvider } from './context/WalletContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <MantineProvider defaultColorScheme={'dark'}>
        <App />
      </MantineProvider>
    </WalletProvider>
  </StrictMode>,
)
