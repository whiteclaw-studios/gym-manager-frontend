/**
 *
 * Asynchronously loads the component for CustomDropDown
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "DropDown" */ './index'),
  modules: ['./src/components/Dropdown'],
  loading: () => null,
});
