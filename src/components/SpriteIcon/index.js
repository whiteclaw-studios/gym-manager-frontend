import React from 'react';
import styled from 'react-emotion';
import spriteImage from '../../images/spriteImage.png';
const Icon = styled('span')`
  background: url(${(props) => props.url || spriteImage}) no-repeat;
  background-position: ${(props) => props.backgroundPosition || ''};
  width: ${(props) => props.width || '18px'};
  height: ${(props) => props.width || '17px'};
  background-size: ${(props) => props.backgroundSize || ''};
  display: block;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;
function SpriteIcon(props) {
  return <Icon {...props} />;
}
export const BackIcon = styled(SpriteIcon)`
  background-position: -13px -14px;
  width: 18px;
  height: 16px;
`;
export const UploadIcon = styled(SpriteIcon)`
  background-position: -58px -59px;
  width: 16px;
  height: 15px;
`;
export const ProfileIcon = styled(SpriteIcon)`
  background-position: -13px -57px;
  width: 18px;
  height: 18px;
`;
export const DashboardIcon = styled(SpriteIcon)`
  background-position: -101px -13px;
  width: 18px;
  height: 18px;
`;
export const FeeIcon = styled(SpriteIcon)`
  background-position: -14px -101px;
  width: 16px;
  height: 18px;
`;
export const EnquiryIcon = styled(SpriteIcon)`
  background-position: -100px -57px;
  width: 19px;
  height: 18px;
`;
export default SpriteIcon;
