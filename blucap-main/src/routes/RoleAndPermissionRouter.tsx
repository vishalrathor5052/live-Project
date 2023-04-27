import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import RolesAndPermissionsAttribute from 'src/screens/rolesAndPermissions/Attribute';
import RolesAndPermissionsHome from 'src/screens/rolesAndPermissions/Home';
import RolesAndPermissionsMembers from 'src/screens/rolesAndPermissions/Members';
import RolesAndPermissionsPermsScreen from 'src/screens/rolesAndPermissions/Permissions';
import RolesAndPermissionsTabView from 'src/screens/rolesAndPermissions/TabView';

const RolesAndPermissionsRouter: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact>
        <RolesAndPermissionsHome />
      </Route>
      <Route path={`${path}/attributes/:id`}>
        <RolesAndPermissionsTabView>
          <RolesAndPermissionsAttribute />
        </RolesAndPermissionsTabView>
      </Route>
      <Route path={`${path}/permissions/:id`}>
        <RolesAndPermissionsTabView>
          <RolesAndPermissionsPermsScreen />
        </RolesAndPermissionsTabView>
      </Route>
      <Route path={`${path}/members/:id`}>
        <RolesAndPermissionsTabView>
          <RolesAndPermissionsMembers />
        </RolesAndPermissionsTabView>
      </Route>
    </Switch>
  );
};

export default RolesAndPermissionsRouter;
