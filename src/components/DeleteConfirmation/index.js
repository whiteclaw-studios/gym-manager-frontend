import React from 'react';
import styled from 'react-emotion';
import { GREEN, RED, WHITE } from '../../constants';
import {
  MontserratBold,
  MontserratLight,
  MontserratRegular,
} from '../../utils/fonts';
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
  font-family: ${MontserratRegular};
  @media (max-width: 992px) {
    font-size: 1.6rem;
  }
`;
const Info = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.2rem 0;
  font-family: ${MontserratLight};
`;

const Controls = styled('div')`
  display: flex;
`;
const Yes = styled(Button)`
  color: ${WHITE};
  background: ${RED};
  font-size: 1.2rem;
  width: 7rem;
  height: 3rem;
  padding: 0;
  border: 1px solid ${RED};
`;
const No = styled(Button)`
  color: ${WHITE};
  border: 1px solid ${GREEN};
  background: ${GREEN};
  font-size: 1.2rem;
  width: 7rem;
  height: 3rem;
  padding: 0;
  margin-left: 1rem;
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
        <Title>Delete Member?</Title>
        <Info>
          {`All the details related to ${name} will be deleted. Do you
          want to delete anyway?`}
        </Info>
        <Controls>
          <Yes onClick={confirmDeleteMember}>Delete</Yes>
          <No onClick={close}>Cancel</No>
        </Controls>
      </Wrap>
    </Modal>
  );
}
export default DeleteConfirmation;
