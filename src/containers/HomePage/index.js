import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectHomePageState, selectHPDataSource } from '../../selectors';
import MembersInfo from '../../components/MembersInfo/Loadable';
import PaymentPopup from '../../components/PaymentPopup';
import { FEES_LAYOUT, FEE_DUE_DATE, PRIMARY_COLOR, RED } from '../../constants';
import {
  applyDateFilter,
  getDateFilteredData,
  getFeeDueDetails,
  updateFeeDetails,
  updateFilter,
  updateMembershipStatus,
  updateSourceData,
} from './actions';
import {
  constructBranchFilters,
  constructPlanFilters,
  get,
  isGreaterThanOrEqualTo,
} from '../../utils/helpers';
import { MontserratRegular } from '../../utils/fonts';
import DropDown from '../../components/Dropdown';
import { FilterIcon } from '../../components/SpriteIcon';
import DatePicker from '../../components/DatePicker/Loadable';
import Checkbox from '../../components/Checkbox';
import validations from '../../utils/validations';

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

const FilterWrap = styled('div')`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 992px) {
    flex-direction: column;
    margin: 1rem 0;
  }
`;
const Filter = styled('div')`
  font-size: 1.4rem;
  margin: 0.5rem 1rem;
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    margin: 0;
    margin: 0.5rem 0;
  }
`;
const Label = styled('p')`
  font-size: 1.4rem;
  margin: 0.5rem 1rem;
  font-family: ${MontserratRegular};
  height: 3.4rem;
  width: 7rem;

  @media (min-width: 993px) {
    display: flex;
    align-items: center;
  }
  @media (max-width: 992px) {
    height: auto;
    margin: 0.5rem 0rem;
  }
`;
const FilterDropdn = styled('div')`
  width: 27rem;
  @media (max-width: 360px) {
    width: 21rem;
  }
`;
const Note = styled('p')`
  color: ${PRIMARY_COLOR};
  font-size: 1.4rem;
  margin: 0.5rem 0;
  @media (min-width: 993px) {
    margin: 1rem 2rem;
  }
`;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    let isMobile = false;
    if (typeof window === 'object') {
      isMobile = window.innerWidth <= 992;
    }
    this.state = {
      close: true,
      showFilterIconInMobile: isMobile,
      showFilters: !isMobile,
      paymentPopupInfo: {
        open: false,
        memberInfo: {},
      },
      dueDate: {
        value: this.setTodayDate(),
        type: 'dueDate',
        error: false,
        dirty: false,
      },
    };
    this.props.showHeaderHandle(); // to show the header
  }
  componentDidMount = () => {
    const { isLoaded = false } = get(this.props, 'pageData.memberFeesInfo', {});
    console.log('isLoaded', isLoaded);
    if (!isLoaded) this.props.dispatch(getFeeDueDetails());
    window.addEventListener('resize', this.resizeListener);
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
  onClosePaymentPopup = () => {
    this.setState({
      paymentPopupInfo: {
        open: false,
        memberInfo: {},
      },
      dueDate: {
        value: this.setTodayDate(),
        type: 'dueDate',
        error: false,
        dirty: false,
      },
    });
  };
  setTodayDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  openPaymentPopup = (memberInfo) => {
    this.setState({
      paymentPopupInfo: {
        memberInfo,
        open: true,
      },
    });
  };
  toggleFilters = (state) => {
    this.setState({
      showFilters: state,
    });
  };
  validYear = () => {
    const year = new Date().getFullYear();
    return year;
  };
  validStartDate = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1; // since its 0 indexed
    const year = new Date().getFullYear();
    let format = 'DD/MM/YYYY';
    format = format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year);
    return format;
  };
  getEntirePlanDetails = () => {
    const memberInfo = get(this.state, 'paymentPopupInfo.memberInfo', {});
    const { branchId } = memberInfo || {};
    const { branchDetails = [] } = this.props;
    if (!branchId) return [];

    return (
      branchDetails.filter((branch) => branch.id === branchId)[0].planDetails ||
      []
    );
  };
  getSelectedPlanIndex = () => {
    const planDetails = this.getEntirePlanDetails();
    const memberInfo = get(this.state, 'paymentPopupInfo.memberInfo', {});
    const { planId } = memberInfo || {};
    let index = -1;
    for (let i = 0; i < planDetails.length; i += 1) {
      if (planDetails[i].id === planId) {
        index = i;
        break;
      }
    }
    return index;
  };
  getPlanDetails = () => {
    const entirePlanDetails = this.getEntirePlanDetails();
    console.log('entirePlanDetails', entirePlanDetails);
    return entirePlanDetails.map((plan) => plan.planName);
  };

  getFeeAmount = () => {
    const entirePlanDetails = this.getEntirePlanDetails();
    const index = this.getSelectedPlanIndex();
    console.log('getFeeAmount', index, entirePlanDetails);
    if (index < 0) return 0;
    return entirePlanDetails[index].amount;
  };

  constructRecordInfo = () => {
    const { feeDueDetails } = this.props;
    const totalRecords = feeDueDetails ? feeDueDetails.length : 0;
    return totalRecords
      ? `Showing ${1}-${totalRecords} out of ${totalRecords}`
      : '';
  };
  makeMemberInactive = (data) => {
    this.props.dispatch(updateMembershipStatus(data));
  };
  render() {
    const {
      feeDueDetails = [],
      getBranchInfo = () => {},
      getPlanInfo = () => {},
      pageData,
      branchDetails,
      isSuperAdmin,
    } = this.props;
    const {
      showFilters,
      showFilterIconInMobile,
      paymentPopupInfo,
      dueDate,
    } = this.state;
    const { memberInfo = {}, open } = paymentPopupInfo;
    const { isLoading } = get(pageData, 'memberFeesInfo', {});
    const { filters, isInvalidDates } = pageData;

    const selectedBranchFilterIndex = get(filters, 'branch.index');
    const selectedPlanFilterIndex = get(filters, 'plan.index');
    const selectedDueDateFilterIndex = get(filters, 'feeDueDate.index');
    const selectedFromDate = get(filters, 'startDate.selectedDate', '');
    const selectedToDate = get(filters, 'endDate.selectedDate', '');
    const branchFilters = constructBranchFilters(branchDetails);
    const planFilters = constructPlanFilters(branchDetails);
    // console.log('state', this.state, this.props);
    return (
      <Wrapper>
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
              @media (max-width: 992px) {
                margin-bottom: 1rem;
              }
            `}
            onClick={() => this.toggleFilters(!showFilters)}
          />
        )}
        {(showFilters || !showFilterIconInMobile) && (
          <FilterWrap>
            {isSuperAdmin && (
              <Filter>
                <Label>Branch</Label>
                <FilterDropdn>
                  <DropDown
                    name="hp-branch-filter"
                    listItems={branchFilters.map((branch) => branch.branchName)}
                    otherInfo={branchFilters}
                    activeItem={selectedBranchFilterIndex}
                    onSelect={(index, name, otherInfo) => {
                      const { branchName, id } = otherInfo || {};
                      this.props.dispatch(
                        updateFilter({
                          branch: {
                            ...otherInfo,
                            index,
                            id,
                            name: branchName,
                          },
                        }),
                      );
                    }}
                    hideError
                  />
                </FilterDropdn>
              </Filter>
            )}
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
                  name="hp-plan-filter"
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
                  hideError
                />
              </FilterDropdn>
            </Filter>
            <Filter>
              <Label>Due date</Label>
              <FilterDropdn>
                <DropDown
                  name="hp-date-filter"
                  listItems={FEE_DUE_DATE}
                  activeItem={selectedDueDateFilterIndex}
                  onSelect={(index) => {
                    this.props.dispatch(
                      updateFilter({
                        feeDueDate: {
                          index,
                          name: FEE_DUE_DATE[index],
                        },
                      }),
                    );
                  }}
                  hideError
                />
              </FilterDropdn>
            </Filter>
            {selectedDueDateFilterIndex !== 1 && (
              <div
                className={css`
                  display: flex;
                  @media (max-width: 992px) {
                    flex-direction: column;
                  }
                `}
              >
                <Filter>
                  <Label>From</Label>
                  <FilterDropdn>
                    <DatePicker
                      selectedDate={selectedFromDate}
                      dateChangeHandler={(selectedDate) => {
                        this.props.dispatch(
                          updateFilter({
                            startDate: {
                              ...filters.startDate,
                              selectedDate,
                            },
                          }),
                        );
                      }}
                      format="DD/MM/YYYY"
                      placeholder="Select Date"
                      // validateStartYear={get(filters, `startDate.currentYear`, 0)}
                      // validateEndYear={
                      //   get(filters, `startDate.currentYear`, 0) + 5
                      // }
                      // validateStartDate={this.validStartDate()}
                      // validateStartMonth={get(
                      //   filters,
                      //   `startDate.validStartMonth`,
                      //   0,
                      // )}
                      disableMonthClick
                      disableYearClick
                      // validateMonthPanel
                      validateEndMonth={11}
                      nextYearHandle={(yearSelected) => {
                        const { startDate } = filters;
                        const { currentYear, currentMonth } = startDate || {};
                        this.props.dispatch(
                          updateFilter({
                            startDate: {
                              ...filters.startDate,
                              validStartMonth:
                                yearSelected > currentYear ? 0 : currentMonth,
                            },
                          }),
                        );
                        console.log('yearSelected', yearSelected);
                      }}
                    />
                  </FilterDropdn>
                </Filter>
                <Filter>
                  <Label>To</Label>
                  <FilterDropdn>
                    <DatePicker
                      selectedDate={selectedToDate}
                      dateChangeHandler={(selectedDate) => {
                        this.props.dispatch(
                          updateFilter({
                            endDate: {
                              ...filters.endDate,
                              selectedDate,
                            },
                          }),
                        );
                      }}
                      format="DD/MM/YYYY"
                      placeholder="Select Date"
                      // validateStartYear={get(filters, `endDate.currentYear`, 0)}
                      // validateEndYear={get(filters, `endDate.currentYear`, 0) + 5}
                      // validateStartDate={this.validStartDate()}
                      // validateStartMonth={get(
                      //   filters,
                      //   `endDate.validStartMonth`,
                      //   0,
                      // )}
                      disableMonthClick
                      disableYearClick
                      // validateMonthPanel
                      validateEndMonth={11}
                      nextYearHandle={(yearSelected) => {
                        const { endDate } = filters;
                        const { currentYear, currentMonth } = endDate || {};
                        this.props.dispatch(
                          updateFilter({
                            endDate: {
                              ...filters.endDate,
                              validStartMonth:
                                yearSelected > currentYear ? 0 : currentMonth,
                            },
                          }),
                        );
                      }}
                    />
                  </FilterDropdn>
                </Filter>
                <Filter
                  className={css`
                    @media (max-width: 992px) {
                      display: none;
                    }
                  `}
                >
                  <Label
                    className={css`
                      width: auto;
                    `}
                  >
                    Apply Date filter
                  </Label>
                  <Checkbox
                    className={css`
                      > label > span {
                        top: -4px !important;
                      }
                    `}
                    onSelect={(isChecked) => {
                      this.props.dispatch(
                        applyDateFilter({
                          isChecked,
                        }),
                      );
                    }}
                  />
                </Filter>
              </div>
            )}
          </FilterWrap>
        )}

        {selectedDueDateFilterIndex !== 1 &&
          (showFilters || !showFilterIconInMobile) && (
            <React.Fragment>
              <Filter
                className={css`
                  @media (min-width: 993px) {
                    display: none;
                  }
                `}
              >
                <Label
                  className={css`
                    @media (max-width: 992px) {
                      width: auto;
                      margin-right: 1rem;
                    }
                  `}
                >
                  Apply Date filter
                </Label>
                <Checkbox
                  className={css`
                    > label > span {
                      top: -4px !important;
                    }
                  `}
                  onSelect={(isChecked) => {
                    this.props.dispatch(
                      applyDateFilter({
                        isChecked,
                      }),
                    );
                  }}
                />
              </Filter>

              {isInvalidDates && (
                <Note>
                  Date filter will be applied only when To date is greater than
                  or equal to from date
                </Note>
              )}
            </React.Fragment>
          )}

        <MembersInfo
          openPaymentPopup={this.openPaymentPopup}
          type={FEES_LAYOUT}
          data={feeDueDetails}
          getBranchInfo={getBranchInfo}
          getPlanInfo={getPlanInfo}
          isLoading={isLoading}
          recordInfo={this.constructRecordInfo()}
          makeMemberInactive={this.makeMemberInactive}
        />
        <PaymentPopup
          name={memberInfo.name}
          open={open}
          planDetails={this.getPlanDetails()}
          entirePlanDetails={this.getEntirePlanDetails()}
          planId={memberInfo.planId}
          selectedPlan={this.getSelectedPlanIndex()}
          feeAmount={this.getFeeAmount()}
          dueDate={dueDate}
          onDueDateChange={(data) => {
            this.setState({
              ...data,
            });
          }}
          updatePlanIdWhilePayment={({ id }) => {
            this.setState({
              paymentPopupInfo: {
                memberInfo: {
                  ...this.state.paymentPopupInfo.memberInfo,
                  planId: id,
                },
              },
            });
          }}
          onPay={() => {
            const { planId } = memberInfo;
            const { dueDate } = this.state;
            dueDate.error = !validations.check(dueDate);
            if (dueDate.error || !dueDate.value) {
              this.setState({
                dueDate: {
                  ...dueDate,
                  error: true,
                },
              });
              return;
            }
            this.props.dispatch(
              updateFeeDetails({
                currentPlan: {
                  id: planId,
                },
                memberUniqueId: memberInfo.memberUniqueId,
                dueDate: dueDate.value,
                successCallback: () => this.onClosePaymentPopup(),
                failureCallback: () => this.onClosePaymentPopup(),
              }),
            );
          }}
          onClose={this.onClosePaymentPopup}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageData: selectHomePageState(state),
    feeDueDetails: selectHPDataSource(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
HomePage.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
