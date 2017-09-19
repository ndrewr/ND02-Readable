// @flow

import React, { Component } from 'react';

import {
  Button,
  // Container,
  // Divider,
  // Grid,
  // Header,
  Icon,
  // Image,
  List,
  // Menu,
  // Segment,
  // Statistic,
  // Visibility,
  Form,
  Radio,
} from 'semantic-ui-react'

type Props = {
  options: any,
  onDirectionChange: any,
  onFilterChange: any,
};

type State = {
  selectedDirection: string,
  selectedOption: string,
};


class ListDisplayControls extends Component<Props, State> {
  state = {
    selectedDirection: 'desc',
    selectedOption: 'score',
  }

  handleFilterChange = (event, { value }) => {
    const { onFilterChange } = this.props
    console.log('changes....', event);
    onFilterChange(value);
    this.setState({selectedOption: value})
  }

  handleDirectionChange = (event, { value }) => {
    const { onDirectionChange } = this.props
    console.log('changes....', event, value);
    onDirectionChange(value);
    this.setState({selectedDirection: value})
  }

  render() {
    const { options } = this.props
    const { selectedDirection, selectedOption } = this.state

    const SelectOption = ({optionName, selectedOption, handleChange}) => (
      <Form.Field>
        <Radio
          label={optionName}
          name='radioGroup'
          value={optionName}
          checked={selectedOption === optionName}
          onChange={handleChange}
        />
      </Form.Field>
    )
    console.log('options are : ', options)
    return (
      <Form>
      <Form.Group inline>
        <Form.Field>
          Sort by:
        </Form.Field>
        {options.map(option =>
          <SelectOption
            optionName={option}
            selectedOption={selectedOption}
            handleChange={this.handleFilterChange}
          />
        )}
        <Form.Field>
          <Button.Group>
            <Button active={selectedDirection === 'asc'} value="asc" onClick={this.handleDirectionChange}>
              <Button.Content visible>
                <Icon name='caret up'/>
              </Button.Content>
            </Button>
            <Button active={selectedDirection === 'desc'} value="desc" onClick={this.handleDirectionChange}>
              <Button.Content visible>
                <Icon name='caret down' />
              </Button.Content>
            </Button>
          </Button.Group>
        </Form.Field>
      </Form.Group>
      </Form>
    )
  }
}

export default ListDisplayControls
