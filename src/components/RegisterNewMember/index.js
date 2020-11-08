import React from 'react';
import styled from 'react-emotion';
import { WHITE } from '../../constants';
import Button, { InvertSecondaryButton, SecondaryButton } from '../Button';
import DropDown from '../Dropdown';
import Input from '../Input';
const Wrap = styled('div')`
  width: 100%;
  margin-top: 6.4rem;
  padding: 0 6.4rem;
  padding-top: 2.4rem;
  display: flex;
  justify-content: center;
  @media (max-width: 992px) {
    margin-top: 4rem;
    padding: 0 2.4rem;
    padding-top: 1.2rem;
  }
`;
const Content = styled('div')`
  background: ${WHITE};
  box-shadow: 0px 1px 4px #a9a9a9;
  padding: 3.2rem;
`;
const Title = styled('div')`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 2.4rem;
`;
const Row = styled('div')`
  display: flex;
`;
const Column = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;
const Label = styled('label')`
  opacity: 0.6;
`;
const InputWrap = styled('div')`
  margin: 0.5rem 0;
`;
const NameInput = styled(Input)`
  width: 20rem;
`;
const AgeInput = styled(Input)`
  width: 20rem;
`;

const MobileInput = styled(Input)`
  width: 20rem;
`;

const Controls = styled('div')`
  display: flex;
  margin: 2.4rem 0 0;
`;
const Register = styled(SecondaryButton)`
  margin-left: 1.2rem;
  font-size: 1.4rem;
`;
const Cancel = styled(InvertSecondaryButton)`
  font-size: 1.4rem;
`;
export default class RegisterNewMember extends React.Component {
  constructor(props) {
    super(props);
    this.props.showHeaderHandle(); // to show the header
    this.state = {
      name: {
        value: '',
        dirty: false,
        error: false,
        type: 'username',
      },
      age: {
        value: '',
        dirty: false,
        error: false,
        type: 'number',
      },
      mobile: {
        value: '',
        dirty: false,
        error: false,
        type: 'number',
      },
    };
  }
  render() {
    const { name, age } = this.state;
    return (
      <Wrap>
        <Content>
          <Title>Register New Member</Title>
          <Row>
            <Column>
              <InputWrap>
                <Label>Name</Label>
                <NameInput state={name} name="name" />
              </InputWrap>
              <InputWrap>
                <Label>Branch</Label>
                <DropDown listItems={['Thiruvottiyur', 'tambaram']} />
              </InputWrap>
              <InputWrap>
                <Label>Gender</Label>
                <DropDown listItems={['Male', 'Female', 'Others']} />
              </InputWrap>
            </Column>
            <Column>
              <InputWrap>
                <Label>Age</Label>
                <AgeInput state={age} name="age" />
              </InputWrap>
              <InputWrap>
                <Label>Mobile</Label>
                <MobileInput state={age} name="age" />
              </InputWrap>
              <InputWrap>
                <Label>Plan</Label>
                <DropDown listItems={['$200/month', '$500/year']} />
              </InputWrap>
            </Column>
          </Row>
          <Controls>
            <Cancel>Cancel</Cancel>
            <Register>Register</Register>
          </Controls>
        </Content>
      </Wrap>
    );
  }
}
