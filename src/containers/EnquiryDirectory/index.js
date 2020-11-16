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
} from '../../selectors';
import { getEnquiryDetails, searchEnquiry } from './actions';
import { get } from '../../utils/helpers';
const Wrapper = styled('div')`
  width: 100%;
  padding: 0 6.4rem;
  padding-top: 2.4rem;
  @media (max-width: 992px) {
    margin-top: 4rem;
    padding-top: 1.2rem;
  }
`;
const ButtonWrap = styled('div')`
  width: 100%;
`;
const RegisterNewMember = styled(Button)`
  color: ${SECONDARY_BLACK};
  background: ${WHITE};
  border: none;
  margin-bottom: 1.2rem;
  box-shadow: 0px 1px 4px #a9a9a9;
`;
const PaginationWrap = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2.4rem 0;
`;
class EnquiryDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.props.showHeaderHandle(); // to show the header
  }
  onSearch = (searchText) => {
    console.log('searchText', searchText);

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
    } = this.props;
    const { totalPages, activePage } = paginationInfo;
    const { isLoading } = get(pageData, 'enquiryInfo', {});
    console.log('EnquiryPage', this.props);
    return (
      <Wrapper>
        <Search onSearch={this.onSearch} />
        <ButtonWrap>
          <RegisterNewMember
            onClick={() => this.props.history.push(ENQUIRY_FORM_ROUTE)}
          >
            Add New Enquiry
          </RegisterNewMember>
        </ButtonWrap>
        <MembersInfo
          type={ENQUIRY_DIRECTORY_LAYOUT}
          data={this.getPageData()}
          isLoading={isLoading}
          getBranchInfo={getBranchInfo}
          getPlanInfo={getPlanInfo}
          showDueColumn={false}
          hideMemberId
          hidePlan
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
EnquiryDirectory.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(EnquiryDirectory);
