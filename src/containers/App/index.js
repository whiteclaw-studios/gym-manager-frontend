import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import '../../../globalStyles';
import { connect } from 'react-redux';
import { BG_COLOR, RED } from '../../constants';
import Header from '../../components/Header';
import ToasterManager from '../../components/ToasterManager';
import {
  selectBranchDetails,
  selectInfoLoadedState,
  selectLoginState,
  selectToasterConf,
  getBranchInfo,
  getPlanInfo,
  selectAllowedBranchDetails,
  selectLogo,
  selectAppState,
} from '../../selectors/';
import SplashScreen from '../../components/SplashScreen';
import { getAdminInfo } from './actions';
import { LOGIN_ROUTE } from '../../routes';
import NavBar from '../../components/NavBar';
import { get } from '../../utils/helpers';
import {
  DashboardIcon,
  EnquiryIcon,
  HoverDashBoardIcon,
  HoverEnquiryIcon,
  HoverProfileIcon,
  LogoutIcon,
  ProfileIcon,
} from '../../components/SpriteIcon';
import PageLoader from '../../components/PageLoader';
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
const Error = styled('div')`
  color: ${RED};
  font-size: 1.4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const menus = [
  {
    menu: 'Dashboard',
    Icon: DashboardIcon,
    url: '/dashboard',
    hoverIconCss: HoverDashBoardIcon,
  },
  {
    menu: 'Members Directory',
    Icon: ProfileIcon,
    url: '/members-directory',
    hoverIconCss: HoverProfileIcon,
  },
  {
    menu: 'Enquiry Details',
    Icon: EnquiryIcon,
    url: '/enquiry-directory',
    hoverIconCss: HoverEnquiryIcon,
  },
];
const footerMenus = [
  {
    menu: 'Logout',
    Icon: LogoutIcon,
  },
];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.deferredPrompt = null;

    this.state = {
      hasError: false,
      showInstallUI: false,
      showHeader: false,
      mountToasterManager: false,
      mountNavBar: false,
      showNavBar: true,
      expandNavbar: false,
      navmenu: {
        activeIndex: this.findCurrentIndex() || 0,
      },
    };
  }
  findCurrentIndex = () => {
    let currentRoute = get(this.props, 'history.location.pathname', '');
    let activeIndex = -1;
    menus.map((menu, index) => {
      if (menu.url === currentRoute) activeIndex = index;
    });
    return activeIndex;
  };
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
      history: historyPrevProp,
    } = prevProps;
    const { isLoggedIn, isAdminInfoLoaded, history } = this.props;
    // going back to previous page once logged in

    if (infoLoadedPrevProp !== isAdminInfoLoaded && isAdminInfoLoaded) {
      if (isLoggedInPrevProp !== isLoggedIn && isLoggedIn) {
        const currentUrl = this.props.history.location.pathname;
        if (currentUrl === LOGIN_ROUTE) {
          this.props.history.goBack();
        }
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
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error(
      'Error caught in App getDerivedStateFromError',
      error.message,
      error.stack,
    );
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error('App componentDidCatch', error);
  }
  render() {
    const {
      route = {},
      toasterConf,
      isAdminInfoLoaded,
      getBranchInfo,
      getPlanInfo,
      allowedBranchInfo,
      logo,
      appState,
    } = this.props;
    const {
      showInstallUI,
      showHeader,
      mountToasterManager,
      mountNavBar,
      showNavBar,
      navmenu = {},
      hasError,
    } = this.state;
    const { pageLoaderState } = appState || {};
    return (
      <Wrap>
        {hasError ? (
          <Error>Something went wrong</Error>
        ) : (
          <React.Fragment>
            {showInstallUI && (
              <button onClick={this.promptUserToInstall}>
                Add to home screen
              </button>
            )}

            <Header
              show={this.state.showHeader}
              expandNavbar={this.expandNavbar}
              showNavBar={this.showNavBar}
              logo={logo}
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
                  getBranchInfo,
                  getPlanInfo,
                  allowedBranchInfo,
                  updateActiveNavIndex: this.updateActiveNavIndex,
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
                logo={logo}
                menus={menus}
                footerMenus={footerMenus}
              />
            )}
            {mountToasterManager && (
              <React.Fragment>
                <ToasterManager {...toasterConf} />
                {pageLoaderState && <PageLoader />}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    appState: selectAppState(state),
    isLoggedIn: selectLoginState(state),
    toasterConf: selectToasterConf(state),
    isAdminInfoLoaded: selectInfoLoadedState(state),
    branchDetails: selectBranchDetails(state),
    getBranchInfo: getBranchInfo(state),
    getPlanInfo: getPlanInfo(state),
    allowedBranchInfo: selectAllowedBranchDetails(state),
    logo: selectLogo(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  route: PropTypes.object,
};
