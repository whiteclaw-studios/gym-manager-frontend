import { put, takeEvery } from 'redux-saga/effects';

export function* mainLoginSaga(params = {}) {
  try {
  } catch (err) {
    console.error('Caught in homeSaga', err);
  }
}

function* watchMainLoginSaga() {
  yield takeEvery('TEST', mainLoginSaga);
}

export const homeSagas = [watchMainLoginSaga()];
