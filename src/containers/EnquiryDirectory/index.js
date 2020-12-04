import React from 'react';
import styled, { css, cx } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import {
  ENQUIRY_DIRECTORY_LAYOUT,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { ENQUIRY_FORM_ROUTE } from '../../routes';
import {
  selectDataSourceForEDPage,
  selectEDPage,
  selectPaginationInEDPage,
  selectFiltersInEDPage,
} from '../../selectors';
import { getEnquiryDetails, searchEnquiry, updateFilter } from './actions';
import { constructBranchFilters, get } from '../../utils/helpers';
import { MontserratLight, MontserratRegular } from '../../utils/fonts';
import DropDown from '../../components/Dropdown';
import CardLayout from '../../components/CardLayout/Loadable';
import {
  EnquiryIcon,
  FilterIcon,
  HoverEnquiryIcon,
} from '../../components/SpriteIcon';
import EnquiryInfo from '../../components/EnquiryInfo';
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
const ButtonSearchWrap = styled('div')`
  display: flex;
  @media (max-width: 992px) {
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
  }
`;
const SearchWrap = styled('div')`
  width: 100%;
  margin: 0.5rem 1rem;
  @media (max-width: 992px) {
    margin: 0;
  }
  @media (min-width: 993px) {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
`;
const DesktopSearch = styled(Search)`
  @media (min-width: 993px) {
    width: 27rem;
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
  @media (max-width: 992px) {
    font-size: 1rem;
    width: 20rem;
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

const FilterWrap = styled('div')`
  display: flex;
  @media (max-width: 992px) {
    flex-direction: column;
  } ;
`;
const Filter = styled('div')`
  font-size: 1.4rem;
  margin: 0.5rem 1rem;
  @media (max-width: 992px) {
    margin: 0;
  } ;
`;
const Label = styled('p')`
  font-size: 1.4rem;
  margin: 0.5rem 0;
  font-family: ${MontserratRegular};
`;
const FilterDropdn = styled('div')`
  width: 27rem;
`;
class EnquiryDirectory extends React.Component {
  constructor(props) {
    super(props);
    let isMobile = false;
    if (typeof window === 'object') {
      isMobile = window.innerWidth <= 992;
    }
    this.props.showHeaderHandle(); // to show the header
    this.state = {
      showFilterIconInMobile: isMobile,
      showFilters: !isMobile,
      showEnquiryInfo: false,
      enquiryInfo: {
        name: '',
        mobileNumber: '',
        branchName: '',
        mailId: '',
      },
    };
  }
  onSearch = (searchText) => {
    this.props.dispatch(searchEnquiry({ searchText }));
  };
  getPageData = () => {
    const { enquiryData = [], paginationInfo } = this.props;
    const { offset, limit } = paginationInfo;
    return enquiryData.slice(offset, limit);
  };
  onPageSelect = (pageNo) => {
    this.props.dispatch(updatePage({ pageNo }));
  };
  componentDidMount() {
    const { isLoaded } = get(this.props, 'pageData.enquiryInfo', {});
    if (!isLoaded) this.props.dispatch(getEnquiryDetails());
    window.addEventListener('resize', this.resizeListener);
  }
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
  onSelectMember = (data) => {
    console.log('data', data);
    const { name, branch: branchName, mailId, mobile: mobileNumber } =
      data || {};
    this.setState({
      showEnquiryInfo: true,
      enquiryInfo: {
        name,
        branchName,
        mailId,
        mobileNumber,
      },
    });
  };
  onCloseEnquiryInfo = () => {
    this.setState({
      showEnquiryInfo: false,
    });
  };
  render() {
    const {
      paginationInfo,
      pageData,
      getBranchInfo = () => {},
      getPlanInfo = () => {},
      branchDetails,
      filters,
    } = this.props;
    const {
      showFilterIconInMobile,
      showFilters,
      enquiryInfo,
      showEnquiryInfo,
    } = this.state;
    const { totalPages, activePage } = paginationInfo;
    const selectedBranchFilterIndex = get(filters, 'branch.index');
    const { isLoading } = get(pageData, 'enquiryInfo', {});
    const branchFilters = constructBranchFilters(branchDetails);

    return (
      <Wrapper>
        <ButtonSearchWrap>
          <ButtonWrap>
            <RegisterNewMemberCTA
              onClick={() => this.props.history.push(ENQUIRY_FORM_ROUTE)}
            >
              <EnquiryIcon
                className={cx(
                  HoverEnquiryIcon,
                  css`
                    margin-right: 1rem;
                  `,
                )}
              />
              Add New Enquiry
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
              placeholder="Search by Name"
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
              <Search onSearch={this.onSearch} placeholder="Search by Name" />
            </SearchWrap>
            <Filter>
              <Label>Branch</Label>
              <FilterDropdn>
                <DropDown
                  name="ed-branch-filter"
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
                      }),
                    );
                  }}
                />
              </FilterDropdn>
            </Filter>
          </FilterWrap>
        )}
        <CardLayout
          type={ENQUIRY_DIRECTORY_LAYOUT}
          data={this.getPageData()}
          isLoading={isLoading}
          getBranchInfo={getBranchInfo}
          getPlanInfo={getPlanInfo}
          showDueColumn={false}
          hideMemberId
          hidePlan
          showEmail
          showMobile
          isClickable
          onSelectMember={this.onSelectMember}
        />
        <PaginationWrap>
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onSelect={this.onPageSelect}
            name="enquiryDirectory"
          />
        </PaginationWrap>
        <EnquiryInfo
          show={showEnquiryInfo}
          onClose={this.onCloseEnquiryInfo}
          {...enquiryInfo}
        />
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pageData: selectEDPage(state),
    enquiryData: selectDataSourceForEDPage(state),
    paginationInfo: selectPaginationInEDPage(state),
    filters: selectFiltersInEDPage(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
EnquiryDirectory.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(EnquiryDirectory);
