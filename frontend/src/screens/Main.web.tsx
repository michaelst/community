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

import Colors from '../../Colors'
import Announcements from '../../src/screens/Announcements/Announcements'
import privateConfig from '../../privateConfig.json'

const Main = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <View style={{ height: '100vh', backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
      <Navbar variant={colorScheme} bg={colorScheme} expand={"sm"}>
        <Container>
          <Navbar.Brand href="#home">{privateConfig.communityName}</Navbar.Brand>
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

export default Main
