import { get } from '../utils/helpers';
const selectAppState = (state) => get(state, 'appState', null) || {};
const selectHomePageState = (state) => get(state, 'homePage', null) || {};
const selectLoginPageState = (state) => get(state, 'loginPage', null) || {};
const selectToasterConf = (state) => get(state, 'app.toasterConf', {});
const selectLoginState = (state) =>
  get(state, 'app.adminInfo.isLoggedIn', false);
const selectInfoLoadedState = (state) =>
  get(state, 'app.adminInfo.infoLoaded', false);
export {
  selectAppState,
  selectHomePageState,
  selectLoginPageState,
  selectToasterConf,
  selectLoginState,
  selectInfoLoadedState,
};
