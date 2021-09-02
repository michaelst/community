import React from 'react'
import { StatusBar, Text, TouchableHighlight, View } from 'react-native'
import { useColorScheme } from 'react-native'
import auth from '@react-native-firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'

import Profile from '../views/Profile'
import { useQuery } from '@apollo/client'
import { CurrentResident } from '../graphql/CurrentResident'
import { CURRENT_RESIDENT } from '../queries'
import useAppStyles from '../utils/useAppStyles'

const Settings = () => {
  const { styles, baseUnit } = useAppStyles()
  const isDarkMode = useColorScheme() === 'dark'
  const { data } = useQuery<CurrentResident>(CURRENT_RESIDENT)

  if (!data) return null

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Profile resident={data.currentResident} />

      <TouchableHighlight
        style={{ marginTop: baseUnit * 5 }}
        onPress={() => auth().signOut()}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.dangerText, textAlign: 'center' }}>
              Logout
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  )
}

export default Settings
