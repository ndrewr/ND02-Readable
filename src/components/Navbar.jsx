// @flow

import * as React from 'react'
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

import { Container, Image, Menu } from 'semantic-ui-react'

type Props = {
  categories: any,
};

const Navbar = ({categories}: Props) => (
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
        <Link to="/">Trending</Link>
      </Menu.Item>
      {categories.map((category) =>
        <Menu.Item key={category.name} as="a">
          <Link to={`/category/${category.name}`}>
            {category.name}
          </Link>
        </Menu.Item>
      )}
    </Container>
  </Menu>
)

export default Navbar
