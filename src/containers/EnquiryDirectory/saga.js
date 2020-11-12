import { call, put, takeEvery } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster } from '../App/actions';
import { ADD_ENQUIRY } from './constants';
function* addEnquirySaga(params = {}) {
  try {
    const {
      name,
      branchId,
      mailId,
      mobileNumber,
      successCallback = () => {},
    } = params;
    const response = yield call(axiosWrapper, {
      method: 'POST',
      url: apiUrls.ENQUIRIES_URL,
      data: {
        name,
        mailId,
        branchId,
        mobileNumber,
      },
    });

    const parsedResponse = responseParser(response);
    if (!parsedResponse.isError) {
      yield put(
        displayToaster({
          type: 'success',
          text: 'Added',
          timeout: 2000,
        }),
      );
      successCallback();
    } else {
      console.error('Error in adding enquiry', parsedResponse);
    }
  } catch (err) {
    console.error('Caught in addEnquirySaga', err);
  }
}
function* watchAddEnquirySaga() {
  yield takeEvery(ADD_ENQUIRY, addEnquirySaga);
}

export const enquiryDirectorySagas = [watchAddEnquirySaga()];
