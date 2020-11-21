import { LOAD_FEE_DETAILS } from './constants';

export const initialState = {
  memberFeesInfo: {
    data: [],
    logicAppliedData: [],
    isLoading: true,
    isLoaded: false,
  },
};

const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_FEE_DETAILS: {
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
