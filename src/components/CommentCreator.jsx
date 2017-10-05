// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Divider,
  Form,
  Segment,
  Select
} from 'semantic-ui-react'

import createUUID from '../utils/createUUID'

import { newPost } from '../actions/posts'

type CommentCreatorProps = {
  createComment: (any) => mixed,
};

type CommentCreatorState = {
  inputAuthor: string,
  inputContent: string,
  showForm: boolean,
}

class CommentCreator extends Component<CommentCreatorProps, CommentCreatorState> {
  state = {
    inputAuthor: '',
    inputContent: '',
    showForm: false,
  }

  handleAuthorChange = (event) => {
    this.setState({ inputAuthor: event.target.value })
  }

  handleContentChange = (event) => {
    this.setState({ inputContent: event.target.value })
  }

  onPostSubmit = (event, { value }: { value: string }) => {
    const { createComment } = this.props
    const { inputContent, inputAuthor } = this.state

    // validate these fields?
    // ensure unique ID?
    const postFields = {
      id: createUUID(),
      parent_id: '',
      timestamp: Date.now(), 
      body: inputContent, 
      author: inputAuthor,   
    }

    createComment(postFields)

    this.setState({
      inputAuthor: '',
      inputContent: '',
      showForm: false,
    })
  }

  toggleFormOpen = () => {
    this.setState(state => ({ showForm: ! state.showForm }))
  }

  render() {
    // const { categories } = this.props
    const {
      inputContent,
      inputAuthor,
      showForm
    } = this.state
   
    const headerText = showForm ? 'Comment!' : 'Comment?'
    const formStyles = {
      height: showForm ? '100%' : '0',
      overflowY: showForm ? 'auto' : 'hidden',
      transition: 'height .3s',
    }
    // const postCategories = categories.map((category: string, index: number) => ({
    //   text: category,
    //   value: category,
    //   key: category + String(index),
    // }));

    return (
      <Segment>
        <Button color={showForm ? 'green' : 'orange'} onClick={this.toggleFormOpen} size="large">
          {headerText}
        </Button>
        <Form style={formStyles} onSubmit={this.onPostSubmit}>
          <Divider />
          <Form.Field>
            <label>Post author</label>
            <input placeholder='I am Anon' value={inputAuthor} onChange={this.handleAuthorChange} />
          </Form.Field>
          <Form.Field>
            <Form.TextArea label='Post content' placeholder='Hello friends...' value={inputContent} onChange={this.handleContentChange} />
          </Form.Field>
          <Button type='submit'>Send!</Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => ({
  // categories: state.categories.map(category => category.name),
})

const mapDispatchToProps = dispatch => ({
  createComment: (postData) => dispatch(newPost(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreator)
