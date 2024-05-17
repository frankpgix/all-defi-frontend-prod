import { ApolloApiPrefixConfigTypes } from '@/types/apollo'

import { ChainId } from '@/config'

export const APOLLO_API_PREFIX: ApolloApiPrefixConfigTypes = {
  [ChainId.MAINNET]: '',
  [ChainId.ARBITRUM]: 'https://api.thegraph.com/subgraphs/name/jimmyllee098/alldefi-test',
  // [ChainId.BSCTEST]: 'https://thegraph.com/hosted-service/subgraph/jimmyllee098/alldefi-test'
  [ChainId.BSCTEST]: 'https://api.thegraph.com/subgraphs/name/jimmyllee098/alldefi-test'
}
