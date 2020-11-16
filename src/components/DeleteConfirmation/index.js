import React from 'react';
import styled from 'react-emotion';
import { GREEN, RED, WHITE } from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
import Button from '../Button';
import Modal from '../Modal';
const Wrap = styled('div')`
  display: flex;
  padding: 1.2rem;
  flex-direction: column;
  margin: 2rem;
`;
const Title = styled('div')`
  color: ${RED};
  font-size: 1.8rem;
  @media (max-width: 992px) {
    font-size: 1.6rem;
  }
`;
const Info = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.2rem 0;
`;
const FieldWrap = styled('div')`
  display: flex;
  margin: 0.5rem 2rem;
  align-items: center;
`;
const Label = styled('p')`
  font-size: 1.4rem;
  font-family: ${MontserratBold};
`;
const Value = styled('p')`
  margin-left: 1rem;
  font-size: 1.4rem;
  font-family: ${MontserratRegular};
`;
const Controls = styled('div')`
  display: flex;
`;
const Yes = styled(Button)`
  color: ${WHITE};
  background: ${RED};
  font-size: 1.2rem;
  :hover {
    border: 1px solid ${RED};
    background: ${WHITE};
    color: ${RED};
  }
`;
const No = styled(Button)`
  color: ${WHITE};
  border: 1px solid ${GREEN};
  background: ${GREEN};
  font-size: 1.2rem;
  :hover {
    background: ${WHITE};
    color: ${GREEN};
  }
`;
function DeleteConfirmation({
  show = false,
  close,
  name,
  memberId,
  confirmDeleteMember,
}) {
  return (
    <Modal show={show} close={close} closeButton>
      <Wrap>
        <Title>Are your sure ,want to delete ? </Title>
        <Info>
          <FieldWrap>
            <Label>Name</Label>
            <Value>{name}</Value>
          </FieldWrap>
          <FieldWrap>
            <Label>MemberId</Label>
            <Value>{memberId}</Value>
          </FieldWrap>
        </Info>
        <Controls>
          <Yes onClick={confirmDeleteMember}>Yes</Yes>
          <No onClick={close}>No</No>
        </Controls>
      </Wrap>
    </Modal>
  );
}
export default DeleteConfirmation;
