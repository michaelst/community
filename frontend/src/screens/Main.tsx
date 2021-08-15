import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native'

import Colors from '../../Colors'
import Announcements from './Announcements/Announcements'

const Main = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
          <Announcements />
      </View>
    </SafeAreaView>
  )
}

export default Main