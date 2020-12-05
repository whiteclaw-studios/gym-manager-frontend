import {
  applySearchAndFilterLogic,
  get,
  startDateLessThanOrEqualToEndDate,
} from '../../utils/helpers';
import {
  APPLY_DATE_FILTER,
  LOAD_FEE_DUE_DETAILS,
  UPDATE_FILTER,
  UPDATE_MEMBERSHIP_STATUS_IN_STORE,
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
      index: 1,
      name: 'Today',
    },
  },
  applyDateFilter: false,
  isInvalidDates: false,
};

const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_FEE_DUE_DETAILS: {
      const { data, ...rest } = action.payload;
      const applyDateFilter = get(state, 'applyDateFilter', false);
      const filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource: data,
        filters: state.filters,
        applyDateFilter,
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
      let isValidDates = startDateLessThanOrEqualToEndDate(filtersInfo);
      const filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource,
        filters: filtersInfo,
        applyDateFilter,
      });
      return {
        ...state,
        filters: filtersInfo,
        memberFeesInfo: {
          ...state.memberFeesInfo,
          logicAppliedData: filteredData,
        },
        isInvalidDates: !isValidDates,
      };
    }
    case APPLY_DATE_FILTER: {
      const { payload } = action;
      const { isChecked } = payload;
      let memberFeesInfo = get(state, 'memberFeesInfo.data', []);
      let filteredData = get(state, 'memberFeesInfo.logicAppliedData', []);
      if (isChecked && state.isInvalidDates) {
        return { ...state };
      }

      filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource: memberFeesInfo,
        filters: state.filters,
        applyDateFilter: isChecked,
      });

      return {
        ...state,
        memberFeesInfo: {
          ...state.memberFeesInfo,
          logicAppliedData: filteredData,
        },
        applyDateFilter: isChecked,
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
      const applyDateFilter = get(state, 'applyDateFilter', false);

      const filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource,
        filters: state.filters,
        applyDateFilter,
      });
      return {
        ...state,
        memberFeesInfo: {
          ...state.memberFeesInfo,
          logicAppliedData: filteredData,
        },
      };
    }
    case UPDATE_MEMBERSHIP_STATUS_IN_STORE: {
      const memberUniqueId = get(action, 'payload.memberUniqueId', '');
      let memberFeesInfo = get(state, 'memberFeesInfo.data', []);
      memberFeesInfo = memberFeesInfo.filter(
        (member) => member.memberId !== memberUniqueId,
      );
      const applyDateFilter = get(state, 'applyDateFilter', false);

      let filteredData = applySearchAndFilterLogic({
        searchText: '',
        dataSource: memberFeesInfo,
        filters: state.filters,
        applyDateFilter,
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
