import { GET_FEE_DUE_DETAILS, LOAD_FEE_DUE_DETAILS } from './constants';

export function getFeeDueDetails() {
  return {
    type: GET_FEE_DUE_DETAILS,
  };
}
export function loadFeeDueDetails(payload) {
  return {
    type: LOAD_FEE_DUE_DETAILS,
    payload,
  };
}
