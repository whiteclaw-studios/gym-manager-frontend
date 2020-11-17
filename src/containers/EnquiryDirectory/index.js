import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import MembersInfo from '../../components/MembersInfo';
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
import {
  constructBranchFilters,
  constructPlanFilters,
  get,
} from '../../utils/helpers';
import { MontserratRegular } from '../../utils/fonts';
import DropDown from '../../components/Dropdown';
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
  margin: 0.5rem 1rem;
  @media (max-width: 992px) {
    margin: 0;
  } ;
`;
const ButtonWrap = styled('div')`
  width: 100%;
  width: 27rem;
  margin: 0.5rem 1rem;
`;
const RegisterNewMember = styled(Button)`
  color: ${SECONDARY_BLACK};
  background: ${WHITE};
  border: none;
  margin-bottom: 1.2rem;
  box-shadow: 0px 1px 4px #a9a9a9;
  height: 3.4rem;
  font-size: 1.2rem;
  padding: 0;
`;
const PaginationWrap = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2.4rem 0;
`;

const FilterWrap = styled('div')`
  display: flex;
  @media (max-width: 640px) {
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
    this.props.showHeaderHandle(); // to show the header
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
  }
  render() {
    const {
      paginationInfo,
      pageData,
      getBranchInfo = () => {},
      getPlanInfo = () => {},
      branchDetails,
      filters,
    } = this.props;
    const { totalPages, activePage } = paginationInfo;
    const selectedBranchFilterIndex = get(filters, 'branch.index');
    const { isLoading } = get(pageData, 'enquiryInfo', {});
    const branchFilters = constructBranchFilters(branchDetails);

    return (
      <Wrapper>
        <FilterWrap>
          <SearchWrap>
            <Search onSearch={this.onSearch} placeholder="Search by name" />
          </SearchWrap>
          <ButtonWrap>
            <RegisterNewMember
              onClick={() => this.props.history.push(ENQUIRY_FORM_ROUTE)}
            >
              Add New Enquiry
            </RegisterNewMember>
          </ButtonWrap>
        </FilterWrap>

        <FilterWrap>
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

        <MembersInfo
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
        />
        <PaginationWrap>
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onSelect={this.onPageSelect}
            name="enquiryDirectory"
          />
        </PaginationWrap>
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
