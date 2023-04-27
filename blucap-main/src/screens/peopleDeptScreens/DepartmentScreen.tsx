import { mdiAccountOutline } from '@mdi/js';
import {
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
  darken,
} from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { GetEmployeesForHospitalQuery } from 'src/generated/graphql';
import api from 'src/store/query';
import { createSX } from 'src/utils/createStyles';
import IconOf from 'src/utils/IconOf';

const emptyDeptArray: GetEmployeesForHospitalQuery['departments']['departments'] =
  [];
const emptyEmployeeArray: GetEmployeesForHospitalQuery['employees'] = [];

const styles = createSX({
  department: {
    transition: theme =>
      theme.transitions.create('background-color', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp,
      }),
    backgroundColor: '#fff0',
    '&:hover': {
      backgroundColor: theme => darken(theme.palette.grey[100], 0.1),
    },
    cursor: 'pointer',
    padding: 2,
    margin: 2,
  },
});

const PeopleScreen: FC = () => {
  const [search, setSearch] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >();
  const history = useHistory();

  const { departments, employees } = api.useGetEmployeesForHospitalQuery(
    {
      hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: ({ data }) => ({
        departments: data?.departments?.departments ?? emptyDeptArray,
        employees: data?.employees ?? emptyEmployeeArray,
      }),
    },
  );

  const employeeInDept = useMemo(
    () =>
      Object.fromEntries(
        departments.map(
          dept =>
            [
              dept._id,
              employees.reduce(
                (total, curr) =>
                  curr.roles?.find(
                    role => role.hospitalRole?.department?._id === dept._id,
                  )
                    ? total + 1
                    : total,
                0,
              ),
            ] as const,
        ),
      ),
    [departments, employees],
  );

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      flexWrap="nowrap"
      height="100%"
    >
      <Grid container direction="row" alignItems="center">
        <Grid item mt={1} xs>
          <TextField
            label="Search"
            fullWidth
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        m={2}
        xs
        overflow="auto"
        wrap="nowrap"
        pr={2}
      >
        {departments.map(department => (
          <Grid
            item
            key={department._id}
            sx={styles.department}
            onClick={() => {
              history.push(`/people/department/${department._id}`);
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h5">{department.name}</Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item>
                    <IconOf>{mdiAccountOutline}</IconOf>
                  </Grid>

                  <Grid item>
                    <Typography>
                      {employeeInDept[department?._id] ?? 0} employees
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onClick={() => setMenuAnchor(null)}>
            Add new employee
          </MenuItem>
          <MenuItem onClick={() => setMenuAnchor(null)}>
            Add new department(s)
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default PeopleScreen;
