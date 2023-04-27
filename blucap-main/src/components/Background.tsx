import { FC } from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

import logo from '/assets/logo_no_bg.png';

export const BluCapBackground: FC = () => {
  return (
    <Grid
      container
      height="100vh"
      width="100wh"
      display="flex"
      direction="row"
      bgcolor="primary.main"
      alignItems="center"
      justifyContent="center"
      spacing={0}
    >
      <Grid item xs={3}>
        <Box component="img" src={logo} height="100%" width="100%" />
      </Grid>
    </Grid>
  );
};
