import React from 'react';
import styled, { css } from 'react-emotion';
import { BG_COLOR, TEST_CASE_FAILED, TEST_CASE_PASSED } from '../../constants';
import successIcon from '../../images/tick.png';
import failureIcon from '../../images/wrong.png';
import inProgressIcon from '../../images/progress.png';

const Wrap = styled('div')`
  margin: 2.4rem;
  padding-top: 4.6rem;
  width: 100%;
  max-width: 60rem;
`;
const Content = styled('div')`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 10px 3px 10px #d2d4dc;
  padding: 1.2rem;
  border-radius: 1.2rem;
`;
const HistoryWrap = styled('div')`
  background: ${BG_COLOR};
  border-radius: 1.2rem;
  padding: 1.2rem;
`;
const HeadingWrap = styled('div')`
  display: flex;
  flex: 1;
  justify-content: center;
  > li {
    font-size: 1.6rem;
  }
`;
const ItemRow = styled('div')`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 1.2rem;
  border-bottom: 1px solid #e9e9e9;
  > .test-name {
    flex: 3;
  }
`;
const Item = styled('li')`
  text-align: center;
  flex: 1;
  font-size: 1.4rem;
  font-family: 'Montserrat';
`;
const Icon = styled('img')``;
const NoTestExecution = styled('div')`
  margin: 2.4rem;
  text-align: center;
`;
const Results = styled('div')`
  max-height: 55rem;
  overflow: auto;
`;
export default class LiveTestResults extends React.Component {
  renderIcon = (status) => {
    switch (status) {
      case TEST_CASE_PASSED:
        return <Icon src={successIcon} />;
      case TEST_CASE_FAILED:
        return <Icon src={failureIcon} />;
      default:
        return <Icon src={inProgressIcon} />;
    }
  };
  constructTestResults = () => {
    const { testCases = [] } = this.props;

    return testCases.map((item) => {
      const { testCase, status } = item;
      return (
        <ItemRow key={testCase}>
          <Item className="test-name">{testCase}</Item>
          <Item
            className={css`
              width: 3.2rem;
            `}
          >
            {this.renderIcon(status)}
          </Item>
        </ItemRow>
      );
    });
  };
  render() {
    const { testCases = [] } = this.props;
    return (
      <Wrap>
        <Content>
          <HistoryWrap>
            <HeadingWrap>
              <Item
                className={css`
                  flex: 3;
                `}
              >
                Name
              </Item>
              <Item>Status</Item>
            </HeadingWrap>
          </HistoryWrap>
          <Results>
            {testCases.length > 0 ? (
              this.constructTestResults()
            ) : (
              <NoTestExecution>No results found</NoTestExecution>
            )}
          </Results>
        </Content>
      </Wrap>
    );
  }
}
