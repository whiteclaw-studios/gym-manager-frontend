/**
 *
 * Asynchronously loads the component for CardLayout
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "CardLayout" */ './index'),
  modules: ['./src/components/CardLayout'],
  loading: () => null,
});
