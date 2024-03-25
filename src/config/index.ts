export enum ChainId {
  MAINNET = 1,
  ARBITRUM = 42161
}

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEV = process.env.NODE_ENV === 'development'

const ETH_SCAN_URLS_SCHEMA: Record<string, string> = {
  [ChainId.MAINNET]: 'https://etherscan.io',
  [ChainId.ARBITRUM]: 'https://arbiscan.io'
}

const GRAPHQL_API_PREFIX_SCHEMA: Record<string, string> = {
  [ChainId.MAINNET]: '',
  [ChainId.ARBITRUM]: 'https://api.thegraph.com/subgraphs/name/'
}

export const { VITE_APP_CHAIN_ID } = import.meta.env

export const ETH_SCAN_URL = ETH_SCAN_URLS_SCHEMA[VITE_APP_CHAIN_ID]
export const GRAPHQL_API_PREFIX = GRAPHQL_API_PREFIX_SCHEMA[VITE_APP_CHAIN_ID]
export const RESOURCES_URL = 'https://all-defi-static.pages.dev/'
export const STATIC_RESOURCES_URL = RESOURCES_URL + 'image/'
export const VIDEO_RESOURCES_URL = RESOURCES_URL + 'video/'
export const PANCAKE_SWAP_URL = 'https://pancakeswap.finance/'
export const WEBSITE_URL = 'https://derify.finance/'
export const LANG_CACHE_KEY = 'LANG'
export const API_PREFIX_URL = ''

export const MANAGER_UPLODAD_HISTORICAL_DATA_URL =
  'https://docs.google.com/forms/d/1xEGMAC4VAnMWNIlCA75LasU0aG353tS5AWAJh1T4XX0/edit'

export const CONTACT_US_URL = 'https://twitter.com/Alldefiprotocol'
export const LIGHT_PAPERS_URL = ''
