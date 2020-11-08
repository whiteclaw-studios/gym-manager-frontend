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
