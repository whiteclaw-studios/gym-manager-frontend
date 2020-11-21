import {
  GET_FEE_DUE_DETAILS,
  LOAD_FEE_DUE_DETAILS,
  UPDATE_FILTER,
} from './constants';

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
export function updateFilter(payload) {
  return {
    type: UPDATE_FILTER,
    payload,
  };
}
