import React from 'react';
import styled, { css } from 'react-emotion';
import { WHITE, GREY, RED, GREEN } from '../../constants';
import { MontserratLight, MontserratRegular } from '../../utils/fonts';
import { formatDate } from '../../utils/helpers';
import Button from '../Button';
import EllipsisLoader from '../EllipsisLoader';
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
const LoaderWrap = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Noresults = styled('p')`
  font-size: 1.2rem;
  font-family: ${MontserratRegular};
  color: ${GREEN};
  min-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Error = styled('p')`
  color: ${RED};
  font-size: 1.2rem;
  font-family: ${MontserratRegular};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
`;
function GridData({
  headingInfo = ['Fees', 'Paid Date', 'dummy'],
  data = [],
  showHistory = false,
  memberUniqueId,
  isLoaded,
  isError,
  isLoading,
  onPay,
}) {
  return (
    <Wrap>
      <Title>{showHistory ? 'History' : 'Fees Due'}</Title>
      <Content>
        <HeadingWrap>
          {headingInfo.map((heading, index) => (
            <Heading
              className={
                heading === 'dummy'
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
        {isError ? (
          <Error>Something went wrong</Error>
        ) : isLoading ? (
          <LoaderWrap>
            <EllipsisLoader />
          </LoaderWrap>
        ) : isLoaded && data.length <= 0 ? (
          <Noresults>No data found</Noresults>
        ) : (
          <Data>
            {data.map((info, index) => {
              const { txnAmount, txnDate } = info;
              const formattedDate = formatDate(txnDate);
              console.log('formattedDate', formattedDate);
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
                  <Item>{txnAmount}</Item>
                  <Item>{formattedDate}</Item>
                  <Item>{!showHistory && <Pay onClick={onPay}>Pay</Pay>}</Item>
                </ItemWrap>
              );
            })}
          </Data>
        )}
      </Content>
    </Wrap>
  );
}
export default GridData;
