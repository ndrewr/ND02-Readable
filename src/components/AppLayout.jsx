// @flow

import * as React from 'react'
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'

import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
  categories: any,
  children?: React.Node,
};

const AppLayout = ({categories, children}: Props) => (
  <div>
    <Navbar categories={categories} />
    <Container text style={{ marginTop: '7em', minHeight: '90%'}}>
      <Header as='h1'>Make life more Readable.</Header>
      {children}
    </Container>
    <Footer />
  </div>
)

export default AppLayout
