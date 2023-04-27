import { mdiDotsHorizontal } from '@mdi/js';
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { FC, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { GetEmployeesForHospitalQuery } from 'src/generated/graphql';
import api from 'src/store/query';
import IconOf from 'src/utils/IconOf';

const emptyArray: GetEmployeesForHospitalQuery['employees'] = [];

const InnerDepartmentScreen: FC = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const [menuAnchor, setMenuAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >();

  const { department, employees } =
    // const { department, employees: employeesForType } =
    api.useGetEmployeesForHospitalQuery(
      {
        hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
      },
      {
        selectFromResult: ({ data }) => ({
          department: data?.departments.departments.find(
            dept => dept?._id === params?.id,
          ),
          employees:
            data?.employees.filter(employee =>
              employee.roles.find(
                role => role?.hospitalRole?.department?._id === params?.id,
              ),
            ) ?? emptyArray,
        }),
        skip: !params?.id,
      },
    );

  const employeeGroups = useMemo(
    () =>
      _.toPairs(
        _.groupBy(
          employees.flatMap(({ roles, ...employee }) =>
            roles
              .filter(role => role.hospitalRole?.department?._id === params?.id)
              .map(role => ({ ...employee, role })),
          ),
          employee => employee.role._id,
        ),
      )
        .map(employee => employee[1])
        .map(employees => ({
          role: employees[0].role.hospitalRole.hospitalRoleType,
          employee: employees.map(({ role: _role, ...employee }) => employee),
        })),
    [employees, params?.id],
  );

  console.log(employees);

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      flexWrap="nowrap"
      height="100%"
      paddingLeft={4}
    >
      <Grid
        item
        mt={1}
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="h5">{department?.name}</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={e => setMenuAnchor(e.currentTarget)}>
            <IconOf>{mdiDotsHorizontal}</IconOf>
          </IconButton>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        spacing={2}
        m={2}
        xs
        overflow="auto"
        wrap="nowrap"
      >
        {employeeGroups.map(role => (
          <Grid
            item
            key={role.role._id}
            container
            direction="column"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h5">{role.role.title}</Typography>
            </Grid>
            <Grid item container direction="column" spacing={1}>
              {role.employee.map(employee => (
                <Grid
                  item
                  container
                  direction="row"
                  key={employee._id}
                  spacing={2}
                  alignItems="center"
                >
                  <Grid item>
                    <Avatar src={employee.user.picture ?? undefined} />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    xs
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography fontSize={20}>
                        {employee.user.fullName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}

        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {/* <MenuItem onClick={() => setMenuAnchor(null)}>
            Add people to department
          </MenuItem> */}
          <MenuItem onClick={() => setMenuAnchor(null)}>
            Manage Roster for department
          </MenuItem>
          <MenuItem
            onClick={() => setMenuAnchor(null)}
            sx={{ color: 'error.main' }}
          >
            Remove department
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default InnerDepartmentScreen;
