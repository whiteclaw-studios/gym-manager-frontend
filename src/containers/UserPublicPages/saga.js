import { call, put, takeEvery } from 'redux-saga/effects';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster, togglePageLoader } from '../App/actions';
import { loadSpecificBranchInfo } from './actions';
import { ADD_NEW_MEMBER, GET_SPECIFIC_BRANCH_INFO } from './constants';
function* getSpecificBranchInfo(params = {}) {
  try {
    console.log('params', params);
    const { branchId = '' } = params;
    if (!branchId) {
      yield put(
        loadSpecificBranchInfo({
          isLoading: false,
          isLoaded: true,
          data: {},
        }),
      );
      return;
    }
    const response = yield call(axiosWrapper, {
      method: 'GET',
      url: `${apiUrls.PUBLIC_API_BRANCH_INFO_URL}${branchId}`,
      ignoreToken: true,
    });
    console.log('response', response);
    const processedResponse = responseParser(response);
    console.log('processedResponse', processedResponse);

    if (!processedResponse.isError) {
      const { data } = processedResponse;
      yield put(
        loadSpecificBranchInfo({
          isLoading: false,
          isLoaded: true,
          data,
        }),
      );
    } else {
      yield put(
        loadSpecificBranchInfo({
          isLoading: false,
          isLoaded: true,
          data: {},
        }),
      );
    }
  } catch (err) {
    console.error('Caught in getSpecificBranchInfo', err);
  }
}
function* addNewMember(params = {}) {
  try {
    const {
      memberId,
      name,
      fatherName,
      mailId,
      mobileNumber,
      branchId,
      planId,
      age,
      gender,
      images,
      bloodGroup,
      feeAmount,
      successCallback = () => {},
    } = params;
    const fieldKeys = {
      membershipId: memberId,
      name,
      fatherName,
      mailId,
      mobileNumber,
      branchId,
      planDetailsId: planId,
      age,
      gender,
      bloodGroup,
    };
    yield put(togglePageLoader(true));
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
      url: apiUrls.PUBLIC_API_REGISTER_MEMBER,
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
      successCallback();
    } else {
      console.error('Error in adding member', parsedResponse);
      const { errorMessage = 'Something went wrong' } = parsedResponse;
      yield put(
        displayToaster({
          type: 'failure',
          text: errorMessage,
          timeout: 2000,
        }),
      );
    }
  } catch (err) {
    console.error('Caught in addNewMember saga public pages', err);
  } finally {
    yield put(togglePageLoader(false));
  }
}
function* watchaddNewMember() {
  yield takeEvery(ADD_NEW_MEMBER, addNewMember);
}
function* watchGetSpecificBranchInfo() {
  yield takeEvery(GET_SPECIFIC_BRANCH_INFO, getSpecificBranchInfo);
}
export const userPublicPagesSagas = [
  watchaddNewMember(),
  watchGetSpecificBranchInfo(),
];
