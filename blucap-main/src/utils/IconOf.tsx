import { FC } from 'react';
import { Grid, SvgIcon, SvgIconProps } from '@mui/material';

const IconOf: FC<{ children: string } & SvgIconProps> = ({
  children,
  ...props
}) => (
  <SvgIcon {...props}>
    <Grid component="path" d={children} />
  </SvgIcon>
);

export default IconOf;
