import { http, createConfig } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [arbitrum],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'ALL DeFi' }),
    walletConnect({ projectId: '90c1c8a3dd769315f8c0e10b2ae4bd16' })
  ],
  transports: {
    [arbitrum.id]: http()
  }
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
