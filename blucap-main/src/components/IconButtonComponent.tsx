import React, { FC, memo } from 'react';
import { IconButton } from '@mui/material';

import { IconProps } from 'src/Interface/Interface';

const IconButtonElement: FC<IconProps> = ({
  IconName,
  fontSize,
  label,
  size,
  color,
  imgSrc,
  customStyle,
  onHandleWeek,
}) => (
  <IconButton onClick={onHandleWeek} aria-label={label} size={size}>
    {IconName ? (
      <IconName fontSize={fontSize} color={color} />
    ) : (
      <img src={imgSrc} style={customStyle} />
    )}
  </IconButton>
);

export const IconButtonComponent = memo(IconButtonElement);
