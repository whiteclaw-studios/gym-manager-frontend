import React from 'react';
import styled from 'react-emotion';
import { GREEN } from '../../constants';
const Wrap = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
const Title = styled('h4')`
  font-size: 1.6rem;
  color: ${GREEN};
`;
function SplashScreen() {
  return (
    <Wrap>
      <Title>Fitboss...</Title>
    </Wrap>
  );
}
export default SplashScreen;
