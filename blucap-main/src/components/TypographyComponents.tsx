import { Typography } from '@mui/material';
import { FC, memo } from 'react';
import { TypographyProps } from 'src/Interface/Interface';

const TypographyComponentElement: FC<TypographyProps> = ({
  title,
  variant,
  component,
  sx,
  wrap,
  color,
  className,
}) => {
  return (
    <Typography
      className={className}
      variant={variant}
      noWrap={wrap}
      component={component}
      sx={sx}
      color={color}
    >
      {title}
    </Typography>
  );
};

export const TypographyComponents = memo(TypographyComponentElement);
