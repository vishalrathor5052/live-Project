/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FC, useState, useMemo, memo } from 'react';
import { Box, Grid } from '@mui/material';
import { IconButtonComponent } from 'src/components/IconButtonComponent';
import { ArrowDropDownCircle } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSX } from 'src/utils/createStyles';
import CenterComponent from './Components/CenterComponent';
import RightComponent from './Components/RightComponent';
import LeftComponent from './Components/LeftComponent';
import TopComponent from './Components/TopComponent';

export type Maybe<T> = T | undefined | null;

const styles = createSX({
  container: {
    padding: '30px',
    zIndex: 0,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: '25px',
    right: '-25px',
    zIndex: 10,
    transform: 'rotate(-90deg)',
  },
});

const Rostering: FC = () => {
  const [openRightComponent, setOpenRightComponent] = useState(true);

  const { rosterData } = useSelector((state: Maybe<any>) => state?.header);

  const history = useHistory();

  /**
   * todo: verify the roster list then redirect to rostering create page or rostering page
   */
  useMemo(() => {
    if (rosterData?.length === 0) history.push('/rostering/create');
    if (rosterData?.length > 0) history.push('/rostering');
  }, [rosterData, history]);

  return (
    <>
      <Grid container>
        <Grid item xs={openRightComponent ? 9 : 11} sx={styles.container}>
          <Box
            sx={styles.iconContainer}
            onClick={() => setOpenRightComponent(!openRightComponent)}
          >
            <IconButtonComponent
              IconName={ArrowDropDownCircle}
              color="primary"
              size={'large'}
              fontSize={'inherit'}
              label={'ArrowDropDownCircleIcon'}
            />
          </Box>
          <TopComponent />

          <Grid container spacing={2} sx={{ mt: 2.5 }}>
            <Grid item xs={3}>
              <LeftComponent />
            </Grid>
            <Grid item xs={9}>
              <CenterComponent />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={3}
          borderLeft="1px solid #3a7c92"
          style={{ display: openRightComponent ? 'block' : 'none' }}
        >
          <RightComponent />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Rostering);
