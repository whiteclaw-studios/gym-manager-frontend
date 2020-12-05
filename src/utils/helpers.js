import { monthNames } from '../constants';
import validations from './validations';

export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, '.$1.')
    .split('.')
    .filter((t) => t !== '')
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
};
export const setCookie = (
  name,
  value,
  { days = 30, secure = false, domain = '/' } = {},
) => {
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
    document.cookie = `${name}=${value};${expires};path=${domain};${
      secure ? 'secure' : ''
    }`;
    console.log('setting cookie', name, value, domain);
  } catch (error) {
    // none
    console.error('Error in setting cookie', error);
  }
};
export function deleteCookie(name) {
  if (typeof window === 'object')
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  return true;
}
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
    const { name = '', membershipId = '', mobileNumber = '' } = member;
    let isNameMatches =
      name && name.toLowerCase().includes(searchText.toLowerCase());
    let isMembershipIdMatches;
    let isMobileMatches;
    if (!isNameMatches)
      isMembershipIdMatches =
        membershipId &&
        membershipId.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
    if (!isNameMatches && !isMembershipIdMatches)
      isMobileMatches =
        mobileNumber &&
        mobileNumber.toString().indexOf(searchText.toLowerCase()) === 0;

    return isNameMatches || isMembershipIdMatches || isMobileMatches;
  });
};
export const filterLogic = ({ filters, dataSource = [], applyDateFilter }) => {
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
        const { planName } = filters[key];
        console.log('filteredData', filteredData, planName);
        if (planName !== 'All') {
          filteredData = filteredData.filter(
            (member) => member.planName === planName,
          );
        }
        break;
      }
      case 'status': {
        const { name } = filters[key];
        if (name !== 'All') {
          filteredData = filteredData.filter((member) => {
            if (name === 'Active') {
              return member.isActive;
            } else {
              return !member.isActive;
            }
          });
        }
        break;
      }
      case 'feeDueDate': {
        const { name } = filters[key];
        const { day: tDay, month: tMonth, year: tYear } = getTodayDate();
        if (applyDateFilter) break; // don't apply this filter
        if (name !== 'All') {
          filteredData = filteredData.filter((member) => {
            const { nextDue } = member;
            const [dateFormat] = nextDue.split('T');
            const [day, month, year] = dateFormat.split('-');
            const formattedDate = new Date(
              `${year}-${month}-${day >= 10 ? day : `0${day}`}`,
            ).getTime();
            const formattedTDate = new Date(
              `${tYear}-${tMonth}-${tDay}`,
            ).getTime();
            if (name === 'Today') return formattedDate === formattedTDate;
            else if (name === 'Past') return formattedDate < formattedTDate;
            else if (name === 'Future') return formattedDate > formattedTDate;
          });
          console.log('due date filter after logic', filteredData);
        }
        break;
      }
      case 'bloodGroup': {
        const { name } = filters[key];
        if (name !== 'All') {
          if (name === 'None') {
            filteredData = filteredData.filter((member) => {
              return !member.bloodGroup;
            });
          } else
            filteredData = filteredData.filter((member) => {
              if (member.bloodGroup)
                return member.bloodGroup.toLowerCase() === name.toLowerCase();
            });
        }
        break;
      }
      default:
        break;
    }
  }
  if (applyDateFilter) {
    const { startDate, endDate } = filters;
    const [day1, month1, year1] = startDate.selectedDate.split('/');
    const [day2, month2, year2] = endDate.selectedDate.split('/');
    const fromDate = new Date(`${year1}-${month1}-${day1}`).getTime();
    const toDate = new Date(`${year2}-${month2}-${day2}`).getTime();
    if (fromDate > toDate) return filteredData;
    filteredData = filteredData.filter((member) => {
      const { nextDue } = member;
      const [dateFormat] = nextDue.split('T');
      const [day, month, year] = dateFormat.split('-');
      const dueDate = new Date(`${year}-${month}-${day}`).getTime();
      return dueDate >= fromDate && dueDate <= toDate;
    });
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
export const constructPlanFilters = (branchDetails) => {
  if (!branchDetails) return [{ planName: 'All' }];
  let plans = new Set();
  for (let i = 0; i < branchDetails.length; i += 1) {
    const { planDetails } = branchDetails[i] || {};
    for (let j = 0; j < planDetails.length; j += 1) {
      plans.add(planDetails[j].planName);
    }
  }
  const plansArray = [...plans];
  return [
    { planName: 'All' },
    ...plansArray.map((planName) => ({ planName: planName })),
  ];
};
export const constructBloodGrpFilters = (bloodGroupData) => {
  if (!bloodGroupData) return ['All', 'None'];
  return ['All', 'None', ...bloodGroupData];
};
export const applySearchAndFilterLogic = ({
  searchText,
  filters,
  dataSource,
  applyDateFilter = false,
}) => {
  const filteredData = searchLogic({
    searchText,
    dataSource,
  });
  return filterLogic({ dataSource: filteredData, filters, applyDateFilter });
};
export const scrollToTop = () => {
  window.scrollTo(0, 9);
};
export const formatDate = (date) => {
  if (!date) return '';
  const [dateFormat] = date.split('T');
  const [day, month, year] = dateFormat.split('-');
  return `${day}-${monthNames[month - 1].shortName}-${year}`;
};
export const isGreaterThanOrEqualTo = (date1, date2) => {
  if (!date1 || !date2) return false;
  const [day1, month1, year1] = date1.split('/');
  const [day2, month2, year2] = date2.split('/');

  const validStartDate = new Date(`${year1}-${month1}-${day1}`);
  const validEndDate = new Date(`${year2}-${month2}-${day2}`);
  if (validStartDate && validEndDate) {
    return validStartDate.getTime() <= validEndDate.getTime();
  }
  return false;
};
export const getTodayDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return {
    date,
    day,
    month,
    year,
    formattedDate: `${year}-${month}-${day}`,
  };
};
export const startDateLessThanOrEqualToEndDate = (filters) => {
  const { startDate, endDate } = filters;
  const [day1, month1, year1] = startDate.selectedDate.split('/');
  const [day2, month2, year2] = endDate.selectedDate.split('/');
  const fromDate = new Date(`${year1}-${month1}-${day1}`).getTime();
  const toDate = new Date(`${year2}-${month2}-${day2}`).getTime();
  console.log(
    'startDateLessThanOrEqualToEndDate',
    fromDate,
    toDate,
    new Date(`${year1}-${month1}-${day1}`),
    new Date(`${year2}-${month2}-${day2}`),
  );
  return fromDate <= toDate;
};
export const validateFields = ({ state, fields = [] }) => {
  let newObj = {};
  let isValid = true;
  fields.map((field) => {
    state[field].error = !validations.check(state[field]);
    if (state[field].error) isValid = false;
    newObj = { ...newObj, [field]: state[field] };
  });
  return { newState: newObj, isValid };
};
