// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import {
  // Header,
  // Icon,
  List,
  // Segment,
  Statistic,
  // Visibility,
} from 'semantic-ui-react'

import formatTime from '../utils/formatTime'

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
    <Link to={`/post/${post.id}`}>
      <List.Content>
        <Statistic floated="left" size="small" style={{width: '4rem', marginRight: '2rem'}}>
          <Statistic.Value style={{textAlign: 'right'}}>
            {post.voteScore}
          </Statistic.Value>
        </Statistic>
        <List.Header as='a'>
          {post.title}
        </List.Header>
          <List.Description>
            posted {formatTime(post.timestamp)} by {post.author}
          </List.Description>
      </List.Content>
    </Link>
  </List.Item>
)

export default Post
