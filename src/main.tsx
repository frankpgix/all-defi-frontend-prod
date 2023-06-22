import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import WagmiClient from '@/providers/WagmiClient'

import App from './App'

const container = document.getElementById('all-defi')

// @ts-ignore
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiClient>
        <App />
      </WagmiClient>
    </BrowserRouter>
  </React.StrictMode>
)
