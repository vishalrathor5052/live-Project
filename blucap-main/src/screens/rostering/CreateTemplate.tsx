/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiPlus,
  mdiSquare,
} from '@mdi/js';
import { TimePicker } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import en from 'dayjs/locale/en';
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween';
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useDispatch } from 'src/store';
import api from 'src/store/query';
import { createSX } from 'src/utils/createStyles';
import IconOf from 'src/utils/IconOf';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { getHospitalRoles, resetRosterData } from 'src/store/actions/header';

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.locale({
  ...en,
  weekStart: 1,
});

const dummyRoles = [
  { _id: '1', title: 'Role 1' },
  { _id: '2', title: 'Role 2' },
];

const weekColors = [
  '#82c91e',
  '#fab005',
  '#70bec2',
  '#5a7cb2',
  '#e74c4c',
  '#10a779',
  '#a2a6aa',
];

const styles = createSX({
  mainBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '1000px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // py: 4,
  },

  dayChips: {
    alignItems: 'center',
    mx: 1,
    '&.selected': {
      border: 'solid black 2px',
      fontWeight: 'bold',
    },
    ...Object.fromEntries(
      weekColors.map((color, i) => [
        `&.day-${i}`,
        {
          backgroundColor: color,
          color: 'white',
        },
      ]),
    ),
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

type ShiftType = {
  reuse?: string;
  name: string;
  from?: Dayjs;
  to?: Dayjs;
  requirements: {
    copy: number | false;
    minPeopleRequired?: number;
    roleRequired: [string, number][];
    skillRequired: [string | undefined, number][];
  };
};

type UncopiedRosterTemplate = {
  copy: false;
  shifts: ShiftType[];
};
type CopiesRosterTemplate = { copy: number };

type RosterTemplate = (CopiesRosterTemplate | UncopiedRosterTemplate)[];

type ActionType =
  | {
      type: 'SET';
      payload: RosterTemplate;
    }
  | {
      type: 'ADD';
      payload: { day: number };
    }
  | {
      type: 'SET_COPY';
      payload: { day: number; copyDay: number; set: boolean };
    }
  | {
      type: 'MODIFY';
      payload: { day: number; shift: number; modification: Partial<ShiftType> };
    }
  | {
      type: 'REMOVE';
      payload: { day: number; shift: number };
    }
  | {
      type: 'CHANGE_REQUIREMENTS';
      payload: {
        day: number;
        shift: number;
        modification: Partial<ShiftType['requirements']>;
      };
    };

const getCopy = (
  state: RosterTemplate,
  copy: number,
): [{ copy: false; shifts: ShiftType[] }, number] => {
  const copiedDay = state[copy];
  if (typeof copiedDay?.copy === 'number')
    return getCopy(state, copiedDay.copy);
  else return [copiedDay as { copy: false; shifts: ShiftType[] }, copy];
};

const shiftReducer = (
  state: RosterTemplate,
  action: ActionType,
): RosterTemplate => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD': {
      return state.map((day, i) => {
        if (i === action.payload.day) {
          const [copiedDay] =
            typeof day.copy === 'number'
              ? getCopy(state, day.copy)
              : [day as UncopiedRosterTemplate];
          return {
            copy: false,
            shifts: (copiedDay?.shifts ?? []).concat([
              {
                name: '',
                from:
                  copiedDay?.shifts?.length > 0
                    ? copiedDay?.shifts[copiedDay?.shifts?.length - 1].to
                    : undefined,
                to:
                  copiedDay?.shifts?.length > 0
                    ? copiedDay?.shifts[copiedDay?.shifts?.length - 1].to
                    : undefined,
                requirements: {
                  copy: false,
                  roleRequired: [],
                  skillRequired: [],
                },
              },
            ]),
          };
        } else return day;
      });
    }
    case 'REMOVE': {
      return state.map((day, i) => {
        if (i === action.payload.day) {
          const [copiedDay] =
            typeof day.copy === 'number'
              ? getCopy(state, day.copy)
              : [day as UncopiedRosterTemplate];
          return {
            copy: false,
            shifts: (copiedDay?.shifts ?? []).filter(
              (_shift, idx) => idx !== action.payload.shift,
            ),
          };
        } else return day;
      });
    }
    case 'MODIFY': {
      return state.map((day, i) => {
        if (i === action.payload.day) {
          const shiftDay =
            day.copy === false ? day : getCopy(state, day.copy)[0];
          return {
            copy: false,
            shifts: shiftDay.shifts.map((shift, i) =>
              i === action.payload.shift
                ? { ...shift, ...action.payload.modification }
                : shift,
            ),
          };
        } else return day;
      });
    }
    case 'CHANGE_REQUIREMENTS': {
      return state.map((day, i) => {
        if (i === action.payload.day) {
          const shiftDay =
            day.copy === false ? day : getCopy(state, day.copy)[0];
          return {
            copy: false,
            shifts: shiftDay.shifts.map((shift, i) =>
              i === action.payload.shift
                ? {
                    ...shift,
                    requirements: {
                      ...shift.requirements,
                      ...action.payload.modification,
                    },
                  }
                : shift,
            ),
          };
        } else return day;
      });
    }
    case 'SET_COPY': {
      return state.map((day, i) => {
        if (i === action.payload.day) {
          return action.payload.set
            ? {
                copy: action.payload.copyDay,
              }
            : {
                copy: false,
                shifts:
                  day.copy === false
                    ? day.shifts
                    : getCopy(state, day.copy)[0].shifts,
              };
        } else return day;
      });
    }
  }

  return state;
};

