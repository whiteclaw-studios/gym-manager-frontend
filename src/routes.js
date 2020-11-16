import EnquiryForm from './components/EnquiryForm';
import RegisterNewMember from './components/RegisterNewMember';
import App from './containers/App';
import EnquiryDirectory from './containers/EnquiryDirectory';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import MembersDirectory from './containers/MembersDirectory';
const APP_KEY = 'APP_KEY';
const HOME_PAGE_KEY = 'HOME_PAGE_KEY';
const LOGIN_PAGE_KEY = 'LOGIN_PAGE_KEY';
const MEMBERS_DIRECTORY_KEY = 'MEMBERS_DIRECTORY_KEY';
const ENQUIRY_DIRECTORY_KEY = 'ENQUIRY_DIRECTORY_KEY';
const REGISTER_MEMBER_KEY = 'REGISTER_MEMBER_KEY';
const ENQUIRY_FORM_KEY = 'ENQUIRY_FORM_KEY';
export const DASHBOARD_ROUTE = '/dashboard';
export const LOGIN_ROUTE = '/login';
export const MEMBERS_DIRECTORY_ROUTE = '/members-directory';
export const ENQUIRY_DIRECTORY_ROUTE = '/enquiry-directory';
export const REGISTER_MEMBER_ROUTE = '/register-member';
export const ENQUIRY_FORM_ROUTE = '/enquiry-form';
const routes = [
  {
    component: App,
    key: APP_KEY,
    routes: [
      {
        path: DASHBOARD_ROUTE,
        exact: true,
        component: HomePage,
        key: HOME_PAGE_KEY,
      },
      {
        path: LOGIN_ROUTE,
        exact: true,
        component: LoginPage,
        key: LOGIN_PAGE_KEY,
      },

      {
        path: MEMBERS_DIRECTORY_ROUTE,
        exact: true,
        component: MembersDirectory,
        key: MEMBERS_DIRECTORY_KEY,
      },
      {
        path: ENQUIRY_DIRECTORY_ROUTE,
        exact: true,
        component: EnquiryDirectory,
        key: ENQUIRY_DIRECTORY_KEY,
      },
      {
        path: ENQUIRY_FORM_ROUTE,
        exact: true,
        component: EnquiryForm,
        key: ENQUIRY_FORM_KEY,
      },
    ],
  },
];
export default routes;
