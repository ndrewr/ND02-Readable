import React from 'react'
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'

import Navbar from './Navbar'

const AppLayout = ({children}) => (
  <div>
    <Navbar />

    <Container text style={{ marginTop: '7em', minHeight: '90%'}}>
      <Header as='h1'>Make life more Readable.</Header>
      {children}
    </Container>

    <Segment
      inverted
      vertical
      style={{ margin: '10% 0 0', padding: '5em 0em' }}
    >
      <Container textAlign='center'>
        <Divider inverted section />
        <Image centered src={logo} className="App-logo" alt="logo" />
        <List horizontal inverted divided link>
          <List.Item as='a' href='#'>Site Map</List.Item>
          <List.Item as='a' href='#'>Contact Us</List.Item>
          <List.Item as='a' href='#'>Terms and Conditions</List.Item>
          <List.Item as='a' href='#'>Privacy Policy</List.Item>
        </List>
      </Container>
    </Segment>
  </div>
)

export default AppLayout
