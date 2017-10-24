// @flow

import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import injectStyles from '../utils/injectStyles';

// this project doesn't use stylesheets; instead we can inject rules directly into HEAD
injectStyles(`button.delete-button:hover {
  background-color: red !important;
}`);

type ConfirmBtnProps = {
  size: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'huge',
  style?: any, // css style object
  onConfirm: () => void
};

type ConfirmBtnState = {
  confirmed: boolean
};

class ConfirmButton extends Component<ConfirmBtnProps, ConfirmBtnState> {
  state = {
    confirmed: false
  };

  handleClick = () => {
    const { onConfirm } = this.props;
    const { confirmed } = this.state;

    if (confirmed) {
      onConfirm();
    } else {
      this.setState({ confirmed: true });
    }
  };

  handleBlur = () => {
    this.setState({ confirmed: false });
  };

  render() {
    const { size } = this.props;
    const { confirmed } = this.state;

    return (
      <Button
        className="delete-button"
        color={confirmed ? 'red' : 'grey'}
        compact
        content={confirmed ? 'Sure?' : 'Delete'}
        size={size}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
      />
    );
  }
}

export default ConfirmButton;
