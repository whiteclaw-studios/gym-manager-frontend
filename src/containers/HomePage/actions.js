import { GET_FEE_DETAILS, LOAD_FEE_DETAILS } from './constants';

export function getFeeDetails() {
  return {
    type: GET_FEE_DETAILS,
  };
}
export function loadFeeDetails(payload) {
  return {
    type: LOAD_FEE_DETAILS,
    payload,
  };
}
