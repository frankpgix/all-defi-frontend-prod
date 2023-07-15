import getEnvKey from '@/config/env'
import { ChainId } from '@/config/types'

const API_PREFIX_URLS_SCHEMA: Record<string, string> = {
  prod: 'https://api.derify.exchange/bsc/',
  dev: 'https://api.derify.exchange/bsc/'
  // dev: 'https://dev-bsctestnet-api.derify.exchange/'
}

const ETH_SCAN_URLS_SCHEMA: Record<string, string> = {
  [ChainId.MAINNET]: 'https://etherscan.io',
  [ChainId.GOERLINET]: 'https://goerli.etherscan.io',
  [ChainId.ARBITRUM]: 'https://arbiscan.io'
}

const GRAPHQL_API_PREFIX_SCHEMA: Record<string, string> = {
  [ChainId.MAINNET]: '',
  [ChainId.GOERLINET]: 'https://api.thegraph.com/subgraphs/name/',
  [ChainId.ARBITRUM]: 'https://api.thegraph.com/subgraphs/name/'
}

export const { REACT_APP_CHAIN_ID } = process.env

export const API_PREFIX_URL = API_PREFIX_URLS_SCHEMA[getEnvKey()]
export const ETH_SCAN_URL = ETH_SCAN_URLS_SCHEMA[REACT_APP_CHAIN_ID]
export const GRAPHQL_API_PREFIX = GRAPHQL_API_PREFIX_SCHEMA[REACT_APP_CHAIN_ID]
export const RESOURCES_URL = 'https://all-defi-static.pages.dev/'
export const STATIC_RESOURCES_URL = RESOURCES_URL + 'image/'
export const VIDEO_RESOURCES_URL = RESOURCES_URL + 'video/'
export const PANCAKE_SWAP_URL = 'https://pancakeswap.finance/'
export const WEBSITE_URL = 'https://derify.finance/'
export const LANG_CACHE_KEY = 'LANG'

export const LIGHT_PAPERS_URL = ''
