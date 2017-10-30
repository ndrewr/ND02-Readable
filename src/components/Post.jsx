// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Header,
  Label,
  List,
  Statistic
} from 'semantic-ui-react';

import ConfirmButton from '../components/ConfirmButton';
import PostEditor from '../components/PostEditor';
import ScoreDisplay from '../components/ScoreDisplay';

import { loadComments } from '../actions/comments';
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
  commentCount: number,
  post: PostItem,
  deletePost: string => void,
  updateVoteScore: (string, string) => void,

  loadComments: string => void
};

class Post extends Component<
  PostProps,
  { editMode: boolean, commentCount: number }
> {
  state = {
    editMode: false,
    commentCount: this.props.commentCount
  };

  styles = {
    container: {
      paddingTop: '.5em'
    },
    commentCounter: {
      marginLeft: '1.5em'
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
    this.setState(state => ({ editMode: !state.editMode }));
  };

  componentWillMount() {
    const { post, loadComments } = this.props;
    loadComments(post.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentCount) {
      this.setState({ commentCount: nextProps.commentCount });
    }
  }

  render() {
    const { post } = this.props;
    const { commentCount, editMode } = this.state;

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

          <Label as="a" color="teal" tag style={this.styles.commentCounter}>
            {commentCount} comments
          </Label>
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

const mapStateToProps = (state, props) => {
  const allComments = Object.keys(state.comments).map(
    comment_id => state.comments[comment_id]
  );
  const postComments = allComments.filter(
    comment => props.post.id === comment.parentId
  );

  return {
    commentCount: postComments.length
  };
};

const mapDispatchToProps = dispatch => ({
  loadComments: post_id => dispatch(loadComments(post_id)),

  deletePost: (post_id: string) => dispatch(deletePost(post_id)),
  updateVoteScore: (post_id: string, vote: 'upVote' | 'downVote') =>
    dispatch(updateScore(post_id, { option: vote }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
