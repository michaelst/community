/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import {
  useColorScheme,
  View,
} from 'react-native'
import { FirebaseAppProvider, useSigninCheck } from 'reactfire'
import 'firebase/auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

import Colors from './Colors'
import Login from './src/screens/Login/Login'
import Announcements from './src/screens/Announcements/Announcements'
import { config } from './firebase.config'
import privateConfig from './privateConfig.json'

const App = () => {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <Main />
    </FirebaseAppProvider>
  )
}

const Main = () => {
  const { status, data: signInCheckResult } = useSigninCheck()
  const isDarkMode = useColorScheme() === 'dark'

  if (status === 'loading') {
    return null
  }

  return (
    <View style={{ height: '100vh', backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
        { signInCheckResult.signedIn === true ? <LoggedIn /> : <Login /> }
    </View>
  )
}

const LoggedIn = () => {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <View>
      <Navbar variant={colorScheme} bg={colorScheme} expand={"sm"}>
        <Container>
          <Navbar.Brand href="#home">{ privateConfig.communityName }</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Announcements />
    </View>
  )
}

export default App
