import { createConfig, http } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, okxWallet, injectedWallet, coinbaseWallet, walletConnectWallet]
    }
  ],
  {
    appName: 'MyDapp',
    projectId: '90c1c8a3dd769315f8c0e10b2ae4bd16'
  }
)

export const config = createConfig({
  chains: [bsc, bscTestnet],
  connectors,
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http()
  }
})
