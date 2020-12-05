import { paginationConfigs } from '../../constants';
import { get, applySearchAndFilterLogic } from '../../utils/helpers';
import {
  ADD_ENQUIRY_TO_STORE,
  LOAD_ENQUIRY_DETAILS,
  LOAD_SEARCH_DATA,
  UPDATE_FILTER,
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
  filters: {
    branch: {
      index: 0,
      branchName: 'All',
    },
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
      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: data,
        filters: state.filters,
      });
      return {
        ...state,
        enquiryInfo: {
          data: state.enquiryInfo.data,
          logicAppliedData: filteredData,
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

      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: enquiryList,
        filters: state.filters,
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
    case ADD_ENQUIRY_TO_STORE: {
      const { payload } = action;
      const enquiryList = [
        ...get(state, 'enquiryInfo.data', []),
        { ...payload },
      ];
      const searchText = get(state, 'search.searchText', '');

      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: enquiryList,
        filters: state.filters,
      });
      return {
        ...state,
        enquiryInfo: {
          ...state.enquiryInfo,
          data: enquiryList,
          logicAppliedData: filteredData,
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
    case UPDATE_FILTER: {
      const { payload } = action;
      const filtersInfo = {
        ...state.filters,
        ...payload,
      };
      let enquiryList = get(state, 'enquiryInfo.data', []);
      const searchText = get(state, 'search.searchText', '');
      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: enquiryList,
        filters: filtersInfo,
      });
      return {
        ...state,
        filters: filtersInfo,
        enquiryInfo: {
          ...state.enquiryInfo,
          logicAppliedData: filteredData,
        },
        pagination: {
          ...state.pagination,
          offset: 0,
          limit: perPage,
          activePage: 1,
          totalPages: Math.ceil(filteredData.length / perPage),
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
