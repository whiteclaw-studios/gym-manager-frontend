import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectHomePageState, selectHPDataSource } from '../../selectors';
import MembersInfo from '../../components/MembersInfo/Loadable';
import PaymentPopup from '../../components/PaymentPopup';
import { FEES_LAYOUT } from '../../constants';
import { getFeeDueDetails } from './actions';
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
const ContentWrap = styled('h1')`
  display: flex;
  width: 100%;
  @media (max-width: 992px) {
    flex-direction: column-reverse;
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
  render() {
    const {
      feeDueDetails = [],
      getBranchInfo = () => {},
      getPlanInfo = () => {},
      pageData,
    } = this.props;
    const { isLoading } = get(pageData, 'memberFeesInfo', {});
    console.log('HomePage', pageData, isLoading);

    return (
      <Wrapper>
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
