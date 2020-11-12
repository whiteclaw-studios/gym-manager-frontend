import React from 'react';
import styled from 'react-emotion';
import { BG_COLOR, SECONDARY_BLACK } from '../../constants';
import { MontserratRegular } from '../../utils/fonts';
import { debounce } from '../../utils/helpers';
const Wrap = styled('div')`
  width: 100%;
  margin-bottom: 1.2rem;
`;
const SearchBar = styled('input')`
  width: 100%;
  border: none;
  background: ${BG_COLOR};
  border-bottom: 1px solid ${SECONDARY_BLACK};
  padding: 1rem;
  font-family: ${MontserratRegular};
  &:focus {
    border-bottom: 1px solid ${SECONDARY_BLACK};
  }
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
    return (
      <Wrap>
        <SearchBar
          type="text"
          placeholder="Search by Name,id"
          onChange={this.onTyping}
        />
      </Wrap>
    );
  }
}
