import { call, put, select, takeEvery } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import { selectMembersSource } from '../../selectors';
import { searchLogic } from '../../utils/helpers';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster } from '../App/actions';
import { loadSearchData } from './actions';
import { ADD_NEW_MEMBER, SEARCH_MEMBERS } from './constants';
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
function* watchaddNewMember() {
  yield takeEvery(ADD_NEW_MEMBER, addNewMember);
}
function* watchSearchMemberSaga() {
  yield takeEvery(SEARCH_MEMBERS, searchMemberSaga);
}
export const membersDirectorySagas = [
  watchaddNewMember(),
  watchSearchMemberSaga(),
];
