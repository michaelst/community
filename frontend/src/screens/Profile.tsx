import { useMutation } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { Button, useColorScheme } from 'react-native'
import { StatusBar, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CurrentResident_currentResident } from '../graphql/CurrentResident'
import { UPDATE_PROFILE } from '../queries'
import appStyles from '../utils/appStyles'

type ProfileProps = {
  resident: CurrentResident_currentResident
  onSave?: () => void
}

const Profile = ({ resident, onSave }: ProfileProps) => {
  const { styles, baseUnit } = appStyles()
  const isDarkMode = useColorScheme() === 'dark'

  const [name, setName] = useState(resident.name)
  const [unit, setUnit] = useState(resident.unit)
  const [accountNumber, setAccountNumber] = useState(resident.accountNumber)

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      name: name,
      unit: unit,
      accountNumber: accountNumber
    }
  })

  const save = () => {
    updateProfile().then(() => onSave && onSave())
  }

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
            <TextInput
              style={styles.formInputText}
              onChangeText={setName}
              value={name || ''}
            />
          </View>

          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>Unit #</Text>
            <TextInput
              style={styles.formInputText}
              onChangeText={setUnit}
              value={unit || ''}
            />
          </View>

          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>FCS Account Number</Text>
            <TextInput
              style={styles.formInputText}
              onChangeText={setAccountNumber}
              value={accountNumber || ''}
            />
          </View>
        </View>
      </View>

      <Button title="Save" onPress={save} />
    </SafeAreaView>
  )
}

export default Profile
