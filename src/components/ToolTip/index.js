import React from 'react';
import styled from 'react-emotion';
import { MontserratLight } from '../../utils/fonts';
export const Wrap = styled('div')`
  position: relative;
  display: block;
  padding: 6px 10px;
  width: 110px;
  height: 28px;
  line-height: 28px;
`;

export const Content = styled('div')`
  position: absolute;
  background: #231535;
  color: #fff;
  border-radius: 4px;
  font-size: 1.1rem;
  text-align: center;
  width: 100%;
  height: 100%;
  font-family: ${MontserratLight};
`;

export const Arrow = styled('div')`
  ${(props) => {
    switch (props.arrowPosition) {
      case 'TopRight':
        return 'left:87%;top:7%;';
      case 'TopCenter':
        return 'left:50%;top:-11%;';
      case 'MiddleLeft':
        return 'left:-2%;top:30%;';
      case 'MiddleRight':
        return 'left:96%;top:30%;';
      case 'BottomLeft':
        return 'left:6%;top:74%;';
      case 'BottomCenter':
        return 'left:50%;top:74%;';
      case 'BottomRight':
        return 'left:87%;top:74%;';
      case 'NoArrow':
        return 'display:none;';
      default:
        return 'left:15%;top:7%;';
    }
  }} width: 6px;
  height: 6px;
  background: #231535;
  position: absolute;
  bottom: -13px;
  transform: rotate(-135deg);
`;

function Tooltip({
  contentStyle = '',
  arrowStyle = '',
  arrowPosition = 'BottomCenter',
  customText = '',
  ...rest
}) {
  return (
    <Wrap tabIndex={0} {...rest}>
      <Content className={contentStyle}>{customText}</Content>
      <Arrow className={arrowStyle} arrowPosition={arrowPosition} />
    </Wrap>
  );
}
export default Tooltip;
