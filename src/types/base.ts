// import { Account } from 'viem'
export enum ChainId {
  MAINNET = 1,
  ARBITRUM = 42161
}
export type ChainIdRec = {
  [ChainId.MAINNET]?: string | Record<string, any>
  [ChainId.ARBITRUM]: string | Record<string, any>
}
export interface Address {
  1: string
  42161: string
}

export interface Token {
  name?: string
  symbol?: string
  address: Address
  decimals: number
  projectLink?: string
}

export type MultiCallResponse<T> = T | null

export type ContractKeys =
  | 'ACProtocol'
  | 'AllProtocol'
  | 'VaultReader'
  | 'AUMStats'
  | 'VaultFactory'
  | 'RewardTracker'
  | 'UniV3ACL'
  | 'UniV3NonfungiblePosition'
  | 'AaveV3Position'
  | 'GMXTradePosition'
  | 'GMXEarnPosition'

export type AddressType = `0x${string}`
export type AccountType = AddressType

export type TokenKeys =
  | 'USDC'
  | 'USDT'
  | 'acUSDC'
  | 'WETH'
  | 'ETH'
  | 'WBTC'
  | 'acETH'
  | 'ALLTOKEN'
  | 'sALLTOKEN'
