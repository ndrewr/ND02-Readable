// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  // Container,
  // Divider,
  Grid,
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

import CommentCreator from '../components/CommentCreator'
import CommentList from '../components/CommentList'
import PostEditor from '../components/PostEditor'


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

type PostPageProps = {
  post_id: string,
  post: PostItem,
  // loadComments: (string) => void,
}

type PostPageState = {
  editMode: boolean,
}

// const PostPage = ({ comments, post = emptyPost }: { comments: any, post: PostItem }) => {
class PostPage extends React.Component<PostPageProps, PostPageState> {
  state = {
    editMode: false,
  }

  toggleEdit = (event) => {
    this.setState(state => ({ editMode: ! state.editMode }))
  }

  render() {
    const { post } = this.props
    const { editMode } = this.state

     return (
        <div className="post-page">
          <Header size="small" textAlign="left" content={`/${post.category}`} />

          <div>
            <Button as='button' onClick={this.toggleEdit}>
              EDIT
            </Button>
          </div>
          {editMode
            ? <PostEditor post={post} selectedCategory={post.category} />
            : <Grid>
                <Grid.Row>
                  <Grid.Column width={12}>
                    <Header size="huge" content={post.title} />
                    <Header sub size="small" content={`submitted on ${formatTime(post.timestamp)} by ${post.author}`} dividing />
                  </Grid.Column>

                  <Grid.Column width={4} textAlign="center">
                    <Statistic size="large" value={post.voteScore} />
                  </Grid.Column>
                </Grid.Row>
             
                <p>
                  {post.body}
                </p>
              </Grid>
          }

          <h1>The comments:</h1>
          {post.id &&
            <CommentList post_id={post.id} />
          }
          <hr />

          <CommentCreator parentId={post.id} />
        </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const post_id = props.match.params.post_id
  let post = state.posts[post_id] || emptyPost

  return ({
    post_id,
    post,
  })
}

const mapDispatchToProps = dispatch => ({
  // createPost: (postData) => dispatch(newPost(postData))
  // loadComments: (post_id) => dispatch(loadComments(post_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
// export default PostPage
