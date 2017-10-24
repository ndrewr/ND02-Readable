// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Grid, Header, Icon } from 'semantic-ui-react';

import formatTime from '../utils/formatTime';

import CommentCreator from '../components/CommentCreator';
import CommentList from '../components/CommentList';
import ConfirmButton from '../components/ConfirmButton';
import PostEditor from '../components/PostEditor';

import ScoreDisplay from '../components/ScoreDisplay';

import { deletePost, updateScore } from '../actions/posts';

type PostItem = {
  body: string,
  category: string,
  voteScore: number,
  title: string,
  id: string,
  timestamp: number,
  author: string
};

const emptyPost = {
  body: '',
  category: '',
  voteScore: 0,
  title: '',
  id: '',
  timestamp: 0,
  author: ''
};

type PostPageProps = {
  comment_count: number,
  history: any,
  post_id: string,
  post: PostItem,
  deletePost: string => void,
  updateVoteScore: string => void
};

type PostPageState = {
  editMode: boolean
};

class PostPage extends React.Component<PostPageProps, PostPageState> {
  state = {
    editMode: false
  };

  deletePost = () => {
    const { post_id, history, deletePost } = this.props;
    deletePost(post_id);
    history.goBack();
  };

  toggleEdit = event => {
    this.setState(state => ({ editMode: !state.editMode }));
  };

  updateScore = event => {
    const { updateVoteScore } = this.props;

    document.activeElement && document.activeElement.blur();

    // dispatch vote score update
    updateVoteScore(event.currentTarget.value);
  };

  render() {
    const { comment_count, post } = this.props;
    const { editMode } = this.state;

    return (
      <div className="post-page">
        <Header size="small" textAlign="left" content={`/${post.category}`} />

        <Grid>
          {editMode ? (
            <Grid.Row>
              <Grid.Column>
                <PostEditor
                  post={post}
                  selectedCategory={post.category}
                  onSubmit={this.toggleEdit}
                />
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Grid.Row>
              <Grid.Column width={12}>
                <Header size="huge" content={post.title} />
                <Header
                  sub
                  size="small"
                  content={`submitted on ${formatTime(
                    post.timestamp
                  )} by ${post.author}`}
                  dividing
                />
              </Grid.Column>

              <Grid.Column width={4} textAlign="center">
                <ScoreDisplay
                  score={post.voteScore}
                  updateScore={this.updateScore}
                />
              </Grid.Column>

              <Grid.Column width={12}>
                <p style={{ fontSize: '18px' }}>{post.body}</p>
              </Grid.Column>
            </Grid.Row>
          )}

          <Grid.Row>
            <Grid.Column textAlign="right" width={12}>
              <Button
                as="button"
                compact
                content={editMode ? 'Cancel' : 'Edit'}
                size="small"
                onClick={this.toggleEdit}
              />
              <ConfirmButton onConfirm={this.deletePost} size="small" />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider hidden horizontal section />

        <Header>
          <Header.Content>Discussion</Header.Content>
          <Header.Subheader
            content={`(Showing ${comment_count} comments)`}
            style={{ display: 'inline-block', marginLeft: '1em' }}
          />
        </Header>
        {post.id && <CommentList post_id={post.id} />}
        <Divider section />

        <CommentCreator parentId={post.id} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const post_id = props.match.params.post_id;
  let post = state.posts[post_id] || emptyPost;

  return {
    comment_count: Object.keys(state.comments).length,
    post_id,
    post
  };
};

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  deletePost: (post_id: string) => dispatch(deletePost(post_id)),
  updateVoteScore: (vote: 'upVote' | 'downVote') =>
    dispatch(updateScore(params.post_id, { option: vote }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
