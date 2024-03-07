import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GRAPHQL_API_PREFIX } from '@/config'
export const client = new ApolloClient({
  // uri: GRAPHQL_API_PREFIX + 'jimmyllee098/alldefi-test',
  // uri: GRAPHQL_API_PREFIX + 'jimmyllee098/alldefi-feature',
  uri: GRAPHQL_API_PREFIX + 'jimmyllee098/alldefi-dev',
  cache: new InMemoryCache()
})

export default client
