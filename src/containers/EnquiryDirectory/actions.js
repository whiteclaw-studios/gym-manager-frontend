import {
  ADD_ENQUIRY,
  ADD_ENQUIRY_TO_STORE,
  GET_ENQUIRY_DETAILS,
  LOAD_ENQUIRY_DETAILS,
  LOAD_SEARCH_DATA,
  SEARCH_ENQUIRY,
  UPDATE_FILTER,
  UPDATE_PAGE,
} from './constants';

export function addEnquiry(payload) {
  return {
    type: ADD_ENQUIRY,
    ...payload,
  };
}

export function searchEnquiry(payload) {
  return {
    type: SEARCH_ENQUIRY,
    ...payload,
  };
}
export function loadSearchData(payload) {
  return {
    type: LOAD_SEARCH_DATA,
    payload,
  };
}
export function updatePage(payload) {
  return {
    type: UPDATE_PAGE,
    ...payload,
  };
}
export function getEnquiryDetails() {
  return {
    type: GET_ENQUIRY_DETAILS,
  };
}
export function loadEnquiryDetails(payload) {
  return {
    type: LOAD_ENQUIRY_DETAILS,
    payload,
  };
}
export function updateFilter(payload) {
  return {
    type: UPDATE_FILTER,
    payload,
  };
}
export function addEnquiryToStore(payload) {
  return {
    type: ADD_ENQUIRY_TO_STORE,
    payload,
  };
}
