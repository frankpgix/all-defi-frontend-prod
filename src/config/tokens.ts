import { ChainId } from '@/config/types'
import Token from '@/class/Token'
import { toLower } from 'lodash'
// import { AddressType } from './types'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const tokens: { [key: string]: Token } = {
  USDC: new Token({
    name: 'USDC',
    symbol: 'USDC',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/usdc.svg'
  }),
  acUSDC: new Token({
    name: 'acUSDC',
    symbol: 'acUSDC',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x9b72b7d67aFC801eE8299B6C34C2a9453607440b'
    },
    decimals: 6,
    precision: 2,
    icon: 'symbol/acusdc.png'
  }),
  WETH: new Token({
    name: 'WETH',
    symbol: 'WETH',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/eth.svg'
  }),
  ETH: new Token({
    name: 'ETH',
    symbol: 'ETH',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: ZERO_ADDRESS
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/eth.svg'
  }),
  WBTC: new Token({
    name: 'WBTC',
    symbol: 'WBTC',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'
    },
    decimals: 8,
    precision: 4,
    icon: 'symbol/wbtc.png'
  }),
  acETH: new Token({
    name: 'acETH',
    symbol: 'acETH',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0xb22D5DC08C68Bd2c980770b5c90B80386817E20f'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/eth.svg'
  }),
  ALLTOKEN: new Token({
    name: 'ALLTOKEN',
    symbol: 'ALL',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x994D01b43e3F9B54D67aACa35af33ADC0b21ac83'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/all.png'
  }),
  sALLTOKEN: new Token({
    name: 'sALLTOKEN',
    symbol: 'sALL',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x7897DAF9cA87F8f5C4b8189525adB0c04b993f6c'
    },
    decimals: 18,
    precision: 4,
    icon: 'symbol/sall.png'
  })
}

export const BASE_TOKEN_SYMBOL = 'USDC'

export const baseTokens = [tokens.USDC, tokens.ETH]

const UNKNOWN = {
  decimals: 18,
  icon: 'symbol/eth.svg',
  name: 'UNKNOWN',
  precision: 4,
  symbol: 'UNKNOWN',
  tokenAddress: ''
}

export const getTokenByAddress = (address: string) => {
  if (address === ZERO_ADDRESS) return tokens.ETH
  const token = Object.keys(tokens)
    .map((key: string) => tokens[key])
    .find((item) => toLower(String(item.address)) === toLower(address))
  if (token) return token
  return UNKNOWN
}

export const getDecimalsByAddress = (address: string) => getTokenByAddress(address).decimals

export const baseTokenOptions = baseTokens.map(({ name, address, icon }) => ({
  label: name,
  value: address,
  icon
}))

export default tokens
