import { paginationConfigs } from '../../constants';
import { get, applySearchAndFilterLogic } from '../../utils/helpers';
import {
  INCLUDE_NEW_MEMBER_IN_LIST,
  LOAD_MEMBER_DETAILS,
  LOAD_MEMBER_FEE_DETAILS,
  LOAD_SEARCH_DATA,
  UPDATE_FILTER,
  UPDATE_MEMBERSHIP_STATUS_IN_STORE,
  UPDATE_PAGE,
  UPDATE_STORE_AFTER_PAYMENT,
  EDIT_MEMBER_INFO_IN_STORE,
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
    status: {
      index: 0,
      name: 'All',
    },
    bloodGroup: {
      index: 0,
      name: 'All',
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
    case UPDATE_MEMBERSHIP_STATUS_IN_STORE: {
      const { payload } = action;
      const { memberUniqueId, isActive } = payload;
      let membersList = get(state, 'membersInfo.data', []);
      const searchText = get(state, 'search.searchText', '');
      let reqdMember = membersList.filter(
        (member) => member.id === memberUniqueId,
      );

      membersList = membersList.filter(
        (member) => member.id !== memberUniqueId,
      );

      reqdMember = reqdMember[0] || {};
      reqdMember = {
        ...reqdMember,
        isActive,
      };

      membersList = [...membersList, { ...reqdMember }];
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
    case UPDATE_STORE_AFTER_PAYMENT: {
      const { payload } = action;
      const { memberUniqueId, planDetailsId, feesAmount } = payload;
      const { data } = state.membersInfo;
      let newData = data.filter((member) => member.id !== memberUniqueId);
      let reqdMember = data.filter((member) => member.id === memberUniqueId)[0];
      reqdMember = { ...reqdMember, planDetailsId, feesAmount };
      newData = [...newData, { ...reqdMember }];
      const searchText = get(state, 'search.searchText', '');
      const filteredData = applySearchAndFilterLogic({
        searchText,
        dataSource: newData,
        filters: state.filters,
      });
      return {
        ...state,
        membersInfo: {
          ...state.membersInfo,
          data: newData,
          logicAppliedData: filteredData,
        },
      };
    }
    case EDIT_MEMBER_INFO_IN_STORE: {
      const { payload } = action;
      const { id } = payload;
      let membersList = get(state, 'membersInfo.data', []);
      const searchText = get(state, 'search.searchText', '');
      membersList = membersList.filter((member) => member.id !== id);
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
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
