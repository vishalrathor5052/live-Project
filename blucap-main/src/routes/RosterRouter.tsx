import React, { memo, FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Box } from '@mui/material';
import RosterViewTemplate from 'src/screens/rostering/RosterViewtemplate';
import SetRosterTemplate from '../screens/rostering/SetRosterTemplate';

const RosterSwitchRoot: FC = () => {
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Switch>
          <Route exact path={'/rostering'}>
            <RosterViewTemplate />
          </Route>
          <Route exact path={'/rostering/create'}>
            <SetRosterTemplate />
          </Route>
        </Switch>
      </Box>
    </>
  );
};

export default memo(RosterSwitchRoot);
