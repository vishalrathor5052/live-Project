/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Grid, ButtonGroup } from '@mui/material';
import { FC, memo, useCallback, useState, useEffect, useMemo } from 'react';
import { IconButtonComponent } from 'src/components/IconButtonComponent';
import { TypographyComponents } from 'src/components/TypographyComponents';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import dayjs from 'dayjs';
import {
  GetRosterDetails,
  getSchedules,
  setDateRange,
  setSelectedView,
  setSelectMonth,
} from 'src/store/actions/header';
import { useDispatch, useSelector } from 'react-redux';
import { createSX } from 'src/utils/createStyles';
import { ButtonLabels } from 'src/shared/Shared';
import { useHistory } from 'react-router-dom';
import RosterRouter from '../../../routes/RosterRouter';
const styles = createSX({
  date: {
    color: '#2393B8',
  },
});

const CenterComponent: FC = () => {
  const history = useHistory();

  const [startWeek, setStartWeek] = useState<string>('');
  const [endWeek, setEndWeek] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [monthCount, setMonthCount] = useState<number>(0);
  const [buttonClick, setButtonClick] = useState<string | null>(null);
  const [month, setMonth] = useState<string>('');
  const [isEmployee, setIsEmployee] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { wardEmployee, rosterData } = useSelector(
    (state: any) => state?.header,
  );

  /**
   * todo: dispatching the schedules and get roster endpoints
   * We've to verify the type of selected role and then
   * fetch the data corresponding to selected role
   * !: wardEmployee ['Wards', 'Employee]
   * !: GetRosterDetails for fetch roster data
   * !: getSchedule for fetch schedule data
   */
  const handleDispatchOfDate = useCallback(() => {
    if (wardEmployee === 'Wards') {
      dispatch(GetRosterDetails());
    }

    if (wardEmployee === 'Employee') {
      dispatch(getSchedules());
    }
  }, [wardEmployee, dispatch]);

  /**
   *
   * @param nums for update the month and week count
   * !: isEmployee - verifying the selected role type
   * !: month count for update the month
   * !: count for update the week
   * Having update the count of month and week, then
   * we're fetching the data corresponding to the selected previous
   * and next month/week.
   */
  const handleWeek = (nums: number) => {
    if (isEmployee) {
      setMonthCount(prev => prev + nums);
    } else {
      setCount(prev => prev + nums);
    }
  };

  /**
   * todo: update the start and end date for fetch the data for month
   * setting the 1st month date and month from the current month
   * !: Example: 0 is current month, so -1 would be for previous and 1 for next month
   * updating the month by setMonth state
   * dispatching the setSelectMonth for update the month of calendar
   * in the calendar component
   * setDateRange for update the start and end date for
   * get the roster data
   */
  const handleMonths = useCallback(() => {
    const monthFormat = dayjs().clone().set('date', 1).add(monthCount, 'month');
    const endOfMonth = monthFormat.clone().endOf('month');
    const getMonth = monthFormat.clone().format('MMMM YYYY');
    setMonth(getMonth);
    dispatch(setSelectMonth(monthFormat.clone().format()));
    dispatch(
      setDateRange({
        startWeek: monthFormat.clone().format(),
        endWeek: endOfMonth.clone().format(),
      }),
    );
    setTimeout(() => {
      handleDispatchOfDate();
    }, 100);
  }, [monthCount, handleDispatchOfDate, dispatch]);

  /**
   * todo: update the start and end date for fetch the data for week
   * setting the monday and sunday of the week
   * !: Example: 0 is current week, so -1 would be for previous and 1 for next week
   * updating the month by setMonth state
   * dispatching the setSelectMonth for update the month of calendar
   * in the calendar component
   * setDateRange for update the start and end date for
   * get the roster data
   */
  const handleDate = useCallback(() => {
    const startWeek = dayjs().clone().add(count, 'weeks').weekday(0);
    const endWeek = dayjs().clone().add(count, 'weeks').weekday(6);
    const startDate = startWeek.clone().format('DD');
    const endDate = endWeek.clone().format('DD MMMM YYYY');
    setStartWeek(startDate);
    setEndWeek(endDate);
    dispatch(
      setDateRange({
        startWeek: startWeek.clone().format(),
        endWeek: endWeek.clone().format(),
      }),
    );
    setTimeout(() => {
      handleDispatchOfDate();
    }, 100);
  }, [count, handleDispatchOfDate, dispatch]);

  /**
   * todo: memorize the value of isEmploee
   * would check the value of isEmployee by differ algorithm
   * concept, then fetch the data
   */
  useMemo(() => {
    if (isEmployee) {
      handleMonths();
    } else {
      handleDate();
    }
  }, [isEmployee, handleMonths, handleDate]);

  /**
   *
   * @param type would be string type for handle the view of component
   * there are two different views for week ad month
   * dispatching the type value in the selectedView action
   */
  const handleSelectView = (type: string) => {
    setButtonClick(type);
    dispatch(setSelectedView(type));
  };

  /**
   * It would check the selected role type, then updating the view
   * and checking the roster data
   * !: if the roster data would be empty then redirectiong to create template
   */
  useEffect(() => {
    if (wardEmployee !== 'Employee') {
      setButtonClick(null);
      setCount(0);
      setIsEmployee(false);
      handleDate();
      !rosterData?.length && history.push('/rostering/create');
    }
    if (wardEmployee === 'Employee') {
      setButtonClick('month');
      setMonthCount(0);
      handleMonths();
      setIsEmployee(true);
      dispatch(setSelectedView('month'));
    }
  }, [wardEmployee]);

  /**
   * todo: update the selected month for calendar view on
   * todo: change the month
   */

  useEffect(() => {
    dispatch(setSelectMonth(dayjs(`01 ${month}`).clone().format()));
  }, [month]);

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={isEmployee ? 'space-between' : ''}
      >
        {isEmployee && (
          <Grid item xs={3}>
            <ButtonGroup
              variant="outlined"
              fullWidth
              aria-label="outlined primary button group"
            >
              {isEmployee && (
                <Button
                  variant={buttonClick === 'week' ? 'contained' : 'outlined'}
                  onClick={() => handleSelectView('week')}
                  sx={{ width: '50%' }}
                >
                  {ButtonLabels.week}
                </Button>
              )}
              <Button
                variant={buttonClick === 'month' ? 'contained' : 'outlined'}
                onClick={() => handleSelectView('month')}
                sx={{ width: '50%' }}
              >
                {ButtonLabels.month}
              </Button>
            </ButtonGroup>
          </Grid>
        )}
        <Grid item xs={5} className="customPadding">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ border: 1, borderColor: '#3A7C92' }}
            borderRadius="5px"
          >
            <IconButtonComponent
              IconName={ArrowLeft}
              size={'medium'}
              fontSize={'inherit'}
              label={'arrowleft'}
              onHandleWeek={() => handleWeek(-1)}
            />
            <TypographyComponents
              variant={'p'}
              wrap={false}
              component={'div'}
              title={
                buttonClick === 'month' ? month : `${startWeek}-${endWeek}`
              }
              sx={styles.date}
            />
            <IconButtonComponent
              IconName={ArrowRight}
              size={'medium'}
              fontSize={'inherit'}
              label={'arrowright'}
              onHandleWeek={() => handleWeek(1)}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={() => {
              setCount(0);
              setMonthCount(0);
            }}
            style={{ width: '100%' }}
            variant="outlined"
          >
            {buttonClick === null && ButtonLabels.currentRoster}
            {buttonClick === 'week' && ButtonLabels.thisWeek}
            {buttonClick === 'month' && ButtonLabels.thisMonth}
          </Button>
        </Grid>

        <Grid xs={12} sx={{ ml: 2 }}>
          <RosterRouter />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(CenterComponent);
