import { all } from 'redux-saga/effects';
import { homeSagas } from '../containers/HomePage/saga';
import { loginSagas } from '../containers/LoginPage/saga';
export default function* rootSaga() {
  yield all([...homeSagas, ...loginSagas]);
}
