import { put, call, takeEvery } from 'redux-saga/effects';
import { responseParser } from '../../utils/responseParser';
import {
  GET_DATE_FILTERED_DATA,
  GET_FEE_DUE_DETAILS,
  UPDATE_FEE_DETAILS,
} from './constants';
import axiosWrapper from '../../utils/requestWrapper';
import { loadDateFilteredData, loadFeeDueDetails } from './actions';
import { getCookie } from '../../utils/helpers';
import {
  displayToaster,
  loadAdminInfo,
  togglePageLoader,
} from '../App/actions';

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
function* getDateFilteredDataSaga(params = {}) {
  try {
    yield put(togglePageLoader(true));
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
  } finally {
    yield put(togglePageLoader(false));
  }
}
function* updateFeeDetails(params) {
  try {
    const {
      memberUniqueId,
      currentPlan,
      successCallback = () => {},
      failureCallback = () => {},
    } = params;
    yield put(togglePageLoader(true));
    const { id } = currentPlan;
    const response = yield call(axiosWrapper, {
      method: 'POST',
      url: `${apiUrls.UPDATE_FEE_DETAILS_URL}`,
      data: {
        memberId: memberUniqueId,
        planDetailsId: id,
      },
    });
    const processResponse = responseParser(response);

    if (!processResponse.isError) {
      yield call(getFeeDueDetailsSaga);
      yield put(
        displayToaster({
          type: 'Success',
          text: 'Fee paid successfully',
          timeout: 3000,
        }),
      );
      if (successCallback) successCallback();
    } else {
      yield put(
        displayToaster({
          type: 'failure',
          text: 'Something went wrong',
          timeout: 3000,
        }),
      );
      if (failureCallback) failureCallback();
    }
  } catch (err) {
    console.error('Caught in updateFeeDetails', err);
  } finally {
    yield put(togglePageLoader(false));
  }
}
function* watchGetFeeDueDetailsSaga() {
  yield takeEvery(GET_FEE_DUE_DETAILS, getFeeDueDetailsSaga);
}
function* watchGetDateFilteredDataSaga() {
  yield takeEvery(GET_DATE_FILTERED_DATA, getDateFilteredDataSaga);
}
function* watchUpdateFeeDetails() {
  yield takeEvery(UPDATE_FEE_DETAILS, updateFeeDetails);
}

export const homeSagas = [
  watchGetFeeDueDetailsSaga(),
  watchGetDateFilteredDataSaga(),
  watchUpdateFeeDetails(),
];
