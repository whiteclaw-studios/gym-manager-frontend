import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
const APP_KEY = 'APP_KEY';
const HOME_PAGE_KEY = 'HOME_PAGE_KEY';
const LOGIN_PAGE_KEY = 'LOGIN_PAGE_KEY';
const routes = [
  {
    component: App,
    key: APP_KEY,
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: HomePage,
        key: HOME_PAGE_KEY,
      },
      {
        path: '/login',
        exact: true,
        component: LoginPage,
        key: LOGIN_PAGE_KEY,
      },
    ],
  },
];
export default routes;
