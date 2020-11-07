import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import '../../../globalStyles';
import { connect } from 'react-redux';
import { BG_COLOR } from '../../constants';
import Header from '../../components/Header';
import ToasterManager from '../../components/ToasterManager';
import { selectLoginState, selectToasterConf } from '../../selectors/';
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
    window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt);
    window.addEventListener('appinstalled', this.appInstalled);

    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      // if not loggedin redirect to login
      this.props.history.push('/login');
    }
  }
  componentDidUpdate(prevProps) {
    const { isLoggedIn: isLoggedInPrevProp } = prevProps;
    const { isLoggedIn } = this.props;
    // going back to previous page once logged in
    if (isLoggedInPrevProp !== isLoggedIn && isLoggedIn) {
      this.props.history.goBack();
    }
  }
  closeInstallUI = () => {
    this.setState({
      showInstallUI: false,
    });
  };
  render() {
    const { route = {}, toasterConf } = this.props;
    const { showInstallUI } = this.state;
    return (
      <Wrap>
        {showInstallUI && (
          <button onClick={this.promptUserToInstall}>Add to home screen</button>
        )}
        <Header />
        {renderRoutes(route.routes, {
          ...this.props,
        })}
        <ToasterManager {...toasterConf} />
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    isLoggedIn: selectLoginState(state),
    toasterConf: selectToasterConf(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  route: PropTypes.object,
};
