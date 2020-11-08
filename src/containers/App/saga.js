import { call, put, takeEvery } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { loadAdminInfo } from './actions';
import { GET_ADMIN_INFO } from './constants';
function* getAdminInfoSaga(params = {}) {
  try {
    const response = yield call(axiosWrapper, {
      method: 'GET',
      url: apiUrls.LOGIN_URL,
    });

    const parsedResponse = responseParser(response);
    if (!parsedResponse.isError) {
      yield put(
        loadAdminInfo({
          isLoggedIn: true,
          infoLoaded: true,
        }),
      );
    } else {
      yield put(
        loadAdminInfo({
          isLoggedIn: false,
          infoLoaded: true,
        }),
      );
    }
  } catch (err) {
    console.error('Caught in getAdminInfoSaga', err);
  }
}
function* watchGetAdminInfoSaga() {
  yield takeEvery(GET_ADMIN_INFO, getAdminInfoSaga);
}

export const appSagas = [watchGetAdminInfoSaga()];
