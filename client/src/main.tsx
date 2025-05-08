import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { WalletProvider } from './context/WalletContext.tsx';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <MantineProvider defaultColorScheme={'dark'}>
        <Notifications position="top-right" />
        <App />
      </MantineProvider>
    </WalletProvider>
  </StrictMode>,
)
