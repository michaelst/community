import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { DateTime } from "luxon"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging'

import { useState } from 'react'
import { useEffect } from 'react'
import Main from './src/screens/Main'
import Login from './src/screens/Login'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
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

const cache = new InMemoryCache({
  typePolicies: {
    Announcement: {
      fields: {
        insertedAt: {
          read(timestamp) {
            return DateTime.fromISO(timestamp, { zone: "UTC" })
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache
})

const App = () => {
  useEffect(() => {
    messaging()
      .subscribeToTopic('announcements')
  }, [])

  return (
    <ApolloProvider client={client}>
      <AuthCheck />
    </ApolloProvider>
  )
}

const AuthCheck = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user)
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
