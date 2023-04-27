import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useRouteMatch } from 'react-router';
import api from 'src/store/query';
import { createSX } from 'src/utils/createStyles';

export type SelectDepartmentProceedType = (
  payload:
    | {
        type: 'continue';
        roleId: string;
      }
    | {
        type: 'createRole';
        departmentId: string;
        roleTypeId: string;
      }
    | {
        type: 'createDept';
        roleTypeId: string;
      }
    | {
        type: 'createUnderHospital';
        roleTypeId: string;
      },
) => void;

const styles = createSX({
  card: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: theme => theme.palette.background.paper,
  },
  buttons: {
    flexDirection: 'column',
  },
});

export const SelectDepartment: FC<{ proceed: SelectDepartmentProceedType }> = ({
  proceed,
}) => {
  const { params } = useRouteMatch<{ id: string }>();
  const { departments } = api.useGetDepartmentForHospitalQuery(
    {
      id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: ({ data }) => ({
        departments: data?.departments.departments,
      }),
    },
  );
  const [selected, setSelected] = useState<{
    __typename?: 'Department' | undefined;
    _id: string;
    abbr: string;
    name: string;
  } | null>({
    _id: '--not-selected--',
    abbr: '',
    name: 'Not selected',
  });

  const { roleType } = api.useGetHospitalRoleTypesQuery(
    {
      hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: ({ data }) => ({
        roleType: data?.roleTypes?.find(roleType => roleType._id === params.id),
      }),
    },
  );

  const { roles: allRoles } = api.useGetHospitalRoleQuery(
    {
      hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: ({ data }) => ({
        roles: data?.hospitalRoles,
      }),
    },
  );
  const roles = useMemo(() => {
    return allRoles?.filter(role => role.hospitalRoleType._id === params.id);
  }, [allRoles, params.id]);

  return (
    <Grid sx={styles.card}>
      <Grid container direction="column" alignItems="center" p={3}>
        <Grid item>
          <Typography variant="h5">Adding members to role</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="gray">
            {roleType?.title}
          </Typography>
        </Grid>
        <Grid item width="100%">
          <Divider color="gray" />
        </Grid>
        <Grid container item direction="row" mt={1}>
          {departments ? (
            <Grid item xs>
              <Autocomplete
                disablePortal
                fullWidth
                id="department-box"
                value={selected}
                options={departments.concat({
                  _id: '--not-selected--',
                  abbr: '',
                  name: 'Not selected',
                })}
                onChange={(e, val) => setSelected(val)}
                getOptionLabel={dept => dept.name}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Typography
                      {...(option._id === '--not-selected--'
                        ? { color: 'gray' }
                        : {})}
                    >
                      {option.name}
                    </Typography>
                  </Box>
                )}
                renderInput={params => (
                  <TextField {...params} label="Select department" />
                )}
              />
            </Grid>
          ) : null}
        </Grid>
        {selected &&
        selected._id !== '--not-selected--' &&
        !roles?.find(role => role.department?._id === selected?._id) ? (
          <>
            <Grid item mt={2}>
              <Typography>
                Role not found in {selected.name} department
              </Typography>
            </Grid>
            <Grid item mt={1}>
              <Typography>
                Create new role {roleType?.title} in {selected.name} department?
              </Typography>
            </Grid>
            <Grid item mt={2}>
              <Button
                variant="contained"
                sx={styles.buttons}
                onClick={() =>
                  proceed({
                    type: 'createRole',
                    departmentId: selected._id,
                    roleTypeId: params.id,
                  })
                }
              >
                <Typography>Yes</Typography>
                <Typography color="yellow">Add role to department</Typography>
              </Button>
            </Grid>
          </>
        ) : selected && selected._id !== '--not-selected--' ? (
          <Grid item mt={2}>
            <Button
              variant="contained"
              onClick={() =>
                proceed({
                  type: 'continue',
                  roleId:
                    roles?.find(role => role.department?._id === selected?._id)
                      ?._id ?? '',
                })
              }
            >
              Continue
            </Button>{' '}
          </Grid>
        ) : selected && selected._id === '--not-selected--' ? (
          <Grid container direction="column" alignItems="center" mt={2}>
            <Grid item>
              <Button
                variant="contained"
                sx={styles.buttons}
                onClick={() =>
                  proceed({
                    type: 'createDept',
                    roleTypeId: params.id,
                  })
                }
              >
                <Typography>Create Department</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Typography>OR</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={styles.buttons}
                onClick={() =>
                  proceed({
                    type: 'createUnderHospital',
                    roleTypeId: params.id,
                  })
                }
              >
                <Typography>Create role</Typography>
                <Typography color="yellow">Directly under hospital</Typography>
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};
