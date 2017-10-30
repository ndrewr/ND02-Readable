// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Image } from 'semantic-ui-react';

const NoMatchPage = () => {
  return (
    <div className="home-page">
      <Header
        size="huge"
        textAlign="center"
        content="You are Nowhere."
        dividing
      />
      <Header
        size="large"
        textAlign="center"
        content="But worry not, my friend!"
      />
      <Header size="large" textAlign="center" content="Here is a way home..." />
      <Link to="/">
        <Image
          src="images/warp-pipe.png"
          centered
          style={{ borderBottom: '4px dashed black' }}
        />
      </Link>
    </div>
  );
};

export default NoMatchPage;
