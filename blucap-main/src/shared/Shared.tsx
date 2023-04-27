export const ActionTypes = [
  'Copy from another ward',
  'Copy to another ward',
  'Copy previous week',
  'Clear week',
  'Copy Roster Settings',
  'Edit Roster Setting',
];

export const SelectViewOption = ['Week', 'Month'];

export const CalendarWards = [
  {
    title: '4A-HDU',
    time: '24 h',
    date: new Date(),
  },
];

export const ButtonLabels = {
  publish: 'Publish',
  allocateShift: 'Allocate Shift',
  week: 'Week',
  month: 'Month',
  currentRoster: 'Current Roster',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  addRoles: 'Add More Roles',
  done: 'Done',
  seeNewTemp: 'See New Template',
};

export const Placeholders = {
  search: 'Search...',
  selectRoster: 'Select Roster',
  actions: 'Actions',
  selectRole: 'Select Role',
  searchIcu: 'Search ICU...',
  multiWard: 'Multi ward selection mode',
  editMode: 'Edit mode',
};

export const General = {
  updates: 'Updates',
  dutyCancelled: 'Duty Cancelled',
  allocation: 'Allocation',
  availAndQualified: 'Available and Qualified',
  showCancel: 'Show Cancellation',
  cancellation: 'Cancellation',
  shiftRequire: 'Shift Requirements',
  minDoctor: 'Minimum number of doctors:',
  minRoleRequire: 'Minimum role requirements:',
  inCharge: 'In-Charge',
  allocDuty: 'Allocate Duty',
  am: 'AM',
  pm: 'PM',
  day: 'Day',
};

export const RosterTableColumn = [
  { title: 'Morning {8am - 8pm}', field: 'morning' },
  { title: 'Night {8pm - 8am}', field: 'night' },
];

export const RosterDetails = [
  {
    day: 'Monday',
    morning: '+',
    night: '',
  },
  {
    day: 'Tuesday',
    morning: '',
    night: '',
  },
  {
    day: 'Wednesday',
    morning: '',
    night: '',
  },
  {
    day: 'Thursday',
    morning: '',
    night: '',
  },
  {
    day: 'Friday',
    morning: '',
    night: '',
  },
  {
    day: 'Saturday',
    morning: '',
    night: '',
  },
  {
    day: 'Sunday',
    morning: '',
    night: '',
  },
];

export const RosterSearchWard = [
  { color: '#FA5252', name: 'ICU Wards' },
  { color: '#7950F2', name: 'HDU Wards' },
  { color: '#15AABF', name: 'General' },
];

export const DNDColumns = {
  allocations: {
    id: 'allocations',
    list: [
      {
        name: 'Dr. Mrinmoy Sanyal',
        designation: 'Senior Registrar',
        skills: ['Skill 1', 'Skill 2', 'Skill 3'],
        id: '1',
        inCharge: true,
      },
    ],
  },
  available: {
    id: 'available',
    list: [
      {
        name: 'Dr. Koushik Kumar',
        designation: 'Junior Registrar',
        skills: ['Skill 1', 'Skill 2', 'Skill 3'],
        id: '2',
        inCharge: false,
      },
      {
        name: 'Dr. Prashant Seth',
        designation: 'Junior Registrar',
        skills: ['Skill 1', 'Skill 2', 'Skill 3'],
        id: '3',
        inCharge: false,
      },
      {
        name: 'Dr. Nandraja Kota',
        designation: 'Junior Registrar',
        skills: ['Skill 1', 'Skill 2', 'Skill 3'],
        id: '4',
        inCharge: false,
      },
      {
        name: 'Dr. Nandraja Kota',
        designation: 'Junior Registrar',
        skills: ['Skill 1', 'Skill 2', 'Skill 3'],
        id: '5',
        inCharge: false,
      },
    ],
  },
};

export const CalendarData = [
  {
    id: 0,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 1, 0, 0, 0),
    end: new Date(2022, 4, 1, 11, 0, 0),
  },
  {
    id: 1,
    title: '4A-HDU',
    time: '24 h',
    allDay: true,
    start: new Date(2022, 4, 5, 0, 0, 0),
    end: new Date(2022, 4, 5, 11, 0, 0),
  },
  {
    id: 2,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 6, 0, 0, 0),
    end: new Date(2022, 4, 6, 11, 0, 0),
  },
  {
    id: 3,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 8, 0, 0, 0),
    end: new Date(2022, 4, 8, 11, 0, 0),
  },
  {
    id: 4,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 12, 0, 0, 0),
    end: new Date(2022, 4, 12, 11, 0, 0),
  },
  {
    id: 5,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 16, 0, 0, 0),
    end: new Date(2022, 4, 16, 11, 0, 0),
  },
  {
    id: 6,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 18, 0, 0, 0),
    end: new Date(2022, 4, 18, 11, 0, 0),
  },
  {
    id: 7,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 19),
    end: new Date(2022, 4, 19),
  },
  {
    id: 8,
    title: 'Sick Leave',
    time: '72 h',
    leave: true,
    start: new Date(2022, 4, 20, 0, 0, 0),
    end: new Date(2022, 4, 22, 11, 0, 0),
  },
  {
    id: 9,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 24, 0, 0, 0),
    end: new Date(2022, 4, 24, 11, 0, 0),
  },
  {
    id: 10,
    title: '4A-HDU',
    time: '24 h',
    start: new Date(2022, 4, 26, 0, 0, 0),
    end: new Date(2022, 4, 26, 11, 0, 0),
  },
];

export const RoleArray = ['Wards', 'Employee'];

export const SetRoster = {
  setRosterTemp: 'Set Roster Template',
  usPrev: 'Use Previous',
  createNewTemp: 'Create new template',
};
