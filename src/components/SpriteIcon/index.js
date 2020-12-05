import React from 'react';
import styled, { css } from 'react-emotion';
import { SPRITE_IMAGE_URL } from '../../constants';
const Icon = styled('span')`
  background: url(${(props) => props.url || SPRITE_IMAGE_URL}) no-repeat;
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
  background-position: -58px -15px;
  width: 16px;
  height: 15px;
`;
export const ProfileIcon = styled(SpriteIcon)`
  background-position: -57px -101px;
  width: 18px;
  height: 18px;
`;
export const HoverProfileIcon = css`
  background-position: -13px -57px;
`;
export const DashboardIcon = styled(SpriteIcon)`
  background-position: -145px -13px;
  width: 18px;
  height: 18px;
`;
export const HoverDashBoardIcon = css`
  background-position: -57px -57px;
`;
export const EnquiryIcon = styled(SpriteIcon)`
  background-position: -144px -101px;
  width: 19px;
  height: 18px;
`;
export const HoverEnquiryIcon = css`
  background-position: -100px -101px;
`;
export const SearchIcon = styled(SpriteIcon)`
  background-position: -13px -101px;
  width: 22px;
  height: 18px;
`;
export const HamburgerIcon = styled(SpriteIcon)`
  background-position: -101px -13px;
  width: 18px;
  height: 17px;
`;
export const CloseIcon = styled(SpriteIcon)`
  background-position: -101px -145px;
  width: 18px;
  height: 18px;
`;
export const CloseBlackIcon = styled(SpriteIcon)`
  background-position: -101px -57px;
  width: 21px;
  height: 18px;
`;
export const LogoutIcon = styled(SpriteIcon)`
  background-position: -145px -145px;
  width: 18px;
  height: 18px;
`;
export const FilterIcon = styled(SpriteIcon)`
  background-position: -13px -189px;
  width: 18px;
  height: 19px;
`;
export const PlusIcon = styled(SpriteIcon)`
  background-position: -145px -57px;
  width: 18px;
  height: 18px;
`;
export const OrangePlusIcon = styled(SpriteIcon)`
  background-position: -189px -13px;
  width: 18px;
  height: 18px;
`;
export const EditIcon = styled(SpriteIcon)`
  background-position: -189px -101px;
  width: 18px;
  height: 18px;
`;
export const PauseIcon = styled(SpriteIcon)`
  background-position: -190px -57px;
  width: 16px;
  height: 18px;
`;
export const DownIcon = styled(SpriteIcon)`
  background-position: -62px -195px;
  width: 8px;
  height: 6px;
`;
export const ResumeIcon = styled(SpriteIcon)`
  background-position: -190px -145px;
  width: 16px;
  height: 18px;
`;
export default SpriteIcon;
