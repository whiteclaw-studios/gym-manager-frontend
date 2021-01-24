import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import {
  BLOOD_GROUP_DATA,
  GENDER,
  PRIMARY_COLOR,
  MEMBERS_DIRECTORY_LAYOUT,
  MEMBER_STATUS,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { REGISTER_MEMBER_ROUTE } from '../../routes';
import {
  isSuperAdmin,
  selectDataSourceForMDPage,
  selectFiltersInMDPage,
  selectMDPage,
  selectMemberFeeDetails,
  selectMemberInfo,
  selectPaginationInMDPage,
} from '../../selectors';
import {
  addNewMember,
  updateMembershipStatus,
  getMemberDetails,
  getMemberFeeDetails,
  searchMembers,
  updateFilter,
  updatePage,
  updateFeeDetails,
  submitEditMember,
} from './actions';
import {
  constructBranchFilters,
  constructPlanFilters,
  constructBloodGrpFilters,
  get,
  scrollToTop,
  validateFields,
} from '../../utils/helpers';
import ConfirmationPopup from '../../components/ConfirmationPopup';
import RegisterNewMember from '../../components/RegisterNewMember/Loadable';
import DropDown from '../../components/Dropdown';
import { MontserratLight, MontserratRegular } from '../../utils/fonts';
import { PlusIcon, FilterIcon } from '../../components/SpriteIcon';
import CardLayout from '../../components/CardLayout/Loadable';
import MemberProfile from '../../components/MemberProfile/Loadable';
import { displayToaster } from '../App/actions';
const Wrapper = styled('div')`
  width: 100%;
  padding: 0 6.4rem;
  padding-top: 2.4rem;
  @media (max-width: 992px) {
    margin-top: 4rem;
    padding: 0 2.4rem;
    padding-top: 1.2rem;
  }
`;

const SearchWrap = styled('div')`
  width: 100%;
  margin: 0.5rem 1.2rem;
  align-items: center;
  @media (min-width: 993px) {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
  @media (max-width: 992px) {
    margin: 0;
  }
`;
const ButtonWrap = styled('div')`
  width: 27rem;
  margin: 0.5rem 1rem;
  @media (max-width: 992px) {
    margin: 0;
  }
`;

const RegisterNewMemberCTA = styled(Button)`
  color: ${SECONDARY_BLACK};
  height: 3.4rem;
  background: ${WHITE};
  border: none;
  margin-bottom: 1.2rem;
  box-shadow: 0px 1px 4px #a9a9a9;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-family: ${MontserratLight};
  justify-content: center;
  width: 14rem;
  @media (max-width: 992px) {
    font-size: 1rem;
    width: 18rem;
    padding: 0;
    margin: 0;
  }
`;
const PaginationWrap = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2.4rem 0;
`;
const ButtonSearchWrap = styled('div')`
  display: flex;
  @media (max-width: 992px) {
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
  }
`;
const FilterWrap = styled('div')`
  display: flex;
  @media (max-width: 992px) {
    flex-direction: column;
  }
  @media (min-width: 993px) and (max-width: 1200px) {
    flex-wrap: wrap;
  }
`;
const Filter = styled('div')`
  font-size: 1.4rem;
  margin: 0.5rem 1rem;
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    margin: 0;
  }
`;
const Label = styled('p')`
  font-size: 1.4rem;
  margin: 0.5rem 1rem;
  font-family: ${MontserratRegular};
  height: 3.4rem;
  @media (max-width: 992px) {
    width:7rem;
  }
}
`;
const FilterDropdn = styled('div')`
  width: 27rem;
`;
const DesktopSearch = styled(Search)`
  width: 35rem;
