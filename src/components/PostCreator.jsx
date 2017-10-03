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

type PostCreatorProps = {
  categories: Array<string>,
  createPost: (any) => mixed,
  selectedCategory?: string,
};

type PostCreatorState = {
  inputAuthor: string,
  inputContent: string,
  inputCategory: string,
  inputTitle: string,
  showForm: boolean,
}

class PostCreator extends Component<PostCreatorProps, PostCreatorState> {
  state = {
    inputAuthor: '',
    inputContent: '',
    inputCategory: this.props.selectedCategory || 'udacity',
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
    this.setState({ inputCategory: value })
  }

  handleTitleChange = (event) => {
    this.setState({ inputTitle: event.target.value })
  }

  onPostSubmit = (event, { value }: { value: string }) => {
    const { createPost } = this.props
    const { inputCategory, inputContent, inputAuthor, inputTitle } = this.state

    // validate these fields?
    // ensure unique ID?
    const postFields = {
      id: createUUID(),
      timestamp: Date.now(), 
      title: inputTitle, 
      body: inputContent, 
      author: inputAuthor,   
      category: inputCategory,
    }

    console.log('submit form!', postFields)

    createPost(postFields)

    this.setState({
      inputAuthor: '',
      inputContent: '',
      inputCategory: 'udacity',
      inputTitle: '',
      showForm: false,
    })
  }

  toggleFormOpen = () => {
    this.setState(state => ({ showForm: ! state.showForm }))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCategory !== this.state.inputCategory) {
      this.setState({ inputCategory: nextProps.selectedCategory })
    }
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
    const postCategories = categories.map((category: string, index: number) => ({
      text: category,
      value: category,
      key: category + String(index),
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

const mapStateToProps = (state) => ({
  categories: state.categories.map(category => category.name),
})

const mapDispatchToProps = dispatch => ({
  createPost: (postData) => dispatch(newPost(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator)
