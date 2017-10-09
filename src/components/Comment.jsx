// @flow

import React from 'react';
// import { Link } from 'react-router-dom';
import {
  // Header,
  // Icon,
  List,
  // Segment,
  Statistic,
  // Visibility,
} from 'semantic-ui-react'

import formatTime from '../utils/formatTime'

type CommentItem = {
  // category?: string,
  voteScore?: number,
  body?: string,
  id: string,
  timestamp: number,
  author?: string,
};

const Comment = ({ comment }: { comment: CommentItem }) => (
  <List.Item style={{marginBottom: '1rem'}}>
    <List.Content>
      <Statistic floated="left" size="small" style={{width: '4rem', marginRight: '2rem'}}>
        <Statistic.Value style={{textAlign: 'right'}}>
          {comment.voteScore}
        </Statistic.Value>
      </Statistic>
      <List.Header as='a'>
        {comment.body}
      </List.Header>
        <List.Description>
          commented {formatTime(comment.timestamp)} by {comment.author}
        </List.Description>
    </List.Content>
  </List.Item>
)

export default Comment
