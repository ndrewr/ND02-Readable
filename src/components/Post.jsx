// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import {
  // Divider,
  // Grid,
  // Header,
  // Icon,
  List,
  // Segment,
  Statistic,
  // Visibility,
} from 'semantic-ui-react'

type PostItem = {
  category?: string,
  voteScore?: number,
  title?: string,
  id?: string,
  timestamp?: string,
  author?: string,
};

const Post = ({ post }: { post: PostItem }) => (
  <List.Item style={{marginBottom: '1rem'}}>
    <List.Content>
      <Statistic floated="left" size="small" style={{width: '4rem', marginRight: '2rem'}}>
        <Statistic.Value style={{textAlign: 'right'}}>
          {post.voteScore}
        </Statistic.Value>
      </Statistic>
      <List.Header as='a'>
        {post.title}
      </List.Header>
      <Link to={`/post/${post.id}`}>
        <List.Description>
          posted {new Date(post.timestamp).toLocaleDateString()} by {post.author}
        </List.Description>
      </Link>
    </List.Content>
  </List.Item>
)

export default Post
