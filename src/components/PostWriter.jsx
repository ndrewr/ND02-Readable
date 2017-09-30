// @flow

import React, { Component } from 'react';

import {
  Button,
  // Container,
  Divider,
  // Header,
  // Icon,
  // Input,
  // Label,
  // List,
  // Visibility,
  Form,
  // Radio,
  Segment,
  Select
} from 'semantic-ui-react'

import createUUID from '../utils/createUUID'

import readableApi from '../utils/readableApi' 

type Props = {
  categories: Array<string>,
};

type State = {
  inputAuthor: string,
  inputContent: string,
  inputCategory: string,
  inputTitle: string,
  showForm: boolean,
}

class PostWriter extends Component<Props, State> {
  state = {
    inputAuthor: '',
    inputContent: '',
    inputCategory: 'udacity',
    inputTitle: '',
    showForm: false,
  }

  handleAuthorChange = (event) => {
    this.setState({ inputAuthor: event.target.value })
  }

  handleContentChange = (event) => {
    this.setState({ inputContent: event.target.value })
  }

  handleCategoryChange = (event, { value }: { value: string }) => {
    console.log('update category!', event.target, ' and ', value)
    this.setState({ inputCategory: value })
  }

  handleTitleChange = (event) => {
    this.setState({ inputTitle: event.target.value })
  }

  onPostSubmit = (event, { value }: { value: string }) => {
    const { inputCategory, inputContent, inputAuthor, inputTitle } = this.state

    // validate these fields?
    // ensure unique ID?
    const postInfo = {
      id: createUUID(),
      timestamp: Date.now(), 
      title: inputTitle, 
      body: inputContent, 
      author: inputAuthor,   
      category: inputCategory,
    }

    console.log('submit form!', postInfo)

    readableApi.createNewPost(postInfo)
  }

  toggleFormOpen = () => {
    this.setState(state => ({ showForm: ! state.showForm }))
  }

  render() {
    const { categories } = this.props
    const {
      inputCategory,
      inputContent,
      inputAuthor,
      inputTitle,
      showForm
    } = this.state
   
    const headerText = showForm ? 'Write!' : 'Write?'
    const formStyles = {
      height: showForm ? '100%' : '0',
      overflowY: showForm ? 'auto' : 'hidden',
      transition: 'height .3s',
    }
    const postCategories = categories.map((category, index) => ({
      text: category,
      value: category,
      key: category + index,
    }));

    return (
      <Segment>
        <Button color={showForm ? 'green' : 'orange'} onClick={this.toggleFormOpen} size="massive">
          {headerText}
        </Button>
        <Form style={formStyles} onSubmit={this.onPostSubmit}>
          <Divider />
          <Form.Field>
            <Select placeholder='Post this in' options={postCategories} value={inputCategory} onChange={this.handleCategoryChange} />
          </Form.Field>
          <Form.Field>
            <label>Post author</label>
            <input placeholder='I am Anon' value={inputAuthor} onChange={this.handleAuthorChange} />
          </Form.Field>
          <Form.Field>
            <label>Post title</label>
            <input placeholder='I am Anon' value={inputTitle} onChange={this.handleTitleChange} />
          </Form.Field>
          <Form.Field>
            <Form.TextArea label='Post content' placeholder='Hello friends...' value={inputContent} onChange={this.handleContentChange} />
          </Form.Field>
          <Button type='submit'>Post!</Button>
        </Form>
      </Segment>
    )
  }
}

export default PostWriter
