import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import validations from '../../utils/validations';
import { MontserratRegular } from '../../utils/fonts';
import { DARK_BLUE, RED } from '../../constants';
const InputWrap = styled('div')`
  width: 100%;
  font-family: ${MontserratRegular};
`;
const StyledInput = styled('input')`
  outline: none;
  border: none;
  height: 3.4rem;
  width: 100%;
  font-size: 1.4rem;
  font-family: ${MontserratRegular};
  background: none;
  border-bottom: 1px solid ${DARK_BLUE};
  &:focus {
    border-bottom: 1px solid ${DARK_BLUE};
  }
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;
const ErrorSpan = styled('span')`
  color: ${RED};
  font-size: 1.1rem;
  font-family: ${MontserratRegular};
  min-height: 1.4rem;
  display: inline-block;
`;
const Section1 = styled('div')`
  display: flex;
`;
export default class Input extends React.Component {
  onValueChange = (event) => {
    const { name, value } = event.target;
    const { onValueChange } = this.props;
    const state = { ...this.props.state };
    if (onValueChange) {
      state.value = value;
      state.error = !validations.check(state);
      if (value.length > 0) state.dirty = true;
      onValueChange({
        [name]: state,
      });
    }
  };
  render() {
    const {
      state,
      className = '',
      showError = false,
      errorText = 'Default error text',
      showCustomElement,
      CustomElement,
      // eslint-disable-next-line no-unused-vars
      onValueChange = () => {},
      ...restProps
    } = this.props;
    return (
      <InputWrap className={className}>
        <Section1>
          <StyledInput
            value={state.value}
            onChange={this.onValueChange}
            {...restProps}
          />
          {showCustomElement && <CustomElement />}
        </Section1>

        {<ErrorSpan>{showError ? errorText : ' '}</ErrorSpan>}
      </InputWrap>
    );
  }
}
Input.propTypes = {
  state: PropTypes.shape({
    value: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    dirty: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }),
  showError: PropTypes.bool,
  onValueChange: PropTypes.func,
  className: PropTypes.string,
  errorText: PropTypes.string,
  showCustomElement: PropTypes.bool,
  CustomElement: PropTypes.any,
};
