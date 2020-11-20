import React from 'react';
import styled from 'react-emotion';
import { GREY, SECONDARY_BLACK, WHITE } from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
const Wrap = styled('div')`
  display: flex;
  background: ${GREY};
  padding: 1rem;
  margin: 1.2rem 1.5rem;
  min-width: 27rem;
  cursor: pointer;
  @media (max-width: 992px) {
    margin: 1.2rem 0;
    cursor: default;
  }
`;
const Section1 = styled('div')`
  display: flex;
  width: 6.5rem;
  height: 6.5rem;
  margin-right: 1.6rem;
  border: 1px solid ${WHITE};
`;
const ProfilePic = styled('img')`
  width: 100%;
  height: 100%;
`;
const Section2 = styled('div')`
  display: flex;
  flex-direction: column;
`;
const Name = styled('span')`
  font-family: ${MontserratRegular};
  font-size: 1.4rem;
  color: ${SECONDARY_BLACK};
`;
const LiWrap = styled('div')`
  display: flex;
  margin: 0.5rem 0;
`;
const Item = styled('span')`
  opacity: 0.56;
  font-size: 1.2rem;
  font-family: ${MontserratRegular};
  color: ${SECONDARY_BLACK};
`;
function Card({
  name,
  fatherName,
  memberId,
  branch,
  branchId,
  memberUniqueId,
  mobile,
  mailId,
  gender,
  age,
  plan,
  planId,
  bloodGroup,
  profilePic,
  address,
  onSelectMember,
}) {
  return (
    <Wrap
      onClick={() =>
        onSelectMember({
          name,
          fatherName,
          memberId,
          branch,
          branchId,
          mobile,
          mailId,
          gender,
          age,
          plan,
          planId,
          address,
          bloodGroup,
          memberUniqueId,
          profilePic:
            'https://www.dmarge.com/wp-content/uploads/2017/03/chevron.jpg',
        })
      }
    >
      <Section1>
        <ProfilePic src="https://www.dmarge.com/wp-content/uploads/2017/03/chevron.jpg" />
      </Section1>
      <Section2>
        <Name>{name}</Name>
        <LiWrap>
          <Item>{memberId} </Item>
          {memberId && branch && <Item>|</Item>}
          {branch && <Item>{branch}</Item>}
        </LiWrap>
        <LiWrap>
          <Item>{mobile}</Item>
          {mobile && mailId && <Item>|</Item>}
          {mailId && <Item>{mailId}</Item>}
        </LiWrap>
      </Section2>
    </Wrap>
  );
}
export default Card;
