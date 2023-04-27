import { mdiAccountGroup, mdiCheck, mdiChevronRight, mdiMenu } from '@mdi/js';
import {
  Button,
  Card,
  DialogContent,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { HospitalRoleCategory } from 'src/generated/graphql';
import api from 'src/store/query';
import { createSX } from 'src/utils/createStyles';
import IconOf from 'src/utils/IconOf';
import CreateRoleModal from './CreateRoleModal';

const styles = createSX({
  addressHeader: {
    textDecoration: 'inherit',
  },
  filterRolesPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
  cardGrid: {
    width: '100%',
    flexDirection: 'row',
    boxShadow: 4,
    cursor: 'pointer',
  },
  tableRow: {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: theme =>
      theme.transitions.create('background-color', {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.sharp,
      }),
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&:hover': {
      backgroundColor: 'grey.100',
    },
  },
});

const RolesAndPermissionsHome: FC = () => {
  const history = useHistory();
  const [createRoleTypeForHospitalMutation] =
    api.useCreateRoleTypeForHospitalMutation();
  const { roleTypes } = api.useGetHospitalRoleTypesQuery(
    {
      hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    { selectFromResult: ({ data }) => ({ roleTypes: data?.roleTypes }) },
  );

  const [roleFilterAnchor, setRoleFilterAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const [createRoleModal, setCreateRoleModal] = useState(false);
  const [filterByRole, setFilterByRole] = useState<HospitalRoleCategory[]>(
    Object.values(HospitalRoleCategory),
  );
  const [search, setSearch] = useState('');

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

  return (
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

        <Menu
          id="filter-roles"
          anchorEl={roleFilterAnchor}
          open={!!roleFilterAnchor}
          onClose={() => setRoleFilterAnchor(null)}
          PaperProps={{
            elevation: 0,
            sx: styles.filterRolesPaper,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {Object.values(HospitalRoleCategory).map(role => (
            <MenuItem
              key={role}
              onClick={() => {
                setFilterByRole(v =>
                  v.includes(role)
                    ? v.filter(filter => filter !== role)
                    : v.concat(role),
                );
              }}
            >
              <ListItemIcon>
                <IconOf
                  sx={{
                    color: filterByRole.includes(role)
                      ? 'green'
                      : 'transparent',
                  }}
                >
                  {mdiCheck}
                </IconOf>
              </ListItemIcon>
              <ListItemText>{_.startCase(role.toLowerCase())}</ListItemText>
            </MenuItem>
          ))}
        </Menu>

        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginY={4}
        >
          <Grid
            component={Card}
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={styles.cardGrid}
            onClick={() => history.push('/roles/permissions/--all--')}
          >
            <Grid item marginLeft={4}>
              <IconOf fontSize="large">{mdiAccountGroup}</IconOf>
            </Grid>
            <Grid container item direction="column" xs padding={2} flex={1}>
              <Grid item>
                <Typography variant="h4">Default permissions</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Permission applicable to all hospital professionals
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconOf fontSize="large">{mdiChevronRight}</IconOf>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item direction="row" alignItems="center">
          <Grid item xs>
            <TextField
              label="Search for roles"
              fullWidth
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={e => setRoleFilterAnchor(e.currentTarget)}>
              <IconOf>{mdiMenu}</IconOf>
            </IconButton>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={openModal}>
              Create role
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontSize={20}>Role</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={20}>Abbreviation</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={20}>Members</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(roleTypes ?? [])
                  .filter(roleType => filterByRole.includes(roleType.category))
                  .filter(
                    roleType =>
                      roleType.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      roleType.abbr
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                  )
                  .map(row => (
                    <TableRow
                      key={row._id}
                      sx={styles.tableRow}
                      onClick={() =>
                        history.push(`/roles/permissions/${row._id}`)
                      }
                    >
                      <TableCell component="th" scope="row">
                        <Typography>{row.title}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>{row.abbr}</Typography>
                      </TableCell>
                      <TableCell>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <IconOf sx={{ marginTop: '4px' }}>
                              {mdiAccountGroup}
                            </IconOf>
                          </Grid>
                          <Grid item>
                            <Typography>
                              {Math.round(Math.random() * 100)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
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
  );
};

export default RolesAndPermissionsHome;
