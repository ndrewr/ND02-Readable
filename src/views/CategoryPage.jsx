// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Header,
} from 'semantic-ui-react'

import PostCreator from '../components/PostCreator'
import PostList from '../components/PostList'

type PageProps = {
  match: any,
}

const CategoryPage = (props: PageProps) => {
  const category = props.match.params.category_name
  return (
    <div className={`${category}-page`}>
      <Header size="huge" textAlign="center" content={`Now reading...${category}`} dividing />
      <PostCreator />
      <PostList category={category} />
    </div>
  );
}

export default CategoryPage
