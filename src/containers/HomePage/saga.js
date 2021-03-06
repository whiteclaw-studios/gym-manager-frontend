import { put, call, takeEvery } from 'redux-saga/effects';
import { responseParser } from '../../utils/responseParser';
import {
  GET_FEE_DUE_DETAILS,
  UPDATE_FEE_DETAILS,
  UPDATE_MEMBERSHIP_STATUS,
} from './constants';
import axiosWrapper from '../../utils/requestWrapper';
import { loadFeeDueDetails, updateMembershipStatusInStore } from './actions';
import { getCookie } from '../../utils/helpers';
import {
  displayToaster,
  loadAdminInfo,
  togglePageLoader,
} from '../App/actions';

export function* getFeeDueDetailsSaga(params = {}) {
  try {
    const token = getCookie('VJS');
    // If token  is not present in cookie ,it means not logged in
    if (!token) {
      yield put(
        loadAdminInfo({
          isLoggedIn: false,
          infoLoaded: true,
        }),
      );
      return;
    }
    const response = yield call(axiosWrapper, {
      method: 'GET',
      url: apiUrls.FEE_DUE_DETAILS_URL,
    });
    const processResponse = responseParser(response);
    if (!processResponse.isError) {
      const { data = [] } = processResponse;
      yield put(
        loadFeeDueDetails({
          isLoaded: true,
          isLoading: false,
          data,
        }),
      );
    } else {
      yield put(
        loadFeeDueDetails({
          isLoaded: true,
          isError: true,
          isLoading: false,
        }),
      );
    }
  } catch (err) {
    console.error('Caught in homeSaga', err);
  }
}

function* updateFeeDetails(params) {
  try {
    const {
      memberUniqueId,
      currentPlan,
      dueDate,
      successCallback = () => {},
      failureCallback = () => {},
    } = params;
    yield put(togglePageLoader(true));
    const { id } = currentPlan;
    const response = yield call(axiosWrapper, {
      method: 'POST',
      url: `${apiUrls.UPDATE_FEE_DETAILS_URL}`,
      data: {
        memberId: memberUniqueId,
        planDetailsId: id,
        paidDate: dueDate,
      },
    });
    const processResponse = responseParser(response);

    if (!processResponse.isError) {
      yield call(getFeeDueDetailsSaga);
      yield put(
        displayToaster({
          type: 'Success',
          text: 'Fee paid successfully',
          timeout: 3000,
        }),
      );
      if (successCallback) successCallback();
    } else {
      yield put(
        displayToaster({
          type: 'failure',
          text: 'Something went wrong',
          timeout: 3000,
        }),
      );
      if (failureCallback) failureCallback();
    }
  } catch (err) {
    console.error('Caught in updateFeeDetails', err);
  } finally {
    yield put(togglePageLoader(false));
  }
}
function* updateMembershipStatusSaga(params) {
  try {
    const {
      memberUniqueId,
      successCallback = () => {},
      failureCallback = () => {},
    } = params;
    yield put(togglePageLoader(true));
    const response = yield call(axiosWrapper, {
      method: 'PUT',
      url: `${apiUrls.MEMBER_STATUS_URL}/${memberUniqueId}?isActive=false`,
    });
    const processResponse = responseParser(response);
    if (!processResponse.isError) {
      yield put(
        updateMembershipStatusInStore({
          memberUniqueId,
        }),
      );
      successCallback();
    } else {
      yield put(
        displayToaster({
          type: 'failure',
          text: 'Something went wrong while updating status',
        }),
      );
      yield put(
        updateMembershipStatusInStore({
          memberUniqueId,
        }),
      );
      failureCallback();
    }
  } catch (err) {
    console.error('Caught in deleteMemberSaga', err);
  } finally {
    yield put(togglePageLoader(false));
  }
}
function* watchGetFeeDueDetailsSaga() {
  yield takeEvery(GET_FEE_DUE_DETAILS, getFeeDueDetailsSaga);
}

function* watchUpdateFeeDetails() {
  yield takeEvery(UPDATE_FEE_DETAILS, updateFeeDetails);
}
function* watchUpdateMembershipStatusSaga() {
  yield takeEvery(UPDATE_MEMBERSHIP_STATUS, updateMembershipStatusSaga);
}
export const homeSagas = [
  watchGetFeeDueDetailsSaga(),
  watchUpdateFeeDetails(),
  watchUpdateMembershipStatusSaga(),
];
