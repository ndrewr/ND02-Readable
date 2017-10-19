// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header } from 'semantic-ui-react';

import formatTime from '../utils/formatTime';

import CommentCreator from '../components/CommentCreator';
import CommentList from '../components/CommentList';
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
    const { post } = this.props;
    const { editMode } = this.state;

    return (
      <div className="post-page">
        <Header size="small" textAlign="left" content={`/${post.category}`} />

        <div>
          <Button as="button" onClick={this.toggleEdit}>
            {editMode ? 'CANCEL' : 'EDIT'}
          </Button>
          <Button as="button" onClick={this.deletePost}>
            DELETE
          </Button>
        </div>
        {editMode ? (
          <PostEditor
            post={post}
            selectedCategory={post.category}
            onSubmit={this.toggleEdit}
          />
        ) : (
          <Grid>
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
            </Grid.Row>

            <p>{post.body}</p>
          </Grid>
        )}

        <h1>The comments:</h1>
        {post.id && <CommentList post_id={post.id} />}
        <hr />

        <CommentCreator parentId={post.id} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const post_id = props.match.params.post_id;
  let post = state.posts[post_id] || emptyPost;

  return {
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
