import React from 'react';
import styled from 'react-emotion';
import { GREEN, RED, WHITE } from '../../constants';
import { MontserratLight, MontserratRegular } from '../../utils/fonts';
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
  :hover {
    background: none;
    color: ${RED};
    border: 1px solid ${RED};
  }
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
function Confirmation({
  show = false,
  onYes,
  onNo,
  title,
  infoText,
  yesText = 'Yes',
  noText = 'No',
}) {
  return (
    <Modal show={show} close={onNo} closeButton>
      <Wrap>
        <Title>{title}</Title>
        <Info>{infoText}</Info>
        <Controls>
          <Yes onClick={onYes}>{yesText}</Yes>
          <No onClick={onNo}>{noText}</No>
        </Controls>
      </Wrap>
    </Modal>
  );
}
export default Confirmation;
