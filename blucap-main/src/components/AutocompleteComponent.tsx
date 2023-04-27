import React, { FC, memo } from 'react';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { AutocompleteProps } from 'src/Interface/Interface';

const AutocompleteComponent: FC<AutocompleteProps> = ({
  id,
  label,
  options,
  multiple,
  isCheckbox,
  getOptionLabel,
}) => {
  return (
    <Autocomplete
      multiple={multiple}
      fullWidth
      id={id}
      options={options}
      disableCloseOnSelect
      getOptionLabel={option => option[getOptionLabel]}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {isCheckbox && (
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
          )}
          {option[getOptionLabel]}
        </li>
      )}
      renderInput={params => (
        <TextField {...params} variant="outlined" label={label} size="small" />
      )}
    />
  );
};

export default memo(AutocompleteComponent);
