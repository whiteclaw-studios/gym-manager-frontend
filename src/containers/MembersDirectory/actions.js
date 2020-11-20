import {
  ADD_NEW_MEMBER,
  DELETE_MEMBER,
  GET_MEMBER_DETAILS,
  INCLUDE_NEW_MEMBER_IN_LIST,
  LOAD_MEMBER_DETAILS,
  LOAD_SEARCH_DATA,
  REMOVE_MEMBER_IN_LIST,
  UPDATE_FILTER,
  SEARCH_MEMBERS,
  UPDATE_PAGE,
  GET_MEMBER_FEE_DETAILS,
  LOAD_MEMBER_FEE_DETAILS,
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
export function deleteMember(payload) {
  return {
    type: DELETE_MEMBER,
    ...payload,
  };
}
export function removeMemberInList(payload) {
  return {
    type: REMOVE_MEMBER_IN_LIST,
    payload,
  };
}
export function updateFilter(payload) {
  return {
    type: UPDATE_FILTER,
    payload,
  };
}
export function getMemberFeeDetails(payload) {
  return {
    type: GET_MEMBER_FEE_DETAILS,
    ...payload,
  };
}
export function loadMemberFeeDetails(payload) {
  return {
    type: LOAD_MEMBER_FEE_DETAILS,
    payload,
  };
}
