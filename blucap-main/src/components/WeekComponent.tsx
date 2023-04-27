import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { createSX } from 'src/utils/createStyles';
import { General } from 'src/shared/Shared';
import { TypographyComponents } from './TypographyComponents';
import WeekDay from './WeekDay';

const styles = createSX({
  container: {
    width: '100%',
    borderRadius: 2.5,
    boxShadow: '0px 6px 12px #00000029',
  },
  dayBox: {
    backgroundColor: '#D0EEF2',
    height: 50,
    width: '17.5%',
    borderRight: '0.5px solid #3a7c92',
    borderTopLeftRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeBox: {
    backgroundColor: '#D0EEF2',
    height: 50,
    width: '16.5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  dayText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

const WeekComponent: FC = () => {
  return (
    <Grid sx={styles.container} container>
      <Grid container item>
        <Grid item sx={styles.dayBox}>
          <TypographyComponents
            sx={styles.dayText}
            variant={'p'}
            wrap={false}
            component={'div'}
            title={General.day}
          />
        </Grid>
        {[12, 6, 12, 6, 12].map((item, index) => (
          <Grid item sx={styles.timeBox} key={`${index}-${item}`}>
            <TypographyComponents
              sx={styles.dayText}
              variant={'p'}
              wrap={false}
              component={'div'}
              title={`${item}`}
            />
            <TypographyComponents
              sx={styles.dayText}
              variant={'p'}
              wrap={false}
              component={'div'}
              title={index % 2 === 1 ? General.pm : General.am}
            />
          </Grid>
        ))}
      </Grid>
      {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
        <WeekDay key={`${item}-${index}`} event={[]} />
      ))}
    </Grid>
  );
};

export default React.memo(WeekComponent);
