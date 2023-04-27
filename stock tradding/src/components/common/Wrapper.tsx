import DashboardHeader from "./DashboardHeader";

const Wrapper =
  (Component: any) =>
  ({ ...props }) =>
    (
      <div>
        <DashboardHeader />
        <Component {...props} />
      </div>
    );

export default Wrapper;
