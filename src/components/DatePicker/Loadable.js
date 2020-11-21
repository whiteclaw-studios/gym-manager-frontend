/**
 *
 * Asynchronously loads the component for DatePicker
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "DatePicker" */ './index'),
  modules: ['./src/components/DatePicker'],
  loading: () => null,
});
