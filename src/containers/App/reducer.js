import { DISPLAY_TOASTER } from './constants';

export const initialState = {
  toasterConf: {
    showToaster: false,
    config: '',
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
    default: {
      return { ...state };
    }
  }
};
export default reducer;
