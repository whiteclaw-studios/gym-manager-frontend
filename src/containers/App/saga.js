import { call, put, takeEvery } from 'redux-saga/effects';
import { apiUrls } from '../../constants';
import { getCookie } from '../../utils/helpers';
import axiosWrapper from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { loadAdminInfo, loadBranchDetails } from './actions';
import { GET_ADMIN_INFO } from './constants';
function* getAdminInfoSaga(params = {}) {
  try {
    const token = getCookie('VJS');
    // If token  is not present in cookie ,it means not logged in
    if (!token) return;
    const response = yield call(axiosWrapper, {
      method: 'GET',
      url: apiUrls.ADMIN_INFO_URL,
    });

    const parsedResponse = responseParser(response);
    if (!parsedResponse.isError) {
      const { data } = parsedResponse;
      const { branchDetails = [], ...adminInfo } = data || {};
      yield put(
        loadAdminInfo({
          isLoggedIn: true,
          infoLoaded: true,
          ...adminInfo,
        }),
      );
      yield put(loadBranchDetails(branchDetails));
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
