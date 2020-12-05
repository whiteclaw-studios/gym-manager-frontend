import React from 'react';
import styled, { css } from 'react-emotion';
import { PRIMARY_COLOR, SECONDARY_BLACK, WHITE } from '../../constants';
import Tooltip from '../ToolTip';
const Container = styled('div')`
  position: relative;
`;
const Wrap = styled('div')`
  max-width: 27.6rem;
  text-align: center;
  overflow: auto;
  height: 100%;
  display: flex;
  position: relative;
  @media (max-width: 460px) {
    max-width: 20rem;
  }
`;
const Page = styled('span')`
  padding: 1rem 1.2rem;
  border: 1px solid ${PRIMARY_COLOR};
  color: ${SECONDARY_BLACK};
  cursor: pointer;
  &:hover {
    color: ${WHITE};
    background: ${PRIMARY_COLOR};
  }
`;
const TooltipWrap = styled('div')`
  position: absolute;
  top: -3px;
  width: 1.2rem;
  right: -2rem;
  @media (max-width: 992px) {
    top: 37px;
    width: 1.2rem;
    right: 11rem;
  }
  > div {
    padding: 3px 1px;
  }
`;
export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: true,
    };
  }
  constructPages = () => {
    const {
      totalPages = 0,
      activePage = 0,
      onSelect = () => {},
      name,
    } = this.props;
    return Array.from(Array(totalPages).keys()).map((page, idx) => (
      <Page
        key={`${name}-pageno-${page}`}
        className={
          idx + 1 === activePage
            ? css`
                color: ${WHITE};
                background: ${PRIMARY_COLOR};
              `
            : ''
        }
        onClick={() => {
          if (this.state.showTooltip)
            this.setState({
              showTooltip: false,
            });

          onSelect(idx + 1);
        }}
      >
        {page + 1}
      </Page>
    ));
  };
  render() {
    const { showTooltip = false } = this.state;
    const { totalPages = 0 } = this.props;
    return totalPages > 1 ? (
      <Container>
        <Wrap>{this.constructPages()}</Wrap>
        {showTooltip && (
          <TooltipWrap>
            <Tooltip
              customText="Swipe right"
              arrowPosition="MiddleLeft"
              arrowStyle={css`
                @media (max-width: 992px) {
                  left: 26%;
                  top: 0%;
                }
              `}
            />
          </TooltipWrap>
        )}
      </Container>
    ) : null;
  }
}
