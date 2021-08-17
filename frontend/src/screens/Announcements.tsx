import React from 'react'
import { FlatList, Text } from 'react-native'
import { useQuery } from '@apollo/client'

import Colors from '../../Colors'
import { ListAnnouncements } from '../graphql/ListAnnouncements'
import { LIST_ANNOUNCEMENTS } from '../queries'

const Announcements = () => {
  const { data } = useQuery<ListAnnouncements>(LIST_ANNOUNCEMENTS)

  return (
    <FlatList
      data={data?.listAnnouncements}
      renderItem={({item}) => <Text key={item.id} style={{color: Colors.white}}>{item.body}</Text>}
    />
  )
}

export default Announcements