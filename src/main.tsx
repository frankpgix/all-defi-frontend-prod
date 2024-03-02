import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import MobileProvider from '@/context/Mobile/index.tsx'

import App from './App.tsx'
import { config } from '@/config/wagmi.ts'
import { client as ApolloClient } from '@/lib/apollo'
globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('all-defi')!).render(
  <React.StrictMode>
    <ApolloProvider client={ApolloClient}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <MobileProvider>
              <App />
            </MobileProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </WagmiProvider>
    </ApolloProvider>
  </React.StrictMode>
)
