// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Divider,
  Form,
  Segment,
} from 'semantic-ui-react'

import createUUID from '../utils/createUUID'

import { createComment } from '../actions/comments'

type CommentCreatorProps = {
  parentId: string,
  addComment: (any) => mixed,
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
    const { parentId, addComment } = this.props
    const { inputContent, inputAuthor } = this.state

    // validate these fields?
    // ensure unique ID?
    const commentFields = {
      id: createUUID(),
      parentId: parentId,
      timestamp: Date.now(), 
      body: inputContent, 
      author: inputAuthor,   
    }

    console.log("create the comment!")
    addComment(commentFields)

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

    return (
      <Segment>
        <Button color={showForm ? 'green' : 'orange'} onClick={this.toggleFormOpen} size="large">
          {headerText}
        </Button>
        <Form style={formStyles} onSubmit={this.onPostSubmit}>
          <Divider />
          <Form.Field>
            <label>Comment author</label>
            <input placeholder='I am Anon' value={inputAuthor} onChange={this.handleAuthorChange} />
          </Form.Field>
          <Form.Field>
            <Form.TextArea label='Comment content' placeholder='Hello friends...' value={inputContent} onChange={this.handleContentChange} />
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
  addComment: (commentData) => dispatch(createComment(commentData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreator)
