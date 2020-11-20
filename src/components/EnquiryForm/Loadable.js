/**
 *
 * Asynchronously loads the component for EnquiryForm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "EnquiryForm" */ './index'),
  modules: ['./src/components/EnquiryForm'],
  loading: () => null,
});
