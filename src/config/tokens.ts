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
  address: zeroAddress,
  acTokenName: 'acUNKNOWN'
} as TokenTypes

export const ethConfig: ChainTokenTypes = {
  name: 'ETH',
  symbol: 'ETH',
  address: zeroAddress,
  decimals: 18,
  precision: 4,
  icon: 'symbol/eth.svg',
  wTokenName: 'WETH',
  acTokenName: 'acETH'
}

export const bnbConfig: ChainTokenTypes = {
  name: 'BNB',
  symbol: 'BNB',
  address: zeroAddress,
  decimals: 18,
  precision: 4,
  icon: 'symbol/bnb.svg',
  wTokenName: 'WBNB',
  acTokenName: 'acBNB'
}

export const chainTokens = {
  [ChainId.MAINNET]: ethConfig,
  [ChainId.ARBITRUM]: ethConfig,
  [ChainId.BSCTEST]: bnbConfig
}

export const wChainTokens: UnderlyingTokenConfigTypes[] = [
  {
    name: 'WETH',
    symbol: 'WETH',
    address: {
      [ChainId.MAINNET]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      [ChainId.BSCTEST]: zeroAddress
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/eth.svg'
    // acTokenName: 'acETH'
  },
  {
    name: 'WBNB',
    symbol: 'WBNB',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: zeroAddress,
      [ChainId.BSCTEST]: '0xBb560D5eb565d1B46Bf58968e69cBd3B905a8E11'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/bnb.svg'
    // acTokenName: 'acBNB'
  }
]
export const underlyingTokens: UnderlyingTokenConfigTypes[] = [
  {
    name: 'USDC',
    symbol: 'USDC',
    address: {
      [ChainId.MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      [ChainId.ARBITRUM]: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      [ChainId.BSCTEST]: '0xCA4fD74a916a3Cd4F57bDeb5f0B475E823658f80'
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/usdc.svg'
    // acTokenName: 'acUSDC'
  },
  {
    name: 'WBTC',
    symbol: 'WBTC',
    address: {
      [ChainId.MAINNET]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      [ChainId.ARBITRUM]: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      [ChainId.BSCTEST]: '0x904AD143C95736d9EEca7C6C0BB1a60dC4f3FE35'
    },
    decimals: 8,
    precision: 4,
    icon: 'symbol/wbtc.svg'
    // acTokenName: 'acBTC'
  }
]

export const acTokens: TokenConfigTypes[] = [
  {
    name: 'acUSDC',
    symbol: 'acUSDC',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: '0x9b72b7d67aFC801eE8299B6C34C2a9453607440b',
      [ChainId.BSCTEST]: '0x02D34Ad15EDF942fEFF4179Bc65B6F99F2A0f84d'
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/acusdc.png'
  },
  {
    name: 'acETH',
    symbol: 'acETH',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: '0xb22D5DC08C68Bd2c980770b5c90B80386817E20f',
      [ChainId.BSCTEST]: zeroAddress
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/eth.svg'
  },
  {
    name: 'acBNB',
    symbol: 'acBNB',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: zeroAddress,
      [ChainId.BSCTEST]: '0xC5114032E8F28A516d27fb353A3eCB66e0078d80'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/bnb.svg'
  },
  {
    name: 'acBTC',
    symbol: 'acBTC',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: zeroAddress,
      [ChainId.BSCTEST]: '0xc21c1E22B5A31ff5bEc9f42b256F8103B369c44B'
    },
    decimals: 8,
    precision: 4,
    icon: 'symbol/wbtc.svg'
  }
]

export const tokens: TokenConfigTypes[] = [
  ...underlyingTokens,
  ...acTokens,
  ...wChainTokens,
  {
    name: 'USDT',
    symbol: 'USDT',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      [ChainId.BSCTEST]: zeroAddress
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/usdc.svg'
  },

  {
    name: 'ALLTOKEN',
    symbol: 't_ALL',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: '0x994D01b43e3F9B54D67aACa35af33ADC0b21ac83',
      [ChainId.BSCTEST]: '0x03ad966980E6F6Ea59F1B2f475d1d7E6F27e4B42'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/all.png'
  },
  {
    name: 'sALLTOKEN',
    symbol: 'sALL',
    address: {
      [ChainId.MAINNET]: zeroAddress,
      [ChainId.ARBITRUM]: '0x7897DAF9cA87F8f5C4b8189525adB0c04b993f6c',
      [ChainId.BSCTEST]: '0x6695d5bFa5726B158454dfd9C312758769D955d2'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/sall.png'
  }
]

export default tokens
