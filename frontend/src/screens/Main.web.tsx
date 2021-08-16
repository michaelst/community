import React from 'react'
import {
  useColorScheme,
  View,
} from 'react-native'
import { useUser } from 'reactfire'
import 'firebase/auth'
import Container from 'react-bootstrap/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Colors from '../../Colors'
import Announcements from './Announcements/Announcements'
import Header from './Header.web'
import Residents from './Residents/Residents'
import Documents from './Documents/Documents'
import Profile from './Profile/Profile'

const Main = () => {
  const { data: user } = useUser()
  const isDarkMode = useColorScheme() === 'dark'

  if (!user) {
    return null
  }

  return (
    <Router>
      <View style={{ height: '100vh', backgroundColor: isDarkMode ? Colors.dark : Colors.light }}>
        <Header />
        <Container>
        <Switch>
            <Route path="/residents">
              <Residents />
            </Route>
            <Route path="/announcements">
              <Announcements />
            </Route>
            <Route path="/documents">
              <Documents />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Announcements />
            </Route>
          </Switch>
        </Container>
      </View>
    </Router>
  )
}

export default Main
