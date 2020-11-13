import { call, put, select, takeEvery } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import { selectMembersSource } from '../../selectors';
import { searchLogic } from '../../utils/helpers';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster } from '../App/actions';
import { loadSearchData } from './actions';
import fetch from 'isomorphic-fetch';
import {
  ADD_NEW_MEMBER,
  SEARCH_MEMBERS,
  GET_MEMBER_DETAILS,
} from './constants';
function* addNewMember(params = {}) {
  try {
    const {
      name,
      mailId,
      mobileNumber,
      branchId,
      planId,
      age,
      gender,
      successCallback = () => {},
    } = params;
    const response = yield call(axiosWrapper, {
      method: 'POST',
      url: apiUrls.MEMBERS_URL,
      data: {
        name,
        mailId,
        branchId,
        mobileNumber,
        branchId,
        planId,
        age,
        gender,
      },
    });

    const parsedResponse = responseParser(response);
    if (!parsedResponse.isError) {
      yield put(
        displayToaster({
          type: 'success',
          text: 'New Member added',
          timeout: 2000,
        }),
      );
      successCallback();
    } else {
      console.error('Error in adding member', parsedResponse);
    }
  } catch (err) {
    console.error('Caught in addNewMember', err);
  }
}
function* searchMemberSaga(params = {}) {
  try {
    const { searchText = '' } = params;
    console.log('searchText', params, searchText);
    const state = yield select();
    const membersData = selectMembersSource(state);
    const filteredData = searchLogic({
      searchText,
      dataSource: membersData,
    });

    yield put(
      loadSearchData({
        isSearching: !!searchText,
        data: filteredData,
      }),
    );
  } catch (err) {
    console.error('Caught in searchMemberSaga', err);
  }
}
async function readAllChunks(readableStream) {
  const reader = readableStream.getReader();
  const chunks = [];

  let done, value;
  while (!done) {
    ({ value, done } = await reader.read());
    if (done) {
      console.log('Done recieving streams');

      return chunks;
    }
    console.log('value', value);

    chunks.push(value);
  }
}
function* getMemberDetailsSaga() {
  try {
    // var response = yield call(fetch, { url: apiUrls.MEMBERS_URL });
    // console.log('response', response);
    // const uintarry = yield readAllChunks(response.body);
    // console.log('uintarry', uintarry);
    // var enc = new TextDecoder('utf-8');
    // console.log(enc.decode(uintarry));
    // const parsedResponse = responseParser(response);
    // console.log('parsedResponse', response);
    if (!parsedResponse.isError) {
    } else {
      console.error('Error in getMemberDetailsSaga', parsedResponse);
    }
  } catch (err) {
    console.error('Caught in getMemberDetailsSaga', err);
  }
}
function* watchaddNewMember() {
  yield takeEvery(ADD_NEW_MEMBER, addNewMember);
}
function* watchSearchMemberSaga() {
  yield takeEvery(SEARCH_MEMBERS, searchMemberSaga);
}
function* watchGetMemberDetailsSaga() {
  yield takeEvery(GET_MEMBER_DETAILS, getMemberDetailsSaga);
}
export const membersDirectorySagas = [
  watchaddNewMember(),
  watchSearchMemberSaga(),
  watchGetMemberDetailsSaga(),
];
