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
      [ChainId.ARBITRUM]: '0xd7b3331d0E8482d12c223B41208c547cFfdccB61'
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
  acETH: new Token({
    name: 'acETH',
    symbol: 'acETH',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x65B8e22083fFdAeC589c741C7bDB900060460984'
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
      [ChainId.ARBITRUM]: '0x19740853e43D3B1B62CeE5FE8FccB45Fabc4A7E6'
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
      [ChainId.ARBITRUM]: '0x928b9751F3098Ceb8a570F4CE9ca339cB886251a'
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
  value: String(address),
  icon
}))

export default tokens
