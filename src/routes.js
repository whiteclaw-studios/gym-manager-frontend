import RegisterNewMember from './components/RegisterNewMember';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
const APP_KEY = 'APP_KEY';
const HOME_PAGE_KEY = 'HOME_PAGE_KEY';
const LOGIN_PAGE_KEY = 'LOGIN_PAGE_KEY';
const REGISTER_MEMBER_KEY = 'REGISTER_MEMBER_KEY';
export const DASHBOARD_ROUTE = '/dashboard';
export const LOGIN_ROUTE = '/login';
export const REGISTER_NEW_MEMBER_ROUTE = '/register-member';
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
        path: REGISTER_NEW_MEMBER_ROUTE,
        exact: true,
        component: RegisterNewMember,
        key: REGISTER_MEMBER_KEY,
      },
    ],
  },
];
export default routes;
