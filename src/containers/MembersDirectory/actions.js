import {
  ADD_NEW_MEMBER,
  GET_MEMBER_DETAILS,
  INCLUDE_NEW_MEMBER_IN_LIST,
  LOAD_MEMBER_DETAILS,
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
export function getMemberDetails() {
  return {
    type: GET_MEMBER_DETAILS,
  };
}
export function loadMemberDetails(payload) {
  return {
    type: LOAD_MEMBER_DETAILS,
    payload,
  };
}
export function includeMemberInList(payload) {
  return {
    type: INCLUDE_NEW_MEMBER_IN_LIST,
    payload,
  };
}
