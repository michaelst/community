import React, { SetStateAction, useState } from 'react'
import { Button, StatusBar, Text, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Profile from './Profile'
import { CurrentResident_currentResident } from '../graphql/CurrentResident'
import appStyles from '../utils/appStyles'
import { Dispatch } from 'react'

type Props = {
  resident: CurrentResident_currentResident
}

const Unapproved = ({ resident }: Props) => {
  const [edit, setEdit] = useState(resident.name === null)

  if (edit) {
    return <Profile resident={resident} onSave={() => setEdit(false)} />
  } else {
    return <ViewOnlyProfile resident={resident} setEdit={setEdit} />
  }
}

type ViewOnlyProfileProps = {
  resident: CurrentResident_currentResident
  setEdit: Dispatch<SetStateAction<boolean>>
}

const ViewOnlyProfile = ({ resident, setEdit }: ViewOnlyProfileProps) => {
  const isDarkMode = useColorScheme() === 'dark'
  const { styles, baseUnit } = appStyles()

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.card}>
        <View style={styles.cardHeaderContainer}>
          <Text style={styles.cardHeaderText}>
            Fill out your information below and click save. An admin will need
            to review your information and approve you.
          </Text>
        </View>
        <View style={styles.cardBodyContainer}>
          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>Name</Text>
            <Text style={styles.text}>{resident.name}</Text>
          </View>

          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>Unit #</Text>
            <Text style={styles.text}>{resident.unit}</Text>
          </View>

          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>FCS Account Number</Text>
            <Text style={styles.text}>{resident.accountNumber}</Text>
          </View>
        </View>
      </View>

      <Button title="Edit" onPress={() => setEdit(true)} />
    </SafeAreaView>
  )
}

export default Unapproved
