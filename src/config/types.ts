export enum ChainId {
  MAINNET = 1,
  GOERLINET = 5,
  ARBITRUM = 42161
  // ARBITRUMTEST = 421613
}
export type ChainIdRec = {
  [ChainId.MAINNET]?: string | Record<string, any>
  [ChainId.GOERLINET]: string | Record<string, any>
  [ChainId.ARBITRUM]: string | Record<string, any>
}
export interface Address {
  1: string
  5: string
  42161: string
  // 421613: string
}

export interface Token {
  name?: string
  symbol?: string
  address: Address
  decimals: number
  projectLink?: string
}

export type MultiCallResponse<T> = T | null

export type AddressType = `0x${string}` | undefined
