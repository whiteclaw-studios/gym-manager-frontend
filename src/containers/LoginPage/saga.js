import { call, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_WITH_PASSWORD } from './constants';
import axiosRequest from '../../utils/requestWrapper';
import { responseParser } from '../../utils/responseParser';
import { displayToaster, loginResponse } from '../App/actions';
import { setCookie } from '../../utils/helpers';
export function* loginWithPasswordSaga(params = {}) {
  try {
    const {
      userName,
      password,
      successCallback = () => {},
      failureCallback = () => {},
    } = params;
    const encodedPassword = btoa(password);
    const response = yield call(axiosRequest, {
      method: 'POST',
      url: apiUrls.LOGIN_URL,
      data: {
        userName,
        password: encodedPassword,
      },
      ignoreToken: true,
    });

    const parsedResponse = responseParser(response);
    if (!parsedResponse.isError) {
      const { data } = parsedResponse;
      const { token } = data || {};
      setCookie('VJS', token, { days: 10 });
      yield put(
        loginResponse({
          isLoggedIn: true,
        }),
      );
      yield put(
        displayToaster({
          type: 'success',
          text: 'Logged in successfully',
          timeout: 2000,
        }),
      );
      if (successCallback) successCallback();
    } else {
      const { errorMessage = 'NA' } = parsedResponse;
      yield put(
        displayToaster({
          type: 'failure',
          text: errorMessage,
          timeout: 2000,
        }),
      );
      if (failureCallback) failureCallback();
      console.error('Error in loginWithPasswordSaga', errorMessage);
    }
  } catch (err) {
    console.error('Caught in homeSaga', err);
    if (failureCallback) failureCallback();
  }
}

function* watchLoginWithPasswordSaga() {
  yield takeEvery(LOGIN_WITH_PASSWORD, loginWithPasswordSaga);
}

export const loginSagas = [watchLoginWithPasswordSaga()];
