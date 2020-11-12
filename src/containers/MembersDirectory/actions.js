import {
  ADD_NEW_MEMBER,
  LOAD_SEARCH_DATA,
  SEARCH_MEMBERS,
  UPDATE_PAGE,
} from './constants';

export function addNewMember(payload) {
  return {
    type: ADD_NEW_MEMBER,
    ...payload,
  };
}
export function searchMembers(payload) {
  return {
    type: SEARCH_MEMBERS,
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
