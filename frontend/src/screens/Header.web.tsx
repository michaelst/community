import React from 'react'
import { useColorScheme } from 'react-native'
import { useAuth } from 'reactfire'
import 'firebase/auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import {
  useLocation,
  useHistory
} from "react-router-dom"

import privateConfig from '../../privateConfig.json'
import { useQuery } from '@apollo/client'
import { CURRENT_RESIDENT } from '../queries'
import { CurrentResident } from '../graphql/CurrentResident'
import { Offcanvas } from 'react-bootstrap'
import { useState } from 'react'
import Profile from './Profile.web'
import Colors from '../../Colors'

const Header = () => {
  document.title = privateConfig.communityName

  const [show, setShow] = useState(false)

  const { data } = useQuery<CurrentResident>(CURRENT_RESIDENT)
  const auth = useAuth()
  const colorScheme = useColorScheme() ?? 'light'
  const isDarkMode = useColorScheme() === 'dark'

  if (!data) return null

  return (
    <>
      <Navbar variant={colorScheme} bg={colorScheme} expand={"sm"}>
        <Container>
          <Navbar.Brand href="#home">{privateConfig.communityName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-toggle" />
          <Navbar.Collapse className="justify-content-end" id="navbar-toggle">
            <Nav>
              <NavLink name="Announcements" path="/announcements" />
              <NavLink name="Files" path="/files" />
              {data.currentResident.admin ? <NavLink name="Residents" path="/residents" /> : null}
              <NavDropdown title="Settings" id="settings">
                <NavDropdown.Item onClick={() => setShow(true)}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => auth.signOut()}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement={'end'}
        backdrop={false}
        style={{
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          color: isDarkMode ? Colors.white : Colors.black,
        }}
      >
        <Offcanvas.Header closeButton closeVariant={isDarkMode ? "white" : undefined}>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Profile resident={data.currentResident} onSave={() => setShow(false)}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

type NavLinkProps = {
  name: string,
  path: string
}

const NavLink = ({ name, path }: NavLinkProps) => {
  const location = useLocation()
  const history = useHistory()
  const active = location.pathname === path

  return (
    <Nav.Link className={active ? 'active' : ''} onClick={() => history.push(path)}>
      {name}
    </Nav.Link>
  )
}

export default Header