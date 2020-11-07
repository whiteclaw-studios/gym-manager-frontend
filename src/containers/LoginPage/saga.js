import { call, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_WITH_PASSWORD } from './constants';
import axiosRequest from '../../utils/requestWrapper';
import { apiUrls } from '../../constants';
export function* loginWithPasswordSaga(params = {}) {
  try {
    const { userName, password } = params;
    const encodedPassword = btoa(password);
    console.log(encodedPassword);
    const response = yield call(axiosRequest, {
      method: 'POST',
      url: apiUrls.LOGIN_URL,
      data: {
        userName,
        password: encodedPassword,
      },
    });
    console.log('response', response);
  } catch (err) {
    console.error('Caught in homeSaga', err);
  }
}

function* watchLoginWithPasswordSaga() {
  yield takeEvery(LOGIN_WITH_PASSWORD, loginWithPasswordSaga);
}

export const loginSagas = [watchLoginWithPasswordSaga()];
