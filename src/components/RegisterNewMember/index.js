import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import {
  BLOOD_GROUP_DATA,
  GENDER,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import Button, { InvertSecondaryButton, SecondaryButton } from '../Button';
import DropDown from '../Dropdown/Loadable';
import Input from '../Input';
import UploadImage from '../UploadImage';
import { addNewMember } from '../../containers/MembersDirectory/actions';
import {
  MontserratLight,
  OpensansBold,
  OpensansRegular,
} from '../../utils/fonts';
const Wrap = styled('div')`
  width: 100%;
  margin-top: 6.4rem;
  padding: 0 6.4rem;
  padding-top: 2.4rem;
  display: flex;
  justify-content: center;
  @media (max-width: 992px) {
    margin-top: 4rem;
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
export default class RegisterNewMember extends React.Component {
  constructor(props) {
    super(props);
    this.props.showHeaderHandle(); // to show the header
    this.state = {
      name: {
        value: '',
        dirty: false,
        error: false,
        type: 'firstname',
      },
      fatherName: { value: '', dirty: false, error: false, type: 'firstname' },
      age: {
        value: '',
        dirty: false,
        error: false,
        type: 'age',
      },
      mobile: {
        value: '',
        dirty: false,
        error: false,
        type: 'mobile',
      },
      email: {
        value: '',
        dirty: false,
        error: false,
        type: 'email',
      },
      plan: {
        selectedItemIndex: -1,
        showError: false,
      },
      gender: {
        selectedItemIndex: -1,
        showError: false,
      },
      branch: {
        selectedItemIndex: -1,
        showError: false,
      },
      bloodGroup: {
        selectedItemIndex: -1,
        showError: false,
      },
      address: {
        value: '',
        error: false,
      },
      images: [],
    };
  }
  onValueChange = (data) => {
    this.setState(data);
  };
  onSelectDropdown = (index, name) => {
    this.setState({
      [name]: {
        selectedItemIndex: index,
      },
      ...(name === 'branch' && {
        plan: {
          selectedItemIndex: -1,
          showError: false,
        },
      }),
    });
  };
  getPlanDetails = () => {
    const { branch } = this.state;
    const branchIndex = branch.selectedItemIndex;
    const { branchDetails } = this.props;
    if (branchIndex >= 0)
      return branchDetails[branchIndex].planDetails.map(
        (plan) => plan.planName,
      );
    return [];
  };
  getBranchNames = () => {
    const { branchDetails } = this.props;
    return branchDetails.map((branch) => branch.branchName);
  };
  readFile = async (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.readAsArrayBuffer(file);
    });

  chooseImage = async ({ srcs, files }) => {
    let newImageData = [];
    for (let i = 0, len = srcs.length; i < len; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const bufferData = await this.readFile(files[i]);
      newImageData.push({
        src: srcs[i],
        imageFile: files[i],
        bufferData,
      });
    }
    this.setState({
      images: newImageData,
    });
  };
  validateInputs = () => {
    const keys = ['name', 'email', 'mobile', 'age', 'fatherName', 'address'];
    let oldState = { ...this.state };
    let isError = false;
    keys.map((key) => {
      if (!this.state[key].value) {
        isError = true;
        const keyData = oldState[key];
        oldState = {
          ...oldState,
          [key]: {
            ...keyData,
            error: true,
          },
        };
      }
    });
    return {
      isError,
      state: oldState,
    };
  };
  validateDropdownData = () => {
    const { branch, plan, gender, bloodGroup } = this.state;
    let isError = false;
    if (
      branch.selectedItemIndex < 0 ||
      plan.selectedItemIndex < 0 ||
      gender.selectedItemIndex < 0 ||
      bloodGroup.selectedItemIndex < 0
    ) {
      isError = true;
      this.setState({
        branch: {
          ...branch,
          showError: branch.selectedItemIndex < 0,
        },
        plan: {
          ...plan,
          showError: plan.selectedItemIndex < 0,
        },
        gender: {
          ...gender,
          showError: gender.selectedItemIndex < 0,
        },
        bloodGroup: {
          ...bloodGroup,
          showError: bloodGroup.selectedItemIndex < 0,
        },
      });
    }
    return isError;
  };
  getBranchInfoUsingId = (index) => {
    const { branchDetails } = this.props;
    const reqBranch = branchDetails[index];
    return {
      ...reqBranch,
    };
  };
  resetState = () => {
    this.setState({
      name: {
        value: '',
        dirty: false,
        error: false,
        type: 'firstname',
      },
      fatherName: { value: '', dirty: false, error: false, type: 'firstname' },
      age: {
        value: '',
        dirty: false,
        error: false,
        type: 'age',
      },
      mobile: {
        value: '',
        dirty: false,
        error: false,
        type: 'mobile',
      },
      email: {
        value: '',
        dirty: false,
        error: false,
        type: 'email',
      },
      plan: {
        selectedItemIndex: -1,
        showError: false,
      },
      gender: {
        selectedItemIndex: -1,
        showError: false,
      },
      branch: {
        selectedItemIndex: -1,
        showError: false,
      },
      bloodGroup: {
        selectedItemIndex: -1,
        showError: false,
      },
      address: {
        value: '',
        error: false,
      },
      images: [],
    });
  };
  typeAddress = (e) => {
    const value = e.target.value;
    this.setState({
      address: {
        value,
        error: false,
      },
    });
  };
  onRegister = () => {
    const { isError, state } = this.validateInputs();
    this.setState(state);
    const isError2 = this.validateDropdownData();
    if (isError || isError2) {
      return;
    }
    const {
      name,
      mobile,
      email,
      age,
      branch,
      plan,
      gender,
      bloodGroup,
    } = this.state;
    this.props.dispatch(
      addNewMember({
        name: name.value,
        mobileNumber: mobile.value,
        mailId: email.value,
        age: age.value,
        gender: GENDER[gender.selectedItemIndex],
        plan: this.getPlanDetails[plan.selectedItemIndex],
        bloodGroup: BLOOD_GROUP_DATA[bloodGroup.selectedItemIndex],
        branchId: this.getBranchInfoUsingId(branch.selectedItemIndex).id,
        successCallback: () => {
          this.resetState();
        },
      }),
    );

    console.log('Ready to submit');

    // ready to submit
  };
  render() {
    const {
      name,
      fatherName,
      age,
      email,
      mobile,
      plan,
      gender,
      bloodGroup,
      branch,
      images,
      address,
    } = this.state;
    console.log('Member', this.props, this.state, this.getPlanDetails());
    return (
      <Wrap>
        <Content>
          <Title>Register New Member</Title>
          <Row>
            <Column>
              <InputWrap>
                <Label>Name</Label>
                <NameInput
                  state={name}
                  name="name"
                  onValueChange={this.onValueChange}
                  showError={name.error}
                  errorText="Invalid name"
                />
              </InputWrap>
              <InputWrap>
                <Label>Father Name</Label>
                <FatherNameInput
                  state={fatherName}
                  name="name"
                  onValueChange={this.onValueChange}
                  showError={name.error}
                  errorText="Invalid Father's Name"
                />
              </InputWrap>
              <InputWrap>
                <Label>Branch</Label>
                <DropDown
                  name="branch"
                  listItems={this.getBranchNames()}
                  placeholder="Select branch"
                  activeItem={branch.selectedItemIndex}
                  onSelect={this.onSelectDropdown}
                  showError={branch.showError}
                />
              </InputWrap>
              <InputWrap>
                <Label>Gender</Label>
                <DropDown
                  name="gender"
                  listItems={GENDER}
                  placeholder="Select gender"
                  activeItem={gender.selectedItemIndex}
                  onSelect={this.onSelectDropdown}
                  showError={gender.showError}
                />
              </InputWrap>
              <InputWrap>
                <Label>Email</Label>
                <EmailInput
                  state={email}
                  name="email"
                  onValueChange={this.onValueChange}
                  showError={email.error}
                  errorText="Invalid email"
                />
              </InputWrap>
              <InputWrap
                className={css`
                  display: flex;
                  flex-direction: column;
              }
              `}
              >
                <Label>Address</Label>
                <Address onChange={this.typeAddress}>{address.value}</Address>
                {address.error && <Error>Invalid address</Error>}
              </InputWrap>
            </Column>
            <Column>
              <InputWrap>
                <Label>Age</Label>
                <AgeInput
                  state={age}
                  name="age"
                  onValueChange={this.onValueChange}
                  showError={age.error}
                  errorText="Invalid age"
                />
              </InputWrap>
              <InputWrap>
                <Label>Mobile</Label>
                <MobileInput
                  state={mobile}
                  name="mobile"
                  onValueChange={this.onValueChange}
                  showError={mobile.error}
                  errorText="Invalid mobile number"
                />
              </InputWrap>
              <InputWrap>
                <Label>Plan</Label>
                <DropDown
                  name="plan"
                  listItems={this.getPlanDetails()}
                  placeholder="Select plan"
                  activeItem={plan.selectedItemIndex}
                  onSelect={this.onSelectDropdown}
                  showError={plan.showError}
                />
              </InputWrap>
              <InputWrap>
                <Label>Blood group</Label>
                <DropDown
                  name="bloodGroup"
                  listItems={BLOOD_GROUP_DATA}
                  placeholder="Select blood group"
                  activeItem={bloodGroup.selectedItemIndex}
                  onSelect={this.onSelectDropdown}
                  showError={bloodGroup.showError}
                />
              </InputWrap>
              <UploadImage images={images} chooseImage={this.chooseImage} />
            </Column>
          </Row>
          <Controls>
            <Cancel onClick={() => this.props.history.push(DASHBOARD_ROUTE)}>
              Cancel
            </Cancel>
            <Register onClick={this.onRegister}>Register</Register>
          </Controls>
        </Content>
      </Wrap>
    );
  }
}
RegisterNewMember.propTypes = {
  branchDetails: PropTypes.array,
};
