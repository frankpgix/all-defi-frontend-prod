// import { Account } from 'viem'
import { ChainId } from '@/config'

export type ChainIdTypes = ChainId.MAINNET | ChainId.BSC | ChainId.BSCTEST

export type ChainIdRec = {
  [ChainId.MAINNET]?: string | Record<string, any>
  [ChainId.BSC]: string | Record<string, any>
}

export type MultiCallResponse<T> = T | null

export type ContractKeys =
  | 'ACProtocol'
  | 'AllProtocol'
  | 'VaultReader'
  | 'AUMStats'
  | 'VaultFactory'
// | 'RewardTracker'
// | 'UniV3ACL'
// | 'UniV3NonfungiblePosition'
// | 'AaveV3Position'
// | 'GMXTradePosition'
// | 'GMXEarnPosition'

export type AddressType = `0x${string}`
export type AccountType = AddressType

export type ChainTokenKey = 'ETH' | 'BNB'
export type WTokenKeys = 'WETH' | 'WBNB' | 'WBTC'
export type acTokenKeys = 'acETH' | 'acBNB' | 'acUSDC' | 'acBTC'

export type TokenKeys =
  | ChainTokenKey
  | WTokenKeys
  | acTokenKeys
  | 'USDC'
  | 'USDT'
  | 'ALLTOKEN'
  | 'sALLTOKEN'
  | 'sBITU'
  | 'stETH'
  | 'sUSDe'
  | 'UNKNOWN'

export interface AddressRec {
  [ChainId.MAINNET]: AddressType
  [ChainId.BSC]: AddressType
  [ChainId.BSCTEST]: AddressType
}

export interface TokenConfigTypes {
  name: TokenKeys
  symbol: string
  address: AddressRec
  decimals: number
  precision: number
  icon: string
}

export interface UnderlyingTokenConfigTypes extends TokenConfigTypes {
  acTokenName?: acTokenKeys
}
export interface ChainTokenTypes {
  name: TokenKeys
  symbol: string
  decimals: number
  precision: number
  icon: string
  wTokenName: WTokenKeys
  acTokenName?: acTokenKeys
  address: AddressType
}
export interface ContractConfigType {
  name: string
  address: AddressRec
}

export interface TokenTypes {
  name: TokenKeys
  symbol: string
  address: AddressType
  decimals: number
  precision: number
  icon: string
}

export interface UnderlyingTokenTypes extends TokenTypes {
  acTokenName: acTokenKeys
}

export type GetTokenFuncType = (address: AddressType) => TokenTypes
