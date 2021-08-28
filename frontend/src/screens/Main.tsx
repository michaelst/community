import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Announcements from './Announcements'
import { useColorScheme } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCog, faDotCircle } from '@fortawesome/free-solid-svg-icons'

const Tab = createBottomTabNavigator()

const Main = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const baseTheme = isDarkMode ? DarkTheme : DefaultTheme

  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      muted: 'rgb(142, 142, 147)'
    }
  }

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

export default Main