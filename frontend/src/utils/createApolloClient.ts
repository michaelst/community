import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { DateTime } from 'luxon'
import getFirebaseUser from './getFirebaseUser'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const user = getFirebaseUser()

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

export default client