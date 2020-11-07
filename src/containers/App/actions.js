import { DISPLAY_TOASTER, LOGIN_RESPONSE } from './constants';

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
