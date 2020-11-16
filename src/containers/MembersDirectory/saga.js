import { call, put, select, takeEvery } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import { selectMembersSource } from '../../selectors';
import { getCookie, searchLogic } from '../../utils/helpers';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster, loadAdminInfo } from '../App/actions';
import {
  includeMemberInList,
  loadMemberDetails,
  loadSearchData,
  removeMemberInList,
} from './actions';
import {
  ADD_NEW_MEMBER,
  SEARCH_MEMBERS,
  GET_MEMBER_DETAILS,
  DELETE_MEMBER,
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
      images,
      successCallback = () => {},
    } = params;
    const fieldKeys = {
      name,
      mailId,
      mobileNumber,
      branchId,
      planId,
      age,
      gender,
    };
    var formData = new FormData();
    if (images.length > 0) formData.append('file', images[0].imageFile);
    // Object.keys(fieldKeys).map((key) => formData.append(key, fieldKeys[key]));
    formData.append('data', JSON.stringify(fieldKeys));
    const response = yield call(axiosWrapper, {
      method: 'POST',
      headers: { 'Content-type': 'multipart/form-data' },
      url: apiUrls.MEMBERS_URL,
      data: formData,
    });

    const parsedResponse = responseParser(response);
    if (!parsedResponse.isError) {
      const { data } = parsedResponse;
      yield put(
        displayToaster({
          type: 'success',
          text: 'New Member added',
          timeout: 2000,
        }),
      );
      yield put(includeMemberInList(data));
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
        searchText,
      }),
    );
  } catch (err) {
    console.error('Caught in searchMemberSaga', err);
  }
}

function* getMemberDetailsSaga() {
  try {
    const token = getCookie('VJS');
    // If token  is not present in cookie ,it means not logged in
    if (!token) {
      yield put(
        loadAdminInfo({
          isLoggedIn: false,
          infoLoaded: true,
        }),
      );
      return;
    }
    const response = yield call(axiosWrapper, {
      method: 'GET',
      url: apiUrls.MEMBERS_URL,
    });
    console.log('response', response);
    const processResponse = responseParser(response);
    console.log(processResponse);
    if (!processResponse.isError) {
      yield put(
        loadMemberDetails({
          membersList: response.data[0].payload,
          isLoaded: true,
          isLoading: false,
        }),
      );
    }
  } catch (err) {
    console.error('Caught in getMemberDetailsSaga', err);
  }
}
function* deleteMemberSaga(params) {
  try {
    const {
      name,
      memberId,
      successCallback = () => {},
      failureCallback = () => {},
    } = params;
    console.log('params', params);
    const response = yield call(axiosWrapper, {
      method: 'DELETE',
      url: apiUrls.MEMBERS_URL,
      data: {
        name,
        memberId,
      },
    });
    const processResponse = responseParser(response);
    if (!processResponse.isError) {
      yield put(
        removeMemberInList({
          name,
          memberId,
        }),
      );
      successCallback();
    } else {
      yield put(
        displayToaster({
          type: 'failure',
          text: 'Something went wrong',
        }),
      );
      failureCallback();
    }
  } catch (err) {
    console.error('Caught in deleteMemberSaga', err);
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
function* watchDeleteMemberSaga() {
  yield takeEvery(DELETE_MEMBER, deleteMemberSaga);
}
export const membersDirectorySagas = [
  watchaddNewMember(),
  watchSearchMemberSaga(),
  watchGetMemberDetailsSaga(),
  watchDeleteMemberSaga(),
];
