import React from 'react';
import styled, { css } from 'react-emotion';
import { PROFILE_PLACEHOLDER, WHITE } from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
import { get } from '../../utils/helpers';
import Image from '../Image';
import PaymentPopup from '../PaymentPopup';
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
    width: 7rem;
    height: 7rem;
  }
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
  @media (max-width: 360px) {
    font-size: 1rem;
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
  @media (max-width: 360px) {
    font-size: 1rem;
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
  constructor(props) {
    super(props);
    const { planName, amount } =
      props.entirePlanDetails[this.findPlanIndex()] || {};
    this.state = {
      showPaymentPopup: false,
      currentPlan: {
        id: props.planId,
        index: this.findPlanIndex(),
        amount: amount,
        name: planName,
      },
      dueDate: {
        value: this.setTodayDate(),
        type: 'dueDate',
        error: false,
        dirty: false,
      },
    };
  }
  setTodayDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  findPlanIndex = () => {
    const { entirePlanDetails, planId } = this.props;
    let index = -1;
    for (let i = 0; i < entirePlanDetails.length; i += 1) {
      if (entirePlanDetails[i].id === planId) {
        index = i;
        break;
      }
    }
    return index;
  };
  componentDidMount() {
    const { getFeeDetails = () => {}, memberUniqueId } = this.props;
    if (getFeeDetails) getFeeDetails(memberUniqueId);
  }
  constructBoxes = () => {
    const { branch, memberId, plan, memberUniqueId, bloodGroup } = this.props;
    const obj = { branch, memberId, plan, bloodGroup };
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
  closePaymentPopup = () => {
    this.setState({
      showPaymentPopup: false,
    });
  };
  updatePlanIdWhilePayment = ({ index, id, amount, planName }) => {
    this.setState({
      currentPlan: {
        id,
        index,
        amount,
        name: planName,
      },
    });
  };
  findIsAllowedToChange = () => {
    const { branchId, branchDetails } = this.props;
    const reqdBranch = branchDetails.filter((branch) => branch.id === branchId);
    let isAllowedToChange = get(reqdBranch, '[0].isWriteAllowed', false);
    return isAllowedToChange;
  };
  render() {
    const { showPaymentPopup, currentPlan, dueDate } = this.state;
    const isAllowedToChange = this.findIsAllowedToChange();
    const {
      name,
      mobile,
      mailId,
      memberUniqueId,
      profilePic,
      isActive,
      updateMembershipStatus,
      onBack,
      planDetails,
      entirePlanDetails,
      selectMemberFeeDetails,
      onPayFee,
    } = this.props;
    const memberFeeDetails = selectMemberFeeDetails(memberUniqueId);
    const {
      isLoading = true,
      isError = false,
      isLoaded = false,
      feesHistory = [],
    } = memberFeeDetails;
    const feeDuesData = feesHistory.filter((info) => !info.nextDuePaidOn);
    const historyData = feesHistory;
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
              <Image src={profilePic} />
            </ImageWrap>
            <Details>
              <Name>{name}</Name>
              <LiWrap>
                <Item>{mobile} </Item>
                {mobile && mailId && (
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
                <Item
                  className={css`
                    @media (max-width: 360px) {
                      font-size: 1rem;
                    }
                  `}
                >
                  {' '}
                  {mailId}
                </Item>
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
          {isAllowedToChange && (
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
          )}
        </InfoBox>
        <FeesAndHistoryWrap>
          <GridData
            key={`${memberUniqueId}-fees-data`}
            memberUniqueId={memberUniqueId}
            isLoaded={isLoaded}
            isError={isError}
            isLoading={isLoading}
            data={feeDuesData}
            headingInfo={['Fees', 'Due Date', 'dummy']}
            onPay={() => {
              this.setState({
                showPaymentPopup: true,
              });
            }}
            isAllowedToChange={isAllowedToChange}
          />
          <GridData
            showHistory
            key={`${memberUniqueId}-history-data`}
            memberUniqueId={memberUniqueId}
            isLoaded={isLoaded}
            isError={isError}
            isLoading={isLoading}
            data={historyData}
          />
        </FeesAndHistoryWrap>
        <PaymentPopup
          name={name}
          open={showPaymentPopup}
          planDetails={planDetails}
          entirePlanDetails={entirePlanDetails}
          planId={currentPlan.id}
          selectedPlan={currentPlan.index}
          feeAmount={currentPlan.amount}
          updatePlanIdWhilePayment={this.updatePlanIdWhilePayment}
          dueDate={dueDate}
          onDueDateChange={(data) => {
            this.setState({
              ...data,
            });
          }}
          onPay={() => {
            const { dueDate } = this.state;
            if (dueDate.error || !dueDate.value) {
              this.setState({
                dueDate: {
                  ...dueDate,
                  error: true,
                },
              });
              return;
            }
            onPayFee({
              currentPlan,
              memberUniqueId,
              paidDate: dueDate.value,
              successCallback: () => this.closePaymentPopup(),
              failureCallback: () => this.closePaymentPopup(),
            });
          }}
          onClose={() => this.closePaymentPopup()}
        />
      </Wrapper>
    );
  }
}
export default MemberProfile;
