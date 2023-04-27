import {
  Card,
  Grid,
  IconButton,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Button,
  Tooltip,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  forwardRef,
  Fragment,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Close, Add, Circle } from '@mui/icons-material';
import { createSX } from 'src/utils/createStyles';
import { useDispatch } from 'src/store';
// import { createWards } from 'src/store/actions/hospital';
import {
  api,
  useGetDepartmentForHospitalQuery,
  useGetWardTypesQuery,
} from 'src/generated/graphql';

const classes = createSX({
  root: {
    height: '100%',
  },
  heading: {
    margin: 2,
  },
  tableContainer: {
    margin: 3,
  },
  deleteWard: {
    color: 'error.main',
  },
  addWard: {
    color: 'success.main',
  },
  button: {
    margin: 2,
  },
  disabledButton: {
    pointerEvents: 'auto !important' as 'auto',
  },
  chip: {},
});

type WardType = {
  name: string;
  abbr: string;
  beds: string[];
  wardTypeId: string;
  departmentId: string;
};
type StateType = WardType[];
type ActionType =
  | { type: 'ADD' }
  | {
      type: 'UPDATE';
      payload: {
        key: 'name' | 'abbr' | 'departmentId' | 'wardTypeId';
        value: string;
        index: number;
      };
    }
  | {
      type: 'UPDATE_BED';
      payload: {
        value: string[];
        index: number;
      };
    }
  | { type: 'DELETE'; payload: number };

const createWardReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      return state.concat({
        name: '',
        abbr: '',
        departmentId: '--',
        beds: [],
        wardTypeId: '',
      });
    case 'UPDATE':
      return state.map((value, index) =>
        index === action.payload.index
          ? { ...value, [action.payload.key]: action.payload.value }
          : value,
      );
    case 'UPDATE_BED':
      return state.map((value, index) =>
        index === action.payload.index
          ? { ...value, beds: action.payload.value }
          : value,
      );
    case 'DELETE':
      return state.filter((_, index) => index !== action.payload);
  }
};

