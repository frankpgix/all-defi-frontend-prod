import { ApolloProvider } from '@apollo/client'
import { PropsWithChildren } from 'react'

import client from './client'

const ApolloClient = (props: PropsWithChildren) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}

export default ApolloClient
