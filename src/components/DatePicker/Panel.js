import React from 'react';
import styled, { css } from 'react-emotion';
import { monthNames } from '../../constants';
import { currentYear, currentMonth } from './constants';
const PanelContainer = styled('div')`
  height: 153px;
  overflow: auto;
  padding: 5px;
`;
const Row = styled('div')`
  display: flex;
  flex-direction: column;
`;
const Column = styled('div')`
  display: flex;
  margin: 12px 0;
`;
const ItemWrapper = styled('div')`
  /* flex: 1; */
  width: 25%;
  text-align: center;
`;
const Item = styled('span')`
  list-style-type: none;
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.55;
  padding: 7px;
  color: #212b35;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;
/*eslint-disable */
export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.monthsToPopulate = [];
    this.yearsToPopulate = [];
    this.startYear = props.startYear || currentYear - 50;
    this.endYear = props.endYear || currentYear + 15;
    this.state = {
      isHovered: false,
      activeMonthIndex: currentMonth,
      activeYearIndex: 0,
    };
    this.generateMonths();
    this.generateYears(this.startYear, this.endYear);
  }

  monthClicked = (data) => {
    this.props.selectHandler && this.props.selectHandler(data.index);
  };
  yearClicked = (data) => {
    this.props.selectHandler && this.props.selectHandler(data.target.innerHTML);
  };
  generateMonths = () => {
    let counter = 0,
      itemsArray = [],
      iLoop = 12 / 4;
    const {
      validateMonthPanel = true,
      validateStartMonth,
      validateEndMonth,
    } = this.props;
    console.log(
      'generateMonths----->',
      validateMonthPanel,
      validateStartMonth,
      validateEndMonth,
    );
    for (let i = 1; i <= iLoop; i++) {
      for (let j = 1; j <= 4; j++) {
        const index = (i - 1) * 4 + j - 1;
        const enable = validateMonthPanel
          ? index >= validateStartMonth && index <= validateEndMonth
          : true;
        itemsArray.push(
          <ItemWrapper>
            <Item
              onClick={
                enable
                  ? () => {
                      this.monthClicked({
                        index: index,
                      });
                    }
                  : () => {}
              }
              className={
                enable
                  ? ''
                  : css`
                      color: #9d9fa4;
                      cursor: not-allowed;
                      @media (max-width: 992px) {
                        cursor: default;
                      }
                    `
              }
            >
              {monthNames[counter++].shortName}
            </Item>
          </ItemWrapper>,
        );
      }

      this.monthsToPopulate.push(<Column>{itemsArray}</Column>);
      itemsArray = [];
    }
  };
  generateYears = (startYear, endYear) => {
    let counter = 0,
      itemsArray = [],
      totalYears = endYear - startYear + 1;
    let iLoop = Math.ceil(totalYears / 4);
    for (let i = 1; i <= iLoop; i++) {
      for (let j = 1; j <= 4; j++) {
        if (startYear + counter <= endYear)
          itemsArray.push(
            <ItemWrapper>
              <Item onClick={this.yearClicked}>{startYear + counter++}</Item>
            </ItemWrapper>,
          );
      }

      this.yearsToPopulate.push(<Column>{itemsArray}</Column>);
      itemsArray = [];
    }
  };
  render() {
    let { toShow = 'Month' } = this.props;
    return (
      <PanelContainer>
        <Row>
          {toShow === 'Month' ? this.monthsToPopulate : this.yearsToPopulate}
        </Row>
      </PanelContainer>
    );
  }
}
