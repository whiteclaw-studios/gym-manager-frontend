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
import NavBar from '../../components/NavBar';
import { get } from '../../utils/helpers';
const Wrap = styled('div')`
  background: ${BG_COLOR};
  height: 100%;
`;
const ChildrenWrap = styled('div')`
  margin-left: 6.4rem;
  @media (max-width: 992px) {
    margin-left: 0;
  }
`;
const hideNavForRoutes = [LOGIN_ROUTE];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.deferredPrompt = null;
    this.state = {
      showInstallUI: false,
      showHeader: false,
      mountToasterManager: false,
      mountNavBar: false,
      showNavBar: true,
      expandNavbar: false,
      navmenu: {
        activeIndex: -1,
      },
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
  mountElements = () =>
    this.setState({
      mountToasterManager: true,
      mountNavBar: true,
    });
  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt);
    window.addEventListener('appinstalled', this.appInstalled);
    this.props.dispatch(getAdminInfo());
    this.mountElements();
    window.addEventListener('resize', this.hideHeaderInMobile);
  }

  componentDidUpdate(prevProps) {
    const {
      isLoggedIn: isLoggedInPrevProp,
      isAdminInfoLoaded: infoLoadedPrevProp,
    } = prevProps;
    const { isLoggedIn, isAdminInfoLoaded } = this.props;
    // going back to previous page once logged in

    if (infoLoadedPrevProp !== isAdminInfoLoaded && isAdminInfoLoaded) {
      console.log(
        'debugger',
        infoLoadedPrevProp,
        isAdminInfoLoaded,
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
    this.hideHeaderInMobile();
  }
  hideHeaderInMobile = () => {
    const { expandNavbar, showNavBar } = this.state;
    if (window.innerWidth <= 992 && !expandNavbar && showNavBar) {
      this.setState({
        showNavBar: false,
      });
    } else if (
      window.innerWidth > 992 &&
      !showNavBar &&
      this.props.history.location.pathname !== LOGIN_ROUTE
    ) {
      this.setState({
        showNavBar: true,
      });
    }
  };
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
  hideHeader = () => {
    this.setState({
      showHeader: false,
    });
  };
  updateActiveNavIndex = (index) => {
    console.log('index', index);
    this.setState({
      navmenu: {
        activeIndex: index,
      },
    });
  };
  showNavBar = () => {
    this.setState({
      showNavBar: true,
    });
  };
  hideNavBar = () => {
    this.setState({
      showNavBar: false,
    });
  };
  expandNavbar = () => {
    this.setState({
      expandNavbar: true,
    });
  };
  shrinkNavbar = () => {
    this.setState({
      expandNavbar: false,
    });
  };

  render() {
    const { route = {}, toasterConf, isAdminInfoLoaded } = this.props;
    const {
      showInstallUI,
      showHeader,
      mountToasterManager,
      mountNavBar,
      showNavBar,
      navmenu = {},
    } = this.state;
    return (
      <Wrap>
        {showInstallUI && (
          <button onClick={this.promptUserToInstall}>Add to home screen</button>
        )}
        <Header
          show={this.state.showHeader}
          expandNavbar={this.expandNavbar}
          showNavBar={this.showNavBar}
        />
        {!isAdminInfoLoaded ? (
          <SplashScreen />
        ) : (
          <ChildrenWrap>
            {renderRoutes(route.routes, {
              ...this.props,
              showHeaderHandle: this.showHeaderHandle,
              hideHeader: this.hideHeader,
              showNavBar: this.showNavBar,
              hideNavBar: this.hideNavBar,
            })}
          </ChildrenWrap>
        )}
        {mountNavBar && showNavBar && (
          <NavBar
            activeIndex={navmenu.activeIndex}
            updateActiveNavIndex={this.updateActiveNavIndex}
            history={this.props.history}
            expandNavbar={this.expandNavbar}
            shrinkNavbar={this.shrinkNavbar}
            navbarState={this.state.expandNavbar}
            hideNavBar={this.hideNavBar}
          />
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
    isAdminInfoLoaded: selectInfoLoadedState(state),
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
