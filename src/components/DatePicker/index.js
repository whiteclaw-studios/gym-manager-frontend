/**
 *
 * DatePicker
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';
import SpriteIcon, { DownIcon } from '../SpriteIcon';
import { weekDays } from './constants';
import Panel from './Panel';
import { MontserratBold, MontserratRegular } from '../../utils/fonts';
import { get } from '../../utils/helpers';
import { monthNames, WHITE } from '../../constants';
/* eslint-disable */

const Wrapper = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: ${WHITE};
`;
const Container = styled('div')`
  display: flex;
  align-items: center;
  height: 34px;
  padding-left: 10px;
  justify-content: space-between;
  padding: 1rem;
`;
const SelectedDate = styled('p')`
  flex: 2;
  font-family: ${MontserratRegular};
  font-size: 1.2rem;
  color: ${(props) => (props.picked === true ? '#231535' : '#9d9fa4')};
`;

const PreviousArrow = styled(DownIcon)`
  transform: rotate(90deg);
  margin: 0 3px;
  opacity: ${(props) => (props.disable ? 0.2 : 1)};
`;
const NextArrow = styled(DownIcon)`
  transform: rotate(-90deg);
  margin: 0 3px;
  opacity: ${(props) => (props.disable ? 0.2 : 1)};
`;
const Calendar = styled('div')`
  display: ${(props) => props.display};
  /* height: 210px; */
  min-height: 150px;
  max-height: 240px;
  position: absolute;
  min-height: 100%;
  width: 100%;

  z-index: 5;
  background: #ffffff;
  border-top: none;
  border: 1px solid #e2e2e2;
  margin: 35px 0;
  border-top: none;
`;
const MonthAndYear = styled('div')`
  display: flex;
  font-size: 1.4rem;
  border-top: 1px solid #e9e9e9;
  padding: 5px 0;
  border-bottom: 1px solid #e9e9e9;
  font-family: ${MontserratBold};
`;
const MonthContainer = styled('div')`
  flex: 2;
  text-align: center;
  display: flex;
  align-items: center;
`;
const Month = styled('p')`
  flex: 1.5;
  cursor: pointer;
  &:hover {
    background: #e9e9e9;
  }
  @media (max-width: 992px) {
    cursor: default;
  }
`;
const Year = styled('p')`
  flex: 1.5;
  cursor: pointer;
  &:hover {
    background: #e9e9e9;
  }
  @media (max-width: 992px) {
    cursor: default;
  }
`;
const YearContainer = styled('div')`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
`;
const Weeks = styled('div')`
  width: 100%;
  display: flex;
  padding: 5px 0;
`;
const Days = styled('div')`
  padding: 5px 0;
`;
const Row = styled('div')`
  display: flex;
  flex-direction: column;
`;
const Column = styled('column')`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  padding: 5px 0;
`;
const ItemWrapper = styled('div')`
  flex: 1;
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.55;
`;
const DayLi = styled('span')`
  /* padding: 7px; */
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  display: inline-block;
  list-style-type: none;
  cursor: pointer;
  background: ${(props) => props.background || 'white'};
  color: ${(props) => (props.background ? 'white' : '#212b35')};
  @media (max-width: 992px) {
    cursor: default;
  }
  ${(props) => {
    if (props.activeDayCss) {
      if (!props.selectedItem && props.activeItem) {
        return props.activeDayCss;
      }
    }
  }};
`;
const ArrowWrap = styled('div')`
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 992px) {
    width: 2rem;
    height: 2rem;
  }
`;
// const Error = styled('div')`
//   margin-top: 5px;
//   color: #ff0000;
//   font-size: 1.2rem;
//   padding-left: 1px;
// `;
function isLeapYear(year) {
  if (year % 100 === 0) {
    return year % 400 === 0 ? false : true;
  } else if (year % 4 === 0) {
    return true;
  } else return false;
}

