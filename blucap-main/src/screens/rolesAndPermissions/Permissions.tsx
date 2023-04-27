import { mdiMagnify } from '@mdi/js';
import {
  Button,
  Divider,
  Grid,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import {
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouteMatch } from 'react-router';

import api from 'src/store/query';
import { HospitalRoleCategory } from 'src/generated/graphql';
import { createSX } from 'src/utils/createStyles';
import IconOf from 'src/utils/IconOf';
import PermissionContext from './tabView.context';

const styles = createSX({
  snackbar: {
    backgroundColor: 'grey.900',
    color: 'white',
    borderRadius: 1,
    transition: theme =>
      theme.transitions.create(['background-color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.complex,
      }) + ' !important',

    '&.highlight': {
      backgroundColor: 'error.dark',
    },
  },
});

const RolesAndPermissionsPerms: FC = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const [grantPermission] = api.useGrantPermissionMutation();

  const { permissions } = api.useGetAllPermissionsQuery(
    {},
    { selectFromResult: ({ data }) => ({ permissions: data?.permissions }) },
  );
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

  const permissionsToCurrentRole = useMemo(
    () =>
      roleType?._id === params?.id && roleType?.permissions
        ? Object.fromEntries(
            roleType?.permissions
              ?.filter(
                perm =>
                  perm.category === roleType.category ||
                  roleType.category === HospitalRoleCategory.Hybrid,
              )
              .map(permission => [permission._id, permission]),
          )
        : null,
    [roleType, params?.id],
  );

  const [newPermissions, setNewPermissions] = useState<Record<
    string,
    boolean
  > | null>(null);

  const {
    hasActiveChanges,
    setHasActiveChanges,
    setUserTryingToLeave,
    userTryingToLeave,
  } = useContext(PermissionContext);

  const [search, setSearch] = useState('');

  const groupedPermissions = useMemo(
    () =>
      _.map(
        _.entries(
          _.groupBy(
            _.filter(
              permissions,
              p =>
                p.name.toLowerCase().includes(search) ||
                p.description?.toLowerCase().includes(search),
            ) as typeof permissions,
            'category',
          ),
        ),
        ([category, permissions]) => ({ category, permissions }),
      ),
    [permissions, search],
  );

  useEffect(() => {
    userTryingToLeave
      ? setTimeout(() => setUserTryingToLeave(false), 1000)
      : null;
  }, [setUserTryingToLeave, userTryingToLeave]);

  useEffect(() => {
    setNewPermissions(perms => {
      if (!perms && permissionsToCurrentRole) {
        return Object.fromEntries(
          Object.entries(permissionsToCurrentRole).map(perm => [perm[0], true]),
        );
      }
      return perms;
    });
  }, [permissionsToCurrentRole]);

  useEffect(() => {
    const requiresUpdate = !permissionsToCurrentRole
      ? false
      : !!Object.entries(newPermissions ?? {}).find(
          ([permId, status]) => status === !permissionsToCurrentRole[permId],
        );
    setHasActiveChanges(requiresUpdate);
  }, [newPermissions, permissionsToCurrentRole, setHasActiveChanges]);

  const saveChanges = useCallback(async () => {
    setHasActiveChanges(false);
    await grantPermission({
      hospitalRoleTypeId: params.id,
      permissionIds: _.map(_.filter(_.entries(newPermissions ?? {}), 1), 0),
    });
  }, [grantPermission, newPermissions, params.id, setHasActiveChanges]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item ml={4}>
        <TextField
          fullWidth
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconOf sx={{ marginRight: 2 }}>{mdiMagnify}</IconOf>
            ),
          }}
        />
      </Grid>

      <Grid item container direction="column" spacing={4}>
        {groupedPermissions
          .filter(
            groupedPermission =>
              groupedPermission.category === roleType?.category ||
              roleType?.category === HospitalRoleCategory.Hybrid,
          )
          .map<ReactNode>(group => (
            <Grid item key={group.category} container direction="column" ml={4}>
              <Grid item container direction="row">
                <Grid item xs>
                  <Typography variant="h5" sx={{ textDecoration: 'underline' }}>
                    {_.startCase(group.category.toLowerCase())}
                  </Typography>
                </Grid>
                <Grid item>
                  <Switch />
                </Grid>
              </Grid>
              <Grid container direction="column" spacing={2}>
                {group.permissions.map(permission => (
                  <Grid item container direction="row" key={permission._id}>
                    <Grid item xs>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="h6">
                            {permission.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography>{permission.description}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Switch
                        checked={newPermissions?.[permission._id] ?? false}
                        onChange={(e, checked) => {
                          setHasActiveChanges(true);
                          setNewPermissions(perms => ({
                            ...perms,
                            [permission._id]: checked,
                          }));
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))
          .reduce(
            (prev, curr, i) => [
              prev,
              <Grid item key={`divider${i}`}>
                <Divider />
              </Grid>,
              curr,
            ],
            [],
          )}
      </Grid>
      <Snackbar
        open={hasActiveChanges}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={styles.snackbar}
            className={userTryingToLeave ? 'highlight' : ''}
          >
            <Grid item ml={2} my={1}>
              <Typography>Warning - Unsaved changes ahead</Typography>
            </Grid>
            <Grid item ml={2}>
              <Button
                color="warning"
                variant="text"
                onClick={() => {
                  if (permissionsToCurrentRole) {
                    setHasActiveChanges(false);
                    setNewPermissions(
                      Object.fromEntries(
                        Object.entries(permissionsToCurrentRole).map(perm => [
                          perm[0],
                          true,
                        ]),
                      ),
                    );
                  }
                }}
              >
                Discard
              </Button>
            </Grid>
            <Grid item ml={2}>
              <Button color="success" variant="contained" onClick={saveChanges}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Snackbar>
    </Grid>
  );
};

export default RolesAndPermissionsPerms;
