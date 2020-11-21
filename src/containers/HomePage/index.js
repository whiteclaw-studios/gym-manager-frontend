import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectHomePageState, selectHPDataSource } from '../../selectors';
import MembersInfo from '../../components/MembersInfo/Loadable';
import PaymentPopup from '../../components/PaymentPopup';
import { FEES_LAYOUT, RED } from '../../constants';
import { applyDateFilter, getFeeDueDetails, updateFilter } from './actions';
import { constructBranchFilters, get } from '../../utils/helpers';
import { MontserratRegular } from '../../utils/fonts';
import DropDown from '../../components/Dropdown';
import { FilterIcon } from '../../components/SpriteIcon';
import DatePicker from '../../components/DatePicker/Loadable';
import Checkbox from '../../components/Checkbox';

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
  @media (min-width: 993px) {
    display: flex;
    align-items: center;
  }
  @media (max-width: 992px) {
    width: 7rem;
    height: auto;
    margin: 0.5rem 0rem;
  }
`;
const FilterDropdn = styled('div')`
  width: 27rem;
`;
const Note = styled('p')`
  color: ${RED};
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
    });
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
  render() {
    const {
      feeDueDetails = [],
      getBranchInfo = () => {},
      getPlanInfo = () => {},
      pageData,
      branchDetails,
    } = this.props;
    const { showFilters, showFilterIconInMobile } = this.state;
    const { isLoading } = get(pageData, 'memberFeesInfo', {});
    const { filters } = pageData;
    const branchFilters = constructBranchFilters(branchDetails);
    const selectedBranchFilterIndex = get(filters, 'branch.index');
    const selectedFromDate = get(filters, 'startDate.selectedDate', '');
    const selectedToDate = get(filters, 'endDate.selectedDate', '');

    console.log('HomePage', pageData, isLoading);

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
            <Filter>
              <Label>From</Label>
              <FilterDropdn>
                <DatePicker
                  selectedDate={selectedFromDate}
                  dateChangeHandler={(selectedDate) => {
                    console.log('selectedDate', selectedDate);
                    this.props.dispatch(
                      updateFilter({
                        startDate: {
                          ...filters.startDate,
                          selectedDate,
                        },
                      }),
                    );
                  }}
                  format="DD-MM-YYYY"
                  placeholder="Select Date"
                  validateStartYear={get(filters, `startDate.currentYear`, 0)}
                  validateEndYear={get(filters, `startDate.currentYear`, 0) + 5}
                  validateStartDate={this.validStartDate()}
                  validateStartMonth={get(
                    filters,
                    `startDate.validStartMonth`,
                    0,
                  )}
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
                    console.log('selectedDate', selectedDate);
                    this.props.dispatch(
                      updateFilter({
                        endDate: {
                          ...filters.endDate,
                          selectedDate,
                        },
                      }),
                    );
                  }}
                  format="DD-MM-YYYY"
                  placeholder="Select Date"
                  validateStartYear={get(filters, `endDate.currentYear`, 0)}
                  validateEndYear={get(filters, `endDate.currentYear`, 0) + 5}
                  validateStartDate={this.validStartDate()}
                  validateStartMonth={get(
                    filters,
                    `endDate.validStartMonth`,
                    0,
                  )}
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
                    console.log('yearSelected', yearSelected);
                  }}
                />
              </FilterDropdn>
            </Filter>
          </FilterWrap>
        )}

        {(showFilters || !showFilterIconInMobile) && (
          <React.Fragment>
            <Filter>
              <Label
                className={css`
                  @media (max-width: 992px) {
                    width: auto;
                    margin-right: 1rem;
                  }
                `}
              >
                Apply filter
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
            <Note>
              Date filter will be applied only when To date is greater than or
              equal to from date
            </Note>
          </React.Fragment>
        )}

        <MembersInfo
          openPaymentPopup={this.openPaymentPopup}
          type={FEES_LAYOUT}
          data={feeDueDetails}
          getBranchInfo={getBranchInfo}
          getPlanInfo={getPlanInfo}
          isLoading={isLoading}
        />
        <PaymentPopup
          {...this.state.paymentPopupInfo}
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
