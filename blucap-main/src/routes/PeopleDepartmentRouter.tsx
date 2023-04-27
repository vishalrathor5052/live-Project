import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import DepartmentScreen from 'src/screens/peopleDeptScreens/DepartmentScreen';
import InnerDepartmentScreen from 'src/screens/peopleDeptScreens/InnerDepartmentScreen';
import PeopleScreen from 'src/screens/peopleDeptScreens/PeopleScreen';

const PeopleDepartmentRouter: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={[path, `${path}/management`]}>
        <PeopleScreen />
      </Route>
      <Route exact path={`${path}/department`}>
        <DepartmentScreen />
      </Route>
      <Route exact path={`${path}/department/:id`}>
        <InnerDepartmentScreen />
      </Route>
    </Switch>
  );
};

export default PeopleDepartmentRouter;
