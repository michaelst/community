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
import { useQuery } from '@apollo/client'
import { Alert, Col, Row } from 'react-bootstrap'

import Colors from '../../Colors'
import Announcements from './Announcements'
import Header from './Header.web'
import Residents from './Residents'
import Files from './Files'
import Profile from './Profile.web'
import { CurrentResident } from '../graphql/CurrentResident'
import { CURRENT_RESIDENT } from '../queries'

const Main = () => {
  const { data } = useQuery<CurrentResident>(CURRENT_RESIDENT)
  const { data: user } = useUser()
  const isDarkMode = useColorScheme() === 'dark'

  if (!data || !user) {
    return null
  }

  if (data.currentResident.approved) {
    return (
      <Router>
        <View style={{ minHeight: '100vh', backgroundColor: isDarkMode ? Colors.dark : Colors.light }}>
          <Header />
          <Container>
            <Switch>
              {data.currentResident.admin ? (
                <Route path="/residents">
                  <Residents />
                </Route>
              ) : null}
              <Route path="/announcements">
                <Announcements />
              </Route>
              <Route path="/files">
                <Files />
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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      color: isDarkMode ? Colors.white : Colors.black
    }}>
      <Container className="p-5">
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            {data.currentResident.approved ?
              null :
              <Alert variant="warning">
                Fill out your information below and click save.
                An admin will need to review your information and approve you.
              </Alert>
            }
            <Profile />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Main
