// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form } from 'semantic-ui-react';

import { updatePost } from '../actions/posts';

type PostCreatorProps = {
  post: any,
  onSubmit: () => void,
  updatePost: any => mixed
};

type PostCreatorState = {
  inputContent: string,
  inputTitle: string
};

class PostCreator extends Component<PostCreatorProps, PostCreatorState> {
  constructor(props) {
    super(props);

    this.state = {
      inputContent: props.post.body,
      inputTitle: props.post.title
    };
  }

  handleContentChange = event => {
    this.setState({ inputContent: event.target.value });
  };

  handleTitleChange = event => {
    this.setState({ inputTitle: event.target.value });
  };

  onPostSubmit = (event, { value }: { value: string }) => {
    const { post, onSubmit, updatePost } = this.props;
    const { inputContent, inputTitle } = this.state;

    // TODO: validate these fields? ensure unique ID?
    const postFields = {
      title: inputTitle,
      body: inputContent
    };

    updatePost(post.id, postFields);

    onSubmit(); // post update hook passed down from parent

    this.setState({
      inputContent: '',
      inputTitle: ''
    });
  };

  render() {
    const { inputContent, inputTitle } = this.state;

    const formStyles = {
      transition: 'height .3s'
    };

    return (
      <div>
        <Form style={formStyles} onSubmit={this.onPostSubmit}>
          <Divider />
          <Form.Field>
            <label>Post title</label>
            <input
              placeholder="I am Anon"
              value={inputTitle}
              onChange={this.handleTitleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Post content"
              placeholder="Hello friends..."
              value={inputContent}
              onChange={this.handleContentChange}
            />
          </Form.Field>
          <Button type="submit">Update!</Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updatePost: (post_id, postData) => dispatch(updatePost(post_id, postData))
});

export default connect(null, mapDispatchToProps)(PostCreator);
