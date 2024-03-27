// import { Account } from 'viem'
import { ChainId } from '@/config'

export type ChainIdTypes = ChainId.MAINNET | ChainId.ARBITRUM | ChainId.BSCTEST

export type ChainIdRec = {
  [ChainId.MAINNET]?: string | Record<string, any>
  [ChainId.ARBITRUM]: string | Record<string, any>
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

export interface AddressRec {
  [ChainId.MAINNET]: AddressType
  [ChainId.ARBITRUM]: AddressType
  [ChainId.BSCTEST]: AddressType
}

export interface TokenConfigTypes {
  name: string
  symbol: string
  address: AddressRec
  decimals: number
  precision: number
  projectLink?: string
  icon: string
}
export interface ContractConfigType {
  name: string
  address: AddressRec
}

export interface TokenTypes {
  name: string
  symbol: string
  address: AddressType
  decimals: number
  precision: number
  projectLink?: string
  icon: string
}

export type GetTokenFuncType = (address: AddressType) => TokenTypes
