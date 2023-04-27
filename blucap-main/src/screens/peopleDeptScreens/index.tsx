import { mdiDotsHorizontal } from '@mdi/js';
import {
  DialogContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import PeopleDepartmentRouter from 'src/routes/PeopleDepartmentRouter';
import { createSX } from 'src/utils/createStyles';
import IconOf from 'src/utils/IconOf';
import AddPeopleModal from './AddPeople';
import CreateDepartment from './CreateDepartment';

const styles = createSX({
  addressHeader: {
    textDecoration: 'inherit',
  },
  tabs: {
    width: '100%',
    flexDirection: 'row',
  },
  tabWidth: {
    flex: 1,
  },
});

const PeopleDepartmentView: FC = () => {
  const [addNewAnchor, setAddNewAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  // const [createMode, setCreateMode] = useState<
  //   'none' | 'department' | 'people'
  // >('none');

  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const createMode = new URLSearchParams(location.search).get('add');

  const setCreateMode = useCallback(
    (mode?: 'department' | 'people' | undefined | null) => {
      const params = new URLSearchParams(location.search);
      mode ? params.set('add', mode) : params.delete('add');
      history.replace('?' + params.toString());
    },
    [history, location.search],
  );

  return (
    <Grid container direction="row" width="100%">
      <Grid
        container
        item
        direction="column"
        margin={2}
        xs={8}
        spacing={4}
        flexWrap="nowrap"
        position="sticky"
        top={0}
      >
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
            <Typography variant="h4">People Management</Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <IconButton onClick={e => setAddNewAnchor(e.currentTarget)}>
              <IconOf>{mdiDotsHorizontal}</IconOf>
            </IconButton>
          </Grid>
        </Grid>

        <Grid item>
          <Menu
            id="add-new-ward-menu"
            anchorEl={addNewAnchor}
            open={!!addNewAnchor}
            onClose={() => setAddNewAnchor(null)}
            MenuListProps={{
              'aria-labelledby': 'add-new-ward-button',
            }}
          >
            <MenuItem
              onClick={() => {
                setAddNewAnchor(null);
                setCreateMode('people');
              }}
            >
              Add new employee
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAddNewAnchor(null);
                setCreateMode('department');
              }}
            >
              Add new department(s)
            </MenuItem>
          </Menu>
          <Tabs
            sx={styles.tabs}
            value={
              `${match.path}/management` === location.pathname ||
              match.path?.replace('/', '') ===
                location.pathname?.replace('/', '')
                ? 'people'
                : 'department'
            }
          >
            <Tab
              label="People"
              value="people"
              sx={styles.tabWidth}
              onClick={() => history.push(`${match.path}/management`)}
            />
            <Tab
              label="Department"
              value="department"
              sx={styles.tabWidth}
              onClick={() => history.push(`${match.path}/department`)}
            />
          </Tabs>
        </Grid>
        <Grid item xs flexWrap="nowrap">
          <PeopleDepartmentRouter />
        </Grid>
      </Grid>
      <Modal
        open={!!createMode && ['department', 'people'].includes(createMode)}
        onClose={() => setCreateMode(null)}
        tabIndex={-1}
      >
        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {createMode === 'department' ? (
            <CreateDepartment onClose={() => setCreateMode(null)} />
          ) : createMode === 'people' ? (
            <AddPeopleModal onClose={() => setCreateMode(null)} />
          ) : null}
        </DialogContent>
      </Modal>
    </Grid>
  );
};

export default PeopleDepartmentView;
