import { LOGIN_RESPONSE } from './constants';

export const initialState = {
  adminInfo: {
    isLoggedIn: false,
  },
};

const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case LOGIN_RESPONSE: {
      return {
        ...state,
        adminInfo: {
          ...state.adminInfo,
          ...action.payload,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
