import React from 'react'
import { useColorScheme } from 'react-native'
import { useQuery } from '@apollo/client'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCog, faDotCircle } from '@fortawesome/free-solid-svg-icons'

import Announcements from './Announcements'
import { CurrentResident } from '../graphql/CurrentResident'
import { CURRENT_RESIDENT } from '../queries'
import Unapproved from './Unapproved'

const Tab = createBottomTabNavigator()

const Main = () => {
  const { data } = useQuery<CurrentResident>(CURRENT_RESIDENT)
  const isDarkMode = useColorScheme() === 'dark'
  const baseTheme = isDarkMode ? DarkTheme : DefaultTheme

  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      muted: 'rgb(142, 142, 147)'
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
          })}
        >
          <Tab.Screen name="Announcements" component={Announcements} />
          <Tab.Screen name="Settings" component={Announcements} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer theme={theme}>
      <Unapproved resident={data.currentResident} />
    </NavigationContainer>
  )
}

export default Main