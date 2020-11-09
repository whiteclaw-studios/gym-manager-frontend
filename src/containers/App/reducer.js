import {
  DISPLAY_TOASTER,
  LOAD_ADMIN_INFO,
  LOAD_BRANCH_DETAILS,
  LOGIN_RESPONSE,
} from './constants';

export const initialState = {
  toasterConf: {
    showToaster: false,
    config: '',
  },
  adminInfo: {
    isLoggedIn: false,
    infoLoaded: false, // used to show page loader
  },
};

const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case DISPLAY_TOASTER: {
      return {
        ...state,
        toasterConf: {
          config: action.payload,
          showToaster: true,
          timestamp: action.timestamp,
        },
      };
    }
    case LOGIN_RESPONSE: {
      return {
        ...state,
        adminInfo: {
          ...state.adminInfo,
          ...action.payload,
        },
      };
    }
    case LOAD_ADMIN_INFO: {
      return {
        ...state,
        adminInfo: {
          ...state.adminInfo,
          ...action.payload,
        },
      };
    }
    case LOAD_BRANCH_DETAILS: {
      return {
        ...state,
        branchDetails: {
          data: [...action.payload],
          isLoaded: true,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
