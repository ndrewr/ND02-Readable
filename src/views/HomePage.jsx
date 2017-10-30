// @flow

import React from 'react';

import { Header, Image } from 'semantic-ui-react';

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
      <Image src="images/reading-quote-suess.jpg" centered />
      <PostCreator />
      <PostList />
    </div>
  );
};

export default HomePage;
