import React, { FC, memo } from 'react';
import { Button } from '@mui/material';
import { ButtonProps } from 'src/Interface/Interface';

const ButtonComponent: FC<ButtonProps> = ({
  label,
  variant,
  disable,
  color,
  size,
  StartIcon,
  onClick,
  sx,
}) => {
  return (
    <Button
      style={{ width: '100%' }}
      variant={variant}
      disabled={disable}
      onClick={onClick}
      size={size}
      color={color}
      startIcon={StartIcon}
      sx={sx}
    >
      {label}
    </Button>
  );
};

export default memo(ButtonComponent);
