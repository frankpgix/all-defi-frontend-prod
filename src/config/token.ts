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
  icon: 'symbol/bnb.svg',
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
  [ChainId.BSC]: bnbConfig,
  [ChainId.BSCTEST]: bnbConfig
}

export const underlyingTokens: UnderlyingTokenConfigTypes[] = [
  {
    name: 'sBITU',
    symbol: 'sBITU',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.BSC]: '0x61183a27ab5FDaCC4D46F5aF9Eb9E6A93afd76d4',
      [ChainId.BSCTEST]: zeroAddress
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/sbitu.svg'
  },
  {
    name: 'stETH',
    symbol: 'stETH',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.BSC]: zeroAddress,
      [ChainId.BSCTEST]: '0xDaF4579d8DD758fC9cb21927CA095736af16B10A'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/sbitu.svg'
  }
]
export const tokens: TokenConfigTypes[] = [...underlyingTokens]

export default tokens
