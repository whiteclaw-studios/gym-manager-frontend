import React, { useState, useEffect } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { selectHomePageState, selectTestCases } from '../../selectors';
import LiveTestResults from '../../components/LiveTestResults';
import OverallResults from '../../components/OverallResults';
import { SOCKET_CLIENT_URL } from '../../constants';
import socketIOClient from 'socket.io-client';
import { addTestCase } from './actions';
const Container = styled('div')`
  width: 100%;
`;
const ContentWrap = styled('div')`
  display: flex;
  width: 100%;
  @media (max-width: 992px) {
    flex-direction: column-reverse;
  }
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const socket = socketIOClient(SOCKET_CLIENT_URL);
    socket.on('completed', (testCase, status) => {
      console.log('data received', testCase, status);
      this.props.dispatch(addTestCase({ testCase, status }));
    });
  }
  render() {
    const { testCases, homePage } = this.props;
    const { testCasesOverview = [] } = homePage;
    console.log('homepage props', this.props);
    return (
      <Container>
        <Header {...this.props} />
        <ContentWrap>
          <LiveTestResults testCases={testCases} />
          <OverallResults testCasesOverview={testCasesOverview} />
        </ContentWrap>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homePage: selectHomePageState(state),
    testCases: selectTestCases(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
HomePage.propTypes = {
  route: PropTypes.object,
  testCases: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
