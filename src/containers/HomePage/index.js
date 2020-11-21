import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectHomePageState, selectHPDataSource } from '../../selectors';
import MembersInfo from '../../components/MembersInfo/Loadable';
import PaymentPopup from '../../components/PaymentPopup';
import { FEES_LAYOUT } from '../../constants';
import { getFeeDueDetails, updateFilter } from './actions';
import { constructBranchFilters, get } from '../../utils/helpers';
import { MontserratRegular } from '../../utils/fonts';
import DropDown from '../../components/Dropdown';
import { FilterIcon } from '../../components/SpriteIcon';

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
const ContentWrap = styled('h1')`
  display: flex;
  width: 100%;
  @media (max-width: 992px) {
    flex-direction: column-reverse;
  }
`;

const FilterWrap = styled('div')`
  display: flex;
  @media (max-width: 992px) {
    flex-direction: column;
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
    width: 7rem;
    margin: 0.5rem 0rem;
  }
`;
const FilterDropdn = styled('div')`
  width: 27rem;
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
                />
              </FilterDropdn>
            </Filter>
            <Filter>
              <Label>From</Label>
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
                />
              </FilterDropdn>
            </Filter>
            <Filter>
              <Label>To</Label>
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
                />
              </FilterDropdn>
            </Filter>
          </FilterWrap>
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
