import {
  DISPLAY_TOASTER,
  GET_ADMIN_INFO,
  LOAD_ADMIN_INFO,
  LOGIN_RESPONSE,
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
