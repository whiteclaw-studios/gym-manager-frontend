import { paginationConfigs } from '../../constants';
import { filterLogic, get, searchLogic } from '../../utils/helpers';
import {
  INCLUDE_NEW_MEMBER_IN_LIST,
  LOAD_MEMBER_DETAILS,
  LOAD_SEARCH_DATA,
  REMOVE_MEMBER_IN_LIST,
  UPDATE_FILTER,
  UPDATE_PAGE,
} from './constants';

const mockMembers = [
  {
    name: 'Rajesh',
    memberId: 1,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Sai',
    memberId: 2,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: '2 Months',
  },
  {
    name: 'Raghul',
    memberId: 3,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Muthu',
    memberId: 4,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: '2 Months',
  },
  {
    name: 'Sai',
    memberId: 2090,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: '2 Months',
  },
  {
    name: 'Ram',
    memberId: 7,
    plan: '$20/month',
    branch: 'Ponneri',
    due: 'Today (1 Month)',
  },
  {
    name: 'Sanjana',
    memberId: 5,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: '2 Months',
  },
  {
    name: 'Arun',
    memberId: 6,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Sanjana',
    memberId: 8,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: '2 Months',
  },
  {
    name: 'Arun',
    memberId: 9,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Sanjana',
    memberId: 15,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: '2 Months',
  },
  {
    name: 'Arun',
    memberId: 116,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Sanjana',
    memberId: 1215,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: '2 Months',
  },
  {
    name: 'Arun',
    memberId: 656,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Arun',
    memberId: 43246,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Arun',
    memberId: 2326,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Arun',
    memberId: 766,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Arun',
    memberId: 6234,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Arun',
    memberId: 62,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
  {
    name: 'Arun',
    memberId: 687,
    plan: '$20/month',
    branch: 'Thiruvottiyur',
    due: 'Today (1 Month)',
  },
];
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
  },
  search: {
    isSearching: false,
    searchText: '',
  },
};
const applySearchAndFilterLogic = ({ searchText, filters, dataSource }) => {
  const filteredData = searchLogic({
    searchText,
    dataSource,
  });
  return filterLogic({ dataSource: filteredData, filters });
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
        membersInfo: {
          data: state.membersInfo.data,
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
        branch: {
          ...payload,
        },
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
    default: {
      return { ...state };
    }
  }
};
export default reducer;
