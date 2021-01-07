import React from 'react';
import styled from 'react-emotion';
import { GREEN, RUPEE_SYMBOL, SECONDARY_BLACK, WHITE } from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
import Button from '../Button';
import Checkbox from '../Checkbox';
import DropDown from '../Dropdown';
import Input from '../Input';
import ModalNew from '../Modal';
const Wrap = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.4rem;
`;
const Heading = styled('p')`
  font-size: 1.6rem;
  font-family: ${MontserratRegular};
`;
const Controls = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0;
`;
const MemberName = styled('p')`
  opacity: 0.6;
  margin-top: 1.2rem;
  font-size: 1.4rem;
  font-family: ${MontserratBold};
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
  margin-bottom: 3.4rem;
  margin-left: 5rem;
  font-family: ${MontserratBold};
  font-size: 1.4rem;
  color: ${GREEN};
`;
const PlanWrap = styled('div')`
  display: flex;
  align-items: center;
  margin: 0.5rem 3rem;
`;
const Label = styled('p')`
  font-size: 1.4rem;
  margin-right: 1rem;
  font-family: ${MontserratBold};
  width: 11rem;
`;
const DateWrap = styled('div')`
  display: flex;
  margin: 0.5rem 3rem;
  align-items: center;
`;
const PlanAndDateWrap = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0rem;
  margin-bottom: 1.2rem;
`;
const PaymentDate = styled('p')`
  font-size: 1.4rem;
  margin-right: 1rem;
  font-family: ${MontserratBold};
  position: relative;
  top: -0.5rem;
  width: 11rem;
`;
const InputWrap = styled('div')`
  width: 15rem;
`;
function PaymentPopup({
  name,
  feeAmount,
  open,
  onPay,
  planDetails,
  entirePlanDetails,
  selectedPlan,
  dueDate,
  onDueDateChange,
  onClose = () => {},
  updatePlanIdWhilePayment,
} = {}) {
  return (
    <ModalNew show={open} close={onClose}>
      <Wrap>
        <Heading>Fees payment</Heading>
        <MemberName>{name}</MemberName>
        <PlanAndDateWrap>
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
          <DateWrap>
            <PaymentDate>Payment date</PaymentDate>
            <InputWrap>
              <Input
                state={dueDate}
                name="dueDate"
                onValueChange={onDueDateChange}
                placeholder="DD-MM-YYYY"
                showError={dueDate.error}
                errorText="Invalid date"
                validateOnType={false}
              />
            </InputWrap>
          </DateWrap>
        </PlanAndDateWrap>
        {feeAmount && (
          <Amount>
            Amount : {RUPEE_SYMBOL}
            {feeAmount}
          </Amount>
        )}
        <Controls>
          <Cancel onClick={onClose}>Cancel</Cancel>
          <Paid onClick={onPay}>Pay</Paid>
        </Controls>
      </Wrap>
    </ModalNew>
  );
}
export default PaymentPopup;
