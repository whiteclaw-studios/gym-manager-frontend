import React from 'react';
import styled from 'react-emotion';
import { BG_COLOR, SECONDARY_BLACK } from '../../constants';
import { MontserratRegular } from '../../utils/fonts';
// import { debounce } from '../../utils/helpers';
import { SearchIcon } from '../SpriteIcon';
const Wrap = styled('div')`
  width: 100%;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  &:focus {
    border-bottom: 1px solid ${SECONDARY_BLACK};
  }
`;
const SearchBar = styled('input')`
  width: 100%;
  border: none;
  background: ${BG_COLOR};
  padding: 1rem;
  margin-left: 0.5rem;
  font-family: ${MontserratRegular};
`;
export default class Search extends React.Component {
  onTyping = (event) => {
    let searchString = event.target.value;
    const { onSearch } = this.props;
    if (onSearch) onSearch(searchString);
    // event.persist();

    // if (!this.debouncedFn) {
    //   this.debouncedFn = debounce(() => {
    //     let searchString = event.target.value;
    //     const { onSearch } = this.props;
    //     if (onSearch) onSearch(searchString);
    //   }, 100);
    // }

    // this.debouncedFn();
  };
  render() {
    const { placeholder = 'Search' } = this.props;
    return (
      <Wrap tabIndex={0}>
        <SearchIcon />
        <SearchBar
          type="text"
          placeholder={placeholder}
          onChange={this.onTyping}
        />
      </Wrap>
    );
  }
}
