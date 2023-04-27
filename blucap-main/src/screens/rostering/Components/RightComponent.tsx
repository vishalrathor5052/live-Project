/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Box, Button, Grid } from '@mui/material';
import { FC, memo } from 'react';
import { TypographyComponents } from 'src/components/TypographyComponents';
import { createSX } from 'src/utils/createStyles';
import { IconButtonComponent } from 'src/components/IconButtonComponent';
import { Person } from '@mui/icons-material';
import { ButtonLabels, General } from 'src/shared/Shared';

const styles = createSX({
  sideRight: {
    color: '#062335',
  },
  dutyBox: {
    padding: '20px 0',
    boxShadow: '0px 6px 12px #00000029',
    background: '#ffffff',
    border: '0.5px solid #3A7C92',
    borderRadius: '10px',
  },
  dutyCancelled: {
    color: '#F93030',
    padding: '25px 0px',
  },
  dutyBoxtitle: {
    color: '#3A7C92',
  },
  dutyBoxcontent: {
    color: '#82C91E',
    padding: '5px 15px',
  },
  allocateButton: {
    fontSize: '12px',
    fontFamily: "'lato', sans-serif",
    fontWeight: '500',
    background: '#D0EEF2',
    color: '#3A7C92',
    marginLeft: '15px',
    borderRadius: '10px',
    border: '1px solid #3A7C92',
    marginTop: '15px',
    textTransform: 'capitalize',
    ':hover': {
      color: '#D0EEF2',
    },
  },
});

const RightComponent: FC = () => {
  return (
    <>
      <Box style={{ padding: '20px ' }}>
        <Grid container borderBottom="1px solid #3A7C92" padding="5% 0">
          <Grid item xs={5}>
            <TypographyComponents
              sx={styles.sideRight}
              variant={'h3'}
              wrap={false}
              component={'div'}
              title={General.updates}
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <TypographyComponents
            sx={styles.dutyCancelled}
            variant={'h4'}
            wrap={false}
            component={'div'}
            title={General.dutyCancelled}
          />
        </Grid>
        <Box sx={styles.dutyBox}>
          <Grid display="flex" alignItems="center">
            <IconButtonComponent
              IconName={Person}
              size={'medium'}
              fontSize={'inherit'}
              label={'person'}
            />
            <TypographyComponents
              sx={styles.dutyBoxtitle}
              variant={'h5'}
              wrap={false}
              component={'div'}
              title={'Dr. Anubhab Mukherjee'}
            />
          </Grid>
          <Grid>
            <TypographyComponents
              sx={styles.dutyBoxcontent}
              variant={'h5'}
              wrap={false}
              component={'div'}
              title={'CTCV-ICU'}
            />
          </Grid>
          <Grid>
            <TypographyComponents
              sx={styles.dutyBoxcontent}
              variant={'h5'}
              wrap={false}
              component={'div'}
              title={'Critical Care Unit'}
            />
          </Grid>
          <Grid>
            <TypographyComponents
              sx={{ padding: '5px 15px' }}
              variant={'h5'}
              wrap={false}
              component={'div'}
              title={'Saturday, December 12'}
            />
          </Grid>
          <Grid>
            <TypographyComponents
              sx={{ padding: '5px 15px' }}
              variant={'h5'}
              wrap={false}
              component={'div'}
              title={'Night Shift(8 pm - 8am)'}
            />
          </Grid>
          <Grid>
            <Button sx={styles.allocateButton} variant="contained">
              {ButtonLabels.allocateShift}
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default memo(RightComponent);
