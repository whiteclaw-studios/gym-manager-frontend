import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import '../../../globalStyles';
import { connect } from 'react-redux';
import { BG_COLOR } from '../../constants';
import Header from '../../components/Header';

const ChildrenWrap = styled('div')``;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.deferredPrompt = null;
    this.state = {
      showInstallUI: false,
    };
  }
  showInstallPromotion = () => {
    this.setState({
      showInstallUI: true,
    });
  };
  beforeInstallPrompt = (e) => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    console.log('beforeInstallPrompt fired', this.deferredPrompt);
    // Update UI notify the user they can install the PWA
    this.showInstallPromotion();
  };
  appInstalled = (evt) => {
    console.log('app install successfully');
  };
  promptUserToInstall = () => {
    if (!this.deferredPrompt) {
      this.setState({
        showInstallUI: false,
      });
      return;
    }
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.setState({
        showInstallUI: false,
      });
    });
  };
  componentDidMount() {
    console.log('App componentDidMount');
    window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt);
    window.addEventListener('appinstalled', this.appInstalled);
  }
  closeInstallUI = () => {
    this.setState({
      showInstallUI: false,
    });
  };
  render() {
    const { route = {} } = this.props;
    const { showInstallUI } = this.state;
    return (
      <div
        className={css`
          background: ${BG_COLOR};
          height: 100%;
        `}
      >
        {showInstallUI && (
          <button onClick={this.promptUserToInstall}>Add to home screen</button>
        )}
        {/* <Header />g */}
        {renderRoutes(route.routes, {
          ...this.props,
        })}
      </div>
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
