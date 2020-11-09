import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import '../../../globalStyles';
import { connect } from 'react-redux';
import { BG_COLOR } from '../../constants';
import Header from '../../components/Header';
import ToasterManager from '../../components/ToasterManager';
import {
  selectBranchDetails,
  selectInfoLoadedState,
  selectLoginState,
  selectToasterConf,
} from '../../selectors/';
import SplashScreen from '../../components/SplashScreen';
import { getAdminInfo } from './actions';
import { LOGIN_ROUTE } from '../../routes';
const Wrap = styled('div')`
  background: ${BG_COLOR};
  height: 100%;
`;
const ChildrenWrap = styled('div')``;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.deferredPrompt = null;
    this.state = {
      showInstallUI: false,
      showHeader: false,
      mountToasterManager: false,
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
  mountToasterManager = () =>
    this.setState({
      mountToasterManager: true,
    });
  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt);
    window.addEventListener('appinstalled', this.appInstalled);
    this.props.dispatch(getAdminInfo());
    this.mountToasterManager();
  }

  componentDidUpdate(prevProps) {
    const {
      isLoggedIn: isLoggedInPrevProp,
      infoLoaded: infoLoadedPrevProp,
    } = prevProps;
    const { isLoggedIn, infoLoaded } = this.props;
    // going back to previous page once logged in

    if (infoLoadedPrevProp !== infoLoaded && infoLoaded) {
      console.log(
        'debugger',
        infoLoadedPrevProp,
        infoLoaded,
        isLoggedInPrevProp,
        isLoggedIn,
      );
      if (isLoggedInPrevProp !== isLoggedIn && isLoggedIn) {
        const currentUrl = this.props.history.location.pathname;
        if (currentUrl === LOGIN_ROUTE) this.props.history.goBack();
      } else if (!isLoggedIn) {
        this.props.history.push('/login');
      }
    }
  }
  closeInstallUI = () => {
    this.setState({
      showInstallUI: false,
    });
  };
  showHeaderHandle = () => {
    this.setState({
      showHeader: true,
    });
  };
  render() {
    const { route = {}, toasterConf, isLoggedIn, infoLoaded } = this.props;
    const { showInstallUI, showHeader, mountToasterManager } = this.state;
    return (
      <Wrap>
        {showInstallUI && (
          <button onClick={this.promptUserToInstall}>Add to home screen</button>
        )}
        <Header show={this.state.showHeader} />
        {!infoLoaded && false ? (
          <SplashScreen />
        ) : (
          renderRoutes(route.routes, {
            ...this.props,
            showHeaderHandle: this.showHeaderHandle,
          })
        )}
        {mountToasterManager && <ToasterManager {...toasterConf} />}
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    isLoggedIn: selectLoginState(state),
    toasterConf: selectToasterConf(state),
    infoLoaded: selectInfoLoadedState(state),
    branchDetails: selectBranchDetails(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  route: PropTypes.object,
};
