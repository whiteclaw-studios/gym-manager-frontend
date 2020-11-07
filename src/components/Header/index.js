import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { BLUE } from '../../constants';
import { MontserratBold } from '../../utils/fonts';
const Wrap = styled('div')`
  background: #ffffff;
  display: flex;
  height: 6.4rem;
  justify-content: center;
  align-items: center;
  position: fixed;
  color: #000;
  top: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 1px 4px #a9a9a9;
  @media (max-width: 992px) {
    height: 4rem;
  }
`;
const LogoWrap = styled('div')`
  margin: 0 3.4rem;
  width: 10rem;
  position: absolute;
  left: 10rem;
  @media (max-width: 992px) {
    margin: 0 1rem;
  }
`;

const LogoImg = styled('img')`
  width: 100%;
  height: 100%;
`;
const Title = styled('h5')`
  font-size: 2rem;
  text-align: center;
  padding: 3rem;
  color: ${BLUE};
  font-family: ${MontserratBold};
`;
export default class Header extends React.Component {
  render() {
    const { show = true } = this.props;
    return (
      show && (
        <Wrap>
          <Title>FIT BOSS</Title>
        </Wrap>
      )
    );
  }
}
Header.propTypes = {
  show: PropTypes.bool,
};
