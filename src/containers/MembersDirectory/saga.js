import { call, put, takeEvery } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster } from '../App/actions';
import { ADD_NEW_MEMBER } from './constants';
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
function* watchaddNewMember() {
  yield takeEvery(ADD_NEW_MEMBER, addNewMember);
}

export const membersDirectorySagas = [watchaddNewMember()];
