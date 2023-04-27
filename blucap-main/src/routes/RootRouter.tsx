import { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BluCapBackground } from 'src/components/Background';

const LoginPageRouter = lazy(() => import('./LoginPageRouter'));
const DashboardRouter = lazy(() => import('./DashboardRouter'));

const RootRouter: FC = () => {
  return (
    <Router>
      <Suspense fallback={<BluCapBackground />}>
        {import.meta.env.VITE_APP_IS_LOGIN_PAGE === 'true' ? (
          <LoginPageRouter />
        ) : (
          <DashboardRouter />
        )}
      </Suspense>
    </Router>
  );
};

export default RootRouter;
