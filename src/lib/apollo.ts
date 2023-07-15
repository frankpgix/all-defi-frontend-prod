import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GRAPHQL_API_PREFIX } from '@/config'
export const client = new ApolloClient({
  // uri: GRAPHQL_API_PREFIX + 'jimmyllee098/alldefi-test',
  uri: GRAPHQL_API_PREFIX + 'jimmyllee098/alldefi-feature',
  cache: new InMemoryCache()
})

export const uniSwapClient = new ApolloClient({
  // uri: GRAPHQL_API_PREFIX + 'uniswap/uniswap-v3',
  uri: GRAPHQL_API_PREFIX + 'liqwiz/uniswap-v3-goerli',
  cache: new InMemoryCache()
})

export default client
