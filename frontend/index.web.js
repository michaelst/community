import React from 'react'
import {AppRegistry} from 'react-native'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {name as appName} from './app.json'
import App from './App.web'

const httpLink = createHttpLink({
  uri: 'https://f487df48a83b.ngrok.io/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const user = null

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

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
})