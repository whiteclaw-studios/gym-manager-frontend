import React from 'react';
import styled from 'react-emotion';
import { SECONDARY_BLACK, WHITE } from '../../constants';
import { OpensansRegular } from '../../utils/fonts';
import Button from '../Button';
import Checkbox from '../Checkbox';
import ModalNew from '../Modal';
const Wrap = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.4rem;
`;
const Heading = styled('p')`
  font-size: 1.6rem;
`;
const DatesWrap = styled('div')`
  text-align: left;
  width: 100%;
  margin: 2.4rem 0 1.6rem;
`;
const DateWrap = styled('div')`
  display: flex;
  font-size: 1.4rem;
  color: ${SECONDARY_BLACK};
  margin: 0.5rem;
`;
const Controls = styled('div')`
  display: flex;
  justify-content: flex-end;
`;
const MemberName = styled('p')`
  opacity: 0.6;
  margin-top: 1.2rem;
  font-size: 1.4rem;
`;
const Cancel = styled('span')`
  border: none;
  color: ${SECONDARY_BLACK};
  background: ${WHITE};
  font-size: 1.4rem;
  padding: 0.5rem;
  box-shadow: none;
  cursor: pointer;
  font-family: ${OpensansRegular};
  @media (max-width: 992px) {
    cursor: default;
  }
`;
const Paid = styled(Button)`
  font-size: 1.4rem;
  padding: 0 1.2rem;
  box-shadow: none;
  margin-left: 1.2rem;
`;
const Amount = styled('p')`
  text-align: left;
  width: 100%;
  margin-bottom: 2.4rem;
  margin-left: 1.2rem;
`;
function PaymentPopup({ memberInfo = {}, open, onClose = () => {} } = {}) {
  const { name } = memberInfo;
  return (
    <ModalNew show={open} close={onClose}>
      <Wrap>
        <Heading>Fees payment</Heading>
        <MemberName>{name}</MemberName>
        <DatesWrap>
          <DateWrap>
            <Checkbox />
            <span>17-11-2020 to 17-12-2020</span>
          </DateWrap>
          <DateWrap>
            <Checkbox />
            <span>17-11-2020 to 17-12-2020</span>
          </DateWrap>
        </DatesWrap>
        <Amount>$0 / $1000</Amount>
        <Controls>
          <Cancel onClick={onClose}>Cancel</Cancel>
          <Paid disabled={true}>Paid</Paid>
        </Controls>
      </Wrap>
    </ModalNew>
  );
}
export default PaymentPopup;
