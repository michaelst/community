import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { DateTime } from 'luxon'

import getFirebaseUser from './getFirebaseUser'
import privateConfig from '../../privateConfig.json'

const httpLink = createHttpLink({
  uri: privateConfig.apiUrl
})

const authLink = setContext(async (_, { headers }) => {
  const user = getFirebaseUser()

  if (user) {
    const token = await user.getIdToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  } else return { headers }
})

const cache = new InMemoryCache({
  typePolicies: {
    Announcement: {
      fields: {
        insertedAt: {
          read(timestamp) {
            return DateTime.fromISO(timestamp, { zone: 'UTC' })
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
