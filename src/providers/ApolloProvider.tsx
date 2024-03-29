import { FC, ReactNode, useMemo } from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import { APOLLO_API_PREFIX } from '@/config/apollo'

import { useCurrChainID } from '@/hooks/useToken'

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const chainId = useCurrChainID()
  const getClient = useMemo(() => {
    return new ApolloClient({
      uri: APOLLO_API_PREFIX[chainId],
      cache: new InMemoryCache()
    })
  }, [chainId])
  return <ApolloProvider client={getClient}>{children}</ApolloProvider>
}

export default Provider
