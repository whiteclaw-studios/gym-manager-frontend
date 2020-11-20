import * as regex from './regex';
const validations = {
  configs: {
    email: regex.EMAIL,
    password: regex.PASSWORD,
    mobile: regex.MOBILE,
    username: regex.USER_NAME,
    age: regex.AGE,
    firstname: regex.FIRST_NAME,
  },

  check: (state) => {
    const { type, value } = state;
    if (type === 'email' && value === '') return true;
    return validations.configs[type]
      ? validations.configs[type].test(value)
      : true;
  },
};
export default validations;
