import React from 'react';
import styled from 'react-emotion';
import { WHITE } from '../../constants';
import EllipsisLoader from '../EllipsisLoader';
const Wrap = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10001;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const OverlayBackground = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
`;
const Loader = styled('div')`
  z-index: 101;
`;
function PageLoader() {
  return (
    <Wrap>
      <Loader>
        <EllipsisLoader />
      </Loader>
      <OverlayBackground />
    </Wrap>
  );
}
export default PageLoader;
