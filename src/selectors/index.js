import { get } from '../utils/helpers';
const selectAppState = (state) => get(state, 'appState', null) || {};
const selectHomePageState = (state) => get(state, 'homePage', null) || {};
const selectTestCases = (state) => get(state, 'homePage.testCases', []);
export { selectAppState, selectHomePageState, selectTestCases };
