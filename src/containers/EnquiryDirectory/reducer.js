export const initialState = {
  enquiryInfo: {
    data: [],
    logicAppliedData: [],
  },
  pagination: {
    offset: 0,
    limit: 10,
    activePage: 0,
    totalPages: 0,
  },
  filtersInfo: {
    appliedFilters: [],
  },
  search: {
    isSearching: false,
    searchText: '',
  },
};

const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
  }
};
export default reducer;
