import {
  APPLY_DATE_FILTER,
  GET_FEE_DUE_DETAILS,
  LOAD_FEE_DUE_DETAILS,
  UPDATE_FEE_DETAILS,
  UPDATE_FILTER,
  UPDATE_SOURCE_DATA,
  UPDATE_MEMBERSHIP_STATUS,
  UPDATE_MEMBERSHIP_STATUS_IN_STORE,
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
export function applyDateFilter(payload) {
  return {
    type: APPLY_DATE_FILTER,
    payload,
  };
}
export function updateSourceData(payload) {
  return {
    type: UPDATE_SOURCE_DATA,
    payload,
  };
}
export function updateFeeDetails(payload) {
  return {
    type: UPDATE_FEE_DETAILS,
    ...payload,
  };
}
export function updateMembershipStatus(payload) {
  return {
    type: UPDATE_MEMBERSHIP_STATUS,
    ...payload,
  };
}
export function updateMembershipStatusInStore(payload) {
  return {
    type: UPDATE_MEMBERSHIP_STATUS_IN_STORE,
    payload,
  };
}
