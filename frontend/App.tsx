import React from 'react'
import 'firebase/auth'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { FirebaseAppProvider, useSigninCheck } from 'reactfire'
import { setContext } from '@apollo/client/link/context'
import firebase from 'firebase/app'

import { firebaseConfig } from './firebase.config'
import Login from './src/screens/Login'
import Main from './src/screens/Main'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const user = firebase.auth().currentUser

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

const App = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ApolloProvider client={client}>
        <AuthCheck />
      </ApolloProvider>
    </FirebaseAppProvider>
  )
}

const AuthCheck = () => {
  const { status, data: signInCheckResult } = useSigninCheck()

  if (status === 'loading') {
    return null
  }

  if (signInCheckResult.signedIn === true) {
    return <Main />
  } else {
    return <Login />
  }
}

export default App
