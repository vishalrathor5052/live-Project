import _ from 'lodash';
import { produce } from 'immer';
import {
  Card,
  Grid,
  IconButton,
  Typography,
  TextField,
  Button,
  Modal,
  DialogContent,
  Avatar,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import {
  ChangeEventHandler,
  Dispatch,
  forwardRef,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { mdiClose, mdiEmail, mdiPlus } from '@mdi/js';

import { createSX } from 'src/utils/createStyles';
import { useDispatch } from 'src/store';
import IconOf from 'src/utils/IconOf';
import api from 'src/store/query';

const styles = createSX({
  root: {
    height: '100%',
  },
  heading: {
    margin: 2,
  },
  clickableGrid: {
    transition: theme =>
      theme.transitions.create(['background', 'background-color'], {
        duration: theme.transitions.duration.complex,
      }),
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  listItem: {
    backgroundColor: 'action.hover',
    marginTop: 2,
    padding: 1,
  },
});

const isEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
};

type PeopleType = (
  | { _id: string; email: string }
  | { email: string; name: string }
) & {
  roles: { roleId: string; departmentId: string }[];
  employeeId: string | false;
};
type PeopleStateType = PeopleType[];

type ActionType =
  | {
      type: 'ADD';
      payload: { _id: string; email: string } | { email: string; name: string };
    }
  | {
      type: 'ADD_ROLE';
      payload: {
        person: number;
        roleId: string;
        departmentId: string;
      };
    }
  | {
      type: 'REMOVE_ROLE';
      payload: { person: number; role: number };
    }
  | {
      type: 'UPDATE_EMPLOYEE_ID';
      payload: { person: number; employeeId: string | false };
    }
  | { type: 'UPDATE_NAME'; payload: { person: number; name: string } }
  | {
      type: 'UPDATE_ROLE';
      payload: {
        person: number;
        role: number;
        key: 'departmentId' | 'roleId';
        value: string;
      };
    }
  | { type: 'DELETE'; payload: number };

const addPeopleReducer = (state: PeopleStateType, action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      return state.concat([
        { ...action.payload, roles: [], employeeId: false },
      ]);
    case 'ADD_ROLE':
      return state.map((value, index) =>
        index === action.payload.person
          ? {
              ...value,
              roles: [
                ...value.roles,
                {
                  roleId: action.payload.roleId,
                  departmentId: action.payload.departmentId,
                },
              ],
            }
          : value,
      );
    case 'REMOVE_ROLE':
      return state.map((value, index) =>
        index === action.payload.person
          ? {
              ...value,
              roles: value.roles.filter(
                (_, idx) => idx !== action.payload.role,
              ),
            }
          : value,
      );
    case 'UPDATE_EMPLOYEE_ID':
      return state.map((value, index) =>
        index === action.payload.person
          ? { ...value, employeeId: action.payload.employeeId }
          : value,
      );
    case 'UPDATE_NAME':
      return state.map((value, index) =>
        index === action.payload.person
          ? { ...value, name: action.payload.name }
          : value,
      );
    case 'UPDATE_ROLE':
      return state.map((value, index) =>
        index === action.payload.person
          ? {
              ...value,
              roles: value.roles.map((v, idx) =>
                idx === action.payload.role
                  ? Object.assign(
                      {},
                      v,
                      { [action.payload.key]: action.payload.value },
                      action.payload.key === 'roleId'
                        ? { departmentId: '' }
                        : {},
                    )
                  : v,
              ),
            }
          : value,
      );
    case 'DELETE':
      return state.filter((_, index) => index !== action.payload);
  }
};

type UserType = {
  _id: string;
  email?: string | undefined | null;
  phoneNumber?: string | undefined | null;
  fullName?: string | undefined | null;
};

type UserStoreActionType = {
  type: 'ADD';
  payload: UserType[];
};

const UserStore = createEntityAdapter<UserType>({ selectId: user => user._id });

const userStoreReducer = (
  stateImmutable: EntityState<UserType>,
  action: UserStoreActionType,
) =>
  produce(stateImmutable, state => {
    switch (action.type) {
      case 'ADD':
        UserStore.upsertMany(state, action.payload);
        break;
    }
  });

const SearchPeopleModal = forwardRef<
  HTMLDivElement,
  {
    onClose: (
      data?:
        | {
            type: 'existing';
            _id: string;
            email: string;
          }
        | {
            type: 'invite';
            email: string;
          }
        | undefined,
    ) => void;
    ignoreList: string[];
    userStoreDispatch: Dispatch<UserStoreActionType>;
  }
>(({ onClose, ignoreList, userStoreDispatch }, ref) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState<UserType[]>([]);

  const filteredPeople = useMemo(
    () => userList.filter(person => !ignoreList.includes(person._id)),
    [ignoreList, userList],
  );

  const searchPeople = useMemo(() => {
    const call = (search: string) =>
      dispatch(api.endpoints.SearchUsers.initiate({ search: search }))
        ?.then(user => user.data?.search?.users)
        ?.then(users => {
          setUserList(users ?? []);
          userStoreDispatch({ type: 'ADD', payload: users ?? [] });
        });

    return _.debounce(call, 500);
  }, [dispatch, userStoreDispatch]);

  const onSearchChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    e => {
      setSearch(e.target.value);
      searchPeople(e.target.value);
    },
    [searchPeople],
  );

  const onSubmit = useCallback(
    (
      person:
        | { type: 'existing'; _id: string; email?: string | null }
        | { type: 'invite'; email: string },
    ) => {
      onClose(
        person.type === 'existing'
          ? { type: 'existing', _id: person._id, email: person.email ?? '' }
          : { type: 'invite', email: person.email },
      );
    },
    [onClose],
  );

  return (
    <Grid container ref={ref} justifyContent="center">
      <Grid component={Card} item container xs={8} md={4} height="70vh">
        <Grid item container component={Card} direction="column" p={2}>
          <Grid item container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="h6">Add people</Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <IconButton color="error" onClick={() => onClose()}>
                <IconOf>{mdiClose}</IconOf>
              </IconButton>
            </Grid>
          </Grid>

          <Grid item>
            <TextField
              value={search}
              onChange={onSearchChange}
              fullWidth
              placeholder="Search by name or email"
              helperText={
                search && !filteredPeople.length
                  ? 'No matches found. Try using their email instead'
                  : ''
              }
            />
          </Grid>
          <Grid item container direction="column">
            {filteredPeople.map(person => (
              <Grid
                item
                container
                key={person.email}
                width="100%"
                m={1}
                p={1}
                sx={styles.clickableGrid}
                direction="row"
                alignItems="center"
                spacing={1}
                onClick={() => onSubmit({ ...person, type: 'existing' })}
              >
                <Grid item>
                  <Avatar>{person?.fullName?.at(0)}</Avatar>
                </Grid>
                <Grid item>
                  <Typography>{person.fullName}</Typography>
                </Grid>
              </Grid>
            ))}
            {!filteredPeople.length && isEmail(search) ? (
              <Grid
                item
                container
                key={search}
                width="100%"
                m={1}
                p={1}
                sx={styles.clickableGrid}
                direction="row"
                alignItems="center"
                spacing={1}
                onClick={() => onSubmit({ type: 'invite', email: search })}
              >
                <Grid item>
                  <Avatar>
                    <IconOf>{mdiEmail}</IconOf>
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography>Invite {search}</Typography>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

const AddPeopleModal = forwardRef<HTMLDivElement, { onClose: () => void }>(
  ({ onClose }, ref) => {
    // const departments = useSelector(state => state.department.departments);
    const { roles } = api.useGetHospitalRoleQuery(
      {
        hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
      },
      { selectFromResult: ({ data }) => ({ roles: data?.hospitalRoles }) },
    );
    const [sendEmployeeRequest] = api.useSendEmployeeRequestMutation();

    const [state, peopleDispatch] = useReducer<
      (state: PeopleStateType, action: ActionType) => PeopleStateType
    >(addPeopleReducer, []);
    const [userStore, userStoreDispatch] = useReducer<
      (
        state: EntityState<UserType>,
        action: UserStoreActionType,
      ) => EntityState<UserType>
    >(userStoreReducer, UserStore.getInitialState());
    const [modalOpen, setModalOpen] = useState(false);

    const roleTypes = useMemo(() => {
      return _.values(
        _.groupBy(roles ?? [], role => role.hospitalRoleType._id),
      ).map(groupedRoles => ({
        ...groupedRoles[0].hospitalRoleType,
        roles: groupedRoles.map(role => ({
          roleId: role._id,
          department: role.department,
        })),
      }));
    }, [roles]);

    const submit = useCallback(async () => {
      onClose();
      // TODO: Dispatch the required action

      // dispatch(
      try {
        await sendEmployeeRequest({
          employee: state.flatMap(person =>
            person.roles.map(role =>
              Object.assign(
                {},
                {
                  email: person.email,
                  role: {
                    employmentTypeId: role.roleId,
                    departmentId: role.departmentId,
                    hospitalRoleId:
                      roleTypes
                        .find(roleType => roleType._id === role.roleId)
                        ?.roles.find(
                          roleObject =>
                            roleObject.department?._id === role.departmentId,
                        )?.roleId ?? '',
                  },
                  hospitalId: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
                },
                '_id' in person ? { userId: person._id } : {},
                person.employeeId !== false
                  ? { hospitalEmployeeId: person.employeeId }
                  : {},
              ),
            ),
          ),
        });
      } finally {
        onClose();
      }
      // );
    }, [onClose, roleTypes, sendEmployeeRequest, state]);

    const addPerson = useCallback(
      (
        data?:
          | { type: 'existing'; _id: string; email: string }
          | { type: 'invite'; email: string }
          | undefined,
      ) => {
        if (data)
          peopleDispatch({
            type: 'ADD',
            payload:
              data.type === 'existing'
                ? { _id: data._id, email: data.email }
                : { email: data.email, name: '' },
          });
        setModalOpen(false);
      },
      [],
    );

    const openModal = useCallback(() => {
      setModalOpen(true);
    }, []);

    // useEffect(() => {
    //   dispatch(getRolesForHospital());
    // }, [dispatch]);

    return (
      <Grid
        ref={ref}
        container
        justifyContent="center"
        alignItems="center"
        sx={styles.root}
      >
        <Grid item container component={Card} xs={12} md={8} direction="column">
          <Grid item>
            <Typography variant="h5" sx={styles.heading}>
              Add People
            </Typography>
          </Grid>

          <Grid item container direction="column" m={1}>
            {state.map((entry, idx) => (
              <Grid
                item
                container
                key={'_id' in entry ? entry._id : entry.email}
                direction="column"
                sx={styles.listItem}
              >
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Avatar>
                      {'_id' in entry ? (
                        userStore.entities[entry._id]?.fullName?.at(0)
                      ) : (
                        <IconOf>{mdiEmail}</IconOf>
                      )}
                    </Avatar>
                  </Grid>
                  {'_id' in entry ? (
                    <Grid item>
                      <Typography>
                        {userStore.entities[entry._id]?.fullName}
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid item xs container direction="column">
                      <Grid item>
                        <TextField
                          variant="outlined"
                          placeholder="Enter name"
                          value={entry.name}
                          onChange={e =>
                            peopleDispatch({
                              type: 'UPDATE_NAME',
                              payload: {
                                person: idx,
                                name: e.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" color="GrayText">
                          {entry.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs />
                  <Grid item>
                    <IconButton
                      color="error"
                      onClick={() =>
                        peopleDispatch({ type: 'DELETE', payload: idx })
                      }
                    >
                      <IconOf>{mdiClose}</IconOf>
                    </IconButton>
                  </Grid>
                  <Grid item width={80} />
                </Grid>

                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Checkbox
                      checked={entry.employeeId !== false}
                      onChange={e =>
                        peopleDispatch({
                          type: 'UPDATE_EMPLOYEE_ID',
                          payload: {
                            person: idx,
                            employeeId: e.target.checked ? '' : false,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Typography>Employee Id</Typography>
                  </Grid>
                  <Grid item xs marginRight={5}>
                    <TextField
                      value={
                        typeof entry.employeeId === 'string'
                          ? entry.employeeId
                          : ''
                      }
                      disabled={entry.employeeId === false}
                      onChange={e =>
                        peopleDispatch({
                          type: 'UPDATE_EMPLOYEE_ID',
                          payload: {
                            person: idx,
                            employeeId: e.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                </Grid>

                <Grid item container direction="column" marginTop={2} pr={1}>
                  {entry.roles.map((role, roleIdx) => (
                    <Grid
                      item
                      container
                      direction="row"
                      key={roleIdx}
                      mt={1}
                      alignItems="center"
                    >
                      <Grid item>
                        <IconButton
                          color="error"
                          onClick={() =>
                            peopleDispatch({
                              type: 'REMOVE_ROLE',
                              payload: { person: idx, role: roleIdx },
                            })
                          }
                        >
                          <IconOf>{mdiClose}</IconOf>
                        </IconButton>
                      </Grid>

                      <Grid item xs>
                        <FormControl fullWidth>
                          <InputLabel id={`role${idx}${roleIdx}label`}>
                            Role
                          </InputLabel>
                          <Select
                            labelId={`role${idx}${roleIdx}label`}
                            id={`role${idx}${roleIdx}`}
                            label="Role"
                            value={role.roleId}
                            fullWidth
                            onChange={e =>
                              peopleDispatch({
                                type: 'UPDATE_ROLE',
                                payload: {
                                  key: 'roleId',
                                  person: idx,
                                  role: roleIdx,
                                  value: e.target.value,
                                },
                              })
                            }
                          >
                            {roleTypes.map(roleType => (
                              <MenuItem value={roleType._id} key={roleType._id}>
                                {roleType.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs>
                        <FormControl fullWidth disabled={!role.roleId}>
                          <InputLabel id={`department${idx}${roleIdx}label`}>
                            Department
                          </InputLabel>
                          <Select
                            labelId={`department${idx}${roleIdx}label`}
                            id={`department${idx}${roleIdx}`}
                            label="Department"
                            value={role.departmentId}
                            fullWidth
                            onChange={e =>
                              peopleDispatch({
                                type: 'UPDATE_ROLE',
                                payload: {
                                  key: 'departmentId',
                                  person: idx,
                                  role: roleIdx,
                                  value: e.target.value,
                                },
                              })
                            }
                          >
                            {roleTypes
                              .find(roleType => roleType._id === role.roleId)
                              ?.roles?.map(hospitalRole => (
                                <MenuItem
                                  value={hospitalRole.department?._id}
                                  key={hospitalRole.department?._id}
                                >
                                  {hospitalRole?.department?.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item container direction="row" alignItems="center">
                    <Grid item xs={1}>
                      <IconButton
                        color="success"
                        onClick={() =>
                          peopleDispatch({
                            type: 'ADD_ROLE',
                            payload: {
                              person: idx,
                              departmentId: '',
                              roleId: '',
                            },
                          })
                        }
                      >
                        <IconOf>{mdiPlus}</IconOf>
                      </IconButton>
                    </Grid>
                    <Grid item xs>
                      <Typography>Add more roles</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid item alignSelf="center">
            <Grid
              container
              component={Button}
              variant="contained"
              direction="column"
              onClick={openModal}
            >
              <Grid item>
                <IconOf>{mdiPlus}</IconOf>
              </Grid>
              <Grid item>
                <Typography>Add more people</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mt={2}>
            <Button fullWidth variant="contained" onClick={submit}>
              Done
            </Button>
          </Grid>
        </Grid>
        <Modal open={modalOpen} onClose={() => addPerson()} tabIndex={-1}>
          <DialogContent>
            <SearchPeopleModal
              onClose={addPerson}
              ignoreList={state.flatMap(entry =>
                '_id' in entry ? [entry._id] : [],
              )}
              userStoreDispatch={userStoreDispatch}
            />
          </DialogContent>
        </Modal>
      </Grid>
    );
  },
);

export default AddPeopleModal;
