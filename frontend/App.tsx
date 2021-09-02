import React from 'react'
import { ApolloProvider } from '@apollo/client'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { useState } from 'react'
import { useEffect } from 'react'
import Main from './src/screens/Main'
import Login from './src/screens/Login'
import apolloClient from './src/utils/createApolloClient'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthCheck />
    </ApolloProvider>
  )
}

const AuthCheck = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  // Handle user state changes
  function onAuthStateChanged(firebaseUser: FirebaseAuthTypes.User | null) {
    setUser(firebaseUser)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  if (user) {
    return <Main />
  } else {
    return <Login />
  }
}

export default App
