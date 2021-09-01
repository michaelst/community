import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { FirebaseAppProvider, useSigninCheck } from 'reactfire'

import { firebaseConfig } from './firebase.config'
import Main from './src/screens/Main'
import Login from './src/screens/Login'
import apolloClient from './src/utils/createApolloClient'

const App = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ApolloProvider client={apolloClient}>
        <AuthCheck />
      </ApolloProvider>
    </FirebaseAppProvider>
  )
}

const AuthCheck = () => {
  const { status, data: signInCheckResult } = useSigninCheck()

  if (status === 'loading') return null

  if (signInCheckResult.signedIn === true) {
    return <Main />
  } else {
    return <Login />
  }
}

export default App
