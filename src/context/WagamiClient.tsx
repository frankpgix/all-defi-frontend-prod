import React from 'react'
import { Buffer } from 'buffer'
import { WagmiConfig } from 'wagmi'
import type { WagmiConfigProps } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { createClient, configureChains } from 'wagmi'
import { arbitrum, goerli } from 'wagmi/chains'
// import * as chains from 'wagmi/chains'

import { REACT_APP_CHAIN_ID } from '@/config'

// import { useRpcStore } from '@/store'
// import { chainId } from '@/utils/chainSupport'
const chainId = Number(REACT_APP_CHAIN_ID)
// console.log(chainId)
if (!window.Buffer) window.Buffer = Buffer

function Provider(props: React.PropsWithChildren<Omit<WagmiConfigProps, 'client'>>) {
  // const rpcUrl = 'https://goerli-rollup.arbitrum.io/rpc/'
  const rpcUrl = 'https://arb1.arbitrum.io/rpc'

  const { provider, chains } = configureChains(
    [arbitrum, goerli],
    [
      jsonRpcProvider({
        rpc: () => ({ http: rpcUrl })
      })
    ]
  )

  const client = createClient({
    provider,
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'app',
          chainId: chainId,
          jsonRpcUrl: rpcUrl
        }
      }),
      new WalletConnectLegacyConnector({
        chains,
        options: {
          qrcode: true,
          rpc: { [chainId]: rpcUrl }
        }
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true
        }
      })
    ]
  })

  return <WagmiConfig client={client}>{props.children}</WagmiConfig>
}

export default Provider
