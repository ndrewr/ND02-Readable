// @flow

import React from 'react';
import { Image } from 'semantic-ui-react';

import logo from '../logo.svg';

import injectStyles from '../utils/injectStyles';

const spinAnimation = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }`;

// this project doesn't use stylesheets; instead we can inject rules directly into HEAD
injectStyles(spinAnimation);

type LogoProps = {
  size: any,
  spin?: false,
  style: any // css style object
};

const Logo = ({ size, spin, style }: LogoProps) => {
  const logoStyles = {
    animation: spin ? 'spin infinite 20s linear' : '',
    height: '80px',
    ...style
  };

  const imageProps = {
    centered: true,
    size: size ? size : 'medium',
    src: logo,
    style: logoStyles
  };

  return <Image alt="logo" {...imageProps} />;
};

export default Logo;
