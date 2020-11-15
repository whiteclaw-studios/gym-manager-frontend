import React from 'react';
import styled from 'react-emotion';
import { SECONDARY_BLACK } from '../../constants';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
const Wrap = styled('div')`
  width: 100%;
  min-height: 10rem;
  border: 1px solid #f9f9f9;
  border-top: none;
`;
const Row = styled('div')`
  display: flex;
  margin: 2rem;
  @media (max-width: 992px) {
    flex-direction: column;
  }
  @media (max-width: 360px) {
    margin: 1rem 0.5rem;
  }
`;
const Column = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;
  min-width: 10rem;
  @media (max-width: 992px) {
    flex-direction: column;
    margin: 0rem 2rem;
  }
`;
const PictureWrap = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;
  min-width: 10rem;
  @media (max-width: 992px) {
    align-items: center;
  }
`;
const ProfilePic = styled('div')`
  width: 10rem;
  height: 10rem;
  @media (max-width: 992px) {
    width: 7rem;
    height: 7rem;
  }
`;
const ProfilePicImg = styled('img')`
  width: 100%;
  height: 100%;
`;
const Field = styled('div')`
  display: flex;
  margin: 1rem 0;
`;
const FieldLabel = styled('p')`
  text-transform: capitalize;
  font-size: 1.4rem;
  font-family: ${MontserratBold};
  min-width: 15rem;
  @media (max-width: 992px) {
    min-width: 1rem;
  }
`;
const FieldValue = styled('p')`
  font-size: 1.4rem;
  font-family: ${MontserratRegular};
  margin-left: 1rem;
`;
function ExpandedView({ profilePic, fields = [] }) {
  const mid = Math.ceil(fields.length / 2);
  const column1 = fields.slice(0, mid);
  const column2 = fields.slice(mid, fields.length);
  const { memberId } = fields;
  console.log('fields', fields);
  return (
    <Wrap>
      <Row>
        <PictureWrap>
          {profilePic && (
            <ProfilePic>
              <ProfilePicImg src={profilePic} />
            </ProfilePic>
          )}
        </PictureWrap>
        <Column>
          {column1.map((column) => {
            const objKeys = Object.keys(column);
            return (
              <Field key={`${memberId - objKeys[0] - Date.now()}`}>
                <FieldLabel>{objKeys[0]} : </FieldLabel>
                <FieldValue>{column[objKeys[0]] || '-'}</FieldValue>
              </Field>
            );
          })}
        </Column>
        <Column>
          {column2.map((column) => {
            const objKeys = Object.keys(column);
            return (
              <Field key={`${memberId - objKeys[0] - Date.now()}`}>
                <FieldLabel>{objKeys[0]} : </FieldLabel>
                <FieldValue>{column[objKeys[0]] || '-'}</FieldValue>
              </Field>
            );
          })}
        </Column>
      </Row>
    </Wrap>
  );
}
export default ExpandedView;
