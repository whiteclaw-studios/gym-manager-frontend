import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import { selectMembersSource } from '../../selectors';
import { applySearchAndFilterLogic, getCookie } from '../../utils/helpers';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster, loadAdminInfo } from '../App/actions';
import {
  includeMemberInList,
  loadMemberDetails,
  loadMemberFeeDetails,
  loadSearchData,
  updateMembershipStatusInStore,
} from './actions';
import {
  ADD_NEW_MEMBER,
  SEARCH_MEMBERS,
  GET_MEMBER_DETAILS,
  DELETE_MEMBER,
  GET_MEMBER_FEE_DETAILS,
  UPDATE_MEMBERSHIP_STATUS,
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
      bloodGroup,
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
      bloodGroup,
    };
    console.log('fieldKeys', fieldKeys);

    var formData = new FormData();
    if (images.length > 0) {
      const { imageFile = '' } = images[0];
      formData.append('file', imageFile);
    }
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
    const state = yield select();
    const membersData = selectMembersSource(state);
    const filteredData = applySearchAndFilterLogic({
      searchText,
      dataSource: membersData,
      filters: membersData.filters,
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
    const processResponse = responseParser(response);
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
function* updateMembershipStatusSaga(params) {
  try {
    const {
      memberUniqueId,
      isActive,
      successCallback = () => {},
      failureCallback = () => {},
    } = params;
    console.log('params', params);
    const response = yield call(axiosWrapper, {
      method: 'PUT',
      url: `${
        apiUrls.MEMBER_STATUS_URL
      }/${memberUniqueId}?isActive=${!!isActive}`,
    });
    console.log('response', response);
    const processResponse = responseParser(response);
    if (!processResponse.isError) {
      yield put(
        updateMembershipStatusInStore({
          memberUniqueId,
          isActive: !!isActive,
        }),
      );
      successCallback();
    } else {
      yield put(
        displayToaster({
          type: 'failure',
          text: 'Something went wrong while updating status',
        }),
      );
      yield put(
        updateMembershipStatusInStore({
          memberUniqueId,
          isActive: !!isActive,
        }),
      );
      failureCallback();
    }
  } catch (err) {
    console.error('Caught in deleteMemberSaga', err);
  }
}
function* getMemberFeeDetailsSaga(params) {
  try {
    const {
      memberUniqueId,
      successCallback = () => {},
      failureCallback = () => {},
    } = params;

    const response = yield call(axiosWrapper, {
      method: 'GET',
      url: `${apiUrls.MEMBER_DETAIL_URL}/${memberUniqueId}`,
    });
    console.log('response', response);
    const processResponse = responseParser(response);
    console.log('processResponse', processResponse);

    if (!processResponse.isError) {
      const { data = {} } = processResponse;
      yield put(
        loadMemberFeeDetails({
          memberUniqueId,
          feesHistory: data.feesHistory,
          isLoaded: true,
          isLoading: false,
          isError: false,
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
      yield put(
        loadMemberFeeDetails({
          memberUniqueId,
          isLoaded: true,
          isLoading: false,
          isError: true,
        }),
      );
      failureCallback();
    }
  } catch (err) {
    console.error('Caught in getMemberFeeDetailsSaga ', err);
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
function* watchUpdateMembershipStatusSaga() {
  yield takeEvery(UPDATE_MEMBERSHIP_STATUS, updateMembershipStatusSaga);
}
function* watchGetMemberFeeDetailsSaga() {
  yield takeEvery(GET_MEMBER_FEE_DETAILS, getMemberFeeDetailsSaga);
}
export const membersDirectorySagas = [
  watchaddNewMember(),
  watchSearchMemberSaga(),
  watchGetMemberDetailsSaga(),
  watchUpdateMembershipStatusSaga(),
  watchGetMemberFeeDetailsSaga(),
];
