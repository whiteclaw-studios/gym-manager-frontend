import { call, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_WITH_PASSWORD } from './constants';
import axiosRequest from '../../utils/requestWrapper';
import { apiUrls } from '../../constants';
import { responseParser } from '../../utils/responseParser';
import { displayToaster, loginResponse } from '../App/actions';
export function* loginWithPasswordSaga(params = {}) {
  try {
    const { userName, password } = params;
    const encodedPassword = btoa(password);
    const response = yield call(axiosRequest, {
      method: 'POST',
      url: apiUrls.LOGIN_URL,
      data: {
        userName,
        password: encodedPassword,
      },
    });

    const parsedResponse = responseParser(response);
    if (!parsedResponse.isError) {
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
    } else {
      const { errorMessage = 'NA' } = parsedResponse;
      yield put(
        displayToaster({
          type: 'failure',
          text: errorMessage,
          timeout: 2000,
        }),
      );
      console.error('Error in loginWithPasswordSaga', errorMessage);
    }
  } catch (err) {
    console.error('Caught in homeSaga', err);
  }
}

function* watchLoginWithPasswordSaga() {
  yield takeEvery(LOGIN_WITH_PASSWORD, loginWithPasswordSaga);
}

export const loginSagas = [watchLoginWithPasswordSaga()];
