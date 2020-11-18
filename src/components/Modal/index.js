import React from 'react';
import styled, { css, keyframes } from 'react-emotion';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ReactCssTransition from '../ReactCssTransition';
import { isClientSide } from '../../utils/helpers';
import { CloseBlackIcon } from '../SpriteIcon';

const unmountOverlay = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const mountOverlay = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const unmount = keyframes`
  0% {
    transform: translateY(0)

  }
  100% {
    transform: translateY(-100vh)
  }
`;

const mount = keyframes`
  0% {
    transform: translateY(-100vh)

  }
  100% {
    transform: translateY(0)

  }
`;
const MainDiv = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Child = styled('div')`
  position: relative;
  background: white;
  max-height: 90%;
  max-width: 90%;
  height: auto;
  width: auto;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10001;
  transition: transform 0.3s linear;
`;
const OverlayBackground = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

/* ${props => (props.animate === 1 ? `top:0;` : `top: -100vh;`)};
  transition: top 0.3s linear; */

const Controls = styled('div')`
  position: relative;
  width: 100%;
  padding: 0;
  display: flex;
  background: ${(props) => props.background};
`;
const BackContainer = styled('div')`
  flex: 1;
  position: absolute;
  top: 20px;
  left: 10px;
`;
const Back = styled('span')`
  background-position: -562px -378px;
  width: 17px;
  height: 16px;
`;
const CloseContainer = styled('div')`
  flex: 1;
  text-align: right;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;

export default class ModalNew extends React.Component {
  constructor(props) {
    super(props);
  }

  close = (e) => {
    e.persist();
    if (this.props.close) this.props.close();
  };

  render() {
    const { show = true, close } = this.props;
    const backButton = this.props.backButton || false;
    const closeButton = this.props.closeButton || false;
    const ModalNode = (
      <ReactCssTransition duration={400} shouldShow={show}>
        <MainDiv>
          <ReactCssTransition
            duration={400}
            unmountingStyle={unmountOverlay}
            mountingStyle={mountOverlay}
            shouldShow={show}
          >
            <OverlayBackground onClick={this.close} />
          </ReactCssTransition>
          <ReactCssTransition
            duration={400}
            unmountingStyle={unmount}
            mountingStyle={mount}
            shouldShow={show}
          >
            <Child className={this.props.className || ''} animate={show}>
              {!this.props.hideControls && (
                <Controls background={this.props.background || 'white'}>
                  {backButton ? (
                    <BackContainer id="back">
                      <Back onClick={this.props.onClick}>-</Back>
                    </BackContainer>
                  ) : null}
                  {closeButton ? (
                    <CloseContainer
                      className="modal-close-icon"
                      onClick={close}
                    >
                      <CloseBlackIcon />
                    </CloseContainer>
                  ) : null}
                </Controls>
              )}
              {this.props.children}
            </Child>
          </ReactCssTransition>
        </MainDiv>
      </ReactCssTransition>
    );

    return isClientSide()
      ? createPortal(ModalNode, document.getElementById('root'))
      : null;
  }
}

ModalNew.propTypes = {
  closeHandler: PropTypes.func,
  close: PropTypes.func,
  className: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.element,
  backButton: PropTypes.bool,
  closeButton: PropTypes.bool,
  onClick: PropTypes.func,
  hideControls: PropTypes.bool,
  show: PropTypes.bool.isRequired,
};
ModalNew.defaultProps = {
  hideControls: false,
};
