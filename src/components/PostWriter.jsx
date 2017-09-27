// @flow

import React, { Component } from 'react';

import {
  Button,
  // Container,
  Divider,
  // Header,
  // Icon,
  Input,
  // Label,
  // List,
  // Visibility,
  Form,
  // Radio,
  Segment,
  Select
} from 'semantic-ui-react'

type Props = {
  categories: Array<string>,
};

type State = {
  showForm: boolean,
}

class PostWriter extends Component<Props, State> {
  state = {
    showForm: false,
  }
  onPostSubmit = (event, { value }: { value: string }) => {
    console.log('toggle form!')
  }

  toggleFormOpen = () => {
    console.log('toggle form!')
    this.setState(state => ({ showForm: ! state.showForm }))
  }

  render() {
    const { categories } = this.props
    const { showForm } = this.state
   
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
            <Select placeholder='Post this in' options={postCategories} />
          </Form.Field>
          <Form.Field>
            <label>Post author</label>
            <input placeholder='I am Anon' />
          </Form.Field>
          <Form.Field>
            <Form.TextArea label='Post content' placeholder='Hello friends...' />
          </Form.Field>
          <Button type='submit'>Post!</Button>
        </Form>
      </Segment>
    )
  }
}

export default PostWriter
