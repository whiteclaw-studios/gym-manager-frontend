import { paginationConfigs } from '../../constants';
import { get, applySearchAndFilterLogic } from '../../utils/helpers';
import {
  INCLUDE_NEW_MEMBER_IN_LIST,
  LOAD_MEMBER_DETAILS,
  LOAD_MEMBER_FEE_DETAILS,
  LOAD_SEARCH_DATA,
  REMOVE_MEMBER_IN_LIST,
  UPDATE_FILTER,
  UPDATE_PAGE,
} from './constants';
const { perPage } = paginationConfigs;
export const initialState = {
  membersInfo: {
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
    plan: {
      index: 0,
      planName: 'All',
    },
  },
  search: {
    isSearching: false,
    searchText: '',
  },
  feeDetails: {},
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
        membersInfo: {
          data: state.membersInfo.data,
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
    case LOAD_MEMBER_DETAILS: {
      const { payload } = action;
      const { membersList = [], ...rest } = payload;
      const searchText = get(state, 'search.searchText', '');

      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: membersList,
        filters: state.filters,
      });
      return {
        ...state,
        membersInfo: {
          data: membersList,
          logicAppliedData: filteredData,
          ...rest,
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
    case INCLUDE_NEW_MEMBER_IN_LIST: {
      const { payload } = action;
      let membersList = get(state, 'membersInfo.data', []);
      const searchText = get(state, 'search.searchText', '');
      membersList = [...membersList, payload];
      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: membersList,
        filters: state.filters,
      });
      return {
        ...state,
        membersInfo: {
          ...state.membersInfo,
          data: membersList,
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
    case REMOVE_MEMBER_IN_LIST: {
      const { payload } = action;
      let membersList = get(state, 'membersInfo.data', []);
      const searchText = get(state, 'search.searchText', '');
      membersList = membersList.filter(
        (member) => member.id !== payload.memberUniqueId,
      );
      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: membersList,
        filters: state.filters,
      });
      return {
        ...state,
        membersInfo: {
          ...state.membersInfo,
          data: membersList,
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
    case UPDATE_FILTER: {
      const { payload } = action;
      const filtersInfo = {
        ...state.filters,
        ...payload,
      };
      let membersList = get(state, 'membersInfo.data', []);
      const searchText = get(state, 'search.searchText', '');
      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: membersList,
        filters: filtersInfo,
      });
      return {
        ...state,
        filters: filtersInfo,
        membersInfo: {
          ...state.membersInfo,
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
    case LOAD_MEMBER_FEE_DETAILS: {
      const { payload } = action;
      console.log('payload', payload);
      const { memberUniqueId, ...rest } = payload;
      return {
        ...state,
        feeDetails: {
          ...state.feeDetails,
          [memberUniqueId]: {
            ...rest,
          },
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
