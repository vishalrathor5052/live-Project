import { FC, useCallback, useState } from 'react';
import {
  Grid,
  darken,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Paper,
  Modal,
  DialogContent,
  ButtonBase,
} from '@mui/material';
import { mdiPlus } from '@mdi/js';

import { createSX } from 'src/utils/createStyles';
import IconOf from 'src/utils/IconOf';
import { useHistory, useRouteMatch } from 'react-router';
import api from 'src/store/query';
import { HospitalRoleCategory } from 'src/generated/graphql';
import CreateRoleModal from './CreateRoleModal';
import PermissionContext from './tabView.context';

const styles = createSX({
  wardChip: {
    transition: theme =>
      theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeOut,
      }),
    color: 'inherit',
    textDecoration: 'inherit',
    paddingBottom: 2,
    backgroundColor: '#fff0',
    '&:hover': {
      backgroundColor: theme => darken(theme.palette.grey[100], 0.01),
    },
  },
  addressHeader: {
    textDecoration: 'inherit',
  },
  sideTab: {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    p: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'left',
    transition: theme =>
      theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeOut,
      }),
    '&:hover': {
      backgroundColor: 'grey.100',
    },
    '&.selected': {
      backgroundColor: 'grey.400',
    },
  },
});

// TODO: FIX `All Employee Permission`
const allEmployeeId = '--all--';

const RolesAndPermissionsTabView: FC = ({ children }) => {
  const history = useHistory();
  const { path, params } = useRouteMatch<{ id: string }>();
  const [createRoleTypeForHospitalMutation] =
    api.useCreateRoleTypeForHospitalMutation();

  const [createRoleModal, setCreateRoleModal] = useState(false);

  const [hasActiveChanges, setHasActiveChanges] = useState(false);
  const [userTryingToLeave, setUserTryingToLeave] = useState(false);

  const closeModal = useCallback(() => {
    setCreateRoleModal(false);
  }, []);
  const createRole = useCallback(
    async ({
      abbr,
      roleName,
      roleType,
    }: {
      roleName: string;
      abbr: string;
      roleType: HospitalRoleCategory;
    }) => {
      try {
        const result = await createRoleTypeForHospitalMutation({
          role: {
            abbr,
            title: roleName,
            category: roleType,
            hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
          },
        }).unwrap();
        history.push(`/roles/permissions/${result.createHospitalRoleType._id}`);
      } finally {
        setCreateRoleModal(false);
      }
    },
    [createRoleTypeForHospitalMutation, history],
  );
  const openModal = useCallback(() => {
    setCreateRoleModal(true);
  }, []);

  const { roleTypes } = api.useGetHospitalRoleTypesQuery(
    {
      hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    { selectFromResult: ({ data }) => ({ roleTypes: data?.roleTypes }) },
  );

  return (
    <PermissionContext.Provider
      value={{
        hasActiveChanges,
        setHasActiveChanges,
        userTryingToLeave,
        setUserTryingToLeave,
      }}
    >
      <Grid container direction="row" width="100%">
        <Grid container item direction="column" margin={2} xs={8} spacing={4}>
          <Grid
            container
            item
            direction="row"
            width="100%"
            marginLeft={2}
            spacing={1}
            paddingLeft={4}
          >
            <Grid item sx={styles.addressHeader}>
              <Typography variant="h4">Roles and Permissions</Typography>
            </Grid>
            <Grid item xs />
          </Grid>

          <Grid item container height="100%" width="100%" direction="row" xs>
            <Grid item xs={2}>
              <Grid container direction="column" pr={2}>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs>
                    <Typography variant="h6">Roles</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={openModal}>
                      <IconOf>{mdiPlus}</IconOf>
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid item height="20px" />

                <Grid container item direction="column" spacing={1}>
                  {(roleTypes ?? []).map(roleType => (
                    <Grid
                      item
                      key={roleType._id}
                      onClick={() =>
                        hasActiveChanges
                          ? setUserTryingToLeave(true)
                          : history.push(path.replace(':id', roleType._id))
                      }
                    >
                      <ButtonBase
                        sx={styles.sideTab}
                        className={roleType._id === params.id ? 'selected' : ''}
                      >
                        <Typography variant="h6" textAlign="left">
                          {roleType.title}
                        </Typography>
                      </ButtonBase>
                    </Grid>
                  ))}
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid
                    item
                    onClick={() =>
                      hasActiveChanges
                        ? setUserTryingToLeave(true)
                        : history.push('/roles/permissions/--all--')
                    }
                  >
                    <Paper
                      sx={styles.sideTab}
                      className={params.id === allEmployeeId ? 'selected' : ''}
                      elevation={0}
                    >
                      <Typography variant="h6">Everyone</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item height="100%" width="2px">
              <Divider
                orientation="vertical"
                variant="fullWidth"
                color="black"
              />
            </Grid>
            <Grid item xs>
              <Grid item container direction="column">
                <Grid item ml={4}>
                  {params.id === allEmployeeId ? (
                    <Typography fontSize={25}>
                      Edit default permissions
                    </Typography>
                  ) : (
                    <Typography fontSize={25}>
                      Edit role -{' '}
                      {
                        roleTypes?.find(roleType => roleType._id === params.id)
                          ?.title
                      }
                    </Typography>
                  )}
                </Grid>
                <Grid item ml={4}>
                  <Tabs
                    key="rolesAndPermissionTabView"
                    onChange={(_, newValue) =>
                      hasActiveChanges
                        ? setUserTryingToLeave(true)
                        : history.push(newValue.replace(':id', params.id))
                    }
                    value={path}
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      width: '100%',
                    }}
                  >
                    {params.id !== allEmployeeId ? (
                      <Tab
                        label="Role Attributes"
                        value="/roles/attributes/:id"
                        disabled={params.id === allEmployeeId}
                        sx={{ flex: 1 }}
                      />
                    ) : null}
                    <Tab
                      label="Permissions"
                      value="/roles/permissions/:id"
                      sx={{ flex: 1 }}
                    />
                    {params.id !== allEmployeeId ? (
                      <Tab
                        label="Members"
                        value="/roles/members/:id"
                        disabled={params.id === allEmployeeId}
                        sx={{ flex: 1 }}
                      />
                    ) : null}
                  </Tabs>
                </Grid>
              </Grid>
              <Grid item xs key={params.id}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Modal open={createRoleModal} onClose={closeModal} tabIndex={-1}>
          <DialogContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CreateRoleModal onClose={closeModal} onProceed={createRole} />
          </DialogContent>
        </Modal>
      </Grid>
    </PermissionContext.Provider>
  );
};

export default RolesAndPermissionsTabView;
