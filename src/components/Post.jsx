// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Header, List, Statistic } from 'semantic-ui-react';

import ConfirmButton from '../components/ConfirmButton';
import PostEditor from '../components/PostEditor';
import ScoreDisplay from '../components/ScoreDisplay';

import { deletePost, updateScore } from '../actions/posts';

import formatTime from '../utils/formatTime';

type PostItem = {
  category?: string,
  voteScore?: number,
  title?: string,
  id: string,
  timestamp: number,
  author?: string
};

type PostProps = {
  post: PostItem,
  deletePost: string => void,
  updateVoteScore: (string, string) => void
};

class Post extends Component<PostProps, { editMode: boolean }> {
  state = {
    editMode: false
  };

  styles = {
    container: {
      paddingTop: '.5em'
    },
    score: {
      textAlign: 'right'
    },
    button: {
      marginTop: '.5em'
    }
  };

  deletePost = () => {
    const { post, deletePost } = this.props;
    deletePost(post.id);
  };

  scoreUpdateHandler = event => {
    const { post, updateVoteScore } = this.props;

    document.activeElement && document.activeElement.blur();

    // dispatch vote score update
    updateVoteScore(post.id, event.currentTarget.value);
  };

  toggleEdit = event => {
    console.log('toggle edit mode');
    this.setState(state => ({ editMode: !state.editMode }));
  };

  render() {
    const { post } = this.props;
    const { editMode } = this.state;

    return (
      <List.Item style={this.styles.container}>
        <Divider />

        <ScoreDisplay
          customStyles={{ float: 'left' }}
          score={post.voteScore}
          size="tiny"
          updateScore={this.scoreUpdateHandler}
        />

        <Link to={`/post/${post.id}`}>
          <List.Content>
            <List.Header>
              <Header content={post.title} />
            </List.Header>

            <List.Description>
              posted {formatTime(post.timestamp)} by {post.author}
            </List.Description>
          </List.Content>
        </Link>
        <div>
          <Button
            color="grey"
            compact
            size="tiny"
            style={this.styles.button}
            onClick={this.toggleEdit}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
          <ConfirmButton
            size="tiny"
            style={this.styles.button}
            onConfirm={this.deletePost}
          />
        </div>
        {editMode && (
          <PostEditor
            post={post}
            selectedCategory={post.category}
            onSubmit={this.toggleEdit}
          />
        )}
      </List.Item>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deletePost: (post_id: string) => dispatch(deletePost(post_id)),
  updateVoteScore: (post_id: string, vote: 'upVote' | 'downVote') =>
    dispatch(updateScore(post_id, { option: vote }))
});

export default connect(null, mapDispatchToProps)(Post);
