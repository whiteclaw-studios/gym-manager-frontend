/**
 *
 * Asynchronously loads the component for MemberProfile
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "MemberProfile" */ './index'),
  modules: ['./src/components/MemberProfile'],
  loading: () => null,
});
