import React from 'react';
import styled from 'react-emotion';
import Button from '../../components/Button';
import MembersInfo from '../../components/MembersInfo';
import Search from '../../components/Search';
import {
  ENQUIRY_DIRECTORY_LAYOUT,
  SECONDARY_BLACK,
  WHITE,
} from '../../constants';
import { ENQUIRY_FORM_ROUTE } from '../../routes';
const Wrapper = styled('div')`
  width: 100%;
  margin-top: 6.4rem;
  padding: 0 6.4rem;
  padding-top: 2.4rem;
  @media (max-width: 992px) {
    margin-top: 4rem;
    padding-top: 1.2rem;
  }
`;
const ButtonWrap = styled('div')`
  width: 100%;
`;
const RegisterNewMember = styled(Button)`
  color: ${SECONDARY_BLACK};
  background: ${WHITE};
  border: none;
  margin-bottom: 1.2rem;
  box-shadow: 0px 1px 4px #a9a9a9;
`;
class EnquiryDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.props.showHeaderHandle(); // to show the header
  }
  render() {
    return (
      <Wrapper>
        <Search />
        <ButtonWrap>
          <RegisterNewMember
            onClick={() => this.props.history.push(ENQUIRY_FORM_ROUTE)}
          >
            Add New Enquiry
          </RegisterNewMember>
        </ButtonWrap>
        <MembersInfo type={ENQUIRY_DIRECTORY_LAYOUT} />
      </Wrapper>
    );
  }
}
export default EnquiryDirectory;
