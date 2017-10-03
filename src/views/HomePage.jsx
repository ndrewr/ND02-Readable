// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  // Button,
  // Container,
  // Divider,
  // Grid,
  Header,
  // Icon,
  // Image,
  // List,
  // Menu,
  // Segment,
  // Statistic,
  // Visibility,
} from 'semantic-ui-react'

import PostCreator from '../components/PostCreator'
import PostList from '../components/PostList'

const HomePage = () => {
 return (
    <div className="home-page">
      <Header size="huge" textAlign="center" content="Making life more Readable!" dividing />
      <PostCreator />
      <PostList />
    </div>
  );
}

export default HomePage
