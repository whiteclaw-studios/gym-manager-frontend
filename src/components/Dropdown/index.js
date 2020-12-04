import React from 'react';
import PropTypes from 'prop-types';
import downarrow from '../../images/downarrow.png';
import { css } from 'emotion';
import { GREEN, RED, SECONDARY_BLACK, WHITE } from '../../constants';
import styled from 'react-emotion';
import { MontserratRegular } from '../../utils/fonts';
import { get } from '../../utils/helpers';
import { DownIcon } from '../SpriteIcon';
const Wrap = styled('div')`
  position: relative;
  outline: none;
`;
const SelectedItem = styled('div')`
  // border-bottom: 1px solid ${SECONDARY_BLACK};
  padding: 1rem;
  display: flex;
  align-items: center;
  height: 3.4rem;
  background: #fff;
  justify-content: space-between;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;
const Item = styled('p')`
  font-size: 1.4rem;
  font-family: ${MontserratRegular};
  flex: 1;
`;
const ArrowWrap = styled('div')`
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 992px) {
    width: 2rem;
    height: 2rem;
  }
`;

const OptionsWrap = styled('ul')`
  position: absolute;
  width: 100%;
  top: 3.4rem;
  z-index: 110;
  background: ${WHITE};
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.24);
`;
const ItemWrap = styled('li')`
  font-size: 1.2rem;
  padding: 1rem;
  font-family: ${MontserratRegular};
  :hover {
    background: #e9e9e9;
    color: #000;
    cursor: pointer;
  }
`;
const Data = styled('div')`
  flex: 2;
`;
const Error = styled('p')`
  color: ${RED};
  font-size: 1.1rem;
  font-family: ${MontserratRegular};
  min-height: 1.4rem;
  display: inline-block;
`;
export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }
  onExpand = () => {
    this.setState({
      expand: !this.state.expand,
    });
  };
  onBlur = (e) => {
    if (!this.node.contains(event.relatedTarget)) {
      // hide the dropdown
      this.setState({
        expand: false,
      });
    }
  };
  showOptions = () => {
    const {
      activeItem,
      onSelect,
      listItems,
      name,
      otherInfo = [],
    } = this.props;
    return listItems.map((item, index) => {
      return (
        <ItemWrap
          key={item}
          className={
            activeItem === index &&
            css`
              background: #ffffff;
              color: ${GREEN};
            `
          }
          onClick={() => {
            this.setState({
              expand: false,
            });
            onSelect(index, name, get(otherInfo, `${[index]}`, {}));
          }}
        >
          {item}
        </ItemWrap>
      );
    });
  };
  render() {
    const {
      activeItem = -1,
      listItems = [],
      placeholder = 'Select',
      showError = false,
      errorText = 'Select something',
      className = '',
      hideError = false,
    } = this.props;
    const { expand } = this.state;
    return (
      <Wrap
        className={className}
        tabIndex={0}
        onBlur={this.onBlur}
        innerRef={(wrapperRef) => (this.node = wrapperRef)}
      >
        <SelectedItem
          className={
            expand
              ? css`
                  border-bottom-left-radius: 0rem !important;
                  border-bottom-right-radius: 0rem !important;
                `
              : ''
          }
          onClick={this.onExpand}
        >
          <Data>
            {activeItem < 0 ? (
              <Item>{placeholder}</Item>
            ) : (
              <Item>{listItems[activeItem]}</Item>
            )}
          </Data>
          <ArrowWrap>
            <DownIcon onClick={this.onExpand} />
          </ArrowWrap>
        </SelectedItem>
        {!hideError && <Error>{showError ? errorText : ' '}</Error>}
        {expand && <OptionsWrap>{this.showOptions()}</OptionsWrap>}
      </Wrap>
    );
  }
}
DropDown.propTypes = {
  listItems: PropTypes.array,
  activeItem: PropTypes.number,
  onSelect: PropTypes.func,
};
