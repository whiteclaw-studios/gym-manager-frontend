import PropTypes from 'prop-types';
import React from 'react';
import { css, cx } from 'react-emotion';
export default class ReactCssTransition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childMount: false,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.shouldShow === true && state.childMount === false) {
      return { childMount: true };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.props.shouldShow === false && this.state.childMount === true) {
      const changeStateAfter = this.props.duration
        ? this.props.duration - 50
        : 350;
      setTimeout(
        () =>
          this.setState({
            childMount: false,
          }),
        changeStateAfter,
      );
    }
  }
  generateAnimation = (animateStyle, duration) => css`
    animation-duration: ${duration}ms;
    animation-fill-mode: both;
    animation-name: ${animateStyle};
  `;

  render() {
    const {
      duration = 400,
      mountingStyle,
      unmountingStyle,
      shouldShow,
      unMountCallback,
      key = null,
    } = this.props;
    const mountAnimation = mountingStyle
      ? this.generateAnimation(mountingStyle, duration)
      : '';
    const unmountAnimation = unmountingStyle
      ? this.generateAnimation(unmountingStyle, duration)
      : '';
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        className: shouldShow
          ? cx(mountAnimation, child.props && child.props.className)
          : cx(unmountAnimation, child.props && child.props.className),
        unMountCallback: unMountCallback || null,
        key,
      }),
    );
    return shouldShow === false && this.state.childMount === false ? null : (
      <React.Fragment>{childrenWithProps}</React.Fragment>
    );
  }
}
ReactCssTransition.propTypes = {
  duration: PropTypes.number,
  mountingStyle: PropTypes.string,
  unmountingStyle: PropTypes.string,
  unMountCallback: PropTypes.func,
  shouldShow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
    .isRequired,
  key: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
