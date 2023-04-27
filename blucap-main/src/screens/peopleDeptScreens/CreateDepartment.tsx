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
} from '@mui/material';
import { forwardRef, useCallback, useMemo, useReducer, useState } from 'react';
import { Close, Add } from '@mui/icons-material';
import { createSX } from 'src/utils/createStyles';
import api from 'src/store/query';

const styles = createSX({
  root: {
    height: '100%',
  },
  heading: {
    margin: 2,
  },
  tableContainer: {
    margin: 3,
  },
  deleteDept: {
    color: 'error.main',
  },
  addDept: {
    color: 'success.main',
  },
  button: {
    margin: 2,
  },
  disabledButton: {
    pointerEvents: 'auto !important' as 'auto',
  },
});

type DepartmentType = { name: string; abbr: string };
type StateType = DepartmentType[];
type ActionType =
  | { type: 'ADD' }
  | {
      type: 'UPDATE';
      payload: {
        key: 'name' | 'abbr';
        value: string;
        index: number;
      };
    }
  | { type: 'DELETE'; payload: number };

const createDeptReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      return state.concat({ name: '', abbr: '' });
    case 'UPDATE':
      return state.map((value, index) =>
        index === action.payload.index
          ? { ...value, [action.payload.key]: action.payload.value }
          : value,
      );
    case 'DELETE':
      return state.filter((_, index) => index !== action.payload);
  }
};

const CreateDepartment = forwardRef<HTMLDivElement, { onClose: () => void }>(
  ({ onClose }, ref) => {
    const [createDepartments] = api.useCreateDepartmentMutation();

    const [submitting, setSubmitting] = useState(false);
    const [state, departmentDispatch] = useReducer<
      (state: StateType, action: ActionType) => StateType
    >(createDeptReducer, []);

    const inputHasProblems = useMemo(
      () => !!state.find(dept => !dept.abbr || !dept.name),
      [state],
    );

    const submit = useCallback(async () => {
      setSubmitting(true);
      try {
        await createDepartments({
          hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
          departments: state,
        }).unwrap();
        onClose();
      } finally {
        setSubmitting(false);
      }
    }, [createDepartments, onClose, state]);

    return (
      <Grid
        ref={ref}
        container
        justifyContent="center"
        alignItems="center"
        sx={styles.root}
      >
        <Grid item container component={Card} xs={12} md={8}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item>
              <Typography variant="h5" sx={styles.heading}>
                Create Department
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
            <TableContainer component={Grid} sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> </TableCell>
                    <TableCell align="center">Department name</TableCell>
                    <TableCell align="center">Abbreviation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <IconButton
                          disabled={submitting}
                          onClick={() =>
                            departmentDispatch({
                              type: 'DELETE',
                              payload: index,
                            })
                          }
                        >
                          <Close sx={styles.deleteDept} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          disabled={submitting}
                          value={value.name}
                          onChange={e =>
                            departmentDispatch({
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
                            departmentDispatch({
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
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <IconButton
                        disabled={submitting}
                        onClick={() => departmentDispatch({ type: 'ADD' })}
                      >
                        <Add sx={styles.addDept} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={1} />
          <Grid item md={6} xs={10} sx={styles.button}>
            {inputHasProblems ? (
              <Tooltip title="All inputs must be filled">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component="span"
                  disabled
                  sx={styles.disabledButton}
                >
                  Create department
                </Button>
              </Tooltip>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submit}
              >
                Create department
              </Button>
            )}
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Grid>
    );
  },
);

export default CreateDepartment;
