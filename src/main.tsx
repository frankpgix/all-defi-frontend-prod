import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import { App } from './App'
import { config } from './wagmi'
const container = document.getElementById('all-defi')

// @ts-ignore
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
)
