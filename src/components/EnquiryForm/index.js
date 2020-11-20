import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { GREEN, SECONDARY_BLACK, WHITE } from '../../constants';
import Button, { InvertSecondaryButton } from '../Button';
import DropDown from '../Dropdown/Loadable';
import Input from '../Input';
import { addEnquiry } from '../../containers/EnquiryDirectory/actions';
import { ENQUIRY_DIRECTORY_ROUTE } from '../../routes';
import { BackIcon } from '../SpriteIcon';
import EllipsisLoader from '../EllipsisLoader';
const Wrap = styled('div')`
  width: 100%;
  padding: 0 6.4rem;
  padding-top: 2.4rem;
  display: flex;
  position: relative;
  justify-content: center;
  @media (max-width: 992px) {
    padding: 0 2.4rem;
    padding-top: 5.5rem;
  }
`;
const Content = styled('div')`
  background: ${WHITE};
  box-shadow: 0px 1px 4px #a9a9a9;
  padding: 3.2rem;
  @media (max-width: 360px) {
    max-width: 28rem;
  }
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
  @media (max-width: 360px) {
    width: 22rem;
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
const BackWrap = styled('div')`
  margin: 1rem 0;
  position: absolute;
  top: 0rem;
  left: 2rem;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
    top: 5rem;
    left: 3rem;
  }
`;
const LoaderWrap = styled('div')`
  max-height: 4.4rem;
  display: flex;
  align-items: center;
  border: 1px solid ${GREEN};
  margin-left: 2rem;
  width: 10rem;
  justify-content: center;
`;
export default class EnquiryForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.showHeaderHandle(); // to show the header
    this.state = {
      isSubmitting: false,
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
    const keys = ['name', 'mobile'];
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
      } else if (this.state[key].error || this.state['email'].error) {
        isError = true;
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
  onCancel = () => {
    this.props.history.push(ENQUIRY_DIRECTORY_ROUTE);
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
        // submit data
        this.setState({
          isSubmitting: true,
        });
        this.props.dispatch(
          addEnquiry({
            name: name.value,
            mailId: email.value,
            mobileNumber: mobile.value,
            branchId: this.getBranchInfoUsingId(branch.selectedItemIndex).id,
            successCallback: () => {
              this.resetState();
              this.onCancel();
              this.setState({
                isSubmitting: false,
              });
            },
            failureCallback: () => {
              this.setState({
                isSubmitting: false,
              });
            },
          }),
        );
      }
    }
  };
  render() {
    const { name, email, mobile, branch, isSubmitting = false } = this.state;
    return (
      <Wrap>
        <BackWrap>
          <BackIcon onClick={this.onCancel} />
        </BackWrap>
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
                  onBlurHandler={this.onBlurHandler}
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
                  onBlurHandler={this.onBlurHandler}
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
                  onBlurHandler={this.onBlurHandler}
                />
              </InputWrap>
              <InputWrap>
                <Label>Branch</Label>
                <DropDown
                  className={css`
                    > div {
                      border-bottom: 1px solid ${SECONDARY_BLACK};
                    }
                  `}
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
            <Cancel onClick={this.onCancel}>Cancel</Cancel>
            {isSubmitting ? (
              <LoaderWrap>
                <EllipsisLoader />
              </LoaderWrap>
            ) : (
              <Add onClick={this.onAddEnquiry}>Add</Add>
            )}
          </Controls>
        </Content>
      </Wrap>
    );
  }
}
EnquiryForm.propTypes = {
  branchDetails: PropTypes.array,
};
