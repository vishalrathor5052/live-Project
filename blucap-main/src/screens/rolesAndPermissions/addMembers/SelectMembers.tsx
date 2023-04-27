import _ from 'lodash';
import { produce } from 'immer';
import {
  Card,
  Grid,
  IconButton,
  Typography,
  TextField,
  Divider,
  Avatar,
  Modal,
  DialogContent,
  Button,
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
import { useRouteMatch } from 'react-router';

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

type PeopleType =
  | { _id: string; email: string }
  | { email: string; name: string };
type PeopleStateType = PeopleType[];

type ActionType =
  | {
      type: 'ADD';
      payload: { _id: string; email: string } | { email: string; name: string };
    }
  | { type: 'UPDATE_NAME'; payload: { person: number; name: string } }
  | { type: 'DELETE'; payload: number };

const addPeopleReducer = (state: PeopleStateType, action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      return state.concat([{ ...action.payload }]);
    case 'UPDATE_NAME':
      return state.map((value, index) =>
        index === action.payload.person
          ? { ...value, name: action.payload.name }
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
  picture?: string | undefined | null;
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
    userStoreDispatch: Dispatch<UserStoreActionType>;
  }
>(({ onClose, userStoreDispatch }, ref) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState<UserType[]>([]);

  const searchPeople = useMemo(() => {
    const call = (search: string) =>
      dispatch(api.endpoints.SearchUsers.initiate({ term: search }))
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
                search && !userList.length
                  ? 'No matches found. Try using their email instead'
                  : ''
              }
            />
          </Grid>
          <Grid item container direction="column">
            {userList.map(person => (
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
                  {person?.picture ? (
                    <Avatar src={person?.picture} />
                  ) : (
                    <Avatar>{person?.fullName?.at(0)}</Avatar>
                  )}
                </Grid>
                <Grid item>
                  <Typography>{person.fullName}</Typography>
                </Grid>
              </Grid>
            ))}
            {!userList.length && isEmail(search) ? (
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

export type SelectPeopleProceedType = (
  data: (
    | {
        email: string;
        name: string;
      }
    | {
        _id: string;
        email: string | null;
        phoneNumber?: string | undefined | null;
        fullName?: string | undefined | null;
        picture?: string | undefined | null;
      }
  )[],
) => void;

export const SelectPeopleModal = forwardRef<
  HTMLDivElement,
  {
    onClose: SelectPeopleProceedType;
  }
>(({ onClose }, ref) => {
  const { params } = useRouteMatch<{ id: string }>();
  const [userStore, userStoreDispatch] = useReducer<
    (
      state: EntityState<UserType>,
      action: UserStoreActionType,
    ) => EntityState<UserType>
  >(userStoreReducer, UserStore.getInitialState());
  const [state, peopleDispatch] = useReducer<
    (state: PeopleStateType, action: ActionType) => PeopleStateType
  >(addPeopleReducer, []);

  const [modalOpen, setModalOpen] = useState(false);
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

  const submit = useCallback(async () => {
    // User pressed submit, gotta do someth'n 'bout it

    const data = state.map(entry =>
      '_id' in entry ? { ...entry, ...userStore.entities[entry._id] } : entry,
    );
    onClose(data);
  }, [onClose, state, userStore.entities]);

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

  return (
    <>
      <Grid
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          backgroundColor: theme => theme.palette.background.paper,
        }}
        ref={ref}
      >
        <Grid container direction="column" alignItems="center" p={3}>
          <Grid item>
            <Typography variant="h5">Adding members to role</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="gray">
              {roleType?.title}
            </Typography>
          </Grid>
          <Grid item width="100%">
            <Divider color="gray" />
          </Grid>
          <Grid item>
            <Typography>Selected members</Typography>
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
                    {'_id' in entry ? (
                      userStore.entities[entry._id]?.picture ? (
                        <Avatar
                          src={userStore.entities[entry._id]?.picture ?? ''}
                        />
                      ) : (
                        <Avatar>
                          userStore.entities[entry._id]?.fullName?.at(0)
                        </Avatar>
                      )
                    ) : (
                      <Avatar>
                        <IconOf>{mdiEmail}</IconOf>
                      </Avatar>
                    )}
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
              </Grid>
            ))}
          </Grid>
          <Grid item>
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
        </Grid>
        <Grid item>
          <Button fullWidth variant="contained" onClick={submit}>
            Continue
          </Button>
        </Grid>
      </Grid>
      <Modal open={modalOpen} onClose={() => addPerson()} tabIndex={-1}>
        <DialogContent>
          <SearchPeopleModal
            onClose={addPerson}
            userStoreDispatch={userStoreDispatch}
          />
        </DialogContent>
      </Modal>
    </>
  );
});
