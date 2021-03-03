import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { GREY, RUPEE_SYMBOL, SECONDARY_BLACK, WHITE } from '../../constants';
import { MontserratRegular, OpensansBold } from '../../utils/fonts';
import { formatDate } from '../../utils/helpers';
import Button from '../Button';
import DropDown from '../Dropdown';
import { Item, Row, Info } from './commonStyles';
import ConfirmationPopup from '../ConfirmationPopup';
const MemberRow = styled(Row)`
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  @media (max-width: 992px) {
    align-items: flex-start;
  }
`;

const Plan = styled(Item)`
  @media (max-width: 992px) {
    opacity: 0.7;
    margin-top: 0.5rem;
  }
  @media (max-width: 360px) {
    max-width: 7.5rem;
  }
`;
const Due = styled(Item)`
  @media (max-width: 992px) {
    opacity: 0.7;
    margin-top: 0.5rem;
  }
`;
const Paid = styled(Button)`
  width: 5.5rem;
  height: 3.4rem;
  font-family: ${OpensansBold};
  font-size: 1.3rem;
  color: ${WHITE};
  padding: 0.1rem;
  border-radius: 0px;
  @media (max-width: 992px) {
    width: 4.4rem;
    font-size: 1rem;
    height: 2.4rem;
  }
`;
const DropdownWrap = styled('div')`
  flex: 1;
  font-size: 1.4rem;
  color: ${SECONDARY_BLACK};
  max-width: 17rem;
  text-align: center;
  position: relative;
  font-family: ${MontserratRegular};
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;

function ItemRow({
  memberId,
  memberUniqueId,
  name,
  profilePic,
  plan,
  branch,
  branchId,
  planId,
  due,
  dueDate,
  mobile,
  type,
  age,
  mailId,
  gender,
  openPaymentPopup,
  index,
  makeMemberInactive,
  isAllowExpand = true,
  onEditMember = () => {},
  onDeleteMember = () => {},
}) {
  const [expand, toggleState] = useState(false);
  // const [statusIndex, setStatusIndex] = useState(-1);
  const [showDeleteConfirmation, setDeleteConfirmationPopup] = useState(false);
  const constructControls = () => {
    return (
      due && (
        <DropdownWrap>
          <DropDown
            name="hp-status"
            placeholder="Choose option"
            listItems={['Pay due', 'Make inactive']}
            activeItem={-1}
            hideError
            onSelect={(index) => {
              // setStatusIndex(index);
              if (index === 0) {
                openPaymentPopup({
                  name,
                  memberId,
                  memberUniqueId,
                  plan,
                  branchId,
                  planId,
                  branch,
                  due,
                });
              } else if (index === 1) {
                updateMembershipStatus();
              }
            }}
          />
        </DropdownWrap>
      )
    );
  };
  const updateMembershipStatus = () => {
    setDeleteConfirmationPopup(true);
  };
  const closeDeleteConfirmation = () => {
    setDeleteConfirmationPopup(false);
  };
  const confirmDeleteMember = () => {
    makeMemberInactive({
      memberUniqueId,
      successCallback: () => {
        closeDeleteConfirmation();
      },
      failureCallback: closeDeleteConfirmation,
    });
  };
  return (
    <React.Fragment>
      <MemberRow
        className={
          index % 2 === 0
            ? css`
                background: ${GREY};
              `
            : ''
        }
        key={memberId}
        onClick={isAllowExpand ? () => toggleState(!expand) : () => {}}
      >
        <Info>
          <Item
            className={css`
              display: flex;
              max-width: 15rem;
            `}
          >
            {name}
          </Item>

          {due && (
            <Item
              className={css`
                @media (max-width: 992px) {
                  text-align: start;
                  margin: 5px 0 3px;
                }
              `}
            >
              {memberId || '-'}
            </Item>
          )}

          <div
            className={css`
              display: flex;
              flex: 1;
              @media (max-width: 992px) {
                flex-direction: column;
              }
            `}
          >
            {due && (
              <Plan
                className={css`
                  @media (max-width: 992px) {
                    display: flex;
                  }
                `}
              >
                {plan}
              </Plan>
            )}

            {due && (
              <Item
                className={css`
                  max-width: 23rem;
                  font-weight: bold;
                  @media (max-width: 992px) {
                    display: flex;
                  }
                `}
              >
                {branch}
              </Item>
            )}
            {due && (
              <Due
                className={css`
                  @media (max-width: 992px) {
                    display: flex;
                  }
                `}
              >
                {RUPEE_SYMBOL}
                {due || 0}
              </Due>
            )}
            <Due
              className={css`
                @media (max-width: 992px) {
                  display: flex;
                }
                @media (min-width: 992px) and (max-width: 1100px) {
                  display: none;
                }
              `}
            >
              {formatDate(dueDate)}
            </Due>
          </div>
        </Info>

        <div
          className={css`
            display: flex;
            align-items: center;
            min-height: 4rem;
          `}
        >
          {constructControls()}
        </div>
      </MemberRow>
      <ConfirmationPopup
        title={'Pause Membership ?'}
        infoText={`All the activities with ${name} will be
          resumed. Do you want to resume anyway?`}
        show={showDeleteConfirmation}
        onYes={closeDeleteConfirmation}
        onNo={confirmDeleteMember}
        noText={'Pause'}
        yesText={'Cancel'}
      />
    </React.Fragment>
  );
}
export default ItemRow;
