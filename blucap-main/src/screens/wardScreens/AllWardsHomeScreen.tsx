import { FC, useCallback, useMemo, useState } from 'react';
import {
  Typography,
  Grid,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Chip,
  Modal,
  DialogContent,
  darken,
} from '@mui/material';
import _ from 'lodash';

import { useGetWardsForHospitalQuery } from 'src/generated/graphql';
import {
  mdiDoctor,
  mdiDotsHorizontal,
  mdiMenu,
  mdiAccountGroupOutline,
  mdiSquare,
  mdiCheck,
} from '@mdi/js';
import IconOf from 'src/utils/IconOf';
import { createSX } from 'src/utils/createStyles';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import CreateWard from './CreateWard';

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
});

const AllWardsHomeScreen: FC = () => {
  const { data, refetch: getWardsForHospital } = useGetWardsForHospitalQuery({
    id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
  });
  const location = useLocation();

  const [addNewAnchor, setAddNewAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const [filterAnchor, setFilterAnchor] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const [filter, setFilter] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [createWard, setCreateWard] = useState(false);

  const closeModal = useCallback(() => {
    setCreateWard(false);
    getWardsForHospital();
  }, [getWardsForHospital]);

  const handleAddNewWardClose = useCallback(() => {
    setCreateWard(true);
    setAddNewAnchor(null);
  }, []);

  const handleFilterClose = useCallback((newFilter: string | null) => {
    if (newFilter)
      setFilter(fltr =>
        fltr.includes(newFilter)
          ? fltr.filter(f => f !== newFilter)
          : fltr.concat(newFilter),
      );
    else setFilterAnchor(null);
  }, []);

  const wards = (data?.hospital?.wards ?? [])
    .filter(ward => (filter.length ? filter.includes(ward.wardType._id) : true))
    .filter(ward => ward.name.includes(search));

  const wardTypes = useMemo(() => {
    const wardMap = _.groupBy(data?.hospital.wards, ward => ward.wardType._id);

    return Object.fromEntries(
      Object.entries(wardMap).map(
        ([id]) => [id, wardMap[id][0].wardType] as const,
      ),
    );
  }, [data]);

  return (
    <Grid container direction="row" width="100%">
      <Grid container item direction="column" margin={2} xs={10} spacing={4}>
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
            <Typography variant="h4">All wards</Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <IconButton onClick={e => setAddNewAnchor(e.currentTarget)}>
              <IconOf>{mdiDotsHorizontal}</IconOf>
            </IconButton>
          </Grid>
        </Grid>
        <Menu
          id="add-new-ward-menu"
          anchorEl={addNewAnchor}
          open={!!addNewAnchor}
          onClose={() => setAddNewAnchor(null)}
          MenuListProps={{
            'aria-labelledby': 'add-new-ward-button',
          }}
        >
          <MenuItem onClick={handleAddNewWardClose}>Add new ward(s)</MenuItem>
        </Menu>

        <Grid item container direction="column" spacing={1} marginLeft={2}>
          <Grid container item direction="row" alignItems="center">
            <Grid container item direction="column" xs={6}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  onChange={e => setSearch(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={1}>
              {data?.hospital?.wards?.length ? (
                <IconButton onClick={e => setFilterAnchor(e.currentTarget)}>
                  <IconOf>{mdiMenu}</IconOf>
                </IconButton>
              ) : null}
            </Grid>
          </Grid>
          {filter.length ? (
            <Grid item container direction="row" spacing={2}>
              <Grid item>
                <Typography variant="subtitle1">
                  Selected ward types:
                </Typography>
              </Grid>
              <Grid item container direction="row" xs>
                {filter.map(f => (
                  <Chip
                    key={wardTypes[f]._id}
                    label={wardTypes[f].name}
                    variant="outlined"
                    onDelete={() => handleFilterClose(wardTypes[f]._id)}
                  />
                ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid>

        <Menu
          id="ward-filter-menu"
          anchorEl={filterAnchor}
          open={!!filterAnchor}
          onClose={() => handleFilterClose(null)}
          MenuListProps={{
            'aria-labelledby': 'ward-filter-button',
          }}
        >
          {Object.values(wardTypes).map(wardType => (
            <MenuItem
              onClick={() => handleFilterClose(wardType._id)}
              key={wardType._id}
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <IconOf sx={{ color: wardType.color }}>{mdiSquare}</IconOf>
                </Grid>
                <Grid item xs mb={1}>
                  <Typography textAlign="center" fontSize={20}>
                    {wardType.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  visibility={
                    filter.includes(wardType._id) ? 'visible' : 'hidden'
                  }
                >
                  <IconOf color="success">{mdiCheck}</IconOf>
                </Grid>
              </Grid>
            </MenuItem>
          ))}
        </Menu>

        <Grid item container direction="column" spacing={2} marginLeft={2}>
          {wards.map(ward => (
            <Grid
              component={Link}
              to={`${location.pathname}/${ward._id}`}
              container
              item
              width="50%"
              key={ward._id}
              direction="column"
              sx={styles.wardChip}
            >
              <Grid
                container
                item
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Grid item mt={1}>
                  <IconOf sx={{ color: ward.wardType.color }}>
                    {mdiSquare}
                  </IconOf>
                </Grid>
                <Grid item>
                  <Typography
                    alignItems="center"
                    variant="button"
                    fontSize={25}
                  >
                    {ward.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item direction="row">
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  xs={4}
                  spacing={1}
                >
                  <Grid item>
                    <IconOf>{mdiDoctor}</IconOf>
                  </Grid>
                  <Grid item mb={1}>
                    <Typography variant="body1" fontSize={22}>
                      {Math.round(Math.random() * 5 + 2)} doctors
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  xs={4}
                  spacing={1}
                >
                  <Grid item>
                    <IconOf>{mdiAccountGroupOutline}</IconOf>
                  </Grid>
                  <Grid item mb={1}>
                    <Typography variant="body1" fontSize={21}>
                      {Math.round(Math.random() * 10 + 7)} nurse
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Modal open={createWard} onClose={closeModal} tabIndex={-1}>
        <DialogContent>
          <CreateWard onClose={closeModal} />
        </DialogContent>
      </Modal>
    </Grid>
  );
};

export default AllWardsHomeScreen;
