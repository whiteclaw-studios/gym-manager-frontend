import React from 'react';
import styled from 'react-emotion';
import { GREEN, PROFILE_PLACEHOLDER } from '../../constants';
import { MontserratRegular } from '../../utils/fonts';
import Modal from '../Modal';
const Wrap = styled('div')`
  display: flex;
  padding: 1.2rem;
  flex-direction: column;
  margin: 3rem;
  align-items: center;
`;
const Name = styled('p')`
  font-size: 1.8rem;
  font-family: ${MontserratRegular};
  text-align: center;
  color: ${GREEN};
  margin: 1rem 0;
  @media (max-width: 992px) {
    font-size: 1.6rem;
  }
`;
const ProfilePicWrap = styled('div')`
  width: 6.5rem;
  height: 6.5rem;
  margin: 1rem 0;
`;
const ProfilePic = styled('img')`
  width: 100%;
  height: 100%;
`;
const OtherInfoWrap = styled('div')`
  flex-direction: column;
  display: flex;
`;
const Item = styled('p')`
  margin: 1rem 0;
  font-size: 1.4rem;
  font-family: ${MontserratRegular};
`;
function EnquiryInfo({
  show = false,
  name,
  profilePic = PROFILE_PLACEHOLDER,
  branchName,
  mobileNumber,
  mailId,
  onClose,
}) {
  return (
    <Modal show={show} close={onClose} closeButton>
      <Wrap>
        <Name>{name}</Name>
        <ProfilePicWrap>
          <ProfilePic src={profilePic} />
        </ProfilePicWrap>
        <OtherInfoWrap>
          <Item>{branchName}</Item>
          <Item>{mobileNumber}</Item>
          <Item>{mailId}</Item>
        </OtherInfoWrap>
      </Wrap>
    </Modal>
  );
}
export default EnquiryInfo;
