import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useQuery } from '@apollo/client'

import { LIST_ANNOUNCEMENTS } from './queries'
import Colors from '../../Colors'
import { ListAnnouncements } from './graphql/ListAnnouncements'

const Announcements = () => {
  const { loading, error, data } = useQuery<ListAnnouncements>(LIST_ANNOUNCEMENTS)
  console.log(loading, error, data)

  return (
    <FlatList
      data={data?.listAnnouncements}
      renderItem={({item}) => <Text key={item.id} style={{color: Colors.white}}>{item.body}</Text>}
    />
  )
}

export default Announcements