import {
  Autocomplete,
  Button,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { mdiChevronLeft, mdiChevronRight, mdiPlus } from '@mdi/js';
import { FC, useEffect, useState } from 'react';
import weekday from 'dayjs/plugin/weekday';
import en from 'dayjs/locale/en';
import dayjs from 'dayjs';

import { createSX } from 'src/utils/createStyles';
import api from 'src/store/query';
import IconOf from 'src/utils/IconOf';
import { useSearchParamState } from 'src/utils/useSearchParamState';
import CreateTemplateModal from './CreateTemplate';

dayjs.extend(weekday);
dayjs.locale({
  ...en,
  weekStart: 1,
});

const styles = createSX({
  addressHeader: {
    textDecoration: 'inherit',
  },
  hoverBoxes: {
    opacity: 0,
    transition: theme =>
      theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.complex,
      }),
    '&:hover': {
      opacity: 100,
    },
  },
});

const Rostering: FC = () => {
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
  const { wards } = api.useGetWardsForHospitalQuery(
    {
      id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    },
    {
      selectFromResult: ({ data }) => ({
        wards: data?.hospital.wards,
      }),
    },
  );
  const { rosterTypes = [] } = api.useGetRosterTypesQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        rosterTypes: data?.rosterTypes,
      }),
    },
  );
  const [rosterType, setRosterType] = useState(rosterTypes?.[0]?._id);

  const [createTemplateFor, setCreateTemplateFor] =
    useSearchParamState('createTemplate');

  const [rosterTab, setRosterTab] = useState<'week' | 'day' | 'month'>('week');

  useEffect(() => {
    setRosterType(rType => rType ?? rosterTypes?.[0]?._id);
  }, [rosterTypes]);

  return (
    <Grid container direction="row" width="100%">
      <Grid container item direction="column" margin={2} xs={10} spacing={4}>
        <Grid
          container
          item
          direction="row"
          width="100%"
          marginLeft={2}
          paddingLeft={4}
          spacing={2}
        >
          <Grid item sx={styles.addressHeader} marginBottom={4}>
            <Typography variant="h4">Roster management</Typography>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item xs>
              <Autocomplete
                multiple
                fullWidth
                id="select-departments"
                options={departments ?? []}
                getOptionLabel={option => option.name}
                defaultValue={[]}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Departments"
                    placeholder="Departments"
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                value={rosterType ?? ''}
                onChange={e => setRosterType(e.target.value)}
                fullWidth
              >
                {rosterTypes.map(rosterType => (
                  <MenuItem key={rosterType._id} value={rosterType._id}>
                    {rosterType.typeName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Tabs
                value={rosterTab}
                onChange={(_, value) => setRosterTab(value)}
              >
                <Tab value="week" label="Week" />
                <Tab value="day" label="Day" />
                <Tab value="month" label="Month" />
              </Tabs>
            </Grid>
            <Grid item>
              <Button
                startIcon={
                  <IconButton
                    color="inherit"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <IconOf>{mdiChevronLeft}</IconOf>
                  </IconButton>
                }
                endIcon={
                  <IconButton
                    color="inherit"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <IconOf>{mdiChevronRight}</IconOf>
                  </IconButton>
                }
                variant="contained"
                sx={{ borderRadius: 0 }}
              >
                This week
              </Button>
            </Grid>
            <Grid item sx={{ height: '100%' }}>
              <Button variant="outlined" fullWidth sx={{ height: '100%' }}>
                This week
              </Button>
            </Grid>
            <Grid item xs />
            <Grid item>
              <FormControlLabel
                sx={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                control={<Switch defaultChecked />}
                label="Edit mode"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={2} container direction="column">
            <Grid item container direction="row" height="55.5px">
              <Grid item>
                <Typography>Wards</Typography>
              </Grid>
            </Grid>
            {wards?.map(ward => (
              <Grid
                item
                key={ward._id}
                sx={{
                  border: 'solid black 1px',
                  borderStyle: 'solid none none none',
                  height: '50px',
                }}
              >
                <Typography>{ward.name}</Typography>
              </Grid>
            ))}
          </Grid>
          <Grid item xs>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell align="center">Morning</TableCell>
                    <TableCell align="center">Evening</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {new Array(7)
                    .fill(null)
                    .map((_, i) => dayjs().weekday(i))
                    .map((day, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row" align="center">
                          <Grid
                            container
                            direction="column"
                            alignItems="flex-start"
                          >
                            <Grid item>
                              <Typography>{day.format('MMM D')}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>{day.format('ddd')}</Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="center">
                          <Grid
                            item
                            display="flex"
                            height="50px"
                            width="100%"
                            sx={styles.hoverBoxes}
                          >
                            <Grid
                              item
                              container
                              height="100%"
                              width="100%"
                              alignItems="center"
                              justifyContent="center"
                              sx={{
                                backgroundColor: theme =>
                                  theme.palette.action.hover,
                              }}
                            >
                              <Grid item>
                                <IconButton>
                                  <IconOf>{mdiPlus}</IconOf>
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={!!createTemplateFor}
        onClose={() => setCreateTemplateFor()}
        tabIndex={-1}
      >
        <DialogContent>
          <CreateTemplateModal onClose={() => setCreateTemplateFor()} />
        </DialogContent>
      </Modal>
    </Grid>
  );
};

export default Rostering;
