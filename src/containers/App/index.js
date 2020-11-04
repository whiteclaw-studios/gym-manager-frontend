import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import '../../../globalStyles';
import { connect } from 'react-redux';
import { BG_COLOR, SOCKET_CLIENT_URL } from '../../constants';
import socketIOClient from 'socket.io-client';

const Wrap = styled('div')`
  background: ${BG_COLOR};
  height: 100%;
  margin-top: 6.4rem;
  @media (max-width: 992px) {
    margin-top: 4rem;
  }
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }
  componentDidMount() {
    const socket = socketIOClient(SOCKET_CLIENT_URL);
    socket.on('FromAPI', (data) => {
      // console.log('data received', data);
      this.setState({
        data,
      });
    });
  }
  render() {
    const { route = {} } = this.props;
    return (
      <Wrap>
        {renderRoutes(route.routes, {
          ...this.props,
        })}
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  route: PropTypes.object,
};
