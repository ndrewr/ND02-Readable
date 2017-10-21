// @flow

import * as React from 'react';
import { Container } from 'semantic-ui-react';

import Footer from './Footer';
import Navbar from './Navbar';

type LayoutProps = {
  categories: any,
  children?: React.Node
};

const AppLayout = ({ categories, children }: LayoutProps) => (
  <div>
    <Navbar categories={categories} />
    <Container text style={{ marginTop: '7em', minHeight: '90%' }}>
      {children}
    </Container>
    <Footer />
  </div>
);

export default AppLayout;
