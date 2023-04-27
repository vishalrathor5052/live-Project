import {
  AppBar,
  Avatar,
  Button,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, MouseEvent, useCallback, useMemo, useState } from 'react';
import { mdiArrowRight, mdiChevronDown } from '@mdi/js';

import { useDispatch } from 'src/store';
import { logoutUser } from 'src/store/actions/auth';
import { createSX } from 'src/utils/createStyles';
import IconOf from 'src/utils/IconOf';
import api from 'src/store/query';
import { Link } from 'react-router-dom';

const styles = createSX({
  container: {
    padding: 3,
    height: '100vh',
    width: '100vw',
  },
  brandContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBottom: 2,
    marginTop: 10,
  },
  selectText: {
    opacity: 0.8,
  },
  containerMaxHeight: {
    maxHeight: '100vh',
    flexWrap: 'nowrap',
  },
  hospitalContainer: {
    overflow: 'auto',
    flex: 1,
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'primary.main',
    width: '40vw',
    borderRadius: 5,
    color: theme => theme.palette.getContrastText(theme.palette.primary.main),
  },
  cardAction: {
    padding: '40px',
  },
  hyperlink: {
    textDecoration: 'none',
    transition: theme =>
      theme.transitions.create(['background', 'background-color'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.sharp,
      }),
    '&:hover': {
      backgroundColor: '#fff5',
    },
    borderRadius: 5,
  },
  wordBreak: {
    wordWrap: 'break-word',
  },
  linkButton: {
    color: theme => theme.palette.getContrastText(theme.palette.primary.main),
  },
  expandButton: {
    color: theme => theme.palette.grey[100],
  },
  errorButton: { color: 'error.main' },
});

const HospitalSelectionScreen: FC = () => {
  const dispatch = useDispatch();
  const { data } = api.useGetCurrentUserQuery();
  const user = data?.user;

  const [menuAnchor, setMenuAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);

  const [hospitals] = useState<
    { name: string; _id: string; subDomain?: string }[]
  >([
    { name: 'Some Hospital', _id: '1', subDomain: 'hospital' },
    { name: 'Other Hospital', _id: '2', subDomain: 'hospital' },
  ]);

  const domain = useMemo(
    () => window.location.hostname.split('.').slice(1).join('.'),
    [],
  );
  const protocol = useMemo(() => window.location.protocol, []);

  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const redirect = useCallback(
    (event: MouseEvent<HTMLButtonElement>, subDomain: string) => {
      event.preventDefault();
      event.stopPropagation();
      window.open(
        `${protocol}//${subDomain ?? 'hospital'}.${domain}`,
        // TODO: Replace this after backend is ready
        '_blank',
        'noopener noreferrer',
      );
      return false;
    },
    [domain, protocol],
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid>
              <Typography variant="h6" noWrap>
                BluCap Rx
              </Typography>
            </Grid>
            <Grid item>
              <Grid container item alignItems="center" spacing={1}>
                <Grid item>
                  {user?.picture ? <Avatar src={user?.picture} /> : <Avatar />}
                </Grid>
                <Grid item>
                  <Typography>{user?.fullName ?? 'Doctor'}</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={e => setMenuAnchor(e.currentTarget)}
                    sx={styles.expandButton}
                  >
                    <IconOf>{mdiChevronDown}</IconOf>
                  </IconButton>
                </Grid>
                <Menu
                  id="ward-filter-menu"
                  anchorEl={menuAnchor}
                  open={!!menuAnchor}
                  onClose={() => setMenuAnchor(null)}
                  MenuListProps={{
                    'aria-labelledby': 'ward-filter-button',
                  }}
                >
                  <MenuItem component={Link} to={`/profile/${user?._id}`}>
                    View profile
                  </MenuItem>
                  <MenuItem onClick={logout} sx={styles.errorButton}>
                    Logout
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        xs={12}
        sx={Object.assign({}, styles.containerMaxHeight, styles.container)}
      >
        <Grid
          direction="column"
          justifyContent="center"
          alignItems="center"
          container
          sx={styles.brandContainer}
        >
          <Typography variant="subtitle1" sx={styles.selectText}>
            Your workspaces
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          sx={styles.hospitalContainer}
          spacing={2}
        >
          {hospitals.map(hospital => (
            <Grid
              component="a"
              href={`${protocol}//${
                hospital?.subDomain ?? 'hospital'
              }.${domain}`}
              item
              key={hospital?._id}
              sx={styles.hyperlink}
            >
              <Card variant="outlined" sx={styles.card}>
                <Grid item sx={styles.cardAction}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs>
                      <Typography variant="h5" sx={styles.wordBreak}>
                        {hospital?.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={e => redirect(e, hospital?.subDomain ?? '')}
                        variant="text"
                        sx={styles.linkButton}
                      >
                        <IconOf>{mdiArrowRight}</IconOf>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default HospitalSelectionScreen;
