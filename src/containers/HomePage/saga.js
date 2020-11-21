import { put, call, takeEvery } from 'redux-saga/effects';
import { responseParser } from '../../utils/responseParser';
import { GET_FEE_DUE_DETAILS } from './constants';
import axiosWrapper from '../../utils/requestWrapper';
import { apiUrls } from '../../constants';
import { loadFeeDueDetails } from './actions';
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

function* watchGetFeeDueDetailsSaga() {
  yield takeEvery(GET_FEE_DUE_DETAILS, getFeeDueDetailsSaga);
}

export const homeSagas = [watchGetFeeDueDetailsSaga()];
