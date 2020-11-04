import React, { useState, useEffect } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { selectHomePageState } from '../../selectors';
import LiveTestResults from '../../components/LiveTestResults';
import OverallResults from '../../components/OverallResults';

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

  render() {
    return (
      <Container>
        <Header {...this.props} />
        <ContentWrap>
          <LiveTestResults />
          <OverallResults />
        </ContentWrap>
      </Container>
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
