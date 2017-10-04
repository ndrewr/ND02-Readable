// @flow

import React from 'react';

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
      <PostCreator selectedCategory={category} />
      <PostList category={category} />
    </div>
  );
}

export default CategoryPage
