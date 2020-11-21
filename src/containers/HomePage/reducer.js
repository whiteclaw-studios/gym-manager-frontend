import { applySearchAndFilterLogic } from '../../utils/helpers';
import { LOAD_FEE_DUE_DETAILS } from './constants';

export const initialState = {
  memberFeesInfo: {
    data: [],
    logicAppliedData: [],
    isLoading: true,
    isLoaded: false,
  },
  filters: {
    branch: {
      index: 0,
      branchName: 'All',
    },
  },
};

const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_FEE_DUE_DETAILS: {
      const { data, ...rest } = action.payload;
      const filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource: data,
        filters: state.filters,
      });
      return {
        ...state,
        memberFeesInfo: {
          data,
          logicAppliedData: filteredData,
          ...rest,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
