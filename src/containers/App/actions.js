import { DISPLAY_TOASTER } from './constants';

export function displayToaster(data = {}) {
  return {
    type: DISPLAY_TOASTER,
    payload: data,
    timestamp: new Date().getTime(),
  };
}
