export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, '.$1.')
    .split('.')
    .filter((t) => t !== '')
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
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
  // console.log('cookie', name, value);
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
