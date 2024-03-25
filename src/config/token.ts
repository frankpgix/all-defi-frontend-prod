import { zeroAddress } from 'viem'

import { ChainId } from '@/config'
import { TokenConfigTypes, TokenTypes } from '@/types/base'

export const ZERO_ADDRESS = zeroAddress

export const UNKNOWN = {
  decimals: 18,
  icon: 'symbol/eth.svg',
  name: 'UNKNOWN',
  precision: 4,
  symbol: 'UNKNOWN',
  tokenAddress: '',
  address: ZERO_ADDRESS
} as TokenTypes

export const ethConfig: TokenConfigTypes = {
  name: 'ETH',
  symbol: 'ETH',
  address: {
    [ChainId.MAINNET]: ZERO_ADDRESS,
    [ChainId.ARBITRUM]: ZERO_ADDRESS
  },
  decimals: 18,
  precision: 4,
  icon: 'symbol/eth.svg'
}

export const baseTokens: TokenConfigTypes[] = [
  ethConfig,
  {
    name: 'USDC',
    symbol: 'USDC',
    address: {
      [ChainId.MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      [ChainId.ARBITRUM]: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/usdc.svg'
  }
]

export const tokens: TokenConfigTypes[] = [
  ...baseTokens,
  {
    name: 'USDT',
    symbol: 'USDT',
    address: {
      [ChainId.MAINNET]: ZERO_ADDRESS,
      [ChainId.ARBITRUM]: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/usdc.svg'
  },
  {
    name: 'acUSDC',
    symbol: 'acUSDC',
    address: {
      [ChainId.MAINNET]: ZERO_ADDRESS,
      [ChainId.ARBITRUM]: '0x9b72b7d67aFC801eE8299B6C34C2a9453607440b'
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/acusdc.png'
  },
  {
    name: 'WETH',
    symbol: 'WETH',
    address: {
      [ChainId.MAINNET]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/weth.svg'
  },
  {
    name: 'WBTC',
    symbol: 'WBTC',
    address: {
      [ChainId.MAINNET]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      [ChainId.ARBITRUM]: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'
    },
    decimals: 8,
    precision: 4,
    icon: 'symbol/wbtc.png'
  },
  {
    name: 'acETH',
    symbol: 'acETH',
    address: {
      [ChainId.MAINNET]: ZERO_ADDRESS,
      [ChainId.ARBITRUM]: '0xb22D5DC08C68Bd2c980770b5c90B80386817E20f'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/eth.svg'
  },
  {
    name: 'ALLTOKEN',
    symbol: 't_ALL',
    address: {
      [ChainId.MAINNET]: ZERO_ADDRESS,
      [ChainId.ARBITRUM]: '0x994D01b43e3F9B54D67aACa35af33ADC0b21ac83'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/all.png'
  },
  {
    name: 'sALLTOKEN',
    symbol: 'sALL',
    address: {
      [ChainId.MAINNET]: ZERO_ADDRESS,
      [ChainId.ARBITRUM]: '0x7897DAF9cA87F8f5C4b8189525adB0c04b993f6c'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/sall.png'
  }
]

export default tokens