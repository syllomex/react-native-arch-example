import { ApolloClient, InMemoryCache, concat, createHttpLink } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { onError } from '@apollo/client/link/error'

if (__DEV__) {
  loadDevMessages()
  loadErrorMessages()
}

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(
    onError(error => {
      // eslint-disable-next-line no-console
      console.log(error)
    }),
    createHttpLink({ uri: 'http://192.168.0.200:3000' }),
  ),
})