const CreateTemplateModal = forwardRef<HTMLDivElement, { onClose: () => void }>(
  ({ onClose }, ref) => {
    const dispatch = useDispatch();
    const { rosterTypes = [] } = api.useGetRosterTypesQuery(
      {},
      {
        selectFromResult: ({ data }) => ({
          rosterTypes: data?.rosterTypes,
        }),
      },
    );
    const [roleRequirement, setRoleRequirement] = useState<Array<any>>([]);

    const handleChange = (event: SelectChangeEvent) => {
      const { value } = event.target;
      setRoleRequirement(prevState => [...prevState, value]);
    };

    const header = useSelector((state: any) => state?.header);
    const hospitalRoleType = useSelector(
      (state: any) => state?.header.hospitalRoles,
    );

    const [wardId] = useState(header?.wardId);

    const [rosterType, setRosterType] = useState(header.selectedRoster);
    // const [wardId] = useSearchParamState('createTemplate');
    const [weekOffset, setWeekOffset] = useState(0);
    const [repeats, setRepeats] = useState<'week' | 'day'>('week');
    const [selectedDay, setSelectedDay] = useState(0);
    // const [skillSearches, setSkillSearches] = useState<
    //   Array<{ _id: string; name: string; sctId?: string | null | undefined }>
    // >([]);
    const [selectedSkills, setSelectedSkills] = useState<typeof skillSearches>(
      [],
    );
    const [shiftTemplate, shiftDispatch] = useReducer<typeof shiftReducer>(
      shiftReducer,
      new Array(7).fill({ copy: false, shifts: [] }),
    );

    const { ward } = api.useGetWardsForHospitalQuery(
      {
        id: `${import.meta.env.VITE_APP_HOSPITAL_ID}`,
      },
      {
        selectFromResult: ({ data }) => ({
          ward: data?.hospital.wards?.find(ward => wardId.includes(ward._id)),
        }),
      },
    );
    const { roles } = api.useGetRosterTemplateRequirementDataQuery(
      {},
      {
        selectFromResult: ({ data }) => ({
          roles: data?.roles.length ? data.roles : dummyRoles,
        }),
      },
    );

    const { skillSearches } = api.useGetAllProceduresQuery(
      {},
      {
        selectFromResult: ({ data }) => ({
          skillSearches: data?.getAllProcedures ?? [],
        }),
      },
    );

    const [createRosterMutation] = api.useCreateRosterMutation();

    const createRoster = useCallback(async () => {
      if (!shiftTemplate.some((element: any) => element.shifts.length > 0)) {
        return;
      }
      try {
        const dayShifts = shiftTemplate.map(dayShift =>
          dayShift.copy !== false
            ? dayShift
            : {
                ...dayShift,
                shifts: dayShift.shifts.map(shift => ({
                  _id: nanoid(),
                  ...shift,
                })),
              },
        );

        await createRosterMutation({
          wardIds: wardId ?? '',
          rosterTemplate: {
            from: dayjs().add(weekOffset, 'weeks').weekday(0).format(),
            to: dayjs().add(weekOffset, 'weeks').weekday(6).format(),
            rosterTypeId: rosterType,
            templates: {
              newTemplates: dayShifts.flatMap(shift =>
                shift.copy !== false
                  ? []
                  : shift.shifts.flatMap(shift =>
                      shift.reuse
                        ? []
                        : [
                            {
                              name: shift.name,
                              requirements: {
                                minimumStrength:
                                  shift.requirements.minPeopleRequired ?? 0,
                                requiredProcedures:
                                  shift.requirements.skillRequired.map(
                                    required => ({
                                      procedureId: required[0] ?? '',
                                      minimumAssignments: required[1],
                                    }),
                                  ),
                                requiredRoles:
                                  shift.requirements.roleRequired.map(
                                    required => ({
                                      hospitalRoleTypeId: required[0] ?? '',
                                      minimumAssignments: required[1],
                                    }),
                                  ),
                              },
                              shiftTemplateId: shift._id,
                              startTime: {
                                hour: parseInt(
                                  (shift.from ?? dayjs())?.format('H') ?? '',
                                  10,
                                ),
                                minute: parseInt(
                                  (shift.from ?? dayjs())?.format('m') ?? '',
                                  10,
                                ),
                              },
                              duration: {
                                hour: Math.abs(
                                  (shift.from ?? dayjs())?.diff(
                                    shift.to ?? dayjs(),
                                    'h',
                                  ) ?? 0,
                                ),
                                minute: +Math.abs(
                                  (shift.from ?? dayjs())?.diff(
                                    shift.to ?? dayjs(),
                                    'm',
                                  ) ?? 0,
                                )
                                  .toString()
                                  .slice(0, 2),
                              },
                            },
                          ],
                    ),
              ),
              dailyTemplates: dayShifts.map(dayShift => {
                const dayShiftRepeat =
                  repeats === 'week' ? dayShift : dayShifts[0];
                const shifts =
                  dayShiftRepeat.copy === false
                    ? dayShiftRepeat.shifts
                    : (getCopy(dayShifts, dayShiftRepeat.copy)[0]
                        .shifts as (ShiftType & { _id: string })[]);
                return {
                  newTemplateIds: shifts?.flatMap(shift =>
                    shift.reuse ? [] : [shift._id],
                  ),
                  reusedTemplateIds: shifts?.flatMap(shift =>
                    shift.reuse ? [shift.reuse] : [],
                  ),
                };
              }),
            },
          },
        })
          .unwrap()
          .then(() => {
            handleGetRoster();
          });
      } finally {
        onClose();
      }
    }, [
      createRosterMutation,
      onClose,
      rosterType,
      shiftTemplate,
      wardId,
      weekOffset,
    ]);

    const searchSkills = useMemo(() => {
      // const call = (search: string) =>
      //   dispatch(api.endpoints.SearchSkills.initiate({ searchTerm: search }))
      //     ?.then(result => result.data?.search?.procedures)
      //     ?.then(skills => {
      //       setSkillSearches(skills ?? []);
      //     });
      // return _.debounce(call, 500);
    }, [dispatch]);

    // get roster data and set in the redux rosterData key
    const handleGetRoster = useCallback(() => {
      onHandleWeekOffset();
      dispatch(
        api.endpoints.GetRoster.initiate({
          startDate: dayjs().add(weekOffset, 'weeks').day(1).format(),
          endDate: dayjs().add(weekOffset, 'weeks').day(7).format(),
          rosterTypeIds: [rosterType],
          wardIds: wardId ?? '',
        }),
      )
        .then(data => data?.data?.roster)
        .then((roster: any) => {
          dispatch(resetRosterData(roster));
          if (roster?.length === 7) {
            shiftDispatch({
              type: 'SET',
              payload: roster?.map((dailyRoster: any, idx: any) => {
                const copy = roster
                  .slice(0, idx - 1)
                  ?.findIndex(
                    (dRoster: any) =>
                      dRoster.shiftTemplate._id ===
                      dailyRoster.shiftTemplate._id,
                  );

                return copy !== -1
                  ? { copy }
                  : {
                      copy: false,
                      shifts: [
                        {
                          reuse: dailyRoster.shiftTemplate._id,
                          from: dayjs()
                            .set(
                              'hour',
                              dailyRoster.shiftTemplate.startTime.hour,
                            )
                            .set(
                              'minute',
                              dailyRoster.shiftTemplate.startTime.minute,
                            ),
                          to: dayjs()
                            .set(
                              'hour',
                              dailyRoster.shiftTemplate.startTime.hour,
                            )
                            .set(
                              'minute',
                              dailyRoster.shiftTemplate.startTime.minute,
                            )
                            .add(
                              dailyRoster.shiftTemplate.duration.hour,
                              'hours',
                            )
                            .add(
                              dailyRoster.shiftTemplate.duration.minute,
                              'minutes',
                            ),
                          name: dailyRoster.shiftTemplate.name,
                          requirements: {
                            copy: false,
                            minPeopleRequired:
                              dailyRoster.shiftTemplate.requirements
                                .minimumStrength,
                            roleRequired:
                              dailyRoster?.shiftTemplate?.requirements?.requiredRoles?.map(
                                role => [role.hospitalRoleType._id, 1],
                              ) ?? [],
                            skillRequired:
                              dailyRoster?.shiftTemplate?.requirements?.requiredProcedures?.map(
                                procedure => [procedure.procedure._id, 1],
                              ) ?? [],
                          },
                        },
                      ],
                    };
              }),
            });
          }
        });
    }, [dispatch, weekOffset, rosterType, wardId]);

    useEffect(() => {
      setRosterType((rType: any) => rType ?? rosterTypes?.[0]?._id);
    }, [rosterTypes]);

    // set week offset from the selected view roster date range inital render
    useEffect(() => {
      onHandleWeekOffset();
      dispatch(getHospitalRoles());
    }, []);

    const onHandleWeekOffset = useCallback(() => {
      const { startWeek, endWeek } = header?.dateRange;
      if (
        !dayjs().isBetween(startWeek, endWeek) &&
        !dayjs().isAfter(startWeek)
      ) {
        setWeekOffset(dayjs(startWeek).diff(dayjs(), 'weeks') + 1);
      }
      if (dayjs().isAfter(startWeek)) {
        setWeekOffset(dayjs(startWeek).diff(dayjs(), 'weeks'));
      }
    }, []);

    const copyDays = new Array(7)
      .fill(null)
      .flatMap((_, i) =>
        i >= selectedDay || !getCopy(shiftTemplate, i)[0]?.shifts?.length
          ? []
          : [
              [
                dayjs().add(weekOffset, 'weeks').weekday(i),
                getCopy(shiftTemplate, i)[1],
              ] as const,
            ],
      );

    return (
      <Grid sx={styles.mainBox} container ref={ref} justifyContent="center">
        <Grid
          component={Card}
          item
          container
          xs={12}
          p={2}
          maxHeight="90vh"
          direction="column"
          flexWrap="nowrap"
          spacing={1}
          sx={{ overflow: 'auto' }}
        >
          <Grid item container direction="row">
            <Grid item xs>
              <Typography variant="h5">Preview roster template</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <IconOf>{mdiClose}</IconOf>
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid
              container
              item
              direction="row"
              alignItems="center"
              xs
              spacing={1}
            >
              <Grid item mt={1}>
                <IconOf sx={{ color: ward?.wardType.color }}>
                  {mdiSquare}
                </IconOf>
              </Grid>
              <Grid item>
                <Typography alignItems="center" variant="h5">
                  {ward?.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Select
                value={rosterType ?? ''}
                onChange={e => setRosterType(e.target.value)}
              >
                {rosterTypes?.map(type => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.typeName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Select
                value={repeats}
                onChange={e => {
                  setRepeats(e.target.value as 'day' | 'week');
                  setSelectedDay(0);
                }}
              >
                <MenuItem value="week">Every week</MenuItem>
                <MenuItem value="day">Every day</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Button
                startIcon={
                  <IconButton
                    color="inherit"
                    onClick={e => {
                      e.stopPropagation();
                      setWeekOffset(offset => offset - 1);
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
                      setWeekOffset(offset => offset + 1);
                    }}
                  >
                    <IconOf>{mdiChevronRight}</IconOf>
                  </IconButton>
                }
                variant="text"
                sx={{ borderRadius: 0 }}
              >
                {dayjs().add(weekOffset, 'weeks').weekday(0).format('MMM D') +
                  ' - ' +
                  dayjs().add(weekOffset, 'weeks').weekday(6).format('MMM D')}
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            {new Array(7)
              .fill(null)
              .map((_, i) => dayjs().add(weekOffset, 'weeks').weekday(i))
              .map((day, i) => {
                const [template, dayNumber] =
                  typeof shiftTemplate[i].copy === 'number'
                    ? getCopy(shiftTemplate, i)
                    : [
                        shiftTemplate[i] as {
                          copy: false;
                          shifts: ShiftType[];
                        },
                        i,
                      ];
                const className =
                  repeats === 'day'
                    ? 'selected day-0'
                    : [
                        template.shifts.length > 0 ? `day-${dayNumber}` : '',
                        i === selectedDay ? 'selected' : '',
                      ].join(' ');

                return (
                  <Grid
                    item
                    xs
                    container
                    direction="column"
                    key={day.format()}
                    className={className}
                    onClick={() => setSelectedDay(repeats === 'day' ? 0 : i)}
                    sx={styles.dayChips}
                  >
                    <Grid item>
                      <Typography
                        sx={
                          i === selectedDay && !(repeats === 'day')
                            ? styles.boldText
                            : undefined
                        }
                      >
                        {day.format('MMM D')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        sx={
                          i === selectedDay && !(repeats === 'day')
                            ? styles.boldText
                            : undefined
                        }
                      >
                        {day.format('ddd')}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Daily shift structure</Typography>
          </Grid>
          <Grid item container direction="row">
            <Grid item xs>
              <FormControlLabel
                disabled={!copyDays.length}
                checked={typeof shiftTemplate[selectedDay].copy === 'number'}
                onChange={(_e, checked) => {
                  shiftDispatch({
                    type: 'SET_COPY',
                    payload: {
                      day: selectedDay,
                      copyDay: checked ? copyDays[0][1] : 0,
                      set: checked,
                    },
                  });
                }}
                control={<Checkbox defaultChecked />}
                label="Copy Shift Structure from"
              />
            </Grid>
            <Grid item xs mb={1}>
              <Select
                fullWidth
                disabled={
                  !copyDays.length || shiftTemplate[selectedDay].copy === false
                }
                value={
                  copyDays.length &&
                  typeof shiftTemplate[selectedDay].copy === 'number'
                    ? shiftTemplate[selectedDay].copy
                    : ''
                }
                onChange={e => {
                  shiftDispatch({
                    type: 'SET_COPY',
                    payload: {
                      day: selectedDay,
                      copyDay:
                        typeof e.target.value === 'number'
                          ? e.target.value
                          : parseInt(`${e.target.value}`, 10),
                      set: true,
                    },
                  });
                }}
              >
                {copyDays.map(([day, dayIdx]) => (
                  <MenuItem key={day.format()} value={dayIdx}>
                    <Grid container direction="row">
                      <Grid item>
                        <IconOf sx={{ color: weekColors[dayIdx] }}>
                          {mdiSquare}
                        </IconOf>
                      </Grid>
                      <Grid item>
                        <Typography>{day.format('MMM D, dddd')}</Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            {getCopy(shiftTemplate, selectedDay)[0]?.shifts?.map((shift, i) => (
              <Grid item container direction="column" key={i}>
                <Grid item container direction="row">
                  <Grid item>
                    <IconButton
                      onClick={() =>
                        shiftDispatch({
                          type: 'REMOVE',
                          payload: { day: selectedDay, shift: i },
                        })
                      }
                    >
                      <IconOf color="error">{mdiClose}</IconOf>
                    </IconButton>
                  </Grid>
                  <Grid item container direction="column" xs>
                    <Grid item container direction="row" alignItems="center">
                      <Grid item xs>
                        <TextField
                          fullWidth
                          value={shift.name}
                          onChange={e =>
                            shiftDispatch({
                              type: 'MODIFY',
                              payload: {
                                day: selectedDay,
                                shift: i,
                                modification: { name: e.target.value },
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item>
                        <TimePicker
                          label="From"
                          value={shift?.from}
                          onChange={val => {
                            shiftDispatch({
                              type: 'MODIFY',
                              payload: {
                                day: selectedDay,
                                shift: i,
                                modification: { from: dayjs(val) },
                              },
                            });
                          }}
                          renderInput={params => <TextField {...params} />}
                        />
                      </Grid>
                      <Grid item>
                        <TimePicker
                          label="To"
                          value={shift?.to}
                          onChange={val => {
                            shiftDispatch({
                              type: 'MODIFY',
                              payload: {
                                day: selectedDay,
                                shift: i,
                                modification: { to: dayjs(val) },
                              },
                            });
                          }}
                          renderInput={params => <TextField {...params} />}
                        />
                      </Grid>
                    </Grid>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<IconOf>{mdiChevronDown}</IconOf>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Set shift requirements</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container direction="column">
                          <Grid
                            item
                            container
                            direction="row"
                            alignItems="center"
                          >
                            <Grid item xs>
                              <FormControlLabel
                                checked={
                                  typeof shift.requirements
                                    .minPeopleRequired === 'number'
                                }
                                control={<Checkbox />}
                                label="Minimum people required in a shift"
                                onChange={(_, checked) =>
                                  shiftDispatch({
                                    type: 'CHANGE_REQUIREMENTS',
                                    payload: {
                                      day: selectedDay,
                                      shift: i,
                                      modification: {
                                        minPeopleRequired: checked
                                          ? 1
                                          : undefined,
                                      },
                                    },
                                  })
                                }
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                type="number"
                                InputProps={{
                                  inputProps: { min: 0 },
                                }}
                                disabled={
                                  typeof shift.requirements
                                    .minPeopleRequired !== 'number'
                                }
                                value={
                                  shift.requirements.minPeopleRequired ?? 0
                                }
                                onChange={e =>
                                  shiftDispatch({
                                    type: 'CHANGE_REQUIREMENTS',
                                    payload: {
                                      day: selectedDay,
                                      shift: i,
                                      modification: {
                                        minPeopleRequired: parseInt(
                                          e.target.value,
                                          10,
                                        ),
                                      },
                                    },
                                  })
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item container direction="column">
                            <Grid item xs>
                              <FormControlLabel
                                checked={
                                  shift.requirements.roleRequired.length > 0
                                }
                                control={<Checkbox />}
                                label="Minimum role requirements"
                                onChange={(_, checked) =>
                                  shiftDispatch({
                                    type: 'CHANGE_REQUIREMENTS',
                                    payload: {
                                      day: selectedDay,
                                      shift: i,
                                      modification: {
                                        roleRequired: checked
                                          ? [[roles?.[0]?._id, 1]]
                                          : [],
                                      },
                                    },
                                  })
                                }
                              />
                            </Grid>
                            <Grid container direction="column" ml={2}>
                              {shift.requirements.roleRequired.map(
                                (roleReq, idx) => (
                                  <Grid
                                    item
                                    container
                                    direction="row"
                                    key={idx}
                                    alignItems="center"
                                  >
                                    <Grid item>
                                      <IconButton
                                        onClick={() =>
                                          shiftDispatch({
                                            type: 'CHANGE_REQUIREMENTS',
                                            payload: {
                                              day: selectedDay,
                                              shift: i,
                                              modification: {
                                                roleRequired:
                                                  shift.requirements.roleRequired.filter(
                                                    (_roleR, roleIdx) =>
                                                      roleIdx !== idx,
                                                  ),
                                              },
                                            },
                                          })
                                        }
                                      >
                                        <IconOf>{mdiClose}</IconOf>
                                      </IconButton>
                                    </Grid>
                                    <Grid item xs>
                                      <Select
                                        onChange={(event: any) => {
                                          handleChange(event);
                                          shiftDispatch({
                                            type: 'CHANGE_REQUIREMENTS',
                                            payload: {
                                              day: selectedDay,
                                              shift: i,
                                              modification: {
                                                roleRequired:
                                                  shift.requirements.roleRequired.map(
                                                    (
                                                      roleR: any,
                                                      roleIdx: any,
                                                    ) =>
                                                      roleIdx === idx
                                                        ? [
                                                            event.target.value,
                                                            roleR[1],
                                                          ]
                                                        : roleR,
                                                  ),
                                              },
                                            },
                                          });
                                        }}
                                        fullWidth
                                        displayEmpty
                                      >
                                        {hospitalRoleType?.length > 0 &&
                                          hospitalRoleType.map((role: any) => (
                                            <MenuItem
                                              key={role._id}
                                              value={role._id}
                                            >
                                              {role.hospitalRoleType.title ??
                                                ''}
                                            </MenuItem>
                                          ))}
                                      </Select>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <TextField
                                        type="number"
                                        InputProps={{
                                          inputProps: { min: 0 },
                                        }}
                                        value={roleReq[1]}
                                        onChange={e =>
                                          shiftDispatch({
                                            type: 'CHANGE_REQUIREMENTS',
                                            payload: {
                                              day: selectedDay,
                                              shift: i,
                                              modification: {
                                                roleRequired:
                                                  shift.requirements.roleRequired.map(
                                                    (roleR, roleIdx) =>
                                                      roleIdx === idx
                                                        ? [
                                                            roleR[0],
                                                            parseInt(
                                                              e.target.value,
                                                              10,
                                                            ),
                                                          ]
                                                        : roleR,
                                                  ),
                                              },
                                            },
                                          })
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                ),
                              )}
                              {shift.requirements.roleRequired.length ? (
                                <Grid
                                  item
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <IconButton
                                      onClick={() =>
                                        shiftDispatch({
                                          type: 'CHANGE_REQUIREMENTS',
                                          payload: {
                                            day: selectedDay,
                                            shift: i,
                                            modification: {
                                              roleRequired:
                                                shift.requirements.roleRequired.concat(
                                                  [[roles?.[0]?._id, 1]],
                                                ),
                                            },
                                          },
                                        })
                                      }
                                    >
                                      <IconOf>{mdiPlus}</IconOf>
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid item container direction="column">
                            <Grid item xs>
                              <FormControlLabel
                                checked={
                                  shift.requirements.skillRequired.length > 0
                                }
                                control={<Checkbox />}
                                label="Minimum skill requirements"
                                onChange={(_, checked) =>
                                  shiftDispatch({
                                    type: 'CHANGE_REQUIREMENTS',
                                    payload: {
                                      day: selectedDay,
                                      shift: i,
                                      modification: {
                                        skillRequired: checked
                                          ? [[undefined, 1]]
                                          : [],
                                      },
                                    },
                                  })
                                }
                              />
                            </Grid>
                            <Grid container direction="column" ml={2}>
                              {shift.requirements.skillRequired.map(
                                (skillReq, idx) => (
                                  <Grid
                                    item
                                    container
                                    direction="row"
                                    key={idx}
                                    alignItems="center"
                                  >
                                    <Grid item>
                                      <IconButton
                                        onClick={() =>
                                          shiftDispatch({
                                            type: 'CHANGE_REQUIREMENTS',
                                            payload: {
                                              day: selectedDay,
                                              shift: i,
                                              modification: {
                                                skillRequired:
                                                  shift.requirements.skillRequired.filter(
                                                    (_skillR, skillIdx) =>
                                                      skillIdx !== idx,
                                                  ),
                                              },
                                            },
                                          })
                                        }
                                      >
                                        <IconOf>{mdiClose}</IconOf>
                                      </IconButton>
                                    </Grid>
                                    <Grid item xs>
                                      <Autocomplete
                                        options={skillSearches.filter(
                                          (skill: any) =>
                                            !selectedSkills.includes(skill._id),
                                        )}
                                        getOptionLabel={(option: any) =>
                                          option.name
                                        }
                                        onChange={(_e: any, value: any) => {
                                          value
                                            ? setSelectedSkills(s =>
                                                s.concat(value?._id),
                                              )
                                            : null;
                                          shiftDispatch({
                                            type: 'CHANGE_REQUIREMENTS',
                                            payload: {
                                              day: selectedDay,
                                              shift: i,
                                              modification: {
                                                skillRequired:
                                                  shift.requirements.skillRequired.map(
                                                    (skillR, skillIdx) =>
                                                      skillIdx === idx
                                                        ? [
                                                            value?._id,
                                                            skillR[1],
                                                          ]
                                                        : skillR,
                                                  ),
                                              },
                                            },
                                          });
                                        }}
                                        renderInput={(params: any) => (
                                          <TextField {...params} />
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={2}>
                                      <TextField
                                        type="number"
                                        InputProps={{
                                          inputProps: { min: 0 },
                                        }}
                                        value={skillReq[1]}
                                        onChange={e =>
                                          shiftDispatch({
                                            type: 'CHANGE_REQUIREMENTS',
                                            payload: {
                                              day: selectedDay,
                                              shift: i,
                                              modification: {
                                                skillRequired:
                                                  shift.requirements.skillRequired.map(
                                                    (skillR, roleIdx) =>
                                                      roleIdx === idx
                                                        ? [
                                                            skillR[0],
                                                            parseInt(
                                                              e.target.value,
                                                              10,
                                                            ),
                                                          ]
                                                        : skillR,
                                                  ),
                                              },
                                            },
                                          })
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                ),
                              )}
                              {shift.requirements.skillRequired.length ? (
                                <Grid
                                  item
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <IconButton
                                      onClick={() =>
                                        shiftDispatch({
                                          type: 'CHANGE_REQUIREMENTS',
                                          payload: {
                                            day: selectedDay,
                                            shift: i,
                                            modification: {
                                              skillRequired:
                                                shift.requirements.skillRequired.concat(
                                                  [[undefined, 1]],
                                                ),
                                            },
                                          },
                                        })
                                      }
                                    >
                                      <IconOf>{mdiPlus}</IconOf>
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              ) : null}
                            </Grid>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <IconButton
              onClick={() =>
                shiftDispatch({ type: 'ADD', payload: { day: selectedDay } })
              }
            >
              <IconOf>{mdiPlus}</IconOf>
            </IconButton>
            <Typography variant="subtitle1">Add another shift</Typography>
          </Grid>
          <Grid item alignSelf="center">
            <Button
              variant="contained"
              endIcon={<IconOf>{mdiChevronRight}</IconOf>}
              onClick={createRoster}
            >
              Create Roster
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  },
);

export default CreateTemplateModal;
