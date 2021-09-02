import React, { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@apollo/client'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import messaging from '@react-native-firebase/messaging'
import { faCog, faDotCircle } from '@fortawesome/free-solid-svg-icons'

import Announcements from './Announcements'
import { CurrentResident } from '../graphql/CurrentResident'
import { CURRENT_RESIDENT } from '../queries'
import Settings from './Settings'
import Profile from '../views/Profile'

const Tab = createBottomTabNavigator()

const Main = () => {
  const { data } = useQuery<CurrentResident>(CURRENT_RESIDENT)
  const isDarkMode = useColorScheme() === 'dark'
  const baseTheme = isDarkMode ? DarkTheme : DefaultTheme

  useEffect(() => {
    // alway subscribe to resident-annoucements
    messaging().subscribeToTopic('resident-announcements')

    // only onwers should be subscribed to owner announcements
    if (data?.currentResident.owner) {
      messaging().subscribeToTopic('owner-announcements')
    } else if (data?.currentResident) {
      messaging().unsubscribeFromTopic('owner-announcements')
    }
  }, [data?.currentResident.owner])

  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      muted: 'rgb(142, 142, 147)',
      danger: 'rgb(221, 44, 0)'
    }
  }

  if (!data) return null

  if (data.currentResident.approved) {
    return (
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => {
              if (route.name === 'Announcements') {
                return <FontAwesomeIcon icon={faDotCircle} color={color} />
              } else if (route.name === 'Settings') {
                return <FontAwesomeIcon icon={faCog} color={color} />
              }
            }
          })}>
          <Tab.Screen name="Announcements" component={Announcements} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer theme={theme}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Profile resident={data.currentResident} />
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default Main
