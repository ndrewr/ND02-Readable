// @flow

import React from 'react';

import { Header } from 'semantic-ui-react';

import PostCreator from '../components/PostCreator';
import PostList from '../components/PostList';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header
        size="huge"
        textAlign="center"
        content="READING is FUN-damental!"
        dividing
      />
      <PostCreator />
      <PostList />
    </div>
  );
};

export default HomePage;
