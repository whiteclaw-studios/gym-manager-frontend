import React from 'react';
import styled from 'react-emotion';
import { PRIMARY_COLOR } from '../../constants';
const Link = styled('a')`
  color: ${PRIMARY_COLOR};
  text-decoration: underline;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;
function LinkTag({ children = null, ...rest }) {
  return <Link {...rest}>{children}</Link>;
}
export default LinkTag;
