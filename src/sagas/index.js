import { all } from 'redux-saga/effects';
import { appSagas } from '../containers/App/saga';
import { homeSagas } from '../containers/HomePage/saga';
import { loginSagas } from '../containers/LoginPage/saga';
import { enquiryDirectorySagas } from '../containers/EnquiryDirectory/saga';
import { membersDirectorySagas } from '../containers/MembersDirectory/saga';
export default function* rootSaga() {
  yield all([
    ...appSagas,
    ...homeSagas,
    ...loginSagas,
    ...enquiryDirectorySagas,
    ...membersDirectorySagas,
  ]);
}
