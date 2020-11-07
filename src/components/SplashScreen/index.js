import React from 'react';
import styled from 'react-emotion';
const Wrap = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
function SplashScreen() {
  return <Wrap>Loading...</Wrap>;
}
export default SplashScreen;
