import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import ResponsiveDrawer from 'src/components/Drawer';
import PeopleDepartmentView from 'src/screens/peopleDeptScreens';
import Rostering from 'src/screens/rostering/index';
import RolesAndPermissionsRouter from './RoleAndPermissionRouter';
import WardRouter from './WardRouter';

const DashboardRouter: FC = () => (
  <>
    <ResponsiveDrawer>
      <Switch>
        <Route path="/wards">
          <WardRouter />
        </Route>
        <Route path="/roles">
          <RolesAndPermissionsRouter />
        </Route>
        <Route path="/roster">
          <div />
        </Route>
        <Route path="/people">
          <PeopleDepartmentView />
        </Route>
        <Route exact path={['/rostering', '/rostering/:param']}>
          <Rostering />
        </Route>
        <Route path="*">
          <Redirect to="/wards" />
        </Route>
      </Switch>
    </ResponsiveDrawer>
  </>
);

export default DashboardRouter;
