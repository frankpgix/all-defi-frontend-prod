import { ChainId } from '@/config'

export interface ApolloApiPrefixConfigTypes {
  [ChainId.MAINNET]: string
  [ChainId.ARBITRUM]: string
  [ChainId.BSCTEST]: string
}
