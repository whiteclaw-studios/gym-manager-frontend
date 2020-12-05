import React from 'react';
import styled, { css } from 'react-emotion';
import {
  FEES_LAYOUT,
  MEMBERS_DIRECTORY_LAYOUT,
  ENQUIRY_DIRECTORY_LAYOUT,
  RED,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
import { get } from '../../utils/helpers';
import EllipsisLoader from '../EllipsisLoader';
import { Item, Row, Info } from './commonStyles';
import ItemRow from './ItemRow';
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
const TitleAndInfo = styled('div')`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Title = styled('p')`
  margin: 1.6rem 0;
  font-size: 2rem;
  color: ${SECONDARY_BLACK};
  font-family: ${MontserratBold};
  @media (max-width: 992px) {
    font-size: 1.4rem;
  }
`;

const HeadingRow = styled(Row)`
  margin-bottom: 2.4rem;
  padding: 0 1rem;
  @media (max-width: 992px) {
    display: none;
  }
`;

const HeadingItem = styled(Item)`
  color: ${SECONDARY_BLACK};
  opacity: 0.7;
  flex: 1;
  text-align: center;
`;
const MembersWrap = styled('div')`
  max-height: 60rem;
  overflow: auto;
  @media (max-width: 992px) {
    max-height: 50rem;
  }
`;
const LoaderWrap = styled('div')`
  width: 100%;
  text-align: center;
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
const RecordInfo = styled('div')`
  display: flex;
  font-family: ${MontserratRegular};
  font-size: 1.4rem;
  margin-left: 2rem;
  @media (max-width: 992px) {
    margin-left: 0;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;
export default class MembersInfo extends React.Component {
  constructLists = () => {
    const {
      data = [],
      openPaymentPopup = () => {},
      type,
      getBranchInfo,
      getPlanInfo,
      isAllowExpand = false,
      hidePlan = false,
      allowedBranchInfo,
      makeMemberInactive,
    } = this.props;
    return [...data, {}].map((member, index) => {
      const {
        memberName: name,
        memberId: memberUniqueId,
        membershipId: memberId,
        planDetailsId: planId,
        photoS3Key: profilePic,
        branchId,
        age,
        gender,
        mobileNumber: mobile,
        mailId,
        id: uniqueId,
        txnAmount: due,
        nextDue: dueDate,
      } = member;
      const branchInfo = getBranchInfo(branchId);
      const planInfo = getPlanInfo(branchId, planId);
      const allowEdit = get(allowedBranchInfo, 'id', '') === branchId;
      return (
        <ItemRow
          key={uniqueId}
          index={index}
          openPaymentPopup={openPaymentPopup}
          type={type}
          name={name}
          memberId={memberId}
          memberUniqueId={memberUniqueId}
          plan={planInfo.planName || '-'}
          profilePic={profilePic}
          branch={branchInfo.branchName || '-'}
          branchId={branchId}
          planId={planId}
          age={age}
          due={due}
          dueDate={dueDate}
          gender={gender}
          mobile={mobile}
          mailId={mailId}
          isAllowExpand={isAllowExpand}
          hidePlan={hidePlan}
          allowEdit={allowEdit}
          makeMemberInactive={makeMemberInactive}
        />
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
    return <NoResults>No Fees due </NoResults>;
  };
  render() {
    const {
      data,
      isLoading = false,
      hidePlan = false,
      recordInfo = '',
    } = this.props;
    console.log('MemberInfo', this.props);
    return (
      <Wrap>
        <TitleAndInfo>
          <Title>{this.constructTitleText()}</Title>
          <RecordInfo>{recordInfo}</RecordInfo>
        </TitleAndInfo>

        <HeadingRow>
          <Info>
            <HeadingItem
              className={css`
                display: flex;
                max-width: 15rem;
              `}
            >
              Name
            </HeadingItem>
            <HeadingItem>Member id</HeadingItem>
            <HeadingItem>Plan</HeadingItem>
            <HeadingItem
              className={css`
                max-width: 23rem;
              `}
            >
              Branch
            </HeadingItem>
            <HeadingItem>Due</HeadingItem>
            <HeadingItem
              className={css`
                @media (min-width: 992px) and (max-width: 1100px) {
                  display: none;
                }
              `}
            >
              Due date
            </HeadingItem>
          </Info>
          <HeadingItem
            className={css`
              max-width: 5.5rem;
            `}
          ></HeadingItem>
        </HeadingRow>
        {isLoading ? (
          <LoaderWrap>
            <EllipsisLoader />
          </LoaderWrap>
        ) : (
          <MembersWrap>
            {data.length > 0 ? this.constructLists() : this.showNoResults()}
          </MembersWrap>
        )}
      </Wrap>
    );
  }
}
