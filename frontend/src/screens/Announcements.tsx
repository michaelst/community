import React from 'react'
import { FlatList, RefreshControl, StatusBar, Text, View } from 'react-native'
import { useQuery } from '@apollo/client'
import { useColorScheme } from 'react-native'

import {
  ListAnnouncements,
  ListAnnouncements_listAnnouncements
} from '../graphql/ListAnnouncements'
import { LIST_ANNOUNCEMENTS } from '../queries'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppStyles from '../utils/useAppStyles'

const Announcements = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const { data, loading, refetch } =
    useQuery<ListAnnouncements>(LIST_ANNOUNCEMENTS)

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={data?.listAnnouncements}
        renderItem={props => <Announcement key={props.item.id} {...props} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  )
}

type AnnouncementProps = {
  item: ListAnnouncements_listAnnouncements
}

const Announcement = ({ item }: AnnouncementProps) => {
  const { styles } = useAppStyles()

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderContainer}>
        <Text style={styles.cardHeaderText}>
          {item.insertedAt.toRelative()}
        </Text>
      </View>
      <View style={styles.cardBodyContainer}>
        <Text style={styles.text}>{item.body}</Text>
      </View>
    </View>
  )
}

export default Announcements
