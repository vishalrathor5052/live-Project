/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint linebreak-style: ["error", "unix"] */

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  GetRosterType,
  GetEmployeeByHospitalIDType,
  SchedulesType,
} from 'src/Interface/Interface';
import {
  setHeaderTitle,
  GetRosterDetails,
  setWardId,
  setDateRange,
  setEmployeeId,
  setWardEmployee,
  setSelectRoster,
  setSelectMonth,
  setSelectedView,
  resetRosterData,
  getEmployeeList,
  setSelectedEmployeeId,
  getHospitalRoles,
  getSchedules,
  setUpdatEditMode,
  setIsMultiWard,
} from '../actions/header';

const initialState: {
  title?: string | undefined;
  rosterData?: Array<GetRosterType> | undefined;
  wardId?: string[];
  dateRange?: Record<string, unknown> | undefined;
  employeeId?: string | undefined;
  wardEmployee?: string | undefined;
  selectedRoster?: string | undefined;
  selectedMonth: string;
  selectedView?: string | null;
  employeeList?: Array<GetEmployeeByHospitalIDType>;
  selectedEmployeeId?: Array<string>;
  hospitalRoles?: Array<unknown>;
  schedules?: Array<SchedulesType> | undefined;
  publishRoster?: any | undefined;
  isLoading: boolean;
  isEditMode: boolean | undefined;
  isMultiWard: boolean | undefined;
} = {
  title: 'Dashboard',
  rosterData: [],
  wardId: [],
  dateRange: {},
  employeeId: '',
  wardEmployee: 'Wards',
  selectedRoster: '',
  selectedMonth: new Date().toISOString(),
  selectedView: null,
  employeeList: [],
  selectedEmployeeId: [],
  hospitalRoles: [],
  schedules: [],
  publishRoster: {},
  isLoading: false,
  isEditMode: false,
  isMultiWard: false,
};

export const header = createSlice({
  name: 'Header',
  initialState: initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(setHeaderTitle, (state, action) => {
        state.title = action.payload;
      })
      .addCase(GetRosterDetails.fulfilled, (state, action) => {
        state.rosterData = action?.payload?.roster;
        state.isLoading = false;
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        const data = action.payload ?? [];
        const employeeId = data[0]?.user?._id ?? '';
        state.selectedEmployeeId = [employeeId];
        state.employeeList = data;
      })
      .addCase(getHospitalRoles.fulfilled, (state, action) => {
        state.hospitalRoles = action.payload;
      })
      .addCase(getSchedules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schedules = action.payload;
      })
      .addCase(setWardId, (state, action) => {
        if (state.isMultiWard) {
          if (state.wardId?.includes(action?.payload ?? '')) {
            state.wardId = state.wardId.filter(
              (ward: string) => ward !== action?.payload,
            );
          } else {
            state.wardId?.push(action.payload ?? '');
          }
        }
        if (!state.isMultiWard) {
          state.wardId = [action.payload ?? ''];
        }
      })
      .addCase(setDateRange, (state, action) => {
        state.dateRange = action.payload;
      })
      .addCase(setEmployeeId, (state, action) => {
        state.employeeId = action.payload;
      })
      .addCase(setWardEmployee, (state, action) => {
        state.wardEmployee = action.payload;
      })
      .addCase(setSelectRoster, (state, action) => {
        state.selectedRoster = action.payload;
      })
      .addCase(setSelectMonth, (state, action) => {
        state.selectedMonth = action.payload;
      })
      .addCase(setSelectedView, (state, action) => {
        state.selectedView = action.payload;
      })
      .addCase(resetRosterData, (state, action) => {
        state.rosterData = [];
        state.rosterData = action.payload;
      })
      .addCase(setSelectedEmployeeId, (state, action) => {
        // state.selectedEmployeeId = [
        //   ...state.selectedEmployeeId,
        //   ...action.payload,
        // ];
        state.selectedEmployeeId = action.payload;
      })
      .addCase(setUpdatEditMode, (state, action) => {
        state.isEditMode = action.payload;
      })
      .addCase(setIsMultiWard, (state, action) => {
        state.isMultiWard = action.payload;
      })
      .addMatcher(
        isAnyOf(
          GetRosterDetails.pending,
          getSchedules.pending,
          getEmployeeList.pending,
        ),
        state => {
          state.isLoading = true;
        },
      ),
});

export default header.reducer;
