import React from 'react';
import styled, { css } from 'react-emotion';
import { WHITE } from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
import { BackIcon, EditIcon, PauseIcon, ResumeIcon } from '../SpriteIcon';
import GridData from './GridData';
const Wrapper = styled('div')`
  width: 100%;
`;
const InfoBox = styled('div')`
  display: flex;
  background: ${WHITE};
  padding: 2.4rem;
  justify-content: space-between;
  box-shadow: 0px 1px 4px #a9a9a9;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
const Section1 = styled('div')`
  display: flex;
`;
const ImageWrap = styled('div')`
  width: 17rem;
  height: 17rem;
  @media (max-width: 992px) {
    width: 12rem;
    height: 12rem;
  }
  @media (max-width: 420px) {
    width: 10rem;
    height: 10rem;
  }
`;
const ProfilePic = styled('img')`
  width: 100%;
  height: 100%;
`;
const Details = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;
const Name = styled('span')`
  font-family: ${MontserratBold};
  font-size: 1.4rem;
`;
const LiWrap = styled('div')`
  display: flex;
  margin: 1rem 0;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
const Item = styled('span')`
  font-family: ${MontserratRegular};
  opacity: 0.5;
  font-size: 1.4rem;
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;
const Smallbox = styled('div')`
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  margin: 0 0.5rem;
  border-radius: 4px;
  padding: 1rem;
  @media (max-width: 992px) {
    min-width: 12rem;
  }
`;
const Title = styled('span')`
  font-family: ${MontserratRegular};
  opacity: 0.5;
  font-size: 1.4rem;
  text-transform: capitalize;
  text-align: center;
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;
const Value = styled('span')`
  font-family: ${MontserratRegular};
  font-size: 1.4rem;
  margin: 0.5rem 0;
  text-align: center;
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;
const BoxWrap = styled('div')`
  display: flex;
  max-width: 45rem;
  overflow: auto;
  margin-top: 1rem;
`;
const Heading = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;
const Controls = styled('div')`
  display: flex;
  width: 6rem;
  justify-content: space-between;
  @media (min-width: 993px) {
    display: none;
  }
`;
const Section2 = styled('div')`
  display: flex;
`;
const IconButtonWrap = styled('div')`
  display: flex;
  cursor: pointer;
  margin: 0 1rem;
  @media (max-width: 992px) {
    display: none;
  }
`;
const CTA = styled('span')`
  margin-left: 1rem;
  font-size: 1.4rem;
  font-family: ${MontserratRegular};
`;
const FeesAndHistoryWrap = styled('div')`
  display: flex;
  justify-content: space-between;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
class MemberProfile extends React.Component {
  componentDidMount() {
    const { getFeeDetails = () => {}, memberUniqueId } = this.props;
    if (getFeeDetails) getFeeDetails(memberUniqueId);
  }
  constructBoxes = () => {
    const { branch, memberId, plan, memberUniqueId } = this.props;
    const obj = { branch, memberId, plan };
    const keys = Object.keys(obj);
    return keys.map((key) => {
      return (
        obj[key] && (
          <Smallbox key={`smallbox-${memberUniqueId}-${key}`}>
            <Title>{key}</Title>
            <Value>{obj[key]}</Value>
          </Smallbox>
        )
      );
    });
  };
  onEditMember = () => {
    const {
      onEditMember = () => {},
      memberId,
      memberUniqueId,
      name,
      profilePic,
      plan,
      branch,
      branchId,
      planId,
      due,
      age,
      gender,
      mailId,
      mobile,
      address,
      fatherName,
      bloodGroup,
    } = this.props;

    onEditMember({
      memberId,
      memberUniqueId,
      name,
      profilePic,
      plan,
      branch,
      branchId,
      planId,
      due,
      age,
      gender,
      mailId,
      mobile,
      address,
      fatherName,
      bloodGroup,
    });
  };
  render() {
    const {
      name,
      mobile,
      email,
      memberUniqueId,
      isActive,
      updateMembershipStatus,
      onBack,
      selectMemberFeeDetails,
    } = this.props;
    const memberFeeDetails = selectMemberFeeDetails(memberUniqueId);
    const {
      isLoading = true,
      isError = false,
      isLoaded = false,
      feesHistory = [],
    } = memberFeeDetails;
    return (
      <Wrapper>
        <Heading>
          <BackIcon onClick={onBack} />
          <Controls>
            <EditIcon onClick={this.onEditMember} />
            {isActive ? (
              <PauseIcon onClick={updateMembershipStatus} />
            ) : (
              <ResumeIcon onClick={updateMembershipStatus} />
            )}
          </Controls>
        </Heading>
        <InfoBox>
          <Section1>
            <ImageWrap>
              <ProfilePic src="https://www.dmarge.com/wp-content/uploads/2017/03/chevron.jpg" />
            </ImageWrap>
            <Details>
              <Name>{name}</Name>
              <LiWrap>
                <Item>{mobile} </Item>
                {mobile && email && (
                  <Item
                    className={css`
                      margin: 0 0.5rem;
                      @media (max-width: 992px) {
                        display: none;
                      }
                    `}
                  >
                    |{' '}
                  </Item>
                )}
                <Item> {email}</Item>
              </LiWrap>
              <BoxWrap
                className={css`
                  @media (max-width: 992px) {
                    display: none;
                  }
                `}
              >
                {this.constructBoxes()}
              </BoxWrap>
            </Details>
          </Section1>
          <Section2>
            <IconButtonWrap onClick={this.onEditMember}>
              <EditIcon />
              <CTA>Edit Details</CTA>
            </IconButtonWrap>
            <IconButtonWrap onClick={updateMembershipStatus}>
              {isActive ? <PauseIcon /> : <ResumeIcon />}
              <CTA>{isActive ? 'Pause Membership' : 'Resume Membership'}</CTA>
            </IconButtonWrap>
            <BoxWrap
              className={css`
                margin: 1rem 0;
                @media (min-width: 993px) {
                  display: none;
                }
              `}
            >
              {this.constructBoxes()}
            </BoxWrap>
          </Section2>
        </InfoBox>
        <FeesAndHistoryWrap>
          <GridData
            key={`${memberUniqueId}-fees-data`}
            memberUniqueId={memberUniqueId}
            isLoaded={isLoaded}
            isError={isError}
            isLoading={isLoading}
            data={feesHistory}
          />
          <GridData
            showHistory
            key={`${memberUniqueId}-history-data`}
            memberUniqueId={memberUniqueId}
            isLoaded={isLoaded}
            isError={isError}
            isLoading={isLoading}
            data={feesHistory}
          />
        </FeesAndHistoryWrap>
      </Wrapper>
    );
  }
}
export default MemberProfile;
