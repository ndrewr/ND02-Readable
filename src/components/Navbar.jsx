import React from 'react'
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

import { Container, Image, Menu } from 'semantic-ui-react'

const Navbar = ({children}) => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item as='a' header>
        <Image
          size='mini'
          src={logo}
          style={{ marginRight: '1.5em' }}
        />
        READABLE
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/category/pirates">Pirates</Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/category/ninjas">Ninjas</Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/category/sharks">Sharks</Link>
      </Menu.Item>
    </Container>
  </Menu>
)

export default Navbar