`;
class MembersDirectory extends React.Component {
  constructor(props) {
    super(props);
    let isMobile = false;
    if (typeof window === 'object') {
      isMobile = window.innerWidth <= 992;
    }
    this.state = {
      showMemberProfile: false,
      showFilterIconInMobile: isMobile,
      showFilters: !isMobile,
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
      joiningDate: {
        value: '',
        dirty: false,
        error: false,
        type: 'dueDate',
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
      showEditScreen:
        this.props.history.location.pathname === REGISTER_MEMBER_ROUTE,
      showDeleteConfirmation: false,
    };
    this.props.showHeaderHandle();
  }

  onSearch = (searchText) => {
    this.props.dispatch(searchMembers({ searchText }));
  };
  getPageData = () => {
    const { membersData, paginationInfo } = this.props;
    const { offset, limit } = paginationInfo;
    return membersData.slice(offset, limit);
  };
  onPageSelect = (pageNo) => {
    this.props.dispatch(updatePage({ pageNo }));
    scrollToTop();
  };

  updateMembershipStatus = () => {
    this.setState({
      showDeleteConfirmation: true,
    });
  };
  closeDeleteConfirmation = () => {
    this.setState({
      showDeleteConfirmation: false,
    });
  };
  confirmDeleteMember = () => {
    const { memberUniqueId, isActive } = this.state;
    this.props.dispatch(
      updateMembershipStatus({
        memberUniqueId,
        isActive: !isActive,
        successCallback: () => {
          this.closeDeleteConfirmation();
          this.setState({
            isActive: !isActive,
          });
        },
        failureCallback: this.closeDeleteConfirmation,
      }),
    );
  };
  findGenderIdx = (gender) => {
    let selectedGenderIndex = -1;
    for (let i = 0; i < GENDER.length; i += 1) {
      if (GENDER[i] === gender) {
        selectedGenderIndex = i;
      }
    }
    return selectedGenderIndex;
  };
  findBloodGrpIdx = (bloodGroup) => {
    let selectedGenderIndex = -1;
    for (let i = 0; i < BLOOD_GROUP_DATA.length; i += 1) {
      if (BLOOD_GROUP_DATA[i] === bloodGroup) {
        selectedGenderIndex = i;
      }
    }
    return selectedGenderIndex;
  };
  storeMemberInfo = (data) => {
    const {
      memberId,
      memberUniqueId,
      name,
      profilePic,
      branch,
      branchId,
      planId,
      plan,
      age,
      fatherName,
      gender = '',
      mobile,
      mailId,
      bloodGroup,
      address,
    } = data;
    console.log('data', data);
    const {
      name: nameState,
      plan: planState,
      branch: branchState,
      age: ageState,
      fatherName: fatherNameState,
      gender: genderState,
      mobile: mobileState,
      email: emailState,
      bloodgroup: bloodGroupState,
      address: addressState,
      memberId: memberIdState,
    } = this.state;

    const { branchDetails } = this.props;

    let selectedBranchIndex = -1;
    let selectedPlanIndex = -1;
    let selectedGenderIndex = this.findGenderIdx(gender);
    let selectedBGIndex = this.findBloodGrpIdx(bloodGroup);
    for (let i = 0; i < branchDetails.length; i += 1) {
      if (branchDetails[i].id === branchId) {
        selectedBranchIndex = i;
        let { planDetails } = branchDetails[i];
        for (let j = 0; j < planDetails.length; j += 1) {
          if (planDetails[j].id === planId) {
            selectedPlanIndex = j;
            break;
          }
        }
        break;
      }
    }

    this.setState({
      name: {
        ...nameState,
        value: name,
      },
      age: {
        ...ageState,
        value: age,
      },
      fatherName: {
        ...fatherNameState,
        value: fatherName,
      },
      mobile: {
        ...mobileState,
        value: mobile,
      },
      email: { ...emailState, value: mailId },
      gender: {
        ...genderState,
        selectedItemIndex: selectedGenderIndex,
        value: gender,
      },
      branch: {
        ...branchState,
        selectedItemIndex: selectedBranchIndex,
        name: branch,
        id: branchId,
      },
      plan: {
        ...planState,
        selectedItemIndex: selectedPlanIndex,
        name: plan,
        id: planId,
      },
      bloodGroup: {
        ...bloodGroupState,
        selectedItemIndex: selectedBGIndex,
        name: bloodGroup,
      },
      address: {
        ...addressState,
        value: address,
      },
      memberId: {
        ...memberIdState,
        value: memberId,
      },
      memberUniqueId,
      showEditScreen: true,
      images: [
        {
          src: profilePic,
        },
      ],
    });
  };
  onEdit = (data) => {
    this.storeMemberInfo(data);
    this.setState({
      showMemberProfile: false,
      showEditScreen: true,
      screenType: 'EDIT',
    });
  };

  onValueChange = (data) => {
    console.log('data', data);
    this.setState(data);
  };
  onSelectDropdown = (index, elementName) => {
    console.log('onSelect', index, elementName, this.state);
    let id = null;
    let name = null;
    let value = null;
    if (elementName === 'branch') {
      const { allowedBranchInfo, branchDetails, isSuperAdmin } = this.props;
      const reqdBranch = isSuperAdmin
        ? branchDetails[index]
        : [{ ...allowedBranchInfo }][index];
      id = reqdBranch.id;
      name = reqdBranch.branchName;
    } else if (elementName === 'plan') {
      const { branchDetails } = this.props;
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
  getEntirePlanDetails = () => {
    const { branch } = this.state;
    const branchIndex = branch.selectedItemIndex;
    const { branchDetails } = this.props;
    if (branchIndex >= 0) return branchDetails[branchIndex].planDetails;
    return [];
  };
  getBranchNames = () => {
    const { branchDetails, allowedBranchInfo, isSuperAdmin } = this.props;
    const { screenType } = this.state;
    const info =
      screenType === 'EDIT' || !isSuperAdmin
        ? [{ ...allowedBranchInfo }]
        : branchDetails;

    return info.map((branch) => branch.branchName);
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
    const keys = ['name', 'memberId', 'mobile', 'age', 'fatherName', 'address'];
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
  validateDropdownData = () => {
    const { branch, plan, gender } = this.state;
    let isError = false;
    if (
      branch.selectedItemIndex < 0 ||
      plan.selectedItemIndex < 0 ||
      gender.selectedItemIndex < 0
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
    const keys = [
      'name',
      'memberId',
      'mobile',
      'age',
      'fatherName',
      'address',
      'joiningDate',
    ];
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
      joiningDate,
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
        joiningDate: joiningDate.value,
        gender: GENDER[gender.selectedItemIndex],
        planId: plan.id,
        bloodGroup: BLOOD_GROUP_DATA[bloodGroup.selectedItemIndex],
        branchId: branch.id,
        fatherName: fatherName.value,
        images,
        feeAmount,
        successCallback: () => {
          this.resetState();
          this.setState({
            showEditScreen: false,
          });
        },
      }),
    );
  };
  componentDidMount() {
    const { isLoaded } = get(this.props, 'pageData.membersInfo', {});
    if (!isLoaded) this.props.dispatch(getMemberDetails());
    window.addEventListener('resize', this.resizeListener);
  }
  constructRecordInfo = () => {
    const { paginationInfo, membersData = [] } = this.props;
    const { offset, limit } = paginationInfo;
    const totalRecords = membersData.length;
    const end = limit < totalRecords ? limit : totalRecords;
    return totalRecords
      ? `Showing ${offset + 1}-${end} out of ${totalRecords}`
      : '';
  };
  toggleFilters = (state) => {
    this.setState({
      showFilters: state,
    });
  };
  resizeListener = () => {
    if (window.innerWidth <= 992 && !this.state.showFilterIconInMobile) {
      this.setState({
        showFilterIconInMobile: true,
        showFilters: false,
      });
    } else if (window.innerWidth > 992 && this.state.showFilterIconInMobile) {
      this.setState({
        showFilterIconInMobile: false,
        showFilters: true,
      });
    }
  };
  onSelectMember = (memberInfo) => {
    this.storeMemberInfo(memberInfo);
    const { isActive } = memberInfo;
    this.setState({
      showMemberProfile: true,
      showEditScreen: false,
      isActive,
    });
    // to clear the searchText
    this.onSearch('');
  };
  submitEdition = () => {
    const {
      memberUniqueId,
      name,
      email,
      age,
      mobile,
      gender,
      branch,
      plan,
      images,
      fatherName,
      address,
      bloodGroup,
      memberId,
    } = this.state;
    const oldMemberInfo = this.props.selectMemberInfo(memberUniqueId);
    const {
      membershipId,
      name: oldName,
      mailId,
      fatherName: oldFatherName,
      gender: oldGender,
      age: oldAge,
      planDetailsId,
      mobileNumber,
      branchId,
      oldAddress,
      photoS3Key,
      bloodGroup: oldBG,
    } = oldMemberInfo;
    if (
      membershipId !== memberId.value ||
      oldName !== name.value ||
      mailId !== email.value ||
      oldAge !== age.value ||
      oldFatherName !== fatherName.value ||
      mobileNumber != mobile.value ||
      oldGender !== gender.value ||
      branchId !== branch.id ||
      planDetailsId !== plan.id ||
      oldAddress !== address.value ||
      photoS3Key !== images[0].src ||
      oldBG !== bloodGroup.name
    ) {
      this.props.dispatch(
        submitEditMember({
          memberId: memberId.value,
          memberUniqueId,
          name: name.value,
          fatherName: fatherName.value,
          mailId: email.value,
          age: age.value,
          gender: gender.value,
          branchId: branch.id,
          planId: plan.id,
          address: address.value,
          images,
          successCallback: () => {
            this.onCancel();
          },
        }),
      );
    } else {
      this.props.dispatch(
        displayToaster({
          type: 'failure',
          text: 'No changes has been made',
          timeout: 2000,
        }),
      );
    }
  };
  getFeeDetails = (memberUniqueId) => {
    const { selectMemberFeeDetails, dispatch } = this.props;
    const memberFeeDetails = selectMemberFeeDetails(memberUniqueId);
    console.log('getFeeDetails', memberFeeDetails);
    const isLoaded = get(memberFeeDetails, 'isLoaded', false);
    if (!isLoaded) dispatch(getMemberFeeDetails({ memberUniqueId }));
  };
  onPayFee = ({
    memberUniqueId,
    currentPlan,
    paidDate = '',
    successCallback,
    failureCallback,
  }) => {
    this.props.dispatch(
      updateFeeDetails({
        memberUniqueId,
        currentPlan,
        paidDate,
        successCallback: () => {
          this.setState({
            plan: {
              ...this.state.plan,
              selectedItemIndex: currentPlan.index,
              name: currentPlan.name,
              id: currentPlan.id,
            },
          });
          successCallback();
        },
        failureCallback,
      }),
    );
  };
  getRegisterAmount = () => {
    const { branchDetails } = this.props;
    const { branch } = this.state;
    if (branch.selectedItemIndex >= 0) {
      return branchDetails[branch.selectedItemIndex].registrationAmount;
    }
    return 0;
  };
  onCancel = () => {
    const { screenType } = this.state;
    if (screenType === 'REGISTER') {
      this.resetState();
      this.setState({
        showEditScreen: false,
        showMemberProfile: false,
      });
    } else {
      this.setState({
        showEditScreen: false,
        showMemberProfile: true,
        images: [{}],
      });
    }
  };
  render() {
    const {
      paginationInfo,
      pageData,
      getBranchInfo = () => {},
      getPlanInfo = () => {},
      allowedBranchInfo,
      branchDetails,
      filters,
      selectMemberFeeDetails,
    } = this.props;
    const { totalPages, activePage } = paginationInfo;
    const { isLoading } = get(pageData, 'membersInfo', {});
    console.log('MD page', this.state);
    const {
      showDeleteConfirmation,
      memberUniqueId,
      memberId,
      showEditScreen,
      name,
      gender,
      fatherName,
      email,
      images,
      mobile,
      bloodGroup,
      address,
      age,
      joiningDate,
      plan,
      branch,
      showFilters,
      showFilterIconInMobile,
      showMemberProfile,
      screenType,
      isActive,
    } = this.state;
    const selectedBranchFilterIndex = get(filters, 'branch.index');
    const selectedPlanFilterIndex = get(filters, 'plan.index');
    const selectedBGFilterIndex = get(filters, 'bloodGroup.index');
    const selectedStatusFilterIndex = get(filters, 'status.index');
    const branchFilters = constructBranchFilters(branchDetails);
    const planFilters = constructPlanFilters(branchDetails);
    const bloodGroupFilters = constructBloodGrpFilters(BLOOD_GROUP_DATA);
    return (
      <Wrapper>
        {showMemberProfile ? (
          <MemberProfile
            name={name.value}
            mailId={email.value}
            mobile={mobile.value}
            age={age.value}
            gender={gender.value}
            bloodGroup={bloodGroup.name}
            fatherName={fatherName.value}
            memberId={memberId.value}
            memberUniqueId={memberUniqueId}
            profilePic={images[0].src}
            branch={branch.name}
            branchId={branch.id}
            plan={plan.name}
            planId={plan.id}
            address={address.value}
            isActive={isActive}
            onEditMember={this.onEdit}
            updateMembershipStatus={this.updateMembershipStatus}
            onBack={() => {
              this.setState({
                showEditScreen: false,
                showMemberProfile: false,
              });
              this.resetState();
            }}
            getFeeDetails={this.getFeeDetails}
            selectMemberFeeDetails={selectMemberFeeDetails}
            onPayFee={this.onPayFee}
            entirePlanDetails={this.getEntirePlanDetails()}
            planDetails={this.getPlanDetails()}
            branchDetails={branchDetails}
          />
        ) : !showEditScreen ? (
          <React.Fragment>
            <ButtonSearchWrap>
              <ButtonWrap>
                <RegisterNewMemberCTA
                  className={css`
                    @media (max-width: 992px) {
                      color: ${PRIMARY_COLOR};
                      border: none;
                      box-shadow: none;
                    }
                  `}
                  onClick={() =>
                    this.setState({
                      showEditScreen: true,
                      screenType: 'REGISTER',
                    })
                  }
                >
                  <PlusIcon
                    className={css`
                      margin-right: 0.5rem;
                      @media (max-width: 992px) {
                        background-position: -273px -145px;
                      }
                    `}
                  />
                  Register
                </RegisterNewMemberCTA>
              </ButtonWrap>
              {showFilterIconInMobile && (
                <FilterIcon
                  className={css`
                    ${showFilters &&
                    `
                    background-position: -273px -13px;
                    width: 18px;
                    height: 18px;
                    `}
                    @media (min-width: 993px) {
                      display: none;
                    }
                  `}
                  onClick={() => this.toggleFilters(!showFilters)}
                />
              )}
              <SearchWrap
                className={css`
                  @media (max-width: 992px) {
                    display: none;
                  }
                `}
              >
                <DesktopSearch
                  onSearch={this.onSearch}
                  placeholder="Search by Name, Membership ID, Mobile"
                  searchBarId="members-desktop-search-bar"
                />
              </SearchWrap>
            </ButtonSearchWrap>
            {(showFilters || !showFilterIconInMobile) && (
              <FilterWrap>
                <SearchWrap
                  className={css`
                    @media (min-width: 993px) {
                      display: none;
                    }
                  `}
                >
                  <Search
                    onSearch={this.onSearch}
                    placeholder="Search by Name, Membership ID, Mobile"
                    searchBarId="members-mobile-search-bar"
                  />
                </SearchWrap>

                <React.Fragment>
                  <Filter>
                    <Label>Branch</Label>
                    <FilterDropdn>
                      <DropDown
                        name="md-branch-filter"
                        listItems={branchFilters.map(
                          (branch) => branch.branchName,
                        )}
                        otherInfo={branchFilters}
                        activeItem={selectedBranchFilterIndex}
                        onSelect={(index, name, otherInfo) => {
                          this.props.dispatch(
                            updateFilter({
                              branch: {
                                ...otherInfo,
                                index,
                              },
                            }),
                          );
                        }}
                      />
                    </FilterDropdn>
                  </Filter>
                  <Filter>
                    <Label>Plan</Label>
                    <FilterDropdn
                      className={css`
                        max-width: 15rem;
                        @media (max-width: 992px) {
                          max-width: unset;
                        }
                      `}
                    >
                      <DropDown
                        name="md-plan-filter"
                        listItems={planFilters.map((plan) => plan.planName)}
                        otherInfo={planFilters}
                        activeItem={selectedPlanFilterIndex}
                        onSelect={(index, name, otherInfo) => {
                          this.props.dispatch(
                            updateFilter({
                              plan: {
                                ...otherInfo,
                                index,
                              },
                            }),
                          );
                        }}
                      />
                    </FilterDropdn>
                  </Filter>
                  <Filter>
                    <Label>Blood group</Label>
                    <FilterDropdn
                      className={css`
                        max-width: 15rem;
                        @media (max-width: 992px) {
                          max-width: unset;
                        }
                      `}
                    >
                      <DropDown
                        name="md-bloodGroup-filter"
                        listItems={bloodGroupFilters}
                        activeItem={selectedBGFilterIndex}
                        onSelect={(index, name, otherInfo) => {
                          this.props.dispatch(
                            updateFilter({
                              bloodGroup: {
                                index,
                                name: bloodGroupFilters[index],
                              },
                            }),
                          );
                        }}
                      />
                    </FilterDropdn>
                  </Filter>
                </React.Fragment>

                <Filter>
                  <Label>Status</Label>
                  <FilterDropdn>
                    <DropDown
                      className={css`
                        max-width: 15rem;
                        @media (max-width: 992px) {
                          max-width: unset;
                        }
                      `}
                      name="md-status-filter"
                      listItems={MEMBER_STATUS}
                      activeItem={selectedStatusFilterIndex}
                      onSelect={(index) => {
                        this.props.dispatch(
                          updateFilter({
                            status: {
                              index,
                              name: MEMBER_STATUS[index],
                            },
                          }),
                        );
                      }}
                    />
                  </FilterDropdn>
                </Filter>
              </FilterWrap>
            )}
            <CardLayout
              type={MEMBERS_DIRECTORY_LAYOUT}
              data={this.getPageData()}
              isLoading={isLoading}
              getBranchInfo={getBranchInfo}
              getPlanInfo={getPlanInfo}
              isAllowExpand
              allowedBranchInfo={allowedBranchInfo}
              recordInfo={this.constructRecordInfo()}
              onSelectMember={this.onSelectMember}
              isClickable
            />
            <PaginationWrap>
              <Pagination
                activePage={activePage}
                totalPages={totalPages}
                onSelect={this.onPageSelect}
                name="membersDirectory"
              />
            </PaginationWrap>
          </React.Fragment>
        ) : (
          <RegisterNewMember
            {...this.props}
            type={screenType}
            name={name}
            memberId={memberId}
            gender={gender}
            fatherName={fatherName}
            email={email}
            joiningDate={joiningDate}
            mobile={mobile}
            bloodGroup={bloodGroup}
            address={address}
            age={age}
            plan={plan}
            branch={branch}
            images={images}
            getPlanDetails={this.getPlanDetails}
            entirePlanDetails={this.getEntirePlanDetails()}
            registerAmount={this.getRegisterAmount()}
            getBranchNames={this.getBranchNames}
            onValueChange={this.onValueChange}
            onSelectDropdown={this.onSelectDropdown}
            chooseImage={this.chooseImage}
            typeAddress={this.typeAddress}
            onRegister={this.onRegister}
            onEdit={this.submitEdition}
            onCancel={this.onCancel}
          />
        )}
        <ConfirmationPopup
          title={isActive ? 'Pause Membership ?' : 'Resume Membership ?'}
          infoText={
            isActive
              ? `All the activities with ${name.value} will be
          paused. Do you want to pause anyway?`
              : `All the activities with ${name.value} will be
          resumed. Do you want to resume anyway?`
          }
          show={showDeleteConfirmation}
          onYes={this.closeDeleteConfirmation}
          onNo={this.confirmDeleteMember}
          noText={isActive ? 'Pause' : 'Resume'}
          yesText={'Cancel'}
        />
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pageData: selectMDPage(state),
    membersData: selectDataSourceForMDPage(state),
    paginationInfo: selectPaginationInMDPage(state),
    filters: selectFiltersInMDPage(state),
    selectMemberInfo: selectMemberInfo(state),
    selectMemberFeeDetails: selectMemberFeeDetails(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
MembersDirectory.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(MembersDirectory);
