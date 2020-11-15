import React from 'react';
import styled, { css } from 'react-emotion';
import { GREEN, SECONDARY_BLACK, WHITE } from '../../constants';
const Wrap = styled('div')`
  max-width: 27.6rem;
  text-align: center;
  overflow: auto;
  height: 100%;
  display: flex;
  @media (max-width: 460px) {
    max-width: 20rem;
  }
`;
const Page = styled('span')`
  padding: 1rem 1.2rem;
  border: 1px solid ${GREEN};
  color: ${SECONDARY_BLACK};
  cursor: pointer;
  &:hover {
    color: ${WHITE};
    background: ${GREEN};
  }
`;
export default class Pagination extends React.Component {
  constructPages = () => {
    const { totalPages = 0, activePage = 0, onSelect = () => {} } = this.props;
    return Array.from(Array(totalPages).keys()).map((page, idx) => (
      <Page
        className={
          idx + 1 === activePage
            ? css`
                color: ${WHITE};
                background: ${GREEN};
              `
            : ''
        }
        onClick={() => onSelect(idx + 1)}
      >
        {page + 1}
      </Page>
    ));
  };
  render() {
    const { totalPages = 0 } = this.props;
    return totalPages > 1 ? <Wrap>{this.constructPages()}</Wrap> : null;
  }
}
