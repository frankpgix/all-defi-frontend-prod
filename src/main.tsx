import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import MobileProvider from '@/context/Mobile/index.tsx'
import DappProvider from '@/providers/DappProvider.tsx'

import App from './App.tsx'
import { client as ApolloClient } from '@/lib/apollo'

ReactDOM.createRoot(document.getElementById('all-defi')!).render(
  <React.StrictMode>
    <ApolloProvider client={ApolloClient}>
      <DappProvider>
        <BrowserRouter>
          <MobileProvider>
            <App />
          </MobileProvider>
        </BrowserRouter>
      </DappProvider>
    </ApolloProvider>
  </React.StrictMode>
)
