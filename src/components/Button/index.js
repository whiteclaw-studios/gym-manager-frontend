import React, { useState } from 'react';
import styled, { css, cx } from 'react-emotion';
import { GREEN, WHITE } from '../../constants';
import { MontserratBold } from '../../utils/fonts';
const Wrap = styled('button')`
  outline: none;
  width: 100%;
  background: ${GREEN};
  border: 1px solid ${GREEN};
  padding: 1.2rem;
  color: ${WHITE};
  border-radius: 1rem;
  font-size: 1.4rem;
  font-family: ${MontserratBold};
  cursor: pointer;
  box-shadow: 8px 8px 12px 0 rgba(46, 204, 113, 0.16);
  @media (max-width: 992px) {
    cursor: default;
  }
`;
function Button({ className, children, ...otherProps }) {
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
      )}
      onMouseOver={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      {...otherProps}
    >
      {children}
    </Wrap>
  );
}
export default Button;
