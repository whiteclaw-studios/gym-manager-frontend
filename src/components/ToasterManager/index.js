/**
 *
 * ToasterManager
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import AnimateToaster from '../Toaster/AnimateToaster';
const ToasterContainer = styled('div')`
  position: fixed;
  width: 95%;
  max-width: 320px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
  z-index: 1002;
`;
/* eslint-disable react/prefer-stateless-function */
class ToasterManager extends React.PureComponent {
  constructor(props) {
    super(props);
    this.customToaster = {};
    this.toasterQueue = [];
  }

  constructToaster = (
    conf,
    key, // const { type, component, componentProps } = conf;
  ) => <AnimateToaster key={key} {...conf} />;

  render() {
    const { config, showToaster, timestamp } = this.props;
    const toasterAlreadyPresent = this.toasterQueue.some(
      (toaster) => toaster.key === timestamp,
    );

    if (!showToaster) {
      this.toasterQueue = [];
    }

    if (showToaster && !toasterAlreadyPresent) {
      this.toasterQueue.push({
        key: timestamp,
        component: this.constructToaster(config, timestamp),
      });
    }

    return (
      <React.Fragment>
        <ToasterContainer
          className={config ? config.toasterContainerStyle : null}
        >
          {this.toasterQueue.map((toaster) => toaster.component)}
        </ToasterContainer>
      </React.Fragment>
    );
  }
}

ToasterManager.propTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  showToaster: PropTypes.bool,
  timestamp: PropTypes.number,
};

export default ToasterManager;
