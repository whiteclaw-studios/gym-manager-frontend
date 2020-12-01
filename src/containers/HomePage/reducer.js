import { applySearchAndFilterLogic, get } from '../../utils/helpers';
import {
  APPLY_DATE_FILTER,
  LOAD_DATE_FILTERED_DATA,
  LOAD_FEE_DUE_DETAILS,
  UPDATE_FILTER,
  UPDATE_SOURCE_DATA,
} from './constants';

const currentDate = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1; // since its 0 indexed
  const year = new Date().getFullYear();
  let format = 'DD/MM/YYYY';
  format = format.replace('DD', day).replace('MM', month).replace('YYYY', year);
  return {
    format,
    currentYear: year,
    currentMonth: month - 1,
  };
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
    plan: {
      index: 0,
      planName: 'All',
    },
    startDate: {
      selectedDate: currentDate().format,
      currentMonth: currentDate().currentMonth,
      validStartMonth: currentDate().currentMonth,
      validEndMonth: 11,
      currentYear: currentDate().currentYear,
    },
    endDate: {
      selectedDate: currentDate().format,
      currentMonth: currentDate().currentMonth,
      validStartMonth: currentDate().currentMonth,
      validEndMonth: 11,
      currentYear: currentDate().currentYear,
    },
    feeDueDate: {
      index: 0,
      name: 'All',
    },
  },
  applyDateFilter: false,
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
      let dataSource = get(state, 'memberFeesInfo.data', []);
      const applyDateFilter = get(state, 'applyDateFilter', false);
      if (applyDateFilter) {
        const startDate = state.filters.startDate.selectedDate;
        const endDate = state.filters.endDate.selectedDate;
        dataSource = get(
          state,
          `memberFeesInfo.${startDate}-${endDate}.data`,
          dataSource,
        );
      }
      const filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource,
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
    case APPLY_DATE_FILTER: {
      const { payload } = action;
      const { isChecked } = payload;
      let memberFeesInfo = get(state, 'memberFeesInfo.data', []);
      let filteredData = get(state, 'memberFeesInfo.logicAppliedData', []);
      if (!isChecked) {
        // if clear the date filter ,then load the old date with branch filter
        filteredData = applySearchAndFilterLogic({
          searchText: '',
          dataSource: memberFeesInfo,
          filters: state.filters,
        });
      }
      return {
        ...state,
        memberFeesInfo: {
          ...state.memberFeesInfo,
          logicAppliedData: filteredData,
        },
        applyDateFilter: isChecked,
      };
    }
    case LOAD_DATE_FILTERED_DATA: {
      const { payload } = action;
      const { data, ...rest } = payload;
      const filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource: data,
        filters: state.filters,
      });
      return {
        ...state,
        memberFeesInfo: {
          ...state.memberFeesInfo,
          logicAppliedData: filteredData,
          ...rest,
        },
      };
    }
    case UPDATE_SOURCE_DATA: {
      const { payload } = action;
      const { sDate, eDate } = payload;
      const dataSource = get(
        state,
        `memberFeesInfo.${sDate}-${eDate}.data`,
        [],
      );
      const filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource,
        filters: state.filters,
      });
      return {
        ...state,
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
