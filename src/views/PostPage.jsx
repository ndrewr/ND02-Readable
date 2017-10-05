// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  // Button,
  // Container,
  // Divider,
  Grid,
  Header,
  // Icon,
  // Image,
  Item,
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

      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header size="huge" content={post.title} />
            <Header sub size="small" content={`submitted on ${formatTime(post.timestamp)} by ${post.author}`} dividing />
          </Grid.Column>

          <Grid.Column width={4} textAlign="center">
            <Statistic size="large" value={post.voteScore} />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <p>
        {post.body}
      </p>

      <PostCreator selectedCategory={post.category} />
    </div>
  );
}

const mapStateToProps = (state, props) => {
  console.log('render Post...', state)
  let post = emptyPost
  // const post_id = props.match.params.post_id

  if (state.posts.length) {
    post = {...state.posts.find(post => post.id === props.match.params.post_id)}
    // TODO: if post doesn't exist show an error page...
  }

  return ({
    post
  })
}

const mapDispatchToProps = dispatch => ({
  // createPost: (postData) => dispatch(newPost(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
// export default PostPage
