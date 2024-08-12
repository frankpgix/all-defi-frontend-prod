import { zeroAddress } from 'viem'

import {
  ChainTokenTypes,
  TokenConfigTypes,
  TokenTypes,
  UnderlyingTokenConfigTypes
} from '@/types/base'

import { ChainId } from '@/config'

export const UNKNOWN = {
  decimals: 18,
  icon: 'symbol/unknown.svg',
  name: 'UNKNOWN',
  precision: 4,
  symbol: 'UNKNOWN',
  address: zeroAddress
} as TokenTypes

export const ethConfig: ChainTokenTypes = {
  name: 'ETH',
  symbol: 'ETH',
  address: zeroAddress,
  decimals: 18,
  precision: 4,
  icon: 'symbol/eth.svg',
  wTokenName: 'WETH'
}

export const bnbConfig: ChainTokenTypes = {
  name: 'BNB',
  symbol: 'BNB',
  address: zeroAddress,
  decimals: 18,
  precision: 4,
  icon: 'symbol/bnb.svg',
  wTokenName: 'WBNB'
}

export const chainTokens = {
  [ChainId.MAINNET]: ethConfig,
  [ChainId.ARBITRUM]: ethConfig,
  [ChainId.BSCTEST]: bnbConfig
}

export const underlyingTokens: UnderlyingTokenConfigTypes[] = [
  {
    name: 'sBITU',
    symbol: 'sBITU',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: zeroAddress,
      [ChainId.BSCTEST]: '0x08E261bFB7f347842EA71F77A315BA773aB60A87'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/sbitu.svg'
  }
]
export const tokens: TokenConfigTypes[] = [...underlyingTokens]

export default tokens
