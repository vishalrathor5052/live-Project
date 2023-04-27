/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  react-hooks/exhaustive-deps */

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { FC, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { General } from 'src/shared/Shared';
import dayjs from 'dayjs';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import * as duration from 'dayjs/plugin/duration';
import AddRoster from 'src/screens/rostering/Components/AddRoster';
import { TypographyComponents } from 'src/components/TypographyComponents';
import { createSX } from 'src/utils/createStyles';
import { Duty, Shift, User } from 'src/generated/graphql';
import { CustomShiftTemplateType } from 'src/Interface/Interface';
import RosterEmployeeDetailsComponent from './RosterEmployeeDetailsComponent';

// for use the properties of duration
dayjs.extend(duration);

// make the css
const styles = createSX({
  name: {
    fontWeight: 200,
    fontFamily: "'Lato', sans-serif",
  },
  inCharge: {
    color: '#f93030',
    pl: 3,
    fontWeight: 200,
    fontFamily: "'Lato', sans-serif",
  },
  allocateBox: {
    px: 1,
    py: 0.5,
    backgroundColor: '#f93030',
    cursor: 'pointer',
    mt: 1,
    width: '80%',
  },
  allocateDuty: {
    fontWeight: 200,
  },
});

const TableComponent: FC = () => {
  // get the reducer state of the header
  const { dateRange, rosterData, selectedRoster, wardId, isEditMode } =
    useSelector((state: any) => state?.header);

  const [open, setOpen] = useState(false);
  const [shiftTemplateData, SetShiftTemplateData] = useState<
    Array<CustomShiftTemplateType | Shift>
  >([]);
  const [weekDays, setWeekDays] = useState<Array<unknown>>([]);
  const [shiftTemplate, setShiftTemplate] = useState<
    Array<CustomShiftTemplateType>
  >([]);

  const dispatch = useDispatch();

  /**
   * todo: making the shift type object with time like(morning from 8AM to 1PM)
   */
  const handleShiftTemplate = React.useCallback(() => {
    const shiftData: Record<string, unknown> = {};
    const shiftTemp: Array<CustomShiftTemplateType | Shift> = [];
    for (const shift of rosterData) {
      const {
        shiftTemplate: {
          startTime,
          name,
          duration: { hour, minute },
        },
      } = shift;
      const time = `${startTime.hour}:${startTime.minute}`;
      const timeOffset = dayjs(time, 'hh:mm');
      const nameTime = `${name + '_' + time}`;
      if (!(nameTime in shiftData)) {
        shiftData[name + '_' + time] = '';
        shiftTemp.push({
          shiftType: name,
          startTime: timeOffset.clone().format('hh:mm A'),
          endTime: timeOffset
            .clone()
            .add(dayjs.duration({ hours: hour, minutes: minute }))
            .format('hh:mm A'),
          ...shift,
        });
      }
    }

    // sort shift by start and end time
    shiftTemp.sort((a: any, b: any): any => {
      if (dayjs(a.startTime, 'hh:mm A') < dayjs(b.startTime, 'hh:mm A'))
        return -1;
      if (dayjs(a.startTime, 'hh:mm A') > dayjs(b.startTime, 'hh:mm A'))
        return 1;
      return 0;
    });

    setShiftTemplate(shiftTemp);
  }, [rosterData]);

  /**
   * todo: making the week days array
   * having the start and end date of week and making the 7 week days
   */
  const onHandleDateRange = React.useCallback(() => {
    const { startWeek, endWeek } = dateRange;
    let day = dayjs(startWeek);
    const endDate = dayjs(endWeek);
    const weekList: Array<unknown> = [];
    while (day <= endDate) {
      weekList.push(day);
      day = day.clone().add(1, 'day');
    }
    setWeekDays([...weekList]);
  }, [dispatch, selectedRoster, wardId, dateRange]);

  /**
   *
   * @param shiftTemplate object of shift
   * @param shift object of shift with start, end time and shift type
   *
   * Making the single array for the access data within the allocate modal
   */
  const onHanldeEdit = (
    shiftTemplate: Shift,
    shift: CustomShiftTemplateType,
  ) => {
    const editData: Array<CustomShiftTemplateType | Shift> = [
      shiftTemplate,
      shift,
    ];
    setOpen(true);
    SetShiftTemplateData(editData);
  };

  /**
   *
   * @param shift custome shift temaplate
   * @param date selected roster shift time
   * @returns JSX Element of cell
   * Making the cell for each row by verifying the shift type, time
   * and date.
   * Appearing the duties, cancelled duties employee name
   * for allocate new duty
   * verifying the edit mode enable/disable for give the access to allocate the duty
   * at intial level
   */
  const onHandleTableCell = (shift: CustomShiftTemplateType, date: string) => {
    return rosterData.map((roster: Shift) => {
      if (
        dayjs(dayjs(date).clone().format('YYYY-MMM-DD')).isSame(
          dayjs(dayjs(roster.startDate).format('YYYY-MMM-DD')),
        ) &&
        roster?.shiftTemplate?.name === shift.shiftType
      ) {
        return (
          <>
            {isEditMode &&
              roster.duties.length === 0 &&
              roster?.cancelledDuties?.length === 0 &&
              !roster?.draftDutyChanges && (
                <Box
                  onClick={() => onHanldeEdit(roster, shift)}
                  className="rosterTableAddBtn"
                >
                  <IconButton aria-label="delete">
                    <AddCircleOutlineRounded />
                  </IconButton>
                </Box>
              )}
            {roster.duties.length > 0 &&
              roster.duties.map((duty: Duty) => (
                <RosterEmployeeDetailsComponent
                  fullName={duty.allocation.fullName ?? ''}
                  styles={{ inCharge: styles.inCharge, name: styles.name }}
                  key={duty._id}
                />
              ))}
            {roster.draftDutyChanges &&
              roster?.draftDutyChanges?.newAllocations &&
              roster?.draftDutyChanges?.newAllocations?.length > 0 &&
              roster.draftDutyChanges.newAllocations.map((duty: User) => (
                <RosterEmployeeDetailsComponent
                  fullName={duty.fullName ?? ''}
                  styles={{ inCharge: styles.inCharge, name: styles.name }}
                  key={duty._id}
                />
              ))}
            {roster.cancelledDuties.length > 0 && (
              <Box
                color={'white'}
                sx={styles.allocateBox}
                onClick={() => onHanldeEdit(roster, shift)}
              >
                <TypographyComponents
                  component="h4"
                  title={General.allocDuty}
                  variant="p"
                  sx={styles.allocateDuty}
                />
              </Box>
            )}
          </>
        );
      }
    });
  };

  React.useEffect(() => {
    onHandleDateRange();
  }, [dateRange, onHandleDateRange]);

  React.useEffect(() => {
    if (!rosterData?.length) {
      return;
    }
    handleShiftTemplate();
  }, [rosterData, handleShiftTemplate]);

  return (
    <>
      {shiftTemplate.length > 0 && (
        <TableContainer component={Paper}>
          <Table className="rosterTable" aria-label="simple table">
            <TableHead>
              <TableRow
                className="rosterTableRow"
                sx={{ backgroundColor: '#D0EEF2' }}
              >
                <TableCell style={{ textAlign: 'center' }}>Day</TableCell>
                {shiftTemplate.map(({ shiftType, endTime, startTime }) => (
                  <TableCell
                    style={{
                      textAlign: 'center',
                      fontFamily: "'Lato', sans-serif",
                    }}
                    key={endTime.toString()}
                  >
                    <Typography>{shiftType}</Typography>
                    <Typography>{`(${startTime} - ${endTime})`}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {weekDays.map((date: any, index: number) => (
                <TableRow
                  className="rosterTableRow"
                  key={index.toString()}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <TableCell
                    style={{ textAlign: 'center' }}
                    component="th"
                    scope="row"
                  >
                    <Typography>{date.clone().format('dddd')}</Typography>
                    <Typography>{date.clone().format('MMM DD')}</Typography>
                  </TableCell>
                  {shiftTemplate?.length &&
                    rosterData?.length &&
                    shiftTemplate.map((shift: CustomShiftTemplateType) => (
                      <TableCell
                        style={{ textAlign: 'center' }}
                        component="th"
                        scope="row"
                        id={index.toString()}
                        key={shift._id}
                      >
                        {rosterData?.length > 0 &&
                          onHandleTableCell(shift, date)}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddRoster
          shiftTemplate={shiftTemplateData}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
};

export default memo(TableComponent);
