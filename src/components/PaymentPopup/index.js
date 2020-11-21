import React from 'react';
import styled from 'react-emotion';
import { SECONDARY_BLACK, WHITE } from '../../constants';
import {
  MontserratBold,
  MontserratRegular,
  OpensansRegular,
} from '../../utils/fonts';
import Button from '../Button';
import Checkbox from '../Checkbox';
import DropDown from '../Dropdown';
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
  font-family: ${MontserratRegular};
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
  font-family: ${MontserratRegular};
  font-size: 1.4rem;
`;
const PlanWrap = styled('div')`
  display: flex;
  align-items: center;
  margin: 2rem 1rem;
`;
const Label = styled('p')`
  font-size: 1.4rem;
  margin-right: 1rem;
  font-family: ${MontserratBold};
`;
function PaymentPopup({
  name,
  feeAmount,
  open,
  onPay,
  planDetails,
  entirePlanDetails,
  selectedPlan,
  onClose = () => {},
  updatePlanIdWhilePayment,
} = {}) {
  return (
    <ModalNew show={open} close={onClose}>
      <Wrap>
        <Heading>Fees payment</Heading>
        <MemberName>{name}</MemberName>
        <PlanWrap>
          <Label>Plan</Label>
          <DropDown
            listItems={planDetails}
            activeItem={selectedPlan}
            onSelect={(index) => {
              const { id, amount, planName } = entirePlanDetails[index];
              updatePlanIdWhilePayment({ index, id, amount, planName });
            }}
            hideError
          />
        </PlanWrap>
        {feeAmount && <Amount>Amount : ${feeAmount}</Amount>}
        <Controls>
          <Cancel onClick={onClose}>Cancel</Cancel>
          <Paid onClick={onPay}>Pay</Paid>
        </Controls>
      </Wrap>
    </ModalNew>
  );
}
export default PaymentPopup;
