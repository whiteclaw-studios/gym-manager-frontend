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
import { getBranchInfo, getPlanInfo } from '../../selectors';
import { MontserratRegular } from '../../utils/fonts';
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
  font-family: ${MontserratRegular};
  @media (max-width: 992px) {
    font-size: 1.6rem;
  }
`;

const HeadingRow = styled(Row)`
  margin-bottom: 2.4rem;
  @media (max-width: 992px) {
    display: none;
  }
`;

const HeadingItem = styled(Item)`
  color: ${SECONDARY_BLACK};
  opacity: 0.7;
`;
const MembersWrap = styled('div')`
  max-height: 60rem;
  overflow: auto;
  @media (max-width: 992px) {
    max-height: 30rem;
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
`;
export default class MembersInfo extends React.Component {
  constructLists = () => {
    const {
      data = [],
      openPaymentPopup = () => {},
      type,
      showDueColumn = false,
      getBranchInfo,
      getPlanInfo,
      isAllowExpand = false,
      hideMemberId = false,
      hidePlan = false,
      onEditMember,
      onDeleteMember,
      allowedBranchInfo,
      showEmail,
      showMobile,
    } = this.props;
    return data.map((member, index) => {
      const {
        name,
        id: memberUniqueId,
        membershipId: memberId,
        planDetailsId: planId,
        photoS3Key: profilePic,
        branchId,
        age,
        gender,
        mobileNumber: mobile,
        mailId,
        id: uniqueId,
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
          showDueColumn={showDueColumn}
          name={name}
          memberId={memberId}
          memberUniqueId={memberUniqueId}
          plan={planInfo.planName || '-'}
          profilePic={profilePic}
          branch={branchInfo.branchName || '-'}
          branchId={branchId}
          planId={planId}
          age={age}
          gender={gender}
          mobile={mobile}
          mailId={mailId}
          isAllowExpand={isAllowExpand}
          hideMemberId={hideMemberId}
          hidePlan={hidePlan}
          onEditMember={onEditMember}
          onDeleteMember={onDeleteMember}
          allowEdit={allowEdit}
          showEmail={showEmail}
          showMobile={showMobile}
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
    const {
      data,
      showDueColumn = false,
      isLoading = false,
      hideMemberId = false,
      hidePlan = false,
      showEmail = false,
      showMobile = false,
      recordInfo = '',
    } = this.props;
    return (
      <Wrap>
        <TitleAndInfo>
          <Title>{this.constructTitleText()}</Title>
          <RecordInfo>{recordInfo}</RecordInfo>
        </TitleAndInfo>

        <HeadingRow>
          <HeadingItem
            className={css`
              max-width: 8rem;
            `}
          ></HeadingItem>
          <Info>
            <HeadingItem>Name</HeadingItem>
            {!hideMemberId && <HeadingItem>Member id</HeadingItem>}
            {showEmail && (
              <HeadingItem
                className={css`
                  max-width: 23rem;
                `}
              >
                Email
              </HeadingItem>
            )}
            {!hidePlan && <HeadingItem>Plan</HeadingItem>}
            <HeadingItem
              className={css`
                max-width: 23rem;
              `}
            >
              Branch
            </HeadingItem>
            {showMobile && <HeadingItem>Mobile</HeadingItem>}
            {showDueColumn && <HeadingItem>Due</HeadingItem>}
          </Info>
          <HeadingItem></HeadingItem>
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
