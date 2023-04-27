import { Box, FormControlLabel, Radio } from '@mui/material';
import { FC, memo } from 'react';
import { RadioComponentProps } from 'src/Interface/Interface';

const RadioComponent: FC<RadioComponentProps> = ({
  stylesSheet,
  value,
  label,
}) => (
  <Box sx={{ ...stylesSheet }} borderRadius="5px">
    <FormControlLabel
      value={value}
      control={<Radio size="small" />}
      label={label}
    />
  </Box>
);

export default memo(RadioComponent);
