import { LOAD_SPECIFIC_BRANCH_INFO } from './constants';

export const initialState = {
  branchInfo: {
    isLoading: true,
    isLoaded: false,
    data: {},
  },
};

const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_SPECIFIC_BRANCH_INFO:
      const { payload } = action;
      console.log('reducer', payload);
      return {
        ...state,
        branchInfo: {
          ...state.branchInfo,
          ...payload,
        },
      };
    default: {
      return { ...state };
    }
  }
};
export default reducer;
