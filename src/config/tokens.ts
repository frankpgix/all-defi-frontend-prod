import { ChainId } from '@/config/types'
import Token from '@/class/Token'
import { toLower } from 'lodash'

export const tokenss: { [key: string]: Token } = {
  USDC: new Token(
    'USDC',
    'USDC',
    {
      [ChainId.MAINNET]: '',
      [ChainId.GOERLINET]: '0xAEA64d9171279f2dac7F509820A23C4D8FB1D583',
      [ChainId.ARBITRUM]: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
    },
    6,
    2,
    '',
    'symbol/usdc.svg'
  ),
  acUSDC: new Token(
    'acUSDC',
    'acUSDC',
    {
      [ChainId.MAINNET]: '',
      [ChainId.GOERLINET]: '0xCce988DF62A4D8bC4168FFA52Ba2d2AeFC571501',
      [ChainId.ARBITRUM]: '0xcFE9FF6d9930E93bE9104eB1724F546b21e3D5CA'
    },
    6,
    2,
    '',
    'symbol/acusdc.png'
  ),
  WETH: new Token(
    'WETH',
    'WETH',
    {
      [ChainId.MAINNET]: '',
      [ChainId.GOERLINET]: '',
      [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
    },
    18,
    4,
    '',
    'symbol/eth.svg'
  ),
  ETH: new Token(
    'ETH',
    'ETH',
    {
      [ChainId.MAINNET]: '',
      [ChainId.GOERLINET]: '',
      [ChainId.ARBITRUM]: '0x0000000000000000000000000000000000000000'
    },
    18,
    4,
    '',
    'symbol/eth.svg'
  ),
  acETH: new Token(
    'acETH',
    'acETH',
    {
      [ChainId.MAINNET]: '',
      [ChainId.GOERLINET]: '',
      [ChainId.ARBITRUM]: '0x484E11eE84023e02b7D89f3608502041DA251a0B'
    },
    18,
    4,
    '',
    'symbol/eth.svg'
  ),
  ALLTOKEN: new Token(
    'ALLTOKEN',
    'ALL',
    {
      [ChainId.MAINNET]: '',
      [ChainId.GOERLINET]: '0x706fDbb78d9bEf1c1C6f9d101B50C4fa102b4228',
      [ChainId.ARBITRUM]: '0xEFdC3CC5BedA16C281c7715aDf1201117F41BB66'
    },
    18,
    4,
    '',
    'symbol/all.png'
  ),
  sALLTOKEN: new Token(
    'sALLTOKEN',
    'sALL',
    {
      [ChainId.MAINNET]: '',
      [ChainId.GOERLINET]: '0x187891F8e9aFcdCdB31917746F214fa7eE2f3206',
      [ChainId.ARBITRUM]: '0x536322D515152126156d188d28A71eE46e03Ef77'
    },
    18,
    4,
    '',
    'symbol/sall.png'
  )
}

export const BASE_TOKEN_SYMBOL = 'USDC'

export default tokenss

export const baseTokens = [tokenss.USDC, tokenss.ETH]
// console.log(11222, baseTokens)

// const ETH = {
//   decimals: 18,
//   icon: 'symbol/eth.svg',
//   name: 'ETH',
//   precision: 6,
//   symbol: 'ETH',
//   tokenAddress: '0x0000000000000000000000000000000000000000'
// }

const UNKNOWN = {
  decimals: 18,
  icon: 'symbol/eth.svg',
  name: 'UNKNOWN',
  precision: 4,
  symbol: 'UNKNOWN',
  tokenAddress: ''
}

export const getTokenByAddress = (address: string) => {
  if (address === '0x0000000000000000000000000000000000000000') return tokenss.ETH
  const token = Object.keys(tokenss)
    .map((key: string) => tokenss[key])
    .find((item) => toLower(item.tokenAddress) === toLower(address))
  if (token) return token
  return UNKNOWN
}

export const getDecimalsByAddress = (address: string) => getTokenByAddress(address).decimals

export const baseTokenOptions = baseTokens.map(({ name, tokenAddress, icon }) => ({
  label: name,
  value: tokenAddress,
  icon
}))
