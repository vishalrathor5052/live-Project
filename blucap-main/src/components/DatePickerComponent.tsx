import React, { memo, FC } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import moment from 'moment';
import { DatePickerProps } from 'src/Interface/Interface';

const DatePickerComponent: FC<DatePickerProps> = ({ label }) => {
  const [value, setValue] = React.useState<Date | null>(null);
  const startDate = startOfWeek(value);
  // const day = moment(startDate.("MMM Do YY");
  const endDate = endOfWeek(value);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        // leftArrowIcon
        // leftArrowButtonProps
        onChange={newValue => {
          setValue(newValue);
          console.log(`start date ${startDate} and end date ${endDate}`);
        }}
        renderInput={params => <TextField {...params} size="small" fullWidth />}

        // InputProps={{
        //     endAdornment: (
        //       <InputAdornment position="end">
        //           <IconButtonComponent
        //             IconName ="AlarmIcon"
        //           />
        //       </InputAdornment>
        //     ),
        //   }}
      />
    </LocalizationProvider>
  );
};

export default memo(DatePickerComponent);
