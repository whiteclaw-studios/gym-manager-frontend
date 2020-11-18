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
  background-position: -77px -122px;
  width: 18px;
  height: 16px;
`;
export const UploadIcon = styled(SpriteIcon)`
  background-position: -78px -35px;
  width: 16px;
  height: 15px;
`;
export const ProfileIcon = styled(SpriteIcon)`
  background-position: -77px -77px;
  width: 18px;
  height: 18px;
`;
export const HoverProfileIcon = css`
  background-position: -121px -33px;
  width: 18px;
  height: 18px;
`;
export const DashboardIcon = styled(SpriteIcon)`
  background-position: -165px -77px;
  width: 18px;
  height: 18px;
`;
export const HoverDashBoardIcon = css`
  background-position: -165px -33px;
`;
export const EnquiryIcon = styled(SpriteIcon)`
  background-position: -32px -165px;
  width: 19px;
  height: 18px;
`;
export const HoverEnquiryIcon = css`
  background-position: -164px -121px;
`;
export const SearchIcon = styled(SpriteIcon)`
  background-position: -33px -77px;
  width: 22px;
  height: 18px;
`;
export const HamburgerIcon = styled(SpriteIcon)`
  background-position: -209px -33px;
  width: 18px;
  height: 17px;
`;
export const CloseIcon = styled(SpriteIcon)`
  background-position: -121px -121px;
  width: 18px;
  height: 18px;
`;
export const CloseBlackIcon = styled(SpriteIcon)`
  background-position: -273px -13px;
  width: 18px;
  height: 18px;
`;
export const LogoutIcon = styled(SpriteIcon)`
  background-position: -23px -219px;
  width: 18px;
  height: 18px;
`;
export const FilterIcon = styled(SpriteIcon)`
  background-position: -273px -189px;
  width: 18px;
  height: 19px;
`;
export const PlusIcon = styled(SpriteIcon)`
  background-position: -33px -121px;
  width: 18px;
  height: 18px;
`;
export const GreenPlusIcon = styled(SpriteIcon)`
  background-position: -273px -145px;
  width: 18px;
  height: 18px;
`;
export const EditIcon = styled(SpriteIcon)`
  background-position: -13px -273px;
  width: 18px;
  height: 18px;
`;
export const PauseIcon = styled(SpriteIcon)`
  background-position: -274px -101px;
  width: 16px;
  height: 18px;
`;
export default SpriteIcon;
