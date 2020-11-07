import { LOGIN_RESPONSE, LOGIN_WITH_PASSWORD } from './constants';

export function loginWithPassword(payload) {
  return {
    type: LOGIN_WITH_PASSWORD,
    ...payload,
  };
}
export function loginResponse(payload) {
  return {
    type: LOGIN_RESPONSE,
    payload,
  };
}
