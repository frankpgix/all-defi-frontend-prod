export enum ChainId {
  MAINNET = 1,
  ARBITRUM = 42161
}
export type ChainIdRec = {
  [ChainId.MAINNET]?: string | Record<string, any>
  [ChainId.ARBITRUM]: string | Record<string, any>
}
export interface Address {
  1: string
  42161: string
}

export interface Token {
  name?: string
  symbol?: string
  address: Address
  decimals: number
  projectLink?: string
}

export type MultiCallResponse<T> = T | null
