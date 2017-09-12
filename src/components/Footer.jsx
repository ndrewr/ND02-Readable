// @flow

import React from 'react'
// import { Link } from 'react-router-dom';

import logo from '../logo.svg';

import { Container, Divider, Image, List, Segment } from 'semantic-ui-react'

const Footer = () => (
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
)

export default Footer
