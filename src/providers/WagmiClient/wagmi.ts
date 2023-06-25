import { arbitrum } from 'wagmi/chains'
import { configureChains, createConfig } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = '6d7824fb7038a3d6d7b1ee3916f5953b'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrum],
  [publicProvider()]
)

// console.log('chains', chains)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'All DeFi'
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId
        // themeMode: 'light'
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
})
