import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import MobileProvider from '@/context/Mobile/index.tsx'
import ApolloProvider from '@/providers/ApolloProvider.tsx'
import DappProvider from '@/providers/DappProvider.tsx'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('all-defi')!).render(
  <React.StrictMode>
    <DappProvider>
      <ApolloProvider>
        <BrowserRouter>
          <MobileProvider>
            <App />
          </MobileProvider>
        </BrowserRouter>
      </ApolloProvider>
    </DappProvider>
  </React.StrictMode>
)
