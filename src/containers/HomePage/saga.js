import { put, call, takeEvery } from 'redux-saga/effects';
import { responseParser } from '../../utils/responseParser';
import { GET_DATE_FILTERED_DATA, GET_FEE_DUE_DETAILS } from './constants';
import axiosWrapper from '../../utils/requestWrapper';
import { apiUrls } from '../../constants';
import { loadDateFilteredData, loadFeeDueDetails } from './actions';
import { getCookie } from '../../utils/helpers';

export function* getFeeDueDetailsSaga(params = {}) {
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
      url: apiUrls.FEE_DUE_DETAILS_URL,
    });
    console.log('response', response);
    const processResponse = responseParser(response);
    if (!processResponse.isError) {
      const { data = [] } = processResponse;
      yield put(
        loadFeeDueDetails({
          isLoaded: true,
          isLoading: false,
          data,
        }),
      );
    } else {
      yield put(
        loadFeeDueDetails({
          isLoaded: true,
          isError: true,
          isLoading: false,
        }),
      );
    }
  } catch (err) {
    console.error('Caught in homeSaga', err);
  }
}
export function* getDateFilteredDataSaga(params = {}) {
  try {
    const { startDate, endDate, sDate, eDate } = params;
    const response = yield call(axiosWrapper, {
      method: 'GET',
      url: `${apiUrls.FEE_DUE_DETAILS_IN_RANGE}?from=${startDate}&to=${endDate}`,
    });
    console.log('response', response);
    const processResponse = responseParser(response);
    if (!processResponse.isError) {
      yield put(
        loadDateFilteredData({
          [`${sDate}-${eDate}`]: {
            data: processResponse.data,
            isLoaded: true,
          },
          data: processResponse.data,
        }),
      );
    }
  } catch (err) {
    console.error('Caught in getDateFilteredDataSaga', err);
  }
}
function* watchGetFeeDueDetailsSaga() {
  yield takeEvery(GET_FEE_DUE_DETAILS, getFeeDueDetailsSaga);
}
function* watchGetDateFilteredDataSaga() {
  yield takeEvery(GET_DATE_FILTERED_DATA, getDateFilteredDataSaga);
}

export const homeSagas = [
  watchGetFeeDueDetailsSaga(),
  watchGetDateFilteredDataSaga(),
];
