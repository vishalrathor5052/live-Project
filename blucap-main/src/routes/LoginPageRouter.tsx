import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import LoginScreen from 'src/screens/LoginScreen';
import HospitalSelectionScreen from 'src/screens/HospitalSelection';
import RxProfile from 'src/screens/RxProfile/RxProfile';
import { BluCapBackground } from 'src/components/Background';
import api from 'src/store/query';

const LoginPageRouter: FC = () => {
  const { data, isLoading } = api.useGetCurrentUserQuery();

  if (isLoading) return <BluCapBackground />;

  return !data?.user ? (
    <Switch>
      <Route path="/login">
        <LoginScreen />
      </Route>
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  ) : (
    <Switch>
      <Route path="/select">
        <HospitalSelectionScreen />
      </Route>
      <Route path="/profile/:id">
        <RxProfile />
      </Route>
      <Route path="*">
        <Redirect to="/select" />
      </Route>
    </Switch>
  );
};

export default LoginPageRouter;