const generateWeeks = weekDays.map((week) => (
  <td
    key={week}
    className={css`
      flex: 1;
      text-align: center;
      font-size: 1.2rem;
      line-height: 1.55;
      color: #9d9fa4;
    `}
  >
    {week}
  </td>
));
export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    let currentYear =
      parseInt(this.props.validateStartYear, 10) || new Date().getFullYear(); // year
    let currentMonth =
      this.props.validateStartMonth >= 0
        ? parseInt(this.props.validateStartMonth, 10)
        : new Date().getMonth(); // monthIndex
    let currentDay = this.props.validateStartDate
      ? parseInt(this.props.validateStartDate.split('/')[0], 10)
      : new Date().getDate(); // today's date
    this.datePickerRef = null;
    this.state = {
      showCalendar: this.props.alwaysShowCalendar,
      currentYear,
      currentMonth,
      currentDay,
      toShowPanel: false,
      toShow: 'Month',
      selectedDate: this.props.initialSelectDate
        ? this.props.initialSelectDate
        : props.placeholder || 'Select Date',
      selectedDay: currentDay,
    };

    // this.errorText = '';
  }
  static getDerivedStateFromProps(props, state) {
    if (props.selectedDate) {
      if (props.selectedDate !== state.selectedDate) {
        const newSelectedDay =
          props.selectedDate.split('/')[0] || state.selectedDate;
        return {
          ...state,
          selectedDate: props.selectedDate,
          selectedDay: newSelectedDay,
        };
      }
    }
    return state;
  }
  componentDidMount() {
    const { setInitialState } = this.props;
    if (setInitialState) {
      setInitialState(this.state.selectedDate);
    }
  }

  showCalendarHandle = () => {
    if (this.props.alwaysShowCalendar) {
      this.setState({
        showCalendar: true,
      });
    } else
      this.setState({
        showCalendar: !this.state.showCalendar,
      });
  };

  monthStartingDay = (date) => {
    return date.getDay();
  };

  checkEndDate = (selectedDate, checkDate) => {
    const selectedYr = parseInt(selectedDate[2], 10);
    const checkYr = parseInt(checkDate[2], 10);
    if (selectedYr > checkYr) return false;
    if (selectedYr < checkYr) return true;
    const selectedMonth = parseInt(selectedDate[1], 10);
    const checkMonth = parseInt(checkDate[1], 10);
    if (selectedMonth > checkMonth) return false;
    if (selectedMonth < checkMonth) return true;
    const selectedDay = parseInt(selectedDate[0], 10);
    const checkDay = parseInt(checkDate[0], 10);
    return selectedDay <= checkDay;
  };

  checkStartDate = (selectedDate, checkDate) => {
    const selectedYr = parseInt(selectedDate[2], 10);
    const checkYr = parseInt(checkDate[2], 10);
    if (selectedYr < checkYr) return false;
    if (selectedYr > checkYr) return true;
    const selectedMonth = parseInt(selectedDate[1], 10);
    const checkMonth = parseInt(checkDate[1], 10);
    if (selectedMonth < checkMonth) return false;
    if (selectedMonth > checkMonth) return true;
    const selectedDay = parseInt(selectedDate[0], 10);
    const checkDay = parseInt(checkDate[0], 10);
    return selectedDay >= checkDay;
  };

  selectDate = (date) => {
    const dateFormat = this.props.format;
    const defaultFormat = 'DD/MM/YYYY';
    let day = date.target.innerHTML;
    if (day < 10) day = `0${day}`;
    const { alwaysShowCalendar } = this.props;
    let month = this.state.currentMonth + 1;
    if (month < 10) month = `0${month}`;

    const year = this.state.currentYear;

    let newDate = defaultFormat.replace('DD', day);
    newDate = newDate.replace('MM', month);
    newDate = newDate.replace('YYYY', year);
    if (this.props.validateStartDate) {
      const checkDateArray = this.props.validateStartDate.split('/');
      const selectedDateArray = newDate.split('/');
      const isValidDate = this.checkStartDate(
        selectedDateArray,
        checkDateArray,
      );
      if (isValidDate) {
        this.setState({
          selectedDate: newDate,
          selectedDay: date.target.innerHTML,
          showCalendar: alwaysShowCalendar,
        });
        if (this.props.dateChangeHandler) {
          // send the formatted date
          let formattedDate = dateFormat.replace('DD', day);
          formattedDate = formattedDate.replace('MM', month);
          formattedDate = formattedDate.replace('YYYY', year);
          this.props.dateChangeHandler(formattedDate, false);
        }
      } else {
        // this.errorText = 'Pick a valid Date';
        this.setState({
          selectedDate: this.props.placeholder || 'custom placeholder',
          showCalendar: alwaysShowCalendar,
        });
        if (this.props.dateChangeHandler)
          this.props.dateChangeHandler(null, true);
      }
    } else if (this.props.validateEndDate) {
      const checkDateArray = this.props.validateEndDate.split('/');
      const selectedDateArray = newDate.split('/');
      const isValidDate = this.checkEndDate(selectedDateArray, checkDateArray);

      if (isValidDate) {
        // this.errorText = '';
        this.setState({
          selectedDate: newDate,
          selectedDay: date.target.innerHTML,
          showCalendar: alwaysShowCalendar,
        });
        if (this.props.dateChangeHandler) {
          let formattedDate = dateFormat.replace('DD', day);
          formattedDate = formattedDate.replace('MM', month);
          formattedDate = formattedDate.replace('YYYY', year);
          this.props.dateChangeHandler(formattedDate, false);
          // this.props.dateChangeHandler(newDate, false);
        }
      } else {
        // this.errorText = 'Pick a valid Date';
        this.setState({
          selectedDate: this.props.placeholder || 'custom placeholder',
          showCalendar: alwaysShowCalendar,
        });
        if (this.props.dateChangeHandler)
          this.props.dateChangeHandler(null, true);
      }
    } else {
      this.setState({
        selectedDate: newDate,
        selectedDay: date.target.innerHTML,
        showCalendar: alwaysShowCalendar,
      });
      if (this.props.dateChangeHandler) {
        let formattedDate = dateFormat.replace('DD', day);
        formattedDate = formattedDate.replace('MM', month);
        formattedDate = formattedDate.replace('YYYY', year);
        this.props.dateChangeHandler(formattedDate);
        // this.props.dateChangeHandler(newDate);
      }
    }
  };
  unAvailableDateClickHandle = (date) => {
    const { format, unAvailableDateClickHandle } = this.props;
    let day = date.target.innerHTML;
    if (day < 10) day = `0${day}`;
    let month = parseInt(this.state.currentMonth, 10);
    const year = this.state.currentYear;

    const { shortName: shortMonthName } = monthNames[month];
    if (unAvailableDateClickHandle)
      unAvailableDateClickHandle(`${day}-${shortMonthName}-${year}`);
  };
  generateDays = (monthIndex, year) => {
    let leapYear = isLeapYear(year);
    if (leapYear) {
      monthNames[1].days = 29;
    }
    let startingDay = this.monthStartingDay(
      new Date(`${monthNames[monthIndex].name} 1 ${year}`),
    );
    return this.generateGrid(
      startingDay,
      monthNames[monthIndex].days,
      monthIndex,
    );
  };
  isDateNotToBeBlocked = ({ day, monthIndex }) => {
    // used for tah booking slots
    const { availableDates } = this.props;
    for (let i = 0, len = availableDates.length; i < len; i += 1) {
      let date = availableDates[i];
      const [day1, month1] = date.split('/');
      const formattedDay = parseInt(day1, 10);
      const formattedMonth = parseInt(month1, 10);
      if (monthIndex === formattedMonth - 1) {
        if (day === formattedDay) {
          return true;
        }
      }
    }
    return false;
  };
  generateGrid = (startingDay = 0, NoOfDays = 28, monthIndex) => {
    // eslint-disable-next-line one-var
    let counter = 1,
      // eslint-disable-next-line prefer-const
      row = 4 + ((NoOfDays % 7) + startingDay >= 7 ? 2 : 1),
      column = 7,
      i = 0,
      j = 0,
      columnLoop = startingDay,
      firstRow,
      lastRow;
    let flag = 0;
    const rows = [];
    const { showDataName = false } = this.props;
    // purpose is to disable future and past dates
    // eslint-disable-next-line one-var
    let validStartDate = null,
      validStartDay = null,
      validStartMonth = null,
      validStartYear = null;
    // eslint-disable-next-line one-var
    let validEndDate = null,
      validEndDay = null,
      validEndMonth = null,
      validEndYear = null;
    if (get(this.props, 'validateStartDate', null)) {
      validStartDate = this.props.validateStartDate;
      validStartDate = validStartDate.split('/');
      validStartDay = parseInt(validStartDate[0]);
      // eslint-disable-next-line radix
      validStartMonth = parseInt(validStartDate[1]) - 1;
      validStartYear = parseInt(validStartDate[2]);
    }
    if (get(this.props, 'validateEndDate', null)) {
      validEndDate = this.props.validateEndDate.split('/');
      validEndDay = parseInt(validEndDate[0]);
      validEndMonth = parseInt(validEndDate[1]) - 1;
      validEndYear = parseInt(validEndDate[2]);
    }

    let culpritMonth = false;
    let threshold = null,
      enableOnClick = true;
    if (validStartYear && this.state.currentYear === validStartYear) {
      culpritMonth = monthIndex === validStartMonth;
      threshold = validStartDay;
    } else if (validEndYear && this.state.currentYear === validEndYear) {
      culpritMonth = monthIndex === validEndMonth;
      threshold = validEndDay;
    }
    const { checkForBlockedDates = false, activeDayCss = null } = this.props;
    for (i = 0; i < row; i++) {
      let columns = [];
      column = i === row - 1 ? ((NoOfDays % 4) + startingDay) % 7 : 7;
      for (j = columnLoop; j < column; j++) {
        if (culpritMonth && validStartDate) {
          enableOnClick = counter >= threshold;
        } else if (culpritMonth && validEndDate) {
          enableOnClick = counter <= threshold;
        }
        if (checkForBlockedDates) {
          enableOnClick = this.isDateNotToBeBlocked({
            day: counter,
            monthIndex,
          });
        }

        columns.push(
          <ItemWrapper
            {...(showDataName && {
              'data-name': enableOnClick
                ? 'date-slot-available'
                : 'date-slot-unavailable',
            })}
          >
            <DayLi
              background={
                enableOnClick &&
                counter === parseInt(this.state.selectedDay) &&
                '#8863fb'
              }
              activeDayCss={activeDayCss}
              activeItem={enableOnClick}
              selectedItem={counter === parseInt(this.state.selectedDay)}
              onClick={
                enableOnClick
                  ? this.selectDate
                  : this.unAvailableDateClickHandle
              }
              className={
                !enableOnClick
                  ? css`
                      color: #9d9fa4;
                      cursor: default;
                    `
                  : ''
              }
            >
              {counter++}
            </DayLi>
          </ItemWrapper>,
        );
      }
      if (flag === 0) {
        firstRow = columns;
      }
      flag = 1;
      if (flag == 1) {
        columnLoop = 0;
      }

      if (i === row - 1) {
        lastRow = columns;
      }

      rows.push(<Column>{columns}</Column>);
    }
    this.previousDays(startingDay, firstRow);
    this.nextDays((NoOfDays + startingDay) % 7, lastRow);
    return <Row>{rows}</Row>;
  };
  previousDays = (startingDay, firstRow) => {
    let previousMonth =
      this.state.currentMonth === 0 ? 11 : (this.state.currentMonth - 1) % 12;
    let previousMonthLastdate = monthNames[previousMonth].days;
    let i;
    for (i = 0; i < startingDay; i++) {
      firstRow.unshift(
        <ItemWrapper>
          <DayLi
            className={css`
              color: #9d9fa4;
            `}
          >
            {previousMonthLastdate - i}
          </DayLi>
        </ItemWrapper>,
      );
    }
    return firstRow;
  };
  nextDays = (endDay, lastRow) => {
    let i;
    if (endDay) {
      for (i = 1; i <= 7 - endDay; i++) {
        lastRow.push(
          <ItemWrapper>
            <DayLi
              className={css`
                color: #9d9fa4;
              `}
            >
              {i}
            </DayLi>
          </ItemWrapper>,
        );
      }
    }
    return lastRow;
  };

  previousMonth = () => {
    this.setState({
      currentMonth:
        this.state.currentMonth === 0 ? 11 : (this.state.currentMonth - 1) % 12,
    });
  };
  checkIsValidPreviousMonth = () => {
    const { validateStartMonth } = this.props;

    if (validateStartMonth)
      if (validateStartMonth > 1 && validateStartMonth < 12) {
        if (this.state.currentMonth - 1 < validateStartMonth) return false;
      }
    return true;
  };
  checkIsValidNextMonth = () => {
    const { validateEndMonth } = this.props;
    if (validateEndMonth)
      if (validateEndMonth > 1 && validateEndMonth < 12) {
        if (this.state.currentMonth + 1 > validateEndMonth) return false;
      }
    return true;
  };
  nextMonth = () => {
    this.setState({
      currentMonth:
        this.state.currentMonth === 11 ? 0 : (this.state.currentMonth + 1) % 12,
    });
  };
  checkIsValidPreviousYear = () => {
    const { validateStartYear } = this.props;
    if (validateStartYear)
      if (this.state.currentYear - 1 < validateStartYear) return false;

    return true;
  };
  checkIsValidNextYear = () => {
    const { validateEndYear } = this.props;
    if (validateEndYear)
      if (this.state.currentYear + 1 > validateEndYear) return false;

    return true;
  };

  previousYear = () => {
    if (this.props.validateStartDate) {
      let checkDateArray = this.props.validateStartDate.split('/');
      if (this.state.currentYear > checkDateArray[2])
        this.setState({
          currentYear: this.state.currentYear - 1,
        });
    } else {
      this.setState({
        currentYear: this.state.currentYear - 1,
      });
    }
  };

  nextYear = () => {
    if (this.props.validateEndDate) {
      let checkDateArray = this.props.validateEndDate.split('/');

      if (this.state.currentYear < checkDateArray[2]) {
        this.setState({
          currentYear: this.state.currentYear + 1,
        });
      }
    } else {
      this.setState({
        currentYear: this.state.currentYear + 1,
      });
    }
    if (this.props.nextYearHandle)
      this.props.nextYearHandle(this.state.currentYear + 1);
  };
  showMonthPanel = () => {
    this.setState({
      toShowPanel: true,
      toShow: 'Month',
    });
  };
  showYearPanel = () => {
    this.setState({
      toShowPanel: true,
      toShow: 'Year',
    });
  };

  selectMonth = (month) => {
    const { validateStartMonth, validateEndMonth } = this.props;
    if (validateStartMonth && validateEndMonth) {
      if (month < validateStartMonth || month > validateEndMonth) {
        this.setState({
          toShowPanel: false,
        });
        return;
      }
    }
    this.setState({
      currentMonth: month,
      toShowPanel: false,
    });
  };
  selectYear = (year) => {
    const val = Number(year);
    const { validateStartYear, validateEndYear } = this.props;
    if (validateStartYear && validateEndYear) {
      if (val < validateStartYear || val > validateEndYear) {
        this.setState({
          toShowPanel: false,
        });
        return;
      }
    }

    this.setState({
      currentYear: val,
      toShowPanel: false,
    });
  };
  mouseLeave = () => {
    this.setState({
      showCalendar: this.props.alwaysShowCalendar,
    });
  };
  componentDidUpdate() {
    if (this.props.calendarHeightChange) {
      this.props.calendarHeightChange();
    }
  }
  render() {
    const {
      className = '',
      id = '',
      disabled = false,
      setIdForCalendar,
      showDataName = false,
      showYear = true,
    } = this.props;
    return (
      <React.Fragment>
        <Wrapper
          innerRef={(ref) => (this.datePickerRef = ref)}
          tabIndex={0}
          onBlur={this.mouseLeave}
          className={cx(
            className,
            disabled
              ? css`
                  background: #f9f9fa;
                `
              : '',
          )}
        >
          <Container
            onClick={disabled ? () => {} : this.showCalendarHandle}
            className={cx(
              'date-picker-selected-wrapper',
              disabled
                ? css`
                    cursor: not-allowed;
                    @media (max-width: 992px) {
                      cursor: default;
                    }
                  `
                : '',
            )}
          >
            <SelectedDate
              className={cx(
                'date-picker-selected-date',
                disabled
                  ? css`
                      color: #000;
                    `
                  : '',
              )}
              // check if date is selected , picked prop for color change
              picked={
                this.state.selectedDate !==
                (this.props.placeholder || 'Select Date')
              }
            >
              {this.state.selectedDate}
            </SelectedDate>
            {!disabled && (
              <ArrowWrap>
                <DownIcon
                  onClick={this.showCalendarHandle}
                  transform={this.state.showCalendar}
                  className="date-picker-down-arrow"
                />
              </ArrowWrap>
            )}
          </Container>
          <Calendar
            id={
              setIdForCalendar
                ? setIdForCalendar
                : `calendar-dom-${Math.random() * 10}`
            }
            {...(showDataName && { 'data-name': 'calendar-section' })}
            display={this.state.showCalendar ? 'block' : 'none'}
          >
            <MonthAndYear>
              <MonthContainer>
                <PreviousArrow
                  onClick={() => {
                    this.checkIsValidPreviousMonth()
                      ? this.previousMonth()
                      : null;
                  }}
                  disable={!this.checkIsValidPreviousMonth()}
                />
                <Month
                  onClick={() => {
                    this.showMonthPanel();
                  }}
                >
                  {monthNames[this.state.currentMonth].name}
                </Month>
                <NextArrow
                  onClick={() => {
                    this.checkIsValidNextMonth() ? this.nextMonth() : null;
                  }}
                  disable={!this.checkIsValidNextMonth()}
                />
              </MonthContainer>
              {showYear && (
                <YearContainer>
                  <PreviousArrow
                    onClick={() =>
                      this.checkIsValidPreviousYear()
                        ? this.previousYear()
                        : null
                    }
                    disable={!this.checkIsValidPreviousYear()}
                  />
                  <Year
                    onClick={() => {
                      // this.showYearPanel();
                    }}
                  >
                    {this.state.currentYear}
                  </Year>
                  <NextArrow
                    onClick={() =>
                      this.checkIsValidNextYear() ? this.nextYear() : null
                    }
                    disable={!this.checkIsValidNextYear()}
                  />
                </YearContainer>
              )}
            </MonthAndYear>
            {!this.state.toShowPanel ? (
              <React.Fragment>
                <Weeks>{generateWeeks}</Weeks>

                <Days>
                  {this.generateDays(
                    this.state.currentMonth,
                    this.state.currentYear,
                  )}
                </Days>
              </React.Fragment>
            ) : (
              <Panel
                toShow={this.state.toShow}
                selectHandler={
                  this.state.toShow === 'Month'
                    ? this.selectMonth
                    : this.selectYear
                }
                startYear={this.props.startYear || null}
                endYear={this.props.endYear || null}
                validateStartMonth={this.props.validateStartMonth}
                validateEndMonth={this.props.validateEndMonth}
                validateMonthPanel={this.props.validateMonthPanel}
              />
            )}
          </Calendar>
        </Wrapper>
        {/* {this.props.showError && <Error>{this.props.errorText}</Error>} */}
      </React.Fragment>
    );
  }
}
DatePicker.propTypes = {
  placeholder: PropTypes.string,
  format: PropTypes.string,
  dateChangeHandler: PropTypes.func,
  validateStartDate: PropTypes.string,
  validateEndDate: PropTypes.string,
  disabled: PropTypes.bool,
  validateStartMonth: PropTypes.number, // index from 0 - 11
  validateEndMonth: PropTypes.number, // index from 0 - 11
  validateStartYear: PropTypes.number,
  validateEndYear: PropTypes.number,
  alwaysShowCalendar: PropTypes.bool, // used in modals -> refer to TahCheckout
  setIdForCalendar: PropTypes.string, // useful in finding the domHeight
  calendarHeightChange: PropTypes.func, // useful in finding the domHeight of calendar when arrows are clicked
  // autScroll: PropTypes.bool,
  // showError: PropTypes.bool,
  activeDayCss: PropTypes.string, // used for tah booking slots
  showDataName: PropTypes.bool, // used for tah booking slots automation
  setInitialState: PropTypes.func, // used for tah booking slots
};

DatePicker.defaultProps = {
  format: ' DD / MM / YYYY',
  disabled: false,
  alwaysShowCalendar: false,
  showDataName: false,
  showYear: true,
  initialSelectDate: '',
  validateMonthPanel: true,
  // autScroll: true,
  // showError: false,
};
