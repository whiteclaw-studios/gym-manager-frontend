import { get } from '../utils/helpers';
const selectAppState = (state) => get(state, 'appState', null) || {};
const selectHomePageState = (state) => get(state, 'homePage', null) || {};
const selectLoginPageState = (state) => get(state, 'loginPage', null) || {};
const selectToasterConf = (state) => get(state, 'app.toasterConf', {});
const selectLoginState = (state) =>
  get(state, 'app.adminInfo.isLoggedIn', false);
const selectInfoLoadedState = (state) =>
  get(state, 'app.adminInfo.infoLoaded', false);
const selectBranchDetails = (state) => get(state, 'app.branchDetails.data', []);
const selectMDPage = (state) => get(state, 'membersDirectory', {});
const selectMembersSource = (state) => {
  const mdPage = selectMDPage(state);
  return get(mdPage, 'membersInfo.data', []);
};
const selectPaginationInMDPage = (state) => {
  const mdPage = selectMDPage(state);
  return get(mdPage, 'pagination', {});
};
const selectDataSourceForMDPage = (state) => {
  const mdPage = selectMDPage(state);
  return get(mdPage, 'membersInfo.logicAppliedData', []);
};

export {
  selectAppState,
  selectHomePageState,
  selectLoginPageState,
  selectToasterConf,
  selectLoginState,
  selectInfoLoadedState,
  selectBranchDetails,
  selectMDPage,
  selectMembersSource,
  selectDataSourceForMDPage,
  selectPaginationInMDPage,
};
