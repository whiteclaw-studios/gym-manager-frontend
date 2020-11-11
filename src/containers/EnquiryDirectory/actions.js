import { ADD_ENQUIRY } from './constants';

export function addEnquiry(payload) {
  return {
    type: ADD_ENQUIRY,
    ...payload,
  };
}
