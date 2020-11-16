import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import MembersInfo from '../../components/MembersInfo';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import {
  MEMBERS_DIRECTORY_LAYOUT,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { REGISTER_MEMBER_ROUTE } from '../../routes';
import {
  selectDataSourceForMDPage,
  selectMDPage,
  selectPaginationInMDPage,
} from '../../selectors';
import { getMemberDetails, searchMembers, updatePage } from './actions';
import { get } from '../../utils/helpers';
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
class MembersDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.props.showHeaderHandle();
  }
  onSearch = (searchText) => {
    console.log('searchText', searchText);

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
  componentDidMount() {
    const { isLoaded } = get(this.props, 'pageData.membersInfo', {});
    if (!isLoaded) this.props.dispatch(getMemberDetails());
  }
  render() {
    const {
      paginationInfo,
      pageData,
      getBranchInfo = () => {},
      getPlanInfo = () => {},
    } = this.props;
    const { totalPages, activePage } = paginationInfo;
    const { isLoading } = get(pageData, 'membersInfo', {});
    console.log('MemberPage', this.props);
    return (
      <Wrapper>
        <Search onSearch={this.onSearch} />
        <ButtonWrap>
          <RegisterNewMember
            onClick={() => this.props.history.push(REGISTER_MEMBER_ROUTE)}
          >
            Register New Member
          </RegisterNewMember>
        </ButtonWrap>
        <MembersInfo
          type={MEMBERS_DIRECTORY_LAYOUT}
          data={this.getPageData()}
          isLoading={isLoading}
          getBranchInfo={getBranchInfo}
          getPlanInfo={getPlanInfo}
          isAllowExpand
        />
        <PaginationWrap>
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onSelect={this.onPageSelect}
          />
        </PaginationWrap>
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pageData: selectMDPage(state),
    membersData: selectDataSourceForMDPage(state),
    paginationInfo: selectPaginationInMDPage(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
MembersDirectory.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(MembersDirectory);
