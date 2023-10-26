// @ts-nocheck
import { networks } from '@safe-global/safe-core-sdk-utils/dist/src/eip-3770/config'
import type { ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'
/**
 * A static shortName<->chainId dictionary
 * E.g.:
 *
 * {
 *   eth: '1',
 *   gor: '5',
 *   ...
 * }
 */
type Chains = Record<string, string>

// console.log('networks', networks)

const chains = networks.reduce<Chains>((result, { shortName, chainId }) => {
  result[shortName] = chainId.toString()
  return result
}, {})

// console.log(chains, 'chains')

export default chains

export const chain: ChainInfo = {
  chainId: '42161',
  chainName: 'Arbitrum One',
  description: 'Arbitrum One',
  l2: true,
  nativeCurrency: {
    name: 'Ether',
    symbol: 'Ether',
    decimals: 18,
    logoUri: 'https://safe-transaction-assets.staging.5afe.dev/chains/5/currency_logo.png'
  },
  transactionService: 'https://safe-transaction-goerli.staging.5afe.dev/',
  blockExplorerUriTemplate: {
    address: 'https://arbiscan.io/address/{{address}}',
    txHash: 'https://arbiscan.io/tx/{{txHash}}',
    api: 'https://api-arbiscan.io/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}'
  },
  disabledWallets: ['coinbase'],
  ensRegistryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  features: [],
  gasPrice: [{ type: 'FIXED', weiValue: '200000000000' }],
  publicRpcUri: { authentication: 'NO_AUTHENTICATION', value: 'https://arb1.arbitrum.io/rpc' },
  rpcUri: { authentication: 'NO_AUTHENTICATION', value: 'https://arb1.arbitrum.io/rpc' },
  safeAppsRpcUri: { authentication: 'NO_AUTHENTICATION', value: 'https://arb1.arbitrum.io/rpc' },
  shortName: 'arb',
  theme: { textColor: '#ffffff', backgroundColor: '#4D99EB' }
}
