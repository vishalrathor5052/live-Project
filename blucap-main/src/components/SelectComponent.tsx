import React, { FC, memo, useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { SelectProps } from 'src/Interface/Interface';

const SelectComponent: FC<SelectProps> = ({
  id,
  label,
  options,
  labelKey,
  getValue,
  onHandleChange,
  isLabel,
  color,
}) => {
  const [value, setValue] = useState<string>(getValue ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onHandleChange && onHandleChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      {!isLabel && <InputLabel id={id}>{label}</InputLabel>}
      <Select
        labelId={`${id}-label`}
        fullWidth
        id={id}
        label={label}
        displayEmpty
        value={value}
        onChange={handleChange}
        style={{ color: `${color} !important` }}
      >
        {isLabel && <MenuItem value="">{label}</MenuItem>}
        {options.map((option, index) => (
          <MenuItem
            key={option._id ?? index.toString()}
            value={option._id ?? option}
          >
            {option[labelKey] ?? option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(SelectComponent);
