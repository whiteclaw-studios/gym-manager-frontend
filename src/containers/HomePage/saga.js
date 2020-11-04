import { put, takeEvery } from 'redux-saga/effects';

export function* mainHomeSaga(params = {}) {
  try {
  } catch (err) {
    console.error('Caught in homeSaga', err);
  }
}

function* watchHomeSaga() {
  yield takeEvery('TEST', mainHomeSaga);
}

export const homeSagas = [watchHomeSaga()];
