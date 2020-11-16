import { paginationConfigs } from '../../constants';
import { get, searchLogic } from '../../utils/helpers';
import {
  LOAD_ENQUIRY_DETAILS,
  LOAD_SEARCH_DATA,
  UPDATE_PAGE,
} from './constants';

const { perPage } = paginationConfigs;
export const initialState = {
  enquiryInfo: {
    data: [],
    logicAppliedData: [],
    isLoading: true,
    isLoaded: false,
  },
  pagination: {
    offset: 0,
    limit: paginationConfigs.perPage,
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
    case LOAD_SEARCH_DATA: {
      const { payload } = action;
      const { isSearching, data, searchText } = payload;
      return {
        ...state,
        enquiryInfo: {
          data: state.enquiryInfo.data,
          logicAppliedData: data,
        },
        pagination: {
          offset: 0,
          limit: perPage,
          activePage: 1,
          totalPages: Math.ceil(data.length / perPage),
        },
        search: {
          isSearching,
          searchText,
        },
      };
    }
    case UPDATE_PAGE: {
      const { pageNo } = action;
      const newOffset = (pageNo - 1) * perPage;
      return {
        ...state,
        pagination: {
          ...state.pagination,
          offset: newOffset,
          limit: newOffset + perPage,
          activePage: pageNo,
        },
      };
    }
    case LOAD_ENQUIRY_DETAILS: {
      const { payload } = action;
      const { enquiryList = [], ...rest } = payload;
      const searchText = get(state, 'search.searchText', '');

      const filteredData = searchLogic({
        searchText,
        dataSource: enquiryList,
      });
      return {
        ...state,
        enquiryInfo: {
          data: enquiryList,
          logicAppliedData: filteredData,
          ...rest,
        },
        pagination: {
          ...state.pagination,
          offset: 0,
          limit: perPage,
          activePage: 1,
          totalPages: Math.ceil(enquiryList.length / perPage),
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
