/**
 *
 * Asynchronously loads the component for MembersInfo
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "MembersInfo" */ './index'),
  modules: ['./src/components/MembersInfo'],
  loading: () => null,
});
