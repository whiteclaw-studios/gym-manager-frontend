import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLoginPageState } from '../../selectors';
import styled from 'react-emotion';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { DARK_BLUE, WHITE } from '../../constants';
import Button from '../../components/Button';
import LinkTag from '../../components/LinkTag';
import { loginWithPassword } from './actions';
import { validateLoginInputs } from '../../utils/helpers';
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
    width: 25rem;
  }
`;
const PasswordWrap = styled('div')`
  margin-bottom: 2.4rem;
  width: 40rem;
  @media (max-width: 420px) {
    width: 25rem;
  }
`;
const ButtonWrap = styled('div')`
  margin: 2.4rem 0;
  width: 100%;
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
    };
  }
  onInputChange = (data) => {
    this.setState(data);
  };

  onLogin = () => {
    const { username, password } = this.state;
    const { isValid, output } = validateLoginInputs(this.state, [
      'username',
      'password',
    ]);
    if (isValid) {
      this.props.dispatch(
        loginWithPassword({
          userName: username.value,
          password: password.value,
        }),
      );
    } else {
      this.setState(output);
    }
  };
  componentDidMount() {
    const root = document.getElementById('root');
    root.classList.add('stop-scroll');
  }
  componentWillUnmount() {
    const root = document.getElementById('root');
    root.classList.remove('stop-scroll');
  }

  render() {
    const { loginPage } = this.props;
    const { username, password } = this.state;
    return (
      <Container>
        <LoginWrap>
          <Title>Login</Title>
          <UsernameWrap>
            <Input
              name="username"
              state={username}
              placeholder="User name"
              onValueChange={this.onInputChange}
              showError={username.error}
              errorText="Invalid username"
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
            />
          </PasswordWrap>
          <ButtonWrap>
            <Button onClick={this.onLogin}>-></Button>
          </ButtonWrap>
          <LinkTag href="/">Forgot Password?</LinkTag>
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
