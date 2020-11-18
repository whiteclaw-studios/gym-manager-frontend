import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import MembersInfo from '../../components/MembersInfo';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import {
  BLOOD_GROUP_DATA,
  GENDER,
  MEMBERS_DIRECTORY_LAYOUT,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { REGISTER_MEMBER_ROUTE } from '../../routes';
import {
  selectDataSourceForMDPage,
  selectFiltersInMDPage,
  selectMDPage,
  selectPaginationInMDPage,
} from '../../selectors';
import {
  addNewMember,
  deleteMember,
  getMemberDetails,
  searchMembers,
  updateFilter,
  updatePage,
} from './actions';
import {
  constructBranchFilters,
  constructPlanFilters,
  get,
} from '../../utils/helpers';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import RegisterNewMember from '../../components/RegisterNewMember';
import DropDown from '../../components/Dropdown';
import { MontserratLight, MontserratRegular } from '../../utils/fonts';
import { PlusIcon } from '../../components/SpriteIcon';
import CardLayout from '../../components/CardLayout';
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
  width: 27rem;
  margin: 0.5rem 1.2rem;
  align-items: center;
  @media (max-width: 992px) {
    margin: 0;
  }
`;
const ButtonWrap = styled('div')`
  width: 27rem;
  margin: 0.5rem 1rem;
  @media (max-width: 992px) {
    margin: 0;
  } ;
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
  @media (max-width: 992px) {
    font-size: 1.2rem;
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
  @media (max-width: 640px) {
    flex-direction: column;
  } ;
`;
const FilterWrap = styled('div')`
  display: flex;
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
}
`;
const FilterDropdn = styled('div')`
  width: 27rem;
`;
class MembersDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        dirty: false,
        error: false,
        type: 'firstname',
      },
      memberId: '',
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
      images: [],
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
  };

  onDelete = (data) => {
    const { name, memberId, memberUniqueId } = data;
    this.setState({
      ...this.state,
      name: {
        ...this.state.name,
        value: name,
      },
      memberId,
      memberUniqueId,
      showDeleteConfirmation: true,
    });
  };
  closeDeleteConfirmation = () => {
    this.resetState();
    this.setState({
      showDeleteConfirmation: false,
    });
  };
  confirmDeleteMember = () => {
    const { memberUniqueId } = this.state;
    this.props.dispatch(
      deleteMember({
        memberUniqueId,
        successCallback: this.closeDeleteConfirmation,
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
  onEdit = (data) => {
    const {
      memberId,
      memberUniqueId,
      name,
      profilePic,
      branchId,
      planId,
      age,
      fatherName,
      gender,
      mobile,
      mailId,
      bloodGroup,
    } = data;
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
      },
      branch: {
        ...branchState,
        selectedItemIndex: selectedBranchIndex,
      },
      plan: {
        ...planState,
        selectedItemIndex: selectedPlanIndex,
      },
      bloodGroup: {
        ...bloodGroupState,
        selectedItemIndex: selectedBGIndex,
      },
      memberId,
      memberUniqueId,
      showEditScreen: true,
      images: [
        {
          src: profilePic,
        },
      ],
    });
  };

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
    const keys = ['name', 'mobile', 'age', 'fatherName', 'address'];
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
      memberId: '',
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
    console.log('validateINouts', isError, state);
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
      images,
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
        images,
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
  }
  constructRecordInfo = () => {
    const { paginationInfo, membersData = [] } = this.props;
    console.log('paginationInfo', paginationInfo);
    const { offset, limit } = paginationInfo;
    const totalRecords = membersData.length;
    const end = limit < totalRecords ? limit : totalRecords;
    return totalRecords
      ? `Showing ${offset + 1}-${end} out of ${totalRecords}`
      : '';
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
    } = this.props;
    const { totalPages, activePage } = paginationInfo;
    const { isLoading } = get(pageData, 'membersInfo', {});
    const {
      showDeleteConfirmation,
      memberUniqueId,
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
      plan,
      branch,
    } = this.state;
    const selectedBranchFilterIndex = get(filters, 'branch.index');
    const selectedPlanFilterIndex = get(filters, 'plan.index');

    const branchFilters = constructBranchFilters(branchDetails);
    const planFilters = constructPlanFilters(
      branchDetails,
      selectedBranchFilterIndex,
    );

    return (
      <Wrapper>
        {!showEditScreen ? (
          <React.Fragment>
            <ButtonSearchWrap>
              <ButtonWrap>
                <RegisterNewMemberCTA
                  onClick={() =>
                    this.setState({
                      showEditScreen: true,
                    })
                  }
                >
                  <PlusIcon
                    className={css`
                      margin-right: 0.5rem;
                    `}
                  />
                  Register New Member
                </RegisterNewMemberCTA>
              </ButtonWrap>
              <SearchWrap>
                <Search
                  onSearch={this.onSearch}
                  placeholder="Search by name,membership id"
                />
              </SearchWrap>
            </ButtonSearchWrap>

            <FilterWrap>
              <Filter>
                <Label>Branch</Label>
                <FilterDropdn>
                  <DropDown
                    name="md-branch-filter"
                    listItems={branchFilters.map((branch) => branch.branchName)}
                    otherInfo={branchFilters}
                    activeItem={selectedBranchFilterIndex}
                    onSelect={(index, name, otherInfo) => {
                      this.props.dispatch(
                        updateFilter({
                          branch: {
                            ...otherInfo,
                            index,
                          },
                          plan: {
                            ...filters.plan,
                            index: 0,
                            planName: 'All',
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
                  `}
                >
                  <DropDown
                    name="md-plan-filter"
                    listItems={planFilters.map((plan) => plan.planName)}
                    otherInfo={planFilters}
                    activeItem={selectedPlanFilterIndex}
                    onSelect={(index, name, otherInfo) => {
                      console.log('index', index, name, otherInfo);
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
                <Label>Status</Label>
                <FilterDropdn>
                  <DropDown
                    className={css`
                      max-width: 15rem;
                    `}
                    name="md-status-filter"
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
            </FilterWrap>

            <CardLayout
              type={MEMBERS_DIRECTORY_LAYOUT}
              data={this.getPageData()}
              isLoading={isLoading}
              getBranchInfo={getBranchInfo}
              getPlanInfo={getPlanInfo}
              isAllowExpand
              onEditMember={this.onEdit}
              onDeleteMember={this.onDelete}
              allowedBranchInfo={allowedBranchInfo}
              recordInfo={this.constructRecordInfo()}
            />
            <PaginationWrap>
              <Pagination
                activePage={activePage}
                totalPages={totalPages}
                onSelect={this.onPageSelect}
                name="membersDirectory"
              />
            </PaginationWrap>
            <DeleteConfirmation
              name={name.value}
              memberUniqueId={memberUniqueId}
              close={this.closeDeleteConfirmation}
              show={showDeleteConfirmation}
              confirmDeleteMember={this.confirmDeleteMember}
            />
          </React.Fragment>
        ) : (
          <RegisterNewMember
            {...this.props}
            name={name}
            gender={gender}
            fatherName={fatherName}
            email={email}
            mobile={mobile}
            bloodGroup={bloodGroup}
            address={address}
            age={age}
            plan={plan}
            branch={branch}
            images={images}
            getPlanDetails={this.getPlanDetails}
            getBranchNames={this.getBranchNames}
            onValueChange={this.onValueChange}
            onSelectDropdown={this.onSelectDropdown}
            chooseImage={this.chooseImage}
            typeAddress={this.typeAddress}
            onRegister={this.onRegister}
            onCancel={() => {
              this.resetState();
              this.setState({
                showEditScreen: false,
              });
            }}
          />
        )}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
MembersDirectory.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(MembersDirectory);
