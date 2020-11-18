import React from 'react';
import styled, { css } from 'react-emotion';
import spriteImage from '../../images/SpriteImage.png';
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
  background-position: -57px -102px;
  width: 18px;
  height: 16px;
`;
export const UploadIcon = styled(SpriteIcon)`
  background-position: -68px -25px;
  width: 16px;
  height: 15px;
`;
export const ProfileIcon = styled(SpriteIcon)`
  background-position: -67px -67px;
  width: 18px;
  height: 18px;
`;
export const HoverProfileIcon = css`
  background-position: -111px -23px;
  width: 18px;
  height: 18px;
`;
export const DashboardIcon = styled(SpriteIcon)`
  background-position: -155px -67px;
  width: 18px;
  height: 18px;
`;
export const HoverDashBoardIcon = css`
  background-position: -155px -23px;
`;
export const EnquiryIcon = styled(SpriteIcon)`
  background-position: -22px -155px;
  width: 19px;
  height: 18px;
`;
export const HoverEnquiryIcon = css`
  background-position: -154px -111px;
`;
export const SearchIcon = styled(SpriteIcon)`
  background-position: -23px -67px;
  width: 22px;
  height: 18px;
`;
export const HamburgerIcon = styled(SpriteIcon)`
  background-position: -199px -23px;
  width: 18px;
  height: 17px;
`;
export const CloseIcon = styled(SpriteIcon)`
  background-position: -111px -111px;
  width: 18px;
  height: 18px;
`;
export const LogoutIcon = styled(SpriteIcon)`
background-position:-13px -209px;
width: 18px;
height: 18px;
}
`;
export default SpriteIcon;
