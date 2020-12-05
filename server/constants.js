export const VENDORJS_CACHE_TIME = 1000; // 259200000; // 3 days
export const ASSETS_CACHE_TIME = 86400000; // 1 day
const { env = {} } = process;
let { baseUrl = 'https://fitboss-backend-qa.herokuapp.com/api/v1' } = env || {};

export const apiUrls = {
  BASE_URL: `${baseUrl}`,
  LOGIN_URL: `${baseUrl}/auth`,
  ADMIN_INFO_URL: `${baseUrl}/admin_details`,
  BRANCH_DETAILS_URL: `${baseUrl}/branch_details`,
  ENQUIRIES_URL: `${baseUrl}/enquiries`,
  MEMBERS_URL: `${baseUrl}/member_details`,
  MEMBER_DETAIL_URL: `${baseUrl}/member_detail`,
  MEMBER_STATUS_URL: `${baseUrl}/member_status`,
  FEE_DUE_DETAILS_URL: `${baseUrl}/fees_due_details`,
  UPDATE_FEE_DETAILS_URL: `${baseUrl}/update_fee_details`,
  FEE_DUE_DETAILS_IN_RANGE: `${baseUrl}/fees_due_details_in_range`,
};
