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
  Statistic,
  // Visibility,
} from 'semantic-ui-react'

import formatTime from '../utils/formatTime'

import PostCreator from '../components/PostCreator'
import PostList from '../components/PostList'

type PostItem = {
  body: string,
  category: string,
  voteScore: number,
  title: string,
  id: string,
  timestamp: number,
  author: string,
};

const emptyPost = {
  body: '',
  category: '',
  voteScore: 0,
  title: '',
  id: '',
  timestamp: 0,
  author: '',
}

const PostPage = ({ post = emptyPost }: { post: PostItem }) => {
 return (
    <div className="post-page">
      <Header size="small" textAlign="left" content={`/${post.category}`} />
      <Header size="huge" textAlign="center" content={post.title} dividing />
      <PostCreator selectedCategory={post.category} />
      <p>
        <span>submitted on {formatTime(post.timestamp)} by {post.author}</span>
      </p>
      <p>
        {post.body}
      </p>
      <p>
        <Statistic size="large" value={post.voteScore} />
      </p>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  console.log('render Post...', state)
  let post = emptyPost

  if (state.posts.length) {
    post = {...state.posts.find(post => post.id === props.match.params.post_id)}
    // TODO: if post doesn't exist show an error page...
  }
  // const post_id = props.match.params.post_id
  return ({
    // categories: state.categories.map(category => category.name),
    post
  })
}

const mapDispatchToProps = dispatch => ({
  // createPost: (postData) => dispatch(newPost(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
// export default PostPage
