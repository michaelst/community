import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useQuery } from '@apollo/client'
import { useColorScheme } from 'react-native'

import { ListAnnouncements, ListAnnouncements_listAnnouncements } from '../graphql/ListAnnouncements'
import { LIST_ANNOUNCEMENTS } from '../queries'
import Colors from '../../Colors'

const Announcements = () => {
  const { data } = useQuery<ListAnnouncements>(LIST_ANNOUNCEMENTS)

  return (
    <FlatList
      data={data?.listAnnouncements}
      renderItem={props => <Announcement key={props.item.id} {...props} />}
    />
  )
}

type AnnouncementProps = {
  item: ListAnnouncements_listAnnouncements
}

const Announcement = ({ item }: AnnouncementProps) => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View
      style={{
        marginBottom: 8,
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}
    >

      <Text style={{ color: isDarkMode ? Colors.white : Colors.black }}>
        {item.insertedAt.toRelative()}
        {item.body}
      </Text>
    </View>
  )
}

export default Announcements