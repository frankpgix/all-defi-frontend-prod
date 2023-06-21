import React from 'react'
import { createRoot } from 'react-dom/client'
// import { WagmiConfig } from 'wagmi'
// import { BrowserRouter } from '@/components/common/Route'
import { BrowserRouter } from 'react-router-dom'

// import { Provider } from 'react-redux'
// import { PersistGate as _PersistGate } from 'redux-persist/integration/react'
// import { ApolloProvider } from '@apollo/client'
//
// import store, { persistor } from '@/store'
//
// import ThemeProvider from '@/context/Theme'
// import MobileProvider from '@/context/Mobile'
// import WagamiClient from '@/context/WagamiClient'
//
// import App from '@/App'
// import { client as ApolloClient } from '@/lib/apollo'
// import '@/lang'

// const PersistGate = _PersistGate as any
const container = document.getElementById('all-defi')
// @ts-ignore
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <div className="">test</div>
  </React.StrictMode>
)
// root.render(
//   <React.StrictMode>
//     <MobileProvider>
//       <ApolloProvider client={ApolloClient}>
//         <Provider store={store}>
//           <PersistGate loading={null} persistor={persistor}>
//             <BrowserRouter>
//               <WagamiClient>
//                 <ThemeProvider>
//                   <App />
//                 </ThemeProvider>
//               </WagamiClient>
//             </BrowserRouter>
//           </PersistGate>
//         </Provider>
//       </ApolloProvider>
//     </MobileProvider>
//   </React.StrictMode>
// )
