import React from 'react';
import styled, { css } from 'react-emotion';
import { GREY, SECONDARY_BLACK, WHITE } from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
import Image from '../Image';
const Wrap = styled('div')`
  display: flex;
  background: ${GREY};
  padding: 1rem;
  margin: 1.2rem 1.5rem;
  min-width: 27rem;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
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
  isActive,
  address,
  onSelectMember,
  isClickable,
}) {
  return (
    <Wrap
      isClickable={isClickable}
      onClick={
        isClickable
          ? () =>
              onSelectMember({
                name,
                fatherName,
                memberId,
                isActive,
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
                profilePic,
              })
          : () => {}
      }
    >
      <Section1>
        <Image src={profilePic} />
      </Section1>
      <Section2>
        <Name>{name}</Name>
        <LiWrap>
          <Item>{memberId} </Item>
          {memberId && branch && (
            <Item
              className={css`
                margin: 0 0.5rem;
              `}
            >
              |
            </Item>
          )}
          {branch && <Item>{branch}</Item>}
        </LiWrap>
        <LiWrap>
          <Item>{mobile}</Item>
          {mobile && mailId && (
            <Item
              className={css`
                @media (max-width: 460px) {
                  display: none;
                }
                margin: 0 0.5rem;
              `}
            >
              |
            </Item>
          )}
          {mailId && (
            <Item
              className={css`
                max-width: 7rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                @media (max-width: 460px) {
                  display: none;
                }
              `}
            >
              {mailId}
            </Item>
          )}
        </LiWrap>
      </Section2>
    </Wrap>
  );
}
export default Card;
