import { put, takeEvery } from 'redux-saga/effects';

export function* getFeeDetailsSaga(params = {}) {
  try {
  } catch (err) {
    console.error('Caught in homeSaga', err);
  }
}

function* watchGetFeeDetailsSaga() {
  yield takeEvery('TEST', getFeeDetailsSaga);
}

export const homeSagas = [watchGetFeeDetailsSaga()];
