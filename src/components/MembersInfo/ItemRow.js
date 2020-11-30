import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { GREY, WHITE } from '../../constants';
import { OpensansBold } from '../../utils/fonts';
import Button from '../Button';
import { Item, Row, Info } from './commonStyles';
// import ExpandedView from './ExpandedView';

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
  mobile,
  type,
  age,
  mailId,
  gender,
  openPaymentPopup,
  index,
  isAllowExpand = true,
  onEditMember = () => {},
  onDeleteMember = () => {},
}) {
  const [expand, toggleState] = useState(false);
  const constructControls = (data) => {
    return (
      <Item>
        <Paid
          onClick={() =>
            openPaymentPopup({
              name,
              memberId,
              memberUniqueId,
              plan,
              branchId,
              planId,
              branch,
              due,
            })
          }
        >
          Pay
        </Paid>
      </Item>
    );
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

          <Item
            className={css`
              @media (max-width: 992px) {
                display: none;
              }
            `}
          >
            {memberId || '-'}
          </Item>

          <div
            className={css`
              display: flex;
              flex: 1;
              @media (max-width: 992px) {
                flex-direction: column;
              }
            `}
          >
            <Plan
              className={css`
                @media (max-width: 992px) {
                  display: flex;
                }
              `}
            >
              {plan || 'Dummy-plan'}
            </Plan>

            <Item
              className={css`
                max-width: 23rem;
                @media (max-width: 992px) {
                  display: flex;
                }
              `}
            >
              {branch}
            </Item>
            <Due
              className={css`
                @media (max-width: 992px) {
                  display: flex;
                }
              `}
            >
              {due || 'Dummy due'}
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
      {/* {expand && (
        <ExpandedView
          memberUniqueId={memberUniqueId}
          profilePic={
            profilePic ||
            'https://www.pngitem.com/pimgs/m/43-437594_and-oil-moustache-man-beard-free-png-hq.png'
          }
          fields={[
            {
              Name: name,
            },
            {
              age,
            },
            {
              gender,
            },
            {
              FatherName: 'Kumaran S',
            },
            {
              memberId,
            },
            {
              plan,
            },
            {
              branch,
            },
          ]}
        />
      )} */}
    </React.Fragment>
  );
}
export default ItemRow;
