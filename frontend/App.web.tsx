/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react'
import {
  useColorScheme,
  View,
} from 'react-native'

import Colors from './Colors'

import Login from './src/screens/Login/Login'
import Announcements from './src/screens/Announcements/Announcements'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
        <Announcements />
    </View>
  )
}

export default App
