import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import {
  BLOOD_GROUP_DATA,
  GENDER,
  PRIMARY_COLOR,
  RED,
  RUPEE_SYMBOL,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import Button, { InvertSecondaryButton } from '../Button';
import DropDown from '../Dropdown/Loadable';
import Input from '../Input';
import UploadImage from '../UploadImage';
import { MontserratLight, MontserratRegular } from '../../utils/fonts';
import { BackIcon } from '../SpriteIcon';
const Wrap = styled('div')`
  width: 100%;
  margin-top: 2.4rem;
  padding: 0 6.4rem;
  padding-top: 2.4rem;
  display: flex;
  justify-content: center;
  position: relative;
  @media (max-width: 992px) {
    margin-top: 3rem;
    padding: 0 2.4rem;
    padding-top: 1.2rem;
  }
`;
const Content = styled('div')`
  background: ${WHITE};
  box-shadow: 0px 1px 4px #a9a9a9;
  padding: 3.2rem;
`;
const Title = styled('div')`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 2.4rem;
  font-family: ${MontserratLight};
`;
const Row = styled('div')`
  display: flex;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
const Column = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;
const Label = styled('label')`
  opacity: 0.6;
  font-family: ${MontserratLight};
`;
const InputWrap = styled('div')`
  margin: 0.8rem 0;
`;
const CommonInput = styled(Input)`
  @media (min-width: 993px) {
    width: 40rem;
  }
`;
const NameInput = styled(CommonInput)``;
const FatherNameInput = styled(CommonInput)``;
const AgeInput = styled(CommonInput)``;

const MobileInput = styled(CommonInput)``;
const EmailInput = styled(CommonInput)``;
const JoiningDateInput = styled(CommonInput)``;

const Controls = styled('div')`
  display: flex;
  margin: 2.4rem 0 0;
  justify-content: center;
  @media (max-width: 992px) {
    margin: 3.4rem 0 0;
  }
`;
const Register = styled(Button)`
  margin-left: 2.4rem;
  font-size: 1.4rem;
  max-width: 10rem;
`;
const Cancel = styled(InvertSecondaryButton)`
  font-size: 1.4rem;
  max-width: 10rem;
  box-shadow: none;
`;
const Address = styled('textarea')`
  resize: none;
  border: 1px solid ${SECONDARY_BLACK};
  padding: 1rem 0.5rem;
  &:focus {
    border: 1px solid ${SECONDARY_BLACK};
  }
  margin-top: 0.5rem;
  @media (min-width: 993px) {
    height: 10rem;
  }
`;
const Error = styled('div')`
  color: ${RED};
`;
const BackWrap = styled('div')`
  margin: 1rem 0;
  position: absolute;
  top: -2rem;
  left: 0;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;
const Note = styled('p')`
  color: ${PRIMARY_COLOR};
  font-size: 1.4rem;
  padding: 1rem;
  font-family: ${MontserratRegular};
  @media (max-width: 992px) {
    padding: 2.4rem 1rem;
  }
`;
const Splitup = styled('span')`
  color: ${PRIMARY_COLOR};
`;
const Asterik = styled('span')`
  color: ${RED};
`;
export default class RegisterNewMember extends React.Component {
  constructor(props) {
    super(props);
    this.props.showHeaderHandle(); // to show the header
  }
  getTotalAmount = () => {
    const { entirePlanDetails, plan, registerAmount, type } = this.props;
    if (type !== 'REGISTER') return 0;

    if (plan.selectedItemIndex >= 0) {
      const newRegisterAmount =
        entirePlanDetails[plan.selectedItemIndex].planName === 'Monthly'
          ? parseInt(registerAmount, 10)
          : 0;
      return (
        newRegisterAmount +
        parseInt(entirePlanDetails[plan.selectedItemIndex].amount, 10)
      );
    }
    return 0;
  };

  getFeeSplitup = () => {
    const { entirePlanDetails, plan, registerAmount, type } = this.props;
    if (type !== 'REGISTER') return '';

    if (plan.selectedItemIndex >= 0) {
      const newRegisterAmount =
        entirePlanDetails[plan.selectedItemIndex].planName === 'Monthly'
          ? parseInt(registerAmount, 10)
          : 0;
      if (!newRegisterAmount) return '';
      return (
        <Splitup>
          (Regtr.amount = {RUPEE_SYMBOL}
          {newRegisterAmount}+ Fee amount = {RUPEE_SYMBOL}
          {parseInt(entirePlanDetails[plan.selectedItemIndex].amount, 10)})
        </Splitup>
      );
    }
    return '';
  };

  render() {
    const {
      type,
      memberId,
      name,
      fatherName,
      age,
      email,
      joiningDate,
      mobile,
      plan,
      gender,
      bloodGroup,
      branch,
      images,
      address,
      getBranchNames,
      getPlanDetails,
      onValueChange,
      onSelectDropdown,
      typeAddress,
      chooseImage,
      onRegister,
      onEdit,
      onCancel,
      hideBackButton = false,
    } = this.props;
    const feeAmount = this.getTotalAmount();

    return (
      <Wrap>
        {!hideBackButton && (
          <BackWrap>
            <BackIcon onClick={onCancel} />
          </BackWrap>
        )}
        <Content>
          <Title>
            {type === 'REGISTER' ? 'Register New Member' : 'Edit Details'}
          </Title>
          <Row>
            <Column>
              <InputWrap>
                <Label>
                  Member id {type === 'REGISTER' && <Asterik>*</Asterik>}
                </Label>
                <NameInput
                  state={memberId}
                  name="memberId"
                  onValueChange={onValueChange}
                  showError={memberId.error}
                  errorText="Invalid memberId"
                  readOnly={type !== 'REGISTER'}
                  validateOnType={false}
                />
              </InputWrap>
              <InputWrap>
                <Label>
                  Name {type === 'REGISTER' && <Asterik>*</Asterik>}
                </Label>
                <NameInput
                  state={name}
                  name="name"
                  onValueChange={onValueChange}
                  showError={name.error}
                  errorText="Invalid name"
                  validateOnType={false}
                />
              </InputWrap>
              <InputWrap>
                <Label>
                  Father Name {type === 'REGISTER' && <Asterik>*</Asterik>}
                </Label>
                <FatherNameInput
                  state={fatherName}
                  name="fatherName"
                  onValueChange={onValueChange}
                  showError={fatherName.error}
                  errorText="Invalid Father's Name"
                  validateOnType={false}
                />
              </InputWrap>
              <InputWrap>
                <Label>
                  Branch
                  {type === 'REGISTER' && <Asterik>*</Asterik>}
                </Label>
                <DropDown
                  className={css`
                    > div {
                      border-bottom: 1px solid ${SECONDARY_BLACK};
                    }
                  `}
                  name="branch"
                  listItems={getBranchNames()}
                  placeholder="Select branch"
                  activeItem={branch.selectedItemIndex}
                  onSelect={onSelectDropdown}
                  showError={branch.showError}
                  disable={type === 'EDIT' && branch.selectedItemIndex >= 0}
                />
              </InputWrap>
              <InputWrap>
                <Label>
                  Gender {type === 'REGISTER' && <Asterik>*</Asterik>}
                </Label>
                <DropDown
                  className={css`
                    > div {
                      border-bottom: 1px solid ${SECONDARY_BLACK};
                    }
                  `}
                  name="gender"
                  listItems={GENDER}
                  placeholder="Select gender"
                  activeItem={gender.selectedItemIndex}
                  onSelect={onSelectDropdown}
                  showError={gender.showError}
                />
              </InputWrap>
              <InputWrap>
                <Label>Email</Label>
                <EmailInput
                  state={email}
                  name="email"
                  onValueChange={onValueChange}
                  showError={email.error}
                  errorText="Invalid email"
                  validateOnType={false}
                />
              </InputWrap>
              <InputWrap
                className={css`
                  display: flex;
                  flex-direction: column;
              }
              `}
              >
                <Label>
                  Address {type === 'REGISTER' && <Asterik>*</Asterik>}
                </Label>
                <Address onChange={typeAddress}>{address.value}</Address>
                {address.error && <Error>Invalid address</Error>}
              </InputWrap>
            </Column>
            <Column>
              <InputWrap>
                <Label>Age {type === 'REGISTER' && <Asterik>*</Asterik>}</Label>
                <AgeInput
                  state={age}
                  name="age"
                  onValueChange={onValueChange}
                  showError={age.error}
                  errorText="Invalid age"
                  validateOnType={false}
                />
              </InputWrap>
              <InputWrap>
                <Label>
                  Mobile {type === 'REGISTER' && <Asterik>*</Asterik>}
                </Label>
                <MobileInput
                  state={mobile}
                  name="mobile"
                  onValueChange={onValueChange}
                  showError={mobile.error}
                  errorText="Invalid mobile number"
                  validateOnType={false}
                />
              </InputWrap>

              <InputWrap>
                <Label>Blood group</Label>
                <DropDown
                  className={css`
                    > div {
                      border-bottom: 1px solid ${SECONDARY_BLACK};
                    }
                  `}
                  name="bloodGroup"
                  listItems={BLOOD_GROUP_DATA}
                  placeholder="Select blood group"
                  activeItem={bloodGroup.selectedItemIndex}
                  onSelect={onSelectDropdown}
                  showError={bloodGroup.showError}
                />
              </InputWrap>
              <InputWrap>
                <Label>
                  Plan {type === 'REGISTER' && <Asterik>*</Asterik>}
                </Label>
                <DropDown
                  className={css`
                    > div {
                      border-bottom: 1px solid ${SECONDARY_BLACK};
                    }
                  `}
                  name="plan"
                  listItems={getPlanDetails()}
                  placeholder="Select plan"
                  activeItem={plan.selectedItemIndex}
                  onSelect={onSelectDropdown}
                  showError={plan.showError}
                />
              </InputWrap>
              <InputWrap>
                <Label>Joining date</Label>
                <JoiningDateInput
                  state={joiningDate}
                  name="joiningDate"
                  onValueChange={onValueChange}
                  showError={joiningDate.error}
                  errorText="Invalid date format"
                  placeholder="DD-MM-YYYY"
                  validateOnType={false}
                />
              </InputWrap>
              <UploadImage images={images} chooseImage={chooseImage} />
            </Column>
          </Row>
          {feeAmount > 0 && (
            <Note>
              Amount to be paid {`${RUPEE_SYMBOL}${feeAmount}`}
              {this.getFeeSplitup()}
            </Note>
          )}
          <Controls>
            <Cancel onClick={onCancel}>Cancel</Cancel>
            <Register onClick={type === 'REGISTER' ? onRegister : onEdit}>
              {type === 'REGISTER' ? 'Register' : 'Save'}
            </Register>
          </Controls>
        </Content>
      </Wrap>
    );
  }
}
RegisterNewMember.propTypes = {
  branchDetails: PropTypes.array,
};
