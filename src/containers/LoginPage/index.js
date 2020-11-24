import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLoginPageState } from '../../selectors';
import styled from 'react-emotion';
import Input from '../../components/Input';
import { DARK_BLUE, GREEN, FITBOSS_LOGO, WHITE } from '../../constants';
import Button from '../../components/Button';
import LinkTag from '../../components/LinkTag';
import { loginWithPassword } from './actions';
import { validateLoginInputs } from '../../utils/helpers';
import { getAdminInfo } from '../App/actions';
import { DASHBOARD_ROUTE } from '../../routes';
import EllipsisLoader from '../../components/EllipsisLoader';

const Container = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6rem 0 3rem !important;
  @media (max-width: 992px) {
    padding: 2rem;
  }
`;
const LoginWrap = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${WHITE};
  box-shadow: 4px 4px 12px 0 rgba(0, 0, 0, 0.16);
  padding: 2.4rem;
  margin: 5rem 0 3.6rem;
  @media (max-width: 420px) {
    max-width: 28rem;
  }
`;
const Title = styled('p')`
  color: ${DARK_BLUE};
  font-size: 3.2rem;
  text-align: center;
  margin: 2.4rem;
`;
const UsernameWrap = styled('div')`
  margin-bottom: 2.4rem;
  width: 40rem;
  @media (max-width: 420px) {
    width: 23rem;
  }
`;
const PasswordWrap = styled('div')`
  margin-bottom: 2.4rem;
  width: 40rem;
  @media (max-width: 420px) {
    width: 23rem;
  }
`;
const ButtonWrap = styled('div')`
  margin: 2.4rem 0;
  width: 100%;
`;
const LoaderWrap = styled('div')`
  width: 40rem;
  margin: 2.4rem 0;
  text-align: center;
  border: 1px solid ${GREEN};
  > div {
    width: 64px;
    height: 44px;
    top: -10px;
  }
  @media (max-width: 420px) {
    width: 23rem;
  }
`;
const LogoWrap = styled('div')`
  width: 10rem;
  height: 2rem;
`;
const Logo = styled('img')`
  width: 100%;
  height: 100%;
`;
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: '',
        error: false,
        dirty: false,
        type: 'username',
      },
      password: {
        value: '',
        error: false,
        dirty: false,
        type: 'password',
      },
      loaderState: false,
    };
  }
  onInputChange = (data) => {
    this.setState(data);
  };
  showLoader = () => {
    this.setState({
      loaderState: true,
    });
  };
  hideLoader = () => {
    this.setState({
      loaderState: false,
    });
  };

  onLogin = () => {
    const { username, password } = this.state;
    const { isValid, output } = validateLoginInputs(this.state, [
      'username',
      'password',
    ]);
    if (isValid) {
      this.showLoader();
      this.props.dispatch(
        loginWithPassword({
          userName: username.value,
          password: password.value,
          successCallback: () => {
            this.props.dispatch(getAdminInfo());
            this.props.history.push(DASHBOARD_ROUTE);
            const { updateActiveNavIndex } = this.props;
            updateActiveNavIndex(0);
            this.hideLoader();
          },
          failureCallback: () => {
            this.hideLoader();
          },
        }),
      );
    } else {
      this.setState(output);
    }
  };
  componentDidMount() {
    const root = document.getElementById('root');
    root.classList.add('stop-scroll');
    this.props.hideHeader();
    this.props.hideNavBar();
  }

  componentWillUnmount() {
    const root = document.getElementById('root');
    root.classList.remove('stop-scroll');
    this.props.showNavBar();
  }
  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.onLogin();
    }
  };
  onNameEnter = (e) => {
    const { password } = this.state;
    if (e.key === 'Enter' && password.value && !password.error) {
      this.onLogin();
    }
  };
  render() {
    const { loginPage } = this.props;
    const { username, password, loaderState = false } = this.state;
    return (
      <Container>
        <LoginWrap>
          <React.Fragment>
            <LogoWrap>
              <Logo src={FITBOSS_LOGO} />
            </LogoWrap>
            <Title>Login</Title>

            <UsernameWrap>
              <Input
                name="username"
                state={username}
                placeholder="User name"
                onValueChange={this.onInputChange}
                showError={username.error}
                errorText="Invalid username"
                onKeyDown={this.onNameEnter}
              />
            </UsernameWrap>
            <PasswordWrap>
              <Input
                name="password"
                state={password}
                placeholder="Password"
                onValueChange={this.onInputChange}
                type="password"
                showError={password.error}
                errorText="Invalid password"
                onKeyDown={this.onEnter}
              />
            </PasswordWrap>
            {loaderState ? (
              <LoaderWrap>
                <EllipsisLoader />
              </LoaderWrap>
            ) : (
              <ButtonWrap>
                <Button onClick={loaderState ? () => {} : this.onLogin}>
                  Login
                </Button>
              </ButtonWrap>
            )}
            <LinkTag
              onClick={(e) => {
                e.preventDefault();
                this.props.history.push('/forgot-password');
              }}
            >
              Forgot Password?
            </LinkTag>
          </React.Fragment>
        </LoginWrap>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginPage: selectLoginPageState(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
LoginPage.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
