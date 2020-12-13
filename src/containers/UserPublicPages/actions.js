import {
  ADD_NEW_MEMBER,
  GET_SPECIFIC_BRANCH_INFO,
  LOAD_SPECIFIC_BRANCH_INFO,
} from './constants';

export function addNewMember(payload) {
  return {
    type: ADD_NEW_MEMBER,
    ...payload,
  };
}
export function getSpecificBranchInfo(payload) {
  return {
    type: GET_SPECIFIC_BRANCH_INFO,
    ...payload,
  };
}
export function loadSpecificBranchInfo(payload) {
  return {
    type: LOAD_SPECIFIC_BRANCH_INFO,
    payload,
  };
}
