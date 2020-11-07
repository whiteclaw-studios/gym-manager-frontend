import { get } from './helpers';
export const responseParser = (res) => {
  let parsedRes = {};
  const { status } = res;
  const errors = get(res, 'data.errors', null);
  if (status >= 200 && status <= 304) {
    if (!errors) {
      parsedRes = {
        data: get(res, 'data.payload'),
        errorMessage: '',
        isError: false,
      };
    } else {
      const errMessage = get(errors, '[0].message', '');
      parsedRes = {
        data: null,
        errorMessage: errMessage,
        isError: true,
      };
    }
  } else {
    parsedRes = {
      data: null,
      errorMessage: 'Something went wrong',
      isError: true,
    };
  }
  return parsedRes;
};
