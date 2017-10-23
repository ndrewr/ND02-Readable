// @flow

import React, { Component } from 'react';
import { Button, Icon, Form, Radio } from 'semantic-ui-react';

type Props = {
  direction: string,
  filter: string,
  options: any,
  onDirectionChange: any,
  onFilterChange: any
};

class ListDisplayControls extends Component<Props> {
  styles = {
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      background: '#e0e1e2 none'
    }
  };

  handleFilterChange = (event, { value }: { value: string }) => {
    const { onFilterChange } = this.props;
    onFilterChange(value);
  };

  handleDirectionChange = (event, { value }: { value: string }) => {
    const { onDirectionChange } = this.props;
    onDirectionChange(value);
  };

  render() {
    const {
      direction: selectedDirection,
      filter: selectedOption,
      options
    } = this.props;

    const SelectOption = ({ optionName, selectedOption, handleChange }) => (
      <Form.Field>
        <Radio
          label={optionName}
          name="radioGroup"
          value={optionName}
          checked={selectedOption === optionName}
          onChange={handleChange}
        />
      </Form.Field>
    );

    return (
      <Form>
        <Form.Group inline style={this.styles.container}>
          <Form.Field>Sort by:</Form.Field>
          {options.map(option => (
            <SelectOption
              key={option}
              optionName={option}
              selectedOption={selectedOption}
              handleChange={this.handleFilterChange}
            />
          ))}
          <Form.Field>
            <Button.Group>
              <Button
                active={selectedDirection === 'asc'}
                value="asc"
                onClick={this.handleDirectionChange}
              >
                <Button.Content visible>
                  <Icon name="caret up" />
                </Button.Content>
              </Button>
              <Button
                active={selectedDirection === 'desc'}
                value="desc"
                onClick={this.handleDirectionChange}
              >
                <Button.Content visible>
                  <Icon name="caret down" />
                </Button.Content>
              </Button>
            </Button.Group>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

export default ListDisplayControls;
