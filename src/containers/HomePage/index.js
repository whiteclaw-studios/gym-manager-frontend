import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { selectHomePageState } from '../../selectors';

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
  }

  render() {
    const { homePage } = this.props;
    return (
      <Container>
        <Header {...this.props} />
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
