import app from '../containers/App/reducer';
import homePage from '../containers/HomePage/reducer';
import loginPage from '../containers/LoginPage/reducer';
import membersDirectory from '../containers/MembersDirectory/reducer';
import enquiryDirectory from '../containers/EnquiryDirectory/reducer';
const rootReducer = {
  app,
  homePage,
  loginPage,
  membersDirectory,
  enquiryDirectory,
};

export default rootReducer;
