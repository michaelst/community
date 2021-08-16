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

const Header = () => {
  document.title = privateConfig.communityName

  const history = useHistory()
  const auth = useAuth()
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <Navbar variant={colorScheme} bg={colorScheme} expand={"sm"}>
      <Container>
        <Navbar.Brand href="#home">{privateConfig.communityName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-toggle" />
        <Navbar.Collapse className="justify-content-end" id="navbar-toggle">
          <Nav>
            <NavLink name="Announcements" path="/announcements" />
            <NavLink name="Documents" path="/documents" />
            <NavLink name="Residents" path="/residents" />
            <NavDropdown title="Settings" id="settings">
              <NavDropdown.Item onClick={() => history.push("/profile")}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => auth.signOut()}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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