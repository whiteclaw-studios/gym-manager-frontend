import { ADD_NEW_MEMBER } from './constants';

export function addNewMember(payload) {
  return {
    type: ADD_NEW_MEMBER,
    ...payload,
  };
}
