import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AllWardsHomeScreen from 'src/screens/wardScreens/AllWardsHomeScreen';
import InnerWardScreen from 'src/screens/wardScreens/InnerWardScreen';

const WardRouter: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <AllWardsHomeScreen />
      </Route>
      <Route exact path={`${path}/:id`}>
        <InnerWardScreen />
      </Route>
    </Switch>
  );
};

export default WardRouter;
