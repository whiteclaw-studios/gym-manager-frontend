import React, { useState } from 'react';
import styled, { css, cx } from 'react-emotion';
import {
  DISABLED_BUTTON,
  GREEN,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { MontserratBold } from '../../utils/fonts';
import { throttle } from '../../utils/helpers';
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
const BlackButton = styled(Button)`
  background: ${SECONDARY_BLACK};
  color: ${WHITE};
  box-shadow: 8px 8px 12px 0 #e2e2e2;
  border: none;
`;
function Button({
  className,
  children,
  disabled = false,
  hoveredCss = '',
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
              ${hoveredCss};
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
      onClick={disabled ? () => {} : throttle(onClick, 1000)}
      {...otherProps}
    >
      {children}
    </Wrap>
  );
}
export const SecondaryButton = (props) => (
  <BlackButton
    {...props}
    hoveredCss={css`
      background: ${WHITE};
      border: 1px solid ${SECONDARY_BLACK};
      color: ${SECONDARY_BLACK};
    `}
  />
);
export const InvertSecondaryButton = ({ className, ...props }) => (
  <BlackButton
    {...props}
    className={cx(
      className,
      css`
        background: ${WHITE};
        border: 1px solid ${SECONDARY_BLACK};
        color: ${SECONDARY_BLACK};
      `,
    )}
    hoveredCss={css`
      background: ${SECONDARY_BLACK};
      color: ${WHITE};
      border: none;
    `}
  />
);
export default Button;
