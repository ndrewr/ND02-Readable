// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import Logo from './Logo';

type NavProps = {
  categories: any
};

const Navbar = ({ categories }: NavProps) => (
  <Menu fixed="top" inverted style={{ height: '80px' }}>
    <Container>
      <Menu.Item as="a" header>
        <Logo size="mini" style={{ marginRight: '1.5em' }} />
        READABLE
      </Menu.Item>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      {categories.map(category => (
        <Menu.Item
          key={category.name}
          as={Link}
          to={`/category/${category.name}`}
        >
          {category.name}
        </Menu.Item>
      ))}
    </Container>
  </Menu>
);

export default Navbar;
