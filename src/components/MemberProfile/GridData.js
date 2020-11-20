import React from 'react';
import styled, { css } from 'react-emotion';
import { WHITE, GREY } from '../../constants';
import { MontserratLight, MontserratRegular } from '../../utils/fonts';
import Button from '../Button';
const Wrap = styled('div')`
  background: ${WHITE};
  margin: 1rem 0;
  box-shadow: 0px 1px 4px #a9a9a9;
  @media (min-width: 993px) {
    min-width: 40rem;
    margin: 2rem 0;
  }
  @media (min-width: 1200px) {
    min-width: 60rem;
  }
`;
const Title = styled('div')`
  font-family: ${MontserratRegular};
  font-size: 1.8rem;
  padding: 1rem;

  @media (max-width: 992px) {
    font-size: 1.6rem;
  }
`;
const Content = styled('div')``;
const HeadingWrap = styled('div')`
  display: flex;
  margin: 1rem 0;
`;
const Heading = styled('li')`
  text-align: center;
  font-family: ${MontserratRegular};
  font-size: 1.4rem;
  flex: 1;
`;
const Data = styled('div')`
display;flex;
flex-direction:column;
`;
const ItemWrap = styled('div')`
  display: flex;
  padding: 1rem 0;
`;
const Item = styled('li')`
  flex: 1;
  display: flex;
  height: 3.2rem;
  justify-content: center;
  align-items: center;

  font-family: ${MontserratLight};
  font-size: 1.4rem;
  @media (max-width: 992px) {
    font-size: 1.2rem;
    height: 2.4rem;
  }
`;
const Pay = styled(Button)`
  font-size: 1.4rem;
  padding: 0;
  max-width: 8rem;
  height: 3.2rem;

  @media (max-width: 992px) {
    font-size: 1.2rem;
    max-width: 6.4rem;
    height: 2.4rem;
  }
`;
function GridData({
  headingInfo = ['Fees', 'Due Date', 'Paid Date'],
  data = [
    {
      fee: '$434',
      dueDate: '20 Jan 2020',
      paidDate: '',
    },
    {
      fee: '$434',
      dueDate: '20 Jan 2020',
      paidDate: '',
    },
    {
      fee: '$434',
      dueDate: '20 Jan 2020',
      paidDate: '',
    },
    {
      fee: '$434',
      dueDate: '20 Jan 2020',
      paidDate: '',
    },
    {
      fee: '$434',
      dueDate: '20 Jan 2020',
      paidDate: '',
    },
  ],
  showHistory = false,
  memberUniqueId,
}) {
  return (
    <Wrap>
      <Title>{showHistory ? 'History' : 'Fees Due'}</Title>
      <Content>
        <HeadingWrap>
          {headingInfo.map((heading, index) => (
            <Heading
              className={
                heading === 'Paid Date' && !showHistory
                  ? css`
                      opacity: 0;
                    `
                  : ''
              }
              key={`${
                showHistory ? 'History' : 'Fees Due'
              }- ${memberUniqueId}-${heading}`}
            >
              {heading}
            </Heading>
          ))}
        </HeadingWrap>
        <Data>
          {data.map((info, index) => {
            const { fee, dueDate, paidDate } = info;
            return (
              <ItemWrap
                key={`${
                  showHistory ? 'History' : 'Fees Due'
                }- ${memberUniqueId}-${index}`}
                className={
                  index % 2 === 0
                    ? css`
                        background: ${GREY};
                      `
                    : ''
                }
              >
                <Item>{fee}</Item>
                <Item>{dueDate}</Item>
                <Item>{showHistory ? paidDate || '-' : <Pay>Pay</Pay>}</Item>
              </ItemWrap>
            );
          })}
        </Data>
      </Content>
    </Wrap>
  );
}
export default GridData;
