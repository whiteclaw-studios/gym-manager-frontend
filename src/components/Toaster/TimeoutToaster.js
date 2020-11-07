/**
 *
 * Toaster
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Toaster from '../Toaster';

/* eslint-disable react/prefer-stateless-function */
class TimeoutToaster extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timerid = 0;
  }
  componentDidMount() {
    const { timeout = 3000, timeoutHandler } = this.props;
    if (typeof timeoutHandler === 'function') {
      this.timerid = setTimeout(timeoutHandler, timeout);
    }
  }
  closeHandler = () => {
    clearTimeout(this.timerid);
    this.props.timeoutHandler();
    if (typeof this.props.closeHandler === 'function')
      this.props.closeHandler();
  };
  render() {
    const { timeout, timeoutHandler, ...rest } = this.props;
    return (
      <Toaster {...rest} closeHandler={this.closeHandler}>
        {this.props.children || null}
      </Toaster>
    );
  }
}

TimeoutToaster.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  text: PropTypes.string,
  timeout: PropTypes.number,
  timeoutHandler: PropTypes.func,
  closeHandler: PropTypes.func,
};

export default TimeoutToaster;
