import { Box, Grid } from '@mui/material';
import React from 'react';
import { EventProps } from 'src/Interface/Interface';
import { createSX } from 'src/utils/createStyles';
import { TypographyComponents } from './TypographyComponents';

const WeekDay: React.FC<EventProps> = (): JSX.Element => {
  const styles = createSX({
    day: {
      borderBottom: '1px solid #3a7c92',
      ':last-of-type': {
        borderColor: 'transparent',
      },
    },
    head: {
      width: '17.5%',
      height: 80,
      textAlign: 'center',
      borderRight: '1px solid #3a7c92',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    headText: {
      fontSize: 14,
      fontFamily: 'Lato, sans-serif',
    },
    body: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 80,
      px: 1,
      width: '33%', // TODO: to be calculated based on event start and end time
      // marginLeft: '5%', // TODO: to be calculated based on event start and end time
    },
    content: {
      height: 55,
      backgroundColor: '#FFCD05',
      borderRadius: 2,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentText: {
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: 'Lato, sans-serif',
    },
  });

  return (
    <Grid container item sx={styles.day}>
      <Grid item sx={styles.head}>
        <TypographyComponents
          sx={styles.headText}
          variant={'p'}
          wrap={false}
          component={'div'}
          title={'Monday'}
        />
        <TypographyComponents
          sx={styles.headText}
          variant={'p'}
          wrap={false}
          component={'div'}
          title={'Dec 6'}
        />
        <TypographyComponents
          sx={styles.headText}
          variant={'p'}
          wrap={false}
          component={'div'}
          title={'25 hours'}
        />
      </Grid>
      <Grid item sx={styles.body}>
        <Box sx={styles.content}>
          <TypographyComponents
            sx={styles.contentText}
            variant={'p'}
            wrap={false}
            component={'div'}
            title={'4A-Wing-CCU'}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(WeekDay);
