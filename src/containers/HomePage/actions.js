import { ADD_TEST_CASE } from './constants';
export const addTestCase = (payload) => {
  return {
    type: ADD_TEST_CASE,
    payload,
  };
};
