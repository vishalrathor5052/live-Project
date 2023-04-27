/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enIN from 'date-fns/locale/en-IN';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AccessTime } from '@mui/icons-material';
import { CalendarProps } from 'src/Interface/Interface';
import { useSelector } from 'src/store';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

const CalendarComponent: React.FC<CalendarProps> = () => {
  const { selectedMonth, schedules } = useSelector(
    (state: any) => state.header,
  );
  const [scheduleList, setScheduleList] = useState([]);

  const view = 'month';
  const locales = {
    'en-IN': enIN,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () =>
      startOfWeek(new Date(selectedMonth), { weekStartsOn: 1 }),
    getDay,
    locales,
  });

  /**
   * todo: making the new array for the calendar
   * !: We're using react-big-calendar
   * The calendar object should be with the following keys:
   * id, title, start, end and time
   */
  useEffect(() => {
    if (schedules?.length) {
      const newList = schedules.map((elm: any) => {
        const {
          shift: {
            shiftTemplate: { duration },
            ward: { name },
            startDate,
          },
        } = elm;
        const dateFormat = dayjs(startDate).clone().format();
        const endDate = dayjs(startDate)
          .clone()
          .add(duration.hour, 'hours')
          .add(duration.minute.toString().slice(0, 2), 'minutes')
          .format();
        return {
          id: elm._id,
          title: name,
          time: `${duration.hour}:${duration.minute.toString().slice(0, 2)} h`,
          start: dateFormat,
          end: endDate,
        };
      });
      setScheduleList(newList);
    }
  }, [schedules]);

  /**
   *
   * @param e for update the event of the calendar and getting data for each date
   * @returns would return the JSX element
   * JSX element is the UI of event
   */
  const EventComponent = (e: any) => {
    return (
      <Box className={`event${e.event.leave ? ' event-pink' : ''}`}>
        <Box sx={{ fontSize: 14 }}>{e.title}</Box>
        <Box className="event-time">
          <AccessTime sx={{ fontSize: 18 }} /> {e.event.time}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        date={new Date(selectedMonth)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={view}
        events={scheduleList}
        components={{
          event: React.memo(EventComponent),
        }}
      />
    </>
  );
};

export default React.memo(CalendarComponent);
