import React from 'react';
import styled from 'react-emotion';
import { FITBOSS_LOGO, WHITE } from '../../constants';
import { PRIMARY_COLOR } from '../../constants';
const Wrap = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex-direction: column;
  padding: 2.4rem;
  position: absolute;
  background: ${WHITE};
`;
// const Title = styled('h4')`
//   font-size: 1.6rem;
//   color: ${PRIMARY_COLOR};
// `;
const LoaderWrap = styled('div')`
  color: #ffffff;
  position: relative;
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader > span {
    background: ${PRIMARY_COLOR};
    border-radius: 50%;
    margin: 5rem 0.5rem;
    animation: bouncingLoader 0.6s infinite alternate;
  }
  .loader > span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .loader > span:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes bouncingLoader {
    from {
      width: 0.1rem;
      height: 0.1rem;
      opacity: 1;
      transform: translate3d(0);
    }
    to {
      width: 1rem;
      height: 1rem;
      opacity: 0.1;
      transform: translate3d(0, -1rem, 0);
    }
  }
`;
const LogoWrap = styled('div')`
  width: 10rem;
  height: 2rem;
`;
const Logo = styled('img')`
  width: 100%;
  height: 100%;
`;
function SplashScreen() {
  return (
    <Wrap>
      <LogoWrap>
        <Logo src={FITBOSS_LOGO} />
      </LogoWrap>
      <LoaderWrap id="bounce-loader">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </LoaderWrap>
    </Wrap>
  );
}
export default SplashScreen;
