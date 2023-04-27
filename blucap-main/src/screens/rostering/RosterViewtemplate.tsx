/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CalendarComponent from 'src/components/CalendarComponent';
import { Loader } from 'src/components/Loader';
import TableComponent from 'src/components/TableComponent';
import WeekComponent from 'src/components/WeekComponent';
import { Maybe } from 'src/generated/graphql';

const RosterViewTemplate: FC = () => {
  const { wardEmployee, isLoading } = useSelector(
    (state: Maybe<any>) => state?.header,
  );

  const [isEmployee, setIsEmployee] = useState<boolean>(false);

  /**
   * todo: verify the ward employee type ['Wards', 'Employee']
   * Have to appear view according to selected ward employee type
   */
  useEffect(() => {
    if (wardEmployee === 'Employee') {
      setIsEmployee(true);
    } else {
      setIsEmployee(false);
    }
  }, [wardEmployee]);

  return (
    <>
      {' '}
      {isLoading && <Loader />}
      {!isLoading && isEmployee && <EmployeeComponent />}
      {!isLoading && !isEmployee && <TableComponent />}
    </>
  );
};

const EmployeeComponent: FC = () => {
  const { selectedView } = useSelector((state: Maybe<any>) => state?.header);

  return selectedView === 'week' ? <WeekComponent /> : <CalendarComponent />;
};

export default React.memo(RosterViewTemplate);
