/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import auth from '@react-native-firebase/auth'

import App from './App'
import {name as appName} from './app.json'

const httpLink = createHttpLink({
  uri: 'https://bd46792eb2f6.ngrok.io/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const user = auth().currentUser

  if (user) {
    const token = await user.getIdToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    } 
  } else {
    return { headers }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => ApolloApp)
