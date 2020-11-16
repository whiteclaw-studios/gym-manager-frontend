import { call, put, takeEvery, select } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import { selectEnquirySource } from '../../selectors';
import { getCookie, searchLogic } from '../../utils/helpers';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster } from '../App/actions';
import { loadEnquiryDetails, loadSearchData } from './actions';
import { ADD_ENQUIRY, GET_ENQUIRY_DETAILS, SEARCH_ENQUIRY } from './constants';
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

function* searchEnquirySaga(params = {}) {
  try {
    const { searchText = '' } = params;
    const state = yield select();
    const enquiryData = selectEnquirySource(state);
    const filteredData = searchLogic({
      searchText,
      dataSource: enquiryData,
    });

    yield put(
      loadSearchData({
        isSearching: !!searchText,
        data: filteredData,
        searchText,
      }),
    );
  } catch (err) {
    console.error('Caught in searchEnquirySaga', err);
  }
}

function* getEnquiryDetailsSaga() {
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
      url: apiUrls.ENQUIRIES_URL,
    });
    const processResponse = responseParser(response);
    if (!processResponse.isError) {
      yield put(
        loadEnquiryDetails({
          enquiryList: processResponse.data,
          isLoaded: true,
          isLoading: false,
        }),
      );
    }
  } catch (err) {
    console.error('Caught in getEnquiryDetailsSaga', err);
  }
}

function* watchAddEnquirySaga() {
  yield takeEvery(ADD_ENQUIRY, addEnquirySaga);
}
function* watchSearchEnquirySaga() {
  yield takeEvery(SEARCH_ENQUIRY, searchEnquirySaga);
}
function* watchGetEnquiryDetailsSaga() {
  yield takeEvery(GET_ENQUIRY_DETAILS, getEnquiryDetailsSaga);
}
export const enquiryDirectorySagas = [
  watchAddEnquirySaga(),
  watchSearchEnquirySaga(),
  watchGetEnquiryDetailsSaga(),
];
