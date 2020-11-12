import { paginationConfigs } from '../../constants';
import { LOAD_SEARCH_DATA, UPDATE_PAGE } from './constants';

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
export const initialState = {
  membersInfo: {
    data: mockMembers,
    logicAppliedData: mockMembers,
  },
  pagination: {
    offset: 0,
    limit: paginationConfigs.perPage,
    activePage: 1,
    totalPages: Math.ceil(mockMembers.length / paginationConfigs.perPage),
  },
  filtersInfo: {
    appliedFilters: [],
  },
  search: {
    isSearching: false,
  },
};

const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_SEARCH_DATA: {
      const { payload } = action;
      const { isSearching, data } = payload;
      console.log('inside reducer', data, paginationConfigs);
      return {
        ...state,
        membersInfo: {
          data: state.membersInfo.data,
          logicAppliedData: data,
        },
        pagination: {
          offset: 0,
          limit: paginationConfigs.perPage,
          activePage: 1,
          totalPages: Math.ceil(data.length / paginationConfigs.perPage),
        },
        search: {
          isSearching,
        },
      };
    }
    case UPDATE_PAGE: {
      const { pageNo } = action;
      const { perPage } = paginationConfigs;
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
    default: {
      return { ...state };
    }
  }
};
export default reducer;
