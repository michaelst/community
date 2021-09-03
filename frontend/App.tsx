import React, { useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer
} from '@react-navigation/native'
import Main from './src/screens/Main'
import Login from './src/screens/Login'
import apolloClient from './src/utils/createApolloClient'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const baseTheme = isDarkMode ? DarkTheme : DefaultTheme

  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      muted: 'rgb(142, 142, 147)',
      danger: 'rgb(221, 44, 0)'
    }
  }
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer theme={theme}>
        <AuthCheck />
      </NavigationContainer>
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
