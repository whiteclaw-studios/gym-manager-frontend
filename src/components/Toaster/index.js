/**
 *
 * Toaster
 *
 */
import React from 'react';
import styled, { css, cx } from 'react-emotion';
import PropTypes from 'prop-types';
import { GREEN, RED, WHITE } from '../../constants';

/* eslint-disable indent */
const ToasterWrapper = styled('div')`
  position: relative;
  border-radius: 5px;
  z-index: 1002;
  margin-bottom: 20px;
  box-shadow: 2px 2px 4px 0 rgba(165, 165, 165, 0.5);
  font-size: 1.2rem;
  padding: 10px 20px;
  /* display: inline-block; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 48px;

  @media (max-width: 992px) {
    padding: 5px 10px;
  }
  ${(props) => {
    let style;
    const basicStyle = css`
      color: ${WHITE};
      background: #000000;
    `;
    switch (props.type) {
      case 'success':
        style = css`
          ${basicStyle};
          background: ${GREEN};
        `;
        break;
      case 'failure':
        style = css`
          ${basicStyle};
          background: ${RED};
        `;
        break;
      default:
        style = css`
          ${basicStyle};
        `;
    }
    return style;
  }};
`;
const ToasterContent = styled('div')`
  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;
  line-height: normal;
`;
const toasterWidth = css`
  /* width: 100%; */
  @media (min-width: 993px) {
    /* width: 50%; */
    /* margin-left: auto;
    margin-right: auto; */
  }
`;

const CloseBtn = styled('button')`
  position: absolute;
  top: 5px;
  right: 7px;
  cursor: pointer;
`;

function Toaster(props) {
  const { className = '', showClose = false, closeHandler, text = '' } = props;
  const type = (props.type && props.type.toLowerCase()) || '';
  const message =
    typeof text === 'string' ? text : " 'text'  should be a string";
  const toasterStyle = cx(toasterWidth, className);
  return (
    <ToasterWrapper className={cx('toaster-message', toasterStyle)} type={type}>
      <ToasterContent>{props.children || message || null}</ToasterContent>

      {showClose && (
        <CloseBtn className="toaster-close-btn" onClick={closeHandler}>
          &#x2715;
        </CloseBtn>
      )}
    </ToasterWrapper>
  );
}

Toaster.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  showClose: PropTypes.bool,
  closeHandler: PropTypes.func,
  buttonText: PropTypes.string,
  buttonHandler: PropTypes.func,
};

export default Toaster;
