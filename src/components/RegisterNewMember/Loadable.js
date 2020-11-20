/**
 *
 * Asynchronously loads the component for RegisterNewMember
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "RegisterNewMember" */ './index'),
  modules: ['./src/components/RegisterNewMember'],
  loading: () => null,
});
