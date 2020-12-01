import { get } from '../utils/helpers';
const selectAppState = (state) => get(state, 'app', null) || {};
const selectHomePageState = (state) => get(state, 'homePage', null) || {};
const selectLoginPageState = (state) => get(state, 'loginPage', null) || {};
const selectToasterConf = (state) => get(state, 'app.toasterConf', {});
const isSuperAdmin = (state) => get(state, 'app.adminInfo.isSuperAdmin', false);
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
const selectEDPage = (state) => get(state, 'enquiryDirectory', {});
const selectEnquirySource = (state) => {
  const edPage = selectEDPage(state);
  return get(edPage, 'enquiryInfo.data', []);
};
const selectPaginationInEDPage = (state) => {
  const edPage = selectEDPage(state);
  return get(edPage, 'pagination', {});
};
const selectDataSourceForEDPage = (state) => {
  const edPage = selectEDPage(state);
  return get(edPage, 'enquiryInfo.logicAppliedData', []);
};
const getBranchInfo = (state) => (branchId) => {
  const branchDetails = selectBranchDetails(state);
  const reqdBranch = branchDetails.filter(
    (branch) => branch.id === branchId,
  ) || [{}];
  return {
    ...reqdBranch[0],
  };
};
const getPlanInfo = (state) => (branchId, planId) => {
  const branchDetails = selectBranchDetails(state);
  const reqdBranch =
    branchDetails.filter((branch) => branch.id === branchId) || [];
  const { planDetails = [] } = reqdBranch[0] || {};
  const reqPlanDetails = planDetails.filter((plan) => plan.id === planId) || [
    {},
  ];
  return {
    ...reqPlanDetails[0],
  };
};
const selectAllowedBranchDetails = (state) => {
  const branchDetails = selectBranchDetails(state);
  const reqdBranch = branchDetails.filter(
    (branch) => branch.isWriteAllowed,
  ) || [{}];
  return {
    ...reqdBranch[0],
  };
};
const selectFiltersInMDPage = (state) => {
  const mdPage = selectMDPage(state);
  return get(mdPage, 'filters', {});
};
const selectFiltersInEDPage = (state) => {
  const edPage = selectEDPage(state);
  return get(edPage, 'filters', {});
};
const selectLogo = (state) => {
  return get(selectAppState(state), 'adminInfo.logoS3Url', '');
};
const selectMemberInfo = (state) => (membershipId) => {
  const memberDetails = selectMembersSource(state);
  const memberInfo = memberDetails.filter(
    (member) => member.id === membershipId,
  ) || [{}];
  return { ...memberInfo[0] };
};
const selectMemberFeeDetails = (state) => (memberUniqueId) => {
  const mdPage = selectMDPage(state);
  return get(mdPage, `feeDetails.${memberUniqueId}`, {});
};
const selectHPDataSource = (state) => {
  const hpData = selectHomePageState(state);
  return get(hpData, 'memberFeesInfo.logicAppliedData', {});
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
  selectEDPage,
  selectEnquirySource,
  selectPaginationInEDPage,
  selectDataSourceForEDPage,
  getBranchInfo,
  getPlanInfo,
  selectAllowedBranchDetails,
  selectFiltersInMDPage,
  selectFiltersInEDPage,
  selectLogo,
  selectMemberInfo,
  selectMemberFeeDetails,
  selectHPDataSource,
  isSuperAdmin,
};
