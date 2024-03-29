import { ApolloApiPrefixConfigTypes } from '@/types/apollo'

import { ChainId } from '@/config'

export const APOLLO_API_PREFIX: ApolloApiPrefixConfigTypes = {
  [ChainId.MAINNET]: '',
  [ChainId.ARBITRUM]: 'https://api.thegraph.com/subgraphs/name/jimmyllee098/alldefi-dev',
  [ChainId.BSCTEST]: 'https://api.thegraph.com/subgraphs/name/jimmyllee098/alldefi-dev'
}
