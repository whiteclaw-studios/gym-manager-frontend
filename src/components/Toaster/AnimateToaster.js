/**
 *
 * Toaster
 *
 */

import React from 'react';
import { keyframes } from 'react-emotion';
import PropTypes from 'prop-types';
import TimeoutToaster from './TimeoutToaster';
import ReactCssTransition from '../ReactCssTransition';

const unmountDefault = keyframes`
  from {
    opacity: 1;
    /* top:0 */
    transform: translateY(0)
  }
  to {
    opacity: 0;
    /* top:-10vh */
    transform: translateY(-10vh)
  }
`;

const mountDefault = keyframes`
  from {
    opacity: 0;
    /* top:10vh; */
    transform: translateY(10vh)
  }
  to  {
    opacity: 1;
    /* top:0; */
    transform: translateY(0)
  }
`;
/* eslint-disable react/prefer-stateless-function */
class AnimateToaster extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showToaster: true,
    };
  }
  toggleToaster = () => {
    this.setState({ showToaster: false });
  };
  render() {
    const {
      animationDuration = 500,
      mountingStyle,
      unmountingStyle,
      timeout,
      ...rest
    } = this.props;
    const timeoutVal = animationDuration + (timeout || 2000);
    const mount = mountingStyle || mountDefault;
    const unmount = unmountingStyle || unmountDefault;
    return (
      <ReactCssTransition
        duration={animationDuration}
        unmountingStyle={unmount}
        mountingStyle={mount}
        shouldShow={this.state.showToaster}
      >
        <TimeoutToaster
          timeout={timeoutVal}
          timeoutHandler={this.toggleToaster}
          {...rest}
        >
          {this.props.children || null}
        </TimeoutToaster>
      </ReactCssTransition>
    );
  }
}

AnimateToaster.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  text: PropTypes.string,
  timeout: PropTypes.number,
  animationDuration: PropTypes.number,
  mountingStyle: PropTypes.string,
  unmountingStyle: PropTypes.string,
};

export default AnimateToaster;
