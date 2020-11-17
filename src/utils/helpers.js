export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, '.$1.')
    .split('.')
    .filter((t) => t !== '')
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
};
export const setCookie = (name, value, { days = 30, secure = false } = {}) => {
  try {
    let date;
    let expires;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `expires=${date.toGMTString()}`;
    } else {
      expires = 'expires=Fri, 30 Dec 9999 23:59:59 GMT';
    }
    document.cookie = `${name}=${value};${expires};path=/;${
      secure ? 'secure' : ''
    }`;
  } catch (error) {
    // none
  }
};
export const getCookie = (name, cookie) => {
  let value = '';
  try {
    const cookies = cookie || get(document, 'cookie', '');
    value = unescape((cookies.split(`${name}=`)[1] || '').split(';')[0]) || '';
    if (value === 'undefined' || value === 'null') return '';
  } catch (error) {
    value = '';
  }
  return value;
};
export const validateLoginInputs = (state, keys) => {
  const output = { ...state };
  keys.map((key) => {
    if (!state[key].value) {
      output[key] = {
        ...output[key],
        error: true,
      };
    }
  });
  const isValid = !keys.some((key) => state[key].error || !state[key].value);
  return {
    isValid,
    output,
  };
};
export function throttle(func, wait, options = {}) {
  let context;
  let args;
  let result;
  let timeout = null;
  let previous = 0;
  const later = () => {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = null;
      args = null;
    }
  };
  return (...otherArgs) => {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, otherArgs);
      if (!timeout) {
        context = null;
        /* eslint-disable no-param-reassign */
        otherArgs = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
export const debounce = (func, delay = 0) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
export const isClientSide = () => {
  return typeof window === 'object';
};
export const searchLogic = ({ searchText = '', dataSource = [] }) => {
  if (!dataSource.length) return [];
  if (!searchText) return dataSource;
  return dataSource.filter((member) => {
    const { name = '', membershipId = '', mobileNumber } = member;
    let isNameMatches =
      name.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
    let isMembershipIdMatches;
    let isMobileMatches;
    if (!isNameMatches)
      isMembershipIdMatches =
        membershipId.toString().indexOf(searchText.toLowerCase()) === 0;
    if (!isNameMatches && !isMembershipIdMatches)
      isMobileMatches =
        mobileNumber.toString().indexOf(searchText.toLowerCase()) === 0;

    return isNameMatches || isMembershipIdMatches || isMobileMatches;
  });
};
export const filterLogic = ({ filters, dataSource = [] }) => {
  if (!filters) return dataSource;
  if (!dataSource) return [];
  let filteredData = dataSource;
  const keys = Object.keys(filters);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    switch (key) {
      case 'branch': {
        const { branchName, id } = filters[key];
        if (branchName !== 'All') {
          filteredData = filteredData.filter(
            (member) => member.branchId === id,
          );
        }
        break;
      }
      case 'plan': {
        const { id, planName } = filters[key];
        if (planName !== 'All') {
          console.log('planName', planName, id, filteredData);
          filteredData = filteredData.filter(
            (member) => member.planDetailsId === id,
          );
        }
        break;
      }
      default:
        break;
    }
  }
  return filteredData;
};
export const constructBranchFilters = (branchDetails) => {
  if (!branchDetails) [{ branchName: 'All' }];
  let branchInfo = [{ branchName: 'All' }];
  branchInfo = [
    ...branchInfo,
    ...branchDetails.map((branch) => ({
      branchName: branch.branchName,
      id: branch.id,
    })),
  ];
  return branchInfo;
};
export const constructPlanFilters = (
  branchDetails,
  selectBranchFilterIndex,
) => {
  if (!branchDetails) return [{ planName: 'All' }];
  if (selectBranchFilterIndex === 0) return [{ planName: 'All' }];
  return [
    { planName: 'All' },
    ...get(branchDetails, `[${selectBranchFilterIndex - 1}].planDetails`),
  ];
};
export const applySearchAndFilterLogic = ({
  searchText,
  filters,
  dataSource,
}) => {
  const filteredData = searchLogic({
    searchText,
    dataSource,
  });
  return filterLogic({ dataSource: filteredData, filters });
};
