import { zeroAddress } from 'viem'

import {
  ChainTokenTypes,
  TokenConfigTypes,
  TokenTypes,
  UnderlyingTokenConfigTypes
} from '@/types/base'

import { ChainId } from '@/config'

// export const nativeAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
export const nativeAddress = zeroAddress
export const UNKNOWN = {
  decimals: 18,
  icon: 'symbol/bnb.svg',
  name: 'UNKNOWN',
  precision: 4,
  symbol: '',
  address: zeroAddress
} as TokenTypes

export const ethConfig: ChainTokenTypes = {
  name: 'ETH',
  symbol: 'ETH',
  address: nativeAddress,
  decimals: 18,
  precision: 4,
  icon: 'symbol/eth.svg',
  wTokenName: 'WETH'
}

export const bnbConfig: ChainTokenTypes = {
  name: 'BNB',
  symbol: 'BNB',
  address: nativeAddress,
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
  // {
  //   name: 'sBITU',
  //   symbol: 'sBITU',
  //   address: {
  //     [ChainId.MAINNET]: zeroAddress,
  //     [ChainId.BSC]: '0x61183a27ab5FDaCC4D46F5aF9Eb9E6A93afd76d4',
  //     [ChainId.BSCTEST]: zeroAddress
  //   },
  //   decimals: 18,
  //   precision: 4,
  //   icon: 'symbol/sbitu.svg'
  // },
  {
    name: 'wstETH',
    symbol: 'wstETH',
    address: {
      [ChainId.MAINNET]: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
      [ChainId.BSC]: zeroAddress,
      [ChainId.BSCTEST]: zeroAddress
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/steth.svg'
  },
  {
    name: 'USDT',
    symbol: 'USDT',
    address: {
      [ChainId.MAINNET]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      [ChainId.BSC]: zeroAddress,
      [ChainId.BSCTEST]: '0x951A9cB20960F36d7Ead415043252Eb33Df8C100'
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/usdt.svg'
  },
  {
    name: 'sUSDe',
    symbol: 'sUSDe',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.BSC]: zeroAddress,
      [ChainId.BSCTEST]: '0x8794957E5506780664e94ad6475c05DF8c6fE55D'
    },
    decimals: 18,
    precision: 2,
    icon: 'symbol/susde.png'
  }
]
export const tokens: TokenConfigTypes[] = [...underlyingTokens]

export default tokens
