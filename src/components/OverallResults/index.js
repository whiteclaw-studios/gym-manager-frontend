import React from 'react';
import styled from 'react-emotion';
import { CL_GREEN, CL_RED } from '../../constants';
const Wrap = styled('div')`
  margin: 2.4rem;
  padding-top: 4.6rem;
  max-width: 40rem;
  width: 100%;
`;
const Content = styled('div')`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 10px 3px 10px #d2d4dc;
  padding: 1.2rem;
  border-radius: 1.2rem;
`;
const ItemRow = styled('div')`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 1.2rem;
  border-bottom: 1px solid #e9e9e9;
`;
const Item = styled('li')`
  text-align: center;
  flex: 1;
  font-size: 1.4rem;
  font-family: 'Montserrat';

  ${(props) => {
    switch (props.id) {
      case 'success':
        return `color:${CL_GREEN}`;
      case 'failure':
        return `color:${CL_RED}`;
    }
  }}
`;
const data = [
  {
    name: 'Total Executed cases',
    value: 40,
    id: 'totalCases',
  },
  {
    name: 'Success cases',
    value: 25,
    id: 'success',
  },
  {
    name: 'Failed cases',
    value: 15,
    id: 'failure',
  },
];
function OverallResults() {
  const constructData = () => {
    return data.map((item) => {
      const { name, value, id = '' } = item;
      return (
        <ItemRow key={id}>
          <Item id={id}>{name}</Item>
          <Item>{value}</Item>
        </ItemRow>
      );
    });
  };
  return (
    <Wrap>
      <Content>{constructData()}</Content>
    </Wrap>
  );
}
export default OverallResults;
