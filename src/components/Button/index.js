import React, { useState } from 'react';
import styled, { css, cx } from 'react-emotion';
import { DISABLED_BUTTON, GREEN, WHITE } from '../../constants';
import { MontserratBold } from '../../utils/fonts';
const Wrap = styled('button')`
  outline: none;
  width: 100%;
  background: ${GREEN};
  border: 1px solid ${GREEN};
  padding: 1.2rem;
  color: ${WHITE};
  font-size: 1.4rem;
  font-family: ${MontserratBold};
  cursor: pointer;
  box-shadow: 8px 8px 12px 0 rgba(46, 204, 113, 0.16);
  @media (max-width: 992px) {
    cursor: default;
  }
`;
function Button({
  className,
  children,
  disabled = false,
  onClick = () => {},
  ...otherProps
}) {
  const [hoveredState, setHoverState] = useState(false);

  return (
    <Wrap
      className={cx(
        className,
        hoveredState
          ? css`
              background: ${WHITE};
              color: ${GREEN};
              border: 1px solid ${GREEN};
            `
          : '',
        disabled &&
          css`
            background: ${DISABLED_BUTTON};
            border: none;
            cursor: none;
          `,
      )}
      onMouseOver={disabled ? () => {} : () => setHoverState(true)}
      onMouseLeave={disabled ? () => {} : () => setHoverState(false)}
      onClick={disabled ? () => {} : onClick}
      {...otherProps}
    >
      {children}
    </Wrap>
  );
}
export default Button;
