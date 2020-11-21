import { applySearchAndFilterLogic, get } from '../../utils/helpers';
import { LOAD_FEE_DUE_DETAILS, UPDATE_FILTER } from './constants';

const todayDate = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1; // since its 0 indexed
  const year = new Date().getFullYear();
  let format = 'DD/MM/YYYY';
  format = format.replace('DD', day).replace('MM', month).replace('YYYY', year);
  return format;
};

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
    startDate: {
      selectedDate: todayDate(),
    },
    endDate: {
      selectedDate: todayDate(),
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
    case UPDATE_FILTER: {
      const { payload } = action;
      const filtersInfo = {
        ...state.filters,
        ...payload,
      };
      let memberFeesInfo = get(state, 'memberFeesInfo.data', []);
      const filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource: memberFeesInfo,
        filters: filtersInfo,
      });
      return {
        ...state,
        filters: filtersInfo,
        memberFeesInfo: {
          ...state.memberFeesInfo,
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
