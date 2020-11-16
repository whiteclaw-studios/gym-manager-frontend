import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import {
  FEES_LAYOUT,
  GREY,
  MEMBERS_DIRECTORY_LAYOUT,
  RED,
  WHITE,
} from '../../constants';
import { OpensansBold } from '../../utils/fonts';
import Button from '../Button';
import { Item, Row, Info } from './commonStyles';
import ExpandedView from './ExpandedView';

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
  width: 6.5rem;
  font-family: ${OpensansBold};
  font-size: 1.3rem;
  color: ${WHITE};
  padding: 0.1rem;
  border-radius: 0px;
  @media (max-width: 992px) {
    width: 4.4rem;
  }
`;
const Edit = styled(Button)`
  width: 6.5rem;
  font-size: 1.2rem;
  color: ${WHITE};
  @media (max-width: 760px) {
    font-size: 1rem;
    padding: 0.5rem;
  }
`;
const Delete = styled(Button)`
  width: 6.5rem;
  color: ${WHITE};
  font-size: 1.2rem;
  border: 1px solid ${RED};
  background: ${RED};
  margin-left: 0.5rem;
  @media (max-width: 760px) {
    font-size: 1rem;
    padding: 0.5rem;
  }
  :hover {
    ${(props) =>
      props.allowEdit &&
      `return border: 1px solid ${RED};
    color: ${RED};`}
  }
`;

function ItemRow({
  memberId,
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
  showDueColumn,
  hideMemberId = false,
  hidePlan = false,
  allowEdit = false,
  onEditMember = () => {},
  onDeleteMember = () => {},
}) {
  const [expand, toggleState] = useState(false);
  const constructControls = (data) => {
    switch (type) {
      case FEES_LAYOUT:
        return (
          <Item>
            <Paid
              onClick={() =>
                openPaymentPopup({
                  name,
                  memberId,
                  plan,
                  branch,
                  due,
                })
              }
            >
              Paid
            </Paid>
          </Item>
        );
      case MEMBERS_DIRECTORY_LAYOUT: {
        return (
          <Item
            className={css`
              justify-content: space-around;
              display: flex;
              @media (max-width: 760px) {
                flex-direction: column;
                align-items: flex-end;
              }
            `}
          >
            <Edit
              disabled={!allowEdit}
              onClick={
                allowEdit
                  ? (e) => {
                      e.stopPropagation();
                      onEditMember({
                        memberId,
                        name,
                        profilePic,
                        plan,
                        branch,
                        branchId,
                        planId,
                        due,
                        type,
                        age,
                        gender,
                        mailId,
                        mobile,
                      });
                    }
                  : () => {}
              }
            >
              Edit
            </Edit>
            <Delete
              disabled={!allowEdit}
              allowEdit={allowEdit}
              onClick={
                allowEdit
                  ? (e) => {
                      e.stopPropagation();
                      onDeleteMember({ name, memberId });
                    }
                  : () => {}
              }
            >
              Delete
            </Delete>
          </Item>
        );
      }
      default:
        return null;
    }
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
        <Item
          className={css`
            max-width: 5rem;
            margin-right: 2rem;
            @media (max-width: 992px) {
              margin-right: 1rem;
              max-width: 1rem;
            }
          `}
        >
          <span> {'>'} </span>
        </Item>
        <Info>
          <Item>{name}</Item>
          {!hideMemberId && (
            <Item
              className={css`
                @media (max-width: 992px) {
                  display: none;
                }
              `}
            >
              {memberId}
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
            {!hidePlan && <Plan>{plan}</Plan>}
            <Item
              className={css`
                @media (max-width: 992px) {
                  display: none;
                }
              `}
            >
              {branch}
            </Item>
            {showDueColumn && <Due>{due}</Due>}
          </div>
        </Info>

        <div
          className={css`
            @media (min-width: 993px) {
              min-height: 4rem;
            }
          `}
        >
          {' '}
          {constructControls()}
        </div>
      </MemberRow>
      {expand && (
        <ExpandedView
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
      )}
    </React.Fragment>
  );
}
export default ItemRow;
