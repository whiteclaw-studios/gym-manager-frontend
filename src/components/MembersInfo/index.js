import React from 'react';
import styled, { css } from 'react-emotion';
import {
  FEES_LAYOUT,
  GREY,
  MEMBERS_DIRECTORY_LAYOUT,
  ENQUIRY_DIRECTORY_LAYOUT,
  RED,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { MontserratRegular, OpensansBold } from '../../utils/fonts';
import Button from '../Button';
const Wrap = styled('div')`
  display: flex;
  flex-direction: column;
  background: ${WHITE};
  padding: 1.6rem;
  box-shadow: 0px 1px 4px #a9a9a9;
  min-height: 20rem;
  @media (max-width: 992px) {
    min-height: 10rem;
  }
`;
const Title = styled('p')`
  margin: 1.6rem 0;
  font-size: 2rem;
  color: ${SECONDARY_BLACK};
  font-family: ${MontserratRegular};
  @media (max-width: 992px) {
    font-size: 1.6rem;
  }
`;
const Row = styled('div')`
  display: flex;
  width: 100%;
`;
const HeadingRow = styled(Row)`
  margin-bottom: 2.4rem;
  @media (max-width: 992px) {
    display: none;
  }
`;
const Item = styled('li')`
  flex: 1;
  font-size: 1.4rem;
  color: ${SECONDARY_BLACK};
  max-width: 17rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${MontserratRegular};
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;

const HeadingItem = styled(Item)`
  color: ${SECONDARY_BLACK};
  opacity: 0.7;
`;
const MembersWrap = styled('div')``;
const MemberRow = styled(Row)`
  align-items: center;
  padding: 1rem;
  @media (max-width: 992px) {
    align-items: flex-start;
  }
`;
const ProfilePicWrap = styled('div')`
  width: 4rem;
  height: 4rem;
`;
const ProfilePic = styled('img')`
  width: 100%;
  height: 100%;
`;

const Info = styled('div')`
  display: flex;
  width: 100%;
  flex: 2;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
const Plan = styled(Item)`
  @media (max-width: 992px) {
    opacity: 0.7;
    margin-top: 0.5rem;
  }
  @media (max-width: 360px) {
    max-width: 7.5rem;
  }
`;
const Due = styled(Item)`
  @media (max-width: 992px) {
    opacity: 0.7;
    margin-top: 0.5rem;
  }
`;
const Paid = styled(Button)`
  width: 6.5rem;
  font-family: ${OpensansBold};
  font-size: 1.3rem;
  color: ${WHITE};
  padding: 0.1rem;
  border-radius: 0px;
  @media (max-width: 992px) {
    width: 4.4rem;
  }
`;
const Edit = styled(Button)`
  width: 6.5rem;
  font-size: 1.2rem;
  color: ${WHITE};
  @media (max-width: 760px) {
    font-size: 1rem;
  }
`;
const Delete = styled(Button)`
  width: 6.5rem;
  color: ${WHITE};
  font-size: 1.2rem;
  border: 1px solid ${RED};
  background: ${RED};
  @media (max-width: 760px) {
    font-size: 1rem;
  }
`;
const NoResults = styled('p')`
  color: ${RED};
  text-align: center;
  font-size: 1.4rem;
  font-family: ${MontserratRegular};
  min-height: 10rem;
  justify-content: center;
  align-items: center;
  display: flex;
`;
export default class MembersInfo extends React.Component {
  constructControls = (data) => {
    const { name, memberId, plan, branch, due } = data;
    const { type, openPaymentPopup = () => {} } = this.props;
    switch (type) {
      case FEES_LAYOUT:
        return (
          <Item>
            <Paid
              onClick={() =>
                openPaymentPopup({
                  name,
                  memberId,
                  plan,
                  branch,
                  due,
                })
              }
            >
              Paid
            </Paid>
          </Item>
        );
      case MEMBERS_DIRECTORY_LAYOUT: {
        return (
          <Item
            className={css`
              justify-content: space-around;
              display: flex;
              @media (max-width: 760px) {
                flex-direction: column;
                align-items: flex-end;
              }
            `}
          >
            <Edit>Edit</Edit>
            <Delete>Delete</Delete>
          </Item>
        );
      }
      default:
        return null;
    }
  };
  constructLists = () => {
    const { data = [] } = this.props;
    return data.map((member, index) => {
      const {
        profilePic = 'https://i0.wp.com/www.kahanihindi.com/wp-content/uploads/2020/02/Whatsapp-DP-images-1.jpg?resize=450%2C400&ssl=1',
        name,
        memberId,
        plan,
        branch,
        due,
      } = member || {};
      return (
        <MemberRow
          className={
            index % 2 === 0
              ? css`
                  background: ${GREY};
                `
              : ''
          }
          key={memberId}
        >
          <Item
            className={css`
              max-width: 5rem;
              margin-right: 2rem;
              @media (max-width: 992px) {
                margin-right: 1rem;
              }
            `}
          >
            <ProfilePicWrap>
              <ProfilePic src={profilePic} />
            </ProfilePicWrap>
          </Item>
          <Info>
            <Item>{name}</Item>
            <Item
              className={css`
                @media (max-width: 992px) {
                  display: none;
                }
              `}
            >
              {memberId}
            </Item>
            <div
              className={css`
                display: flex;
                flex: 1;
                @media (max-width: 992px) {
                  flex-direction: column;
                }
              `}
            >
              <Plan>{plan}</Plan>
              <Item
                className={css`
                  @media (max-width: 992px) {
                    display: none;
                  }
                `}
              >
                {branch}
              </Item>
              <Due>{due}</Due>
            </div>
          </Info>

          {this.constructControls(member)}
        </MemberRow>
      );
    });
  };
  constructTitleText = () => {
    const { type } = this.props;
    switch (type) {
      case FEES_LAYOUT:
        return 'Fees Due';
      case MEMBERS_DIRECTORY_LAYOUT:
        return 'Members Directory';
      case ENQUIRY_DIRECTORY_LAYOUT:
        return 'Enquiry Directory';
      default:
        return '';
    }
  };
  showNoResults = () => {
    const { type } = this.props;
    switch (type) {
      case FEES_LAYOUT:
        return <NoResults>No Fees due </NoResults>;
      case MEMBERS_DIRECTORY_LAYOUT:
        return <NoResults>Members not found </NoResults>;
      case ENQUIRY_DIRECTORY_LAYOUT:
        return <NoResults>Enquiry data not found </NoResults>;
      default:
        return '';
    }
  };
  render() {
    const { data } = this.props;
    return (
      <Wrap>
        <Title>{this.constructTitleText()}</Title>
        <HeadingRow>
          <HeadingItem
            className={css`
              max-width: 8rem;
            `}
          ></HeadingItem>
          <Info>
            <HeadingItem>Name</HeadingItem>
            <HeadingItem>Member id</HeadingItem>
            <HeadingItem>Plan</HeadingItem>
            <HeadingItem>Branch</HeadingItem>
            <HeadingItem>Due</HeadingItem>
          </Info>
          <HeadingItem></HeadingItem>
        </HeadingRow>
        <MembersWrap>
          {data.length > 0 ? this.constructLists() : this.showNoResults()}
        </MembersWrap>
      </Wrap>
    );
  }
}
