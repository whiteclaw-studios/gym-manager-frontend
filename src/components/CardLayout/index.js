import React from 'react';
import styled from 'react-emotion';
import {
  ENQUIRY_DIRECTORY_LAYOUT,
  MEMBERS_DIRECTORY_LAYOUT,
  RED,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
import { get } from '../../utils/helpers';
import EllipsisLoader from '../EllipsisLoader';
import Card from './Card';
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
const LoaderWrap = styled('div')`
  width: 100%;
  text-align: center;
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
const MembersWrap = styled('div')`
  max-height: 60rem;
  overflow: auto;
  display: flex;
  @media (min-width: 993px) {
    flex-wrap: wrap;
  }
  @media (max-width: 992px) {
    max-height: 50rem;
    flex-direction: column;
  }
`;
const NoResults = styled('p')`
  color: ${RED};
  text-align: center;
  font-size: 1.4rem;
  font-family: ${MontserratRegular};
  min-height: 10rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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
export default class CardLayout extends React.Component {
  constructTitleText = () => {
    const { type } = this.props;
    switch (type) {
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
      case MEMBERS_DIRECTORY_LAYOUT:
        return <NoResults>Members not found </NoResults>;
      case ENQUIRY_DIRECTORY_LAYOUT:
        return <NoResults>Enquiry data not found </NoResults>;
      default:
        return '';
    }
  };
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
      allowedBranchInfo,
      showEmail,
      showMobile,
      onSelectMember,
      isClickable = false,
    } = this.props;
    return data.map((member, index) => {
      const {
        name,
        fatherName,
        address,
        id: memberUniqueId,
        membershipId: memberId,
        planDetailsId: planId,
        photoS3Key: profilePic,
        branchId,
        age,
        gender,
        mobileNumber: mobile,
        bloodGroup,
        mailId,
        id: uniqueId,
        isActive,
      } = member;
      const branchInfo = getBranchInfo(branchId);
      const planInfo = getPlanInfo(branchId, planId);
      const allowEdit = get(allowedBranchInfo, 'id', '') === branchId;
      return (
        <Card
          key={`member-${uniqueId}`}
          isClickable={isClickable}
          index={index}
          openPaymentPopup={openPaymentPopup}
          type={type}
          showDueColumn={showDueColumn}
          name={name}
          fatherName={fatherName}
          memberId={memberId}
          memberUniqueId={memberUniqueId}
          plan={planInfo.planName || '-'}
          profilePic={profilePic}
          branch={branchInfo.branchName || '-'}
          branchId={branchId}
          planId={planId}
          address={address}
          age={age}
          gender={gender}
          mobile={mobile}
          mailId={mailId}
          bloodGroup={bloodGroup}
          isAllowExpand={isAllowExpand}
          hideMemberId={hideMemberId}
          hidePlan={hidePlan}
          onSelectMember={onSelectMember}
          allowEdit={allowEdit}
          showEmail={showEmail}
          showMobile={showMobile}
          isActive={isActive}
        />
      );
    });
  };
  render() {
    const { data, isLoading, recordInfo } = this.props;
    return (
      <Wrap>
        <TitleAndInfo>
          <Title>{this.constructTitleText()}</Title>
          <RecordInfo>{recordInfo}</RecordInfo>
        </TitleAndInfo>

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
