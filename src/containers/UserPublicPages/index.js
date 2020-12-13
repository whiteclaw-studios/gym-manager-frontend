import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { BLOOD_GROUP_DATA, GENDER } from '../../constants';
import { get, validateFields } from '../../utils/helpers';
import { addNewMember, getSpecificBranchInfo } from './actions';
import { selectUserPagesData } from '../../selectors';
import SplashScreen from '../../components/SplashScreen';
const Wrap = styled('div')`
  width: 100%;
  padding: 0 6.4rem;
  padding-top: 2.4rem;
  @media (max-width: 992px) {
    margin-top: 4rem;
    padding: 0 2.4rem;
    padding-top: 1.2rem;
  }
`;
class UserPublicPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        dirty: false,
        error: false,
        type: 'firstname',
      },
      memberId: { value: '', dirty: false, error: false, type: 'memberId' },
      memberUniqueId: '',
      fatherName: {
        value: '',
        dirty: false,
        error: false,
        type: 'firstname',
      },
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
      images: [{}],
    };
  }
  getBranchNames = () => {
    const branchDetails = this.getBranchDetails();
    return branchDetails.map((branch) => branch.branchName);
  };
  getBranchDetails = () => {
    const { pageData } = this.props;
    const branchDetails = [get(pageData, 'branchInfo.data', {})];
    return branchDetails;
  };
  getPlanDetails = () => {
    const { branch } = this.state;
    const branchIndex = branch.selectedItemIndex;
    const branchDetails = this.getBranchDetails();
    if (branchIndex >= 0)
      return branchDetails[branchIndex].planDetails.map(
        (plan) => plan.planName,
      );
    return [];
  };
  getEntirePlanDetails = () => {
    const { branch } = this.state;
    const branchIndex = branch.selectedItemIndex;
    const branchDetails = this.getBranchDetails();

    if (branchIndex >= 0) return branchDetails[branchIndex].planDetails;
    return [];
  };
  getRegisterAmount = () => {
    const branchDetails = this.getBranchDetails();
    const { branch } = this.state;
    if (branch.selectedItemIndex >= 0) {
      return branchDetails[branch.selectedItemIndex].registrationAmount;
    }
    return 0;
  };
  onValueChange = (data) => {
    this.setState(data);
  };
  onSelectDropdown = (index, elementName) => {
    console.log('onSelect', index, elementName, this.state);
    let id = null;
    let name = null;
    let value = null;
    if (elementName === 'branch') {
      const branchDetails = this.getBranchDetails();
      const reqdBranch = branchDetails[index];

      id = reqdBranch.id;
      name = reqdBranch.branchName;
    } else if (elementName === 'plan') {
      const branchDetails = this.getBranchDetails();

      const { planDetails } =
        branchDetails[this.state.branch.selectedItemIndex] || {};
      const reqdPlan = planDetails[index];

      id = reqdPlan.id;
      name = reqdPlan.planName;
    } else if (elementName === 'gender') {
      value = GENDER[index];
    }
    this.setState({
      [elementName]: {
        ...this.state[elementName],
        selectedItemIndex: index,
        showError: index < 0,
        ...(id && { id }),
        ...(name && { name }),
        ...(value && { value }),
      },
      ...(elementName === 'branch' && {
        plan: {
          selectedItemIndex: -1,
          showError: false,
        },
      }),
    });
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
  typeAddress = (e) => {
    const value = e.target.value;
    this.setState({
      address: {
        value,
        error: false,
      },
    });
  };
  getTotalAmount = () => {
    const { plan, type } = this.state;
    const entirePlanDetails = this.getEntirePlanDetails();
    const registerAmount = this.getRegisterAmount();
    if (type !== 'REGISTER') return 0;
    if (plan.selectedItemIndex >= 0) {
      return (
        parseInt(registerAmount, 10) +
        parseInt(entirePlanDetails[plan.selectedItemIndex].amount, 10)
      );
    }
    return 0;
  };
  onRegister = () => {
    const keys = ['name', 'memberId', 'mobile', 'age', 'fatherName', 'address'];
    const { isValid, newState } = validateFields({
      state: this.state,
      fields: keys,
    });
    this.setState(newState);
    const isError2 = this.validateDropdownData();
    if (!isValid || isError2) {
      return;
    }
    const {
      name,
      memberId,
      fatherName,
      mobile,
      email,
      age,
      branch,
      plan,
      gender,
      bloodGroup,
      images,
    } = this.state;
    const feeAmount = this.getTotalAmount();
    this.props.dispatch(
      addNewMember({
        memberId: memberId.value,
        name: name.value,
        mobileNumber: mobile.value,
        mailId: email.value,
        age: age.value,
        gender: GENDER[gender.selectedItemIndex],
        planId: plan.id,
        bloodGroup: BLOOD_GROUP_DATA[bloodGroup.selectedItemIndex],
        branchId: branch.id,
        fatherName: fatherName.value,
        images,
        feeAmount,
        successCallback: () => {
          this.resetState();
        },
      }),
    );
  };
  resetState = () => {
    this.setState({
      name: {
        value: '',
        dirty: false,
        error: false,
        type: 'firstname',
      },
      memberId: { value: '', dirty: false, error: false, type: 'memberId' },
      memberUniqueId: '',
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
      images: [{}],
    });
  };
  onCancel = () => {
    this.resetState();
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
  componentDidMount() {
    const { history, dispatch } = this.props;
    let branchId = get(history, 'location.search', '');
    branchId = branchId ? branchId.split('?')[1] : '';
    console.log('userpublic page', this.props);
    if (branchId) dispatch(getSpecificBranchInfo({ branchId }));
  }
  render() {
    const { route, pageData } = this.props;
    const { isLoaded = false, data = {} } = pageData.branchInfo || {};
    const {
      memberId,
      name,
      gender,
      fatherName,
      email,
      images,
      mobile,
      bloodGroup,
      address,
      age,
      plan,
      branch,
    } = this.state;
    console.log('render', data, isLoaded);
    if (Object.keys(data).length <= 0 && isLoaded) {
      this.props.history.push('/login');
    }
    return (
      <Wrap>
        {renderRoutes(route.routes, {
          ...this.props,
          type: 'REGISTER',
          name,
          memberId,
          gender,
          fatherName,
          email,
          mobile,
          bloodGroup,
          address,
          age,
          plan,
          branch,
          images,
          getBranchNames: this.getBranchNames,
          getPlanDetails: this.getPlanDetails,
          entirePlanDetails: this.getEntirePlanDetails(),
          registerAmount: this.getRegisterAmount(),
          onValueChange: this.onValueChange,
          onSelectDropdown: this.onSelectDropdown,
          chooseImage: this.chooseImage,
          typeAddress: this.typeAddress,
          onRegister: this.onRegister,
          onCancel: this.onCancel,
          hideBackButton: true,
        })}
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pageData: selectUserPagesData(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
UserPublicPages.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPublicPages);
