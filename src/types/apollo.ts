import { ChainId } from '@/config'

export interface ApolloApiPrefixConfigTypes {
  [ChainId.MAINNET]: string
  [ChainId.BSC]: string
  [ChainId.BSCTEST]: string
}
