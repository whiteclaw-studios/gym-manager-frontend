import {
  DISPLAY_TOASTER,
  GET_ADMIN_INFO,
  LOAD_ADMIN_INFO,
  LOAD_BRANCH_DETAILS,
  LOGIN_RESPONSE,
  TOGGLE_PAGE_LOADER,
} from './constants';

export function displayToaster(data = {}) {
  return {
    type: DISPLAY_TOASTER,
    payload: data,
    timestamp: new Date().getTime(),
  };
}
export function loginResponse(payload) {
  return {
    type: LOGIN_RESPONSE,
    payload,
  };
}
export function getAdminInfo() {
  return {
    type: GET_ADMIN_INFO,
  };
}
export function loadAdminInfo(payload) {
  return {
    type: LOAD_ADMIN_INFO,
    payload,
  };
}
export function loadBranchDetails(payload) {
  return {
    type: LOAD_BRANCH_DETAILS,
    payload,
  };
}
export function togglePageLoader(payload) {
  return {
    type: TOGGLE_PAGE_LOADER,
    payload,
  };
}
