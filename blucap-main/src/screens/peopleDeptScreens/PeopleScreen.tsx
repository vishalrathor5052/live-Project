import { mdiDotsHorizontal, mdiEmail, mdiPhone } from '@mdi/js';
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { GetEmployeesForHospitalQuery } from 'src/generated/graphql';
import api from 'src/store/query';
import IconOf from 'src/utils/IconOf';

const emptyArray: GetEmployeesForHospitalQuery['employees'] = [];

const PeopleScreen: FC = () => {
  const [search, setSearch] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >();

  const { employees } = api.useGetEmployeesForHospitalQuery(
    {
      hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: ({ data }) => ({
        employees: data?.employees ?? emptyArray,
      }),
    },
  );

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      flexWrap="nowrap"
      height="100%"
    >
      <Grid item mt={1}>
        <TextField
          label="Search People"
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
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
        {employees
          .filter(person =>
            person.user.fullName.toLowerCase().includes(search.toLowerCase()),
          )
          .map(person => (
            <Grid item key={person._id} width="100%">
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <Avatar
                    {...(person.user.picture
                      ? { src: person.user.picture }
                      : {})}
                  />
                </Grid>
                <Grid item container direction="column" xs spacing={1}>
                  <Grid item>
                    <Typography>{person.user.fullName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {person.user.profile.educations
                        .map(({ degree }) => degree)
                        .join(', ')}
                    </Typography>
                  </Grid>
                  {person.roles.map(role => (
                    <Grid item key={role._id} container direction="column">
                      <Typography>
                        {role.hospitalRole.hospitalRoleType.title}
                        {role.hospitalRole.department?.name
                          ? ` ( ${role.hospitalRole.department?.name} )`
                          : ''}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                <Grid item container direction="column" xs={4}>
                  <Grid item container alignItems="center" spacing={1}>
                    <Grid item mt="4px">
                      <IconOf>{mdiPhone}</IconOf>
                    </Grid>
                    <Grid item>
                      <Typography textAlign="center">
                        {person.user.phoneNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container alignItems="center" spacing={1}>
                    <Grid item mt="4px">
                      <IconOf>{mdiEmail}</IconOf>
                    </Grid>
                    <Grid item>
                      <Typography textAlign="center">
                        {person.user.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <IconButton onClick={e => setMenuAnchor(e.currentTarget)}>
                    <IconOf>{mdiDotsHorizontal}</IconOf>
                  </IconButton>
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
