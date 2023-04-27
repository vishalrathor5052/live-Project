/* eslint-disable  @typescript-eslint/no-explicit-any */

import { AppBar, Toolbar, Box } from '@mui/material';
import React from 'react';
import { createSX } from 'src/utils/createStyles';
import {
  NotificationsActiveOutlined,
  AccountCircle,
} from '@mui/icons-material';

// import selector for get the all state
import { useSelector } from 'react-redux';

// import typography cmponents
import { TypographyComponents } from './TypographyComponents';
import { IconButtonComponent } from './IconButtonComponent';

const styles = createSX({
  appBar: {
    width: '94%',
    background: '#ffffff',
    flexGrow: 1,
    alignItems: 'center',
  },
  toolbar: {
    flexGrow: 1,
    justifyContent: 'space-between',
    color: '#000000',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    color: 'primary.main',
  },
});

const Header = (): JSX.Element => {
  const { title } = useSelector((state: any) => state.header);

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Box sx={{ width: '100%', px: 3.5 }}>
        <Toolbar disableGutters sx={styles.toolbar}>
          <TypographyComponents
            className="heading"
            sx={styles.header}
            variant={'h2'}
            wrap={false}
            component={'div'}
            title={title}
          />
          <Box>
            <IconButtonComponent
              IconName={NotificationsActiveOutlined}
              size={'large'}
              fontSize={'inherit'}
              label={'notification'}
            />
            <IconButtonComponent
              IconName={AccountCircle}
              size={'large'}
              fontSize={'inherit'}
              label={'notification'}
            />
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default React.memo(Header);
