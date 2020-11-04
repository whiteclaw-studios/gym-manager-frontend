import {
  TEST_CASE_FAILED,
  TEST_CASE_PASSED,
  TOTAL_TEST_CASES,
} from '../../constants';
import { ADD_TEST_CASE } from './constants';

export const initialState = {
  testCases: [],
};
const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case ADD_TEST_CASE: {
      const payload = action.payload;
      const newtestCases = [...state.testCases, payload];
      const passedTestCases = newtestCases.filter(
        (tc) => tc.status === TEST_CASE_PASSED,
      );
      const failedTestCases = newtestCases.filter(
        (tc) => tc.status === TEST_CASE_FAILED,
      );
      const testCasesOverview = [
        {
          name: 'Total test cases',
          value: newtestCases.length,
          id: TOTAL_TEST_CASES,
        },
        {
          name: 'Passed test cases',
          value: passedTestCases.length,
          id: TEST_CASE_PASSED,
        },
        {
          name: 'Failed test cases',
          value: failedTestCases.length,
          id: TEST_CASE_FAILED,
        },
      ];
      return {
        ...state,
        testCases: newtestCases,
        testCasesOverview,
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
