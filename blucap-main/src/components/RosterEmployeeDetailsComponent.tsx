import { FC, memo } from 'react';
import { Grid } from '@mui/material';

import { RosterEmployeeDetailsComponentProps } from 'src/Interface/Interface';
import { TypographyComponents } from './TypographyComponents';

const RosterEmployeeDetailsComponent: FC<RosterEmployeeDetailsComponentProps> =
  ({ styles, fullName }) => (
    <>
      <Grid container>
        <TypographyComponents
          component="h4"
          title={`Dr. ${fullName}`}
          variant="p"
          sx={styles.name}
        />
      </Grid>
    </>
  );

export default memo(RosterEmployeeDetailsComponent);