const CreateWard = forwardRef<HTMLDivElement, { onClose: () => void }>(
  ({ onClose }, ref) => {
    const dispatch = useDispatch();

    const { data: departmentData } = useGetDepartmentForHospitalQuery({
      id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
    });
    const { data: wardTypeData } = useGetWardTypesQuery();
    const wardTypes = useMemo(
      () =>
        Object.fromEntries(
          (wardTypeData?.wardType ?? []).map(
            wardType => [wardType._id, wardType] as const,
          ),
        ),
      [wardTypeData],
    );
    const departments = useMemo(
      () =>
        Object.fromEntries(
          (departmentData?.departments?.departments ?? []).map(
            dept => [dept._id, dept] as const,
          ),
        ),
      [departmentData],
    );

    const [state, wardDispatch] = useReducer<
      (state: StateType, action: ActionType) => StateType
    >(createWardReducer, []);
    const [submitting, setSubmitting] = useState(false);

    const inputHasProblems = useMemo(
      () => !!state.find(ward => !ward.abbr || !ward.name || !ward.beds),
      [state],
    );

    const submit = useCallback(async () => {
      setSubmitting(true);
      try {
        await dispatch(
          api.endpoints.CreateWards.initiate({
            id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
            wards: state.map(ward => ({
              ...ward,
              departmentId:
                ward.departmentId === '--' ? undefined : ward.departmentId,
              beds: [],
            })),
          }),
        ).unwrap();
        onClose();
      } finally {
        setSubmitting(false);
      }
    }, [dispatch, onClose, state]);

    return (
      <Grid
        ref={ref}
        container
        justifyContent="center"
        alignItems="center"
        sx={classes.root}
      >
        <Grid item container component={Card} xs={12} md={8}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item>
              <Typography variant="h5" sx={classes.heading}>
                Create Ward
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <TableContainer component={Grid} sx={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> </TableCell>
                    <TableCell align="center" width="24%">
                      Ward name
                    </TableCell>
                    <TableCell align="center" width="24%">
                      Abbreviation
                    </TableCell>
                    <TableCell align="center" width="24%">
                      Ward type
                    </TableCell>
                    <TableCell align="center" width="24%">
                      Department
                    </TableCell>
                    {/* <TableCell align="center" width="19%">
                      Beds
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.map((value, index) => (
                    <Fragment key={`${index}`}>
                      <TableRow>
                        <TableCell>
                          <IconButton
                            disabled={submitting}
                            onClick={() =>
                              wardDispatch({ type: 'DELETE', payload: index })
                            }
                          >
                            <Close sx={classes.deleteWard} />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            value={value.name}
                            disabled={submitting}
                            onChange={e =>
                              wardDispatch({
                                type: 'UPDATE',
                                payload: {
                                  key: 'name',
                                  value: e.target.value,
                                  index,
                                },
                              })
                            }
                            fullWidth
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            disabled={submitting}
                            value={value.abbr}
                            onChange={e =>
                              wardDispatch({
                                type: 'UPDATE',
                                payload: {
                                  key: 'abbr',
                                  value: e.target.value,
                                  index,
                                },
                              })
                            }
                            fullWidth
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <FormControl fullWidth disabled={submitting}>
                            <InputLabel id="ward-type-select-label">
                              Ward type
                            </InputLabel>
                            <Select
                              labelId="ward-type-select-label"
                              id="ward-type-select"
                              value={value.wardTypeId}
                              label="Ward type"
                              onChange={e =>
                                wardDispatch({
                                  type: 'UPDATE',
                                  payload: {
                                    key: 'wardTypeId',
                                    value: e.target.value,
                                    index,
                                  },
                                })
                              }
                            >
                              {Object.keys(wardTypes).map(id => (
                                <MenuItem key={id} value={id}>
                                  <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="right"
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Circle
                                        sx={{
                                          color: wardTypes[id]?.color,
                                        }}
                                      />
                                    </Grid>
                                    <Grid item>{wardTypes[id]?.name}</Grid>
                                  </Grid>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="right">
                          <FormControl fullWidth disabled={submitting}>
                            <InputLabel id="department-select-label">
                              Department
                            </InputLabel>
                            <Select
                              labelId="department-select-label"
                              id="department-select"
                              value={value.departmentId}
                              label="Department"
                              onChange={e =>
                                wardDispatch({
                                  type: 'UPDATE',
                                  payload: {
                                    key: 'departmentId',
                                    value: e.target.value,
                                    index,
                                  },
                                })
                              }
                            >
                              <MenuItem value="--">
                                <Typography color="GrayText">
                                  Unassigned
                                </Typography>
                              </MenuItem>
                              {Object.keys(departments).map(id => (
                                <MenuItem key={id} value={id}>
                                  {departments[id]?.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>  
                       <TableCell colSpan={4} align="right">
                          <Autocomplete
                            multiple
                            freeSolo
                            autoSelect
                            fullWidth
                            onChange={(_, val) =>
                              wardDispatch({
                                type: 'UPDATE_BED',
                                payload: {
                                  value: val,
                                  index,
                                },
                              })
                            }
                            id={`beds${index}`}
                            onInputChange={(event, newInputValue) => {
                              if (newInputValue.endsWith(',')) {
                                (event.target as HTMLElement).blur();
                                (event.target as HTMLElement).focus();
                              }
                            }}
                            renderTags={(tags, getTagProps) =>
                              tags.map((comorbidity, index) => (
                                <Chip
                                  {...getTagProps({ index })}
                                  key={`${comorbidity}`}
                                  label={comorbidity}
                                  color="primary"
                                  sx={classes.chip}
                                />
                              ))
                            }
                            options={[]}
                            renderInput={params => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Enter bed numbers"
                              />
                            )}
                          />
                        </TableCell>
                       </TableRow> */}
                    </Fragment>
                  ))}
                  <TableRow>
                    <TableCell>
                      <IconButton
                        disabled={submitting}
                        onClick={() => wardDispatch({ type: 'ADD' })}
                      >
                        <Add sx={classes.addWard} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={1} />
          <Grid item md={6} xs={10} sx={classes.button}>
            {inputHasProblems ? (
              <Tooltip title="All inputs must be filled">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component="span"
                  disabled
                  sx={classes.disabledButton}
                >
                  Create Ward
                </Button>
              </Tooltip>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submit}
                disabled={submitting}
              >
                Create Ward
              </Button>
            )}
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Grid>
    );
  },
);

export default CreateWard;
