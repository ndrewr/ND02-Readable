// @flow

import React, { Component } from 'react';

import {
  Button,
  // Container,
  // Divider,
  // Grid,
  Icon,
  // List,
  // Visibility,
  Form,
  Radio,
} from 'semantic-ui-react'

type Props = {
  direction: string,
  filter: string,
  options: any,
  onDirectionChange: any,
  onFilterChange: any,
};

class ListDisplayControls extends Component<Props> {
  handleFilterChange = (event, { value }) => {
    const { onFilterChange } = this.props
    onFilterChange(value);
  }

  handleDirectionChange = (event, { value }) => {
    const { onDirectionChange } = this.props
    onDirectionChange(value);
  }

  render() {
    const { direction: selectedDirection, filter: selectedOption, options } = this.props

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

    return (
      <Form>
      <Form.Group inline>
        <Form.Field>
          Sort by:
        </Form.Field>
        {options.map(option =>
          <SelectOption
            key={option}
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
