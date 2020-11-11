import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { WHITE } from '../../constants';
import Button, { InvertSecondaryButton } from '../Button';
import DropDown from '../Dropdown/Loadable';
import Input from '../Input';
import { addEnquiry } from '../../containers/EnquiryDirectory/actions';
import { DASHBOARD_ROUTE } from '../../routes';
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
`;
const InputWrap = styled('div')`
  margin: 0.8rem 0;
`;
const CommonInput = styled(Input)`
  width: 35rem;
  @media (max-width: 992px) {
    width: 25rem;
  }
`;
const NameInput = styled(CommonInput)``;
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
const Add = styled(Button)`
  margin-left: 2.4rem;
  font-size: 1.4rem;
  max-width: 10rem;
`;
const Cancel = styled(InvertSecondaryButton)`
  font-size: 1.4rem;
  max-width: 10rem;
`;
export default class EnquiryForm extends React.Component {
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
      branch: {
        selectedItemIndex: -1,
        showError: false,
      },
    };
  }
  onValueChange = (data) => {
    this.setState(data);
  };
  onSelectDropdown = (index, name) => {
    this.setState({
      [name]: {
        selectedItemIndex: index,
        showError: false,
      },
    });
  };
  validateInputs = () => {
    const keys = ['name', 'email', 'mobile'];
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
  getBranchNames = () => {
    const { branchDetails } = this.props;
    return branchDetails.map((branch) => branch.branchName);
  };
  getBranchInfoUsingId = (index) => {
    const { branchDetails } = this.props;
    const reqBranch =
      branchDetails.filter(
        (branch) => branch.id === this.state.branch.selectedItemIndex,
      ) || {};
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
      branch: {
        selectedItemIndex: -1,
        showError: false,
      },
    });
  };
  onAddEnquiry = () => {
    const { name, mobile, email, branch } = this.state;
    const { isError, state } = this.validateInputs();
    this.setState(state);
    if (branch.selectedItemIndex < 0) {
      this.setState({
        branch: {
          ...branch,
          showError: true,
        },
      });
    }
    if (!isError) {
      if (branch.selectedItemIndex >= 0) {
        console.log('ready to submit', branch);
        // submit data
        this.props.dispatch(
          addEnquiry({
            name: name.value,
            mailId: email.value,
            mobileNumber: mobile.value,
            branchId: this.getBranchInfoUsingId(branch.selectedItemIndex)
              .branchId,
            successCallback: this.resetState,
          }),
        );
      }
    }
  };
  render() {
    const { name, email, mobile, branch } = this.state;
    return (
      <Wrap>
        <Content>
          <Title> New Enquiry</Title>
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
                <Label>Email</Label>
                <EmailInput
                  state={email}
                  name="email"
                  onValueChange={this.onValueChange}
                  showError={email.error}
                  errorText="Invalid email"
                />
              </InputWrap>
            </Column>
            <Column>
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
                <Label>Branch</Label>
                <DropDown
                  name="branch"
                  listItems={this.getBranchNames()}
                  placeholder=""
                  activeItem={branch.selectedItemIndex}
                  onSelect={this.onSelectDropdown}
                  showError={branch.showError}
                  errorText="Please select branch"
                />
              </InputWrap>
            </Column>
          </Row>
          <Controls>
            <Cancel onClick={() => this.props.history.push(DASHBOARD_ROUTE)}>
              Cancel
            </Cancel>
            <Add onClick={this.onAddEnquiry}>Add</Add>
          </Controls>
        </Content>
      </Wrap>
    );
  }
}
EnquiryForm.propTypes = {
  branchDetails: PropTypes.array,
};
