import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectHomePageState } from '../../selectors';
import MembersInfo from '../../components/MembersInfo';
import Search from '../../components/Search';
import PaymentPopup from '../../components/PaymentPopup';

const Wrapper = styled('div')`
  width: 100%;
  margin-top: 6.4rem;
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
    this.state = {
      close: true,
      paymentPopupInfo: {
        open: false,
        memberInfo: {},
      },
    };
    this.props.showHeaderHandle(); // to show the header
  }
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
    console.log('state', this.state);
    const { homePage } = this.props;
    return (
      <Wrapper>
        <Search />
        <MembersInfo openPaymentPopup={this.openPaymentPopup} />
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
    homePage: selectHomePageState(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
HomePage.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
