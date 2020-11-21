import React, { useState } from 'react';
import styled from 'react-emotion';
import { GREEN, WHITE } from '../../constants';
const Wrap = styled('div')`
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #eee;
    width: 2rem;
    height: 2rem;
    border: 1px solid ${GREEN};
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    border: 1px solid ${GREEN};
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: ${GREEN};
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 5px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: 1px solid ${WHITE};
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;
const Input = styled('input')`
  outline: 1px solid ${GREEN};
`;
function Checkbox({ onSelect = () => {}, className = '' }) {
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
    if (onSelect) onSelect(!checked);
  };
  return (
    <Wrap className={className}>
      <label class="container">
        <Input type="checkbox" onClick={handleClick} />
        <span class="checkmark"></span>
      </label>
    </Wrap>
  );
}
export default Checkbox;
